import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import gsap from 'gsap';
import { ROUTE_DEPTH } from '../constants/routeDepth';

interface OrbitCardData {
  css3dObj: CSS3DObject;
  inner: HTMLDivElement;
  isOrbiting: boolean;
}

export class SceneManager {
  private static _instance: SceneManager | null = null;
  private _initialized = false;
  private _pendingRoute: string | null = null;

  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  webglRenderer!: THREE.WebGLRenderer;
  css3dRenderer!: CSS3DRenderer;

  private _cards: THREE.Group[] = [];
  private _orbitCards: OrbitCardData[] = [];
  private _activeCardIndex: number | null = null;
  private _frameId = 0;
  private _t = 0;
  private _currentRoute = '/';
  private _wheelDebounce: ReturnType<typeof setTimeout> | null = null;

  static get instance(): SceneManager {
    if (!SceneManager._instance) {
      SceneManager._instance = new SceneManager();
    }
    return SceneManager._instance;
  }

  get focalLength(): number {
    const fovRad = (this.camera.fov * Math.PI) / 180;
    return (window.innerHeight * 0.5) / Math.tan(fovRad / 2);
  }

  init(
    webglContainer: HTMLDivElement,
    css3dContainer: HTMLDivElement,
    projectColors: string[],
  ) {
    if (this._initialized) return;
    this._initialized = true;

    // Scene + Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      100000,
    );
    this.camera.position.z = this.focalLength;

    // WebGL renderer
    this.webglRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.webglRenderer.setSize(window.innerWidth, window.innerHeight);
    this.webglRenderer.setPixelRatio(window.devicePixelRatio);
    webglContainer.appendChild(this.webglRenderer.domElement);

    // CSS3D renderer
    this.css3dRenderer = new CSS3DRenderer();
    this.css3dRenderer.setSize(window.innerWidth, window.innerHeight);
    const css3dDom = this.css3dRenderer.domElement;
    css3dDom.style.position = 'absolute';
    css3dDom.style.top = '0';
    css3dDom.style.left = '0';
    css3dDom.style.pointerEvents = 'none';
    css3dContainer.appendChild(css3dDom);

    // Lighting
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xfff5e0, 1.2);
    dir.position.set(300, 500, 500);
    this.scene.add(dir);

    this._createCards(projectColors);
    this._createParticles();

    window.addEventListener('resize', this._handleResize);
    window.addEventListener('wheel', this._handleWheel, { passive: true });

    this._animateLoop();

    // Apply any navigation that was requested before init
    if (this._pendingRoute) {
      const route = this._pendingRoute;
      this._pendingRoute = null;
      this.flyTo(route);
    }
  }

  /** Returns the initial orbit position for card index i out of count total. */
  private _getOrbitPosition(i: number, count: number): THREE.Vector3 {
    const angle = (i / count) * Math.PI * 2;
    const radius = 320;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle * 0.5) * 80,
      Math.sin(angle) * radius * 0.6,
    );
  }

  private _createCards(projectColors: string[]) {
    const count = projectColors.length;
    for (let i = 0; i < count; i++) {
      const group = new THREE.Group();
      const pos = this._getOrbitPosition(i, count);
      group.position.copy(pos);
      group.userData = { baseAngle: (i / count) * Math.PI * 2, index: i, isActive: false };

      const geo = new THREE.BoxGeometry(160, 220, 4);
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(projectColors[i]),
        roughness: 0.3,
        metalness: 0.1,
        transparent: true,
        opacity: 0.85,
      });
      group.add(new THREE.Mesh(geo, mat));

      const stripGeo = new THREE.BoxGeometry(160, 8, 5);
      const stripMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.15,
      });
      const strip = new THREE.Mesh(stripGeo, stripMat);
      strip.position.y = 95;
      group.add(strip);

      this.scene.add(group);
      this._cards.push(group);
    }
  }

  private _createParticles() {
    const count = 800;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4000;
      positions[i * 3 + 2] = -(Math.random() * 18000);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xd4b896,
      size: 2,
      transparent: true,
      opacity: 0.5,
    });
    this.scene.add(new THREE.Points(geo, mat));
  }

  /**
   * Creates CSS3D orbit cards at the same world positions as WebGL cards.
   * Returns array of inner divs for React portals.
   */
  createOrbitCards(count: number): HTMLDivElement[] {
    const inners: HTMLDivElement[] = [];
    for (let i = 0; i < count; i++) {
      const outer = document.createElement('div');
      outer.style.width = '820px';
      outer.style.height = '680px';
      outer.style.pointerEvents = 'none';

      const inner = document.createElement('div');
      inner.style.width = '100%';
      inner.style.height = '100%';
      inner.style.overflow = 'hidden';
      inner.style.pointerEvents = 'none';
      outer.appendChild(inner);

      const obj = new CSS3DObject(outer);
      const pos = this._getOrbitPosition(i, count);
      obj.position.copy(pos);
      obj.scale.set(0.25, 0.25, 0.25);
      this.scene.add(obj);

      // Force synchronous render so divs are in DOM before React portals target them
      this.css3dRenderer.render(this.scene, this.camera);

      this._orbitCards.push({ css3dObj: obj, inner, isOrbiting: true });
      inners.push(inner);
    }
    return inners;
  }

  dockCard(index: number) {
    this._activeCardIndex = index;
    const data = this._orbitCards[index];
    data.isOrbiting = false;

    gsap.to(data.css3dObj.position, { x: 0, y: 0, z: 0, duration: 0.75, ease: 'power3.inOut' });
    gsap.to(data.css3dObj.scale, { x: 1, y: 1, z: 1, duration: 0.75, ease: 'power3.inOut' });

    // Enable pointer events on inner div so detail panel is interactive
    data.inner.style.pointerEvents = 'auto';

    // Shrink other cards
    this._orbitCards.forEach((d, i) => {
      if (i === index) return;
      gsap.to(d.css3dObj.scale, { x: 0.1, y: 0.1, z: 0.1, duration: 0.5, ease: 'power2.inOut' });
    });

    this._cards.forEach((c, i) => { c.userData.isActive = i === index; });
  }

  undockCard() {
    const prev = this._activeCardIndex;
    this._activeCardIndex = null;

    this._orbitCards.forEach((data, i) => {
      if (i === prev) {
        data.inner.style.pointerEvents = 'none';
        // Animate back to the WebGL card's current orbit position
        const pos = this._cards[i].position;
        gsap.to(data.css3dObj.position, {
          x: pos.x, y: pos.y, z: pos.z,
          duration: 0.6, ease: 'power3.inOut',
          onComplete: () => { data.isOrbiting = true; },
        });
        gsap.to(data.css3dObj.scale, { x: 0.25, y: 0.25, z: 0.25, duration: 0.6, ease: 'power3.inOut' });
      } else {
        gsap.to(data.css3dObj.scale, { x: 0.25, y: 0.25, z: 0.25, duration: 0.6, ease: 'power3.inOut' });
      }
    });

    this._cards.forEach(c => { c.userData.isActive = false; });
  }

  flyTo(route: string, onComplete?: () => void) {
    if (!this._initialized) {
      this._pendingRoute = route;
      return;
    }
    this._currentRoute = route;
    const depth = ROUTE_DEPTH[route] ?? 0;
    const targetZ = depth + this.focalLength;

    gsap.to(this.camera.position, {
      z: targetZ,
      duration: 1.4,
      ease: 'power3.inOut',
      onComplete,
    });

    gsap.to(this.camera.rotation, {
      x: route === '/' ? 0 : -0.025,
      duration: 1.4,
      ease: 'power3.inOut',
    });
  }

  private _animateLoop = () => {
    this._frameId = requestAnimationFrame(this._animateLoop);
    this._t += 0.005;

    this._cards.forEach((card, i) => {
      const isActive = card.userData.isActive as boolean;
      const baseAngle = (card.userData.baseAngle as number) + this._t * 0.3;
      const radius = isActive ? 220 : 320;
      const targetX = Math.cos(baseAngle) * radius;
      const targetZ = Math.sin(baseAngle) * radius * 0.6;

      card.position.x += (targetX - card.position.x) * 0.04;
      card.position.z += (targetZ - card.position.z) * 0.04;
      card.position.y += (Math.sin(this._t + i) * 15 - card.position.y * 0.1) * 0.05;

      const targetScale = isActive ? 1.25 : 0.85;
      card.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.06);
      card.rotation.y = Math.sin(this._t * 0.5 + i) * 0.15;
    });

    // Sync CSS3D orbit cards with WebGL card positions each frame
    this._orbitCards.forEach((data, i) => {
      if (!data.isOrbiting || i >= this._cards.length) return;
      data.css3dObj.position.copy(this._cards[i].position);
      data.css3dObj.rotation.y = this._cards[i].rotation.y;
    });

    this.webglRenderer.render(this.scene, this.camera);
    this.css3dRenderer.render(this.scene, this.camera);
  };

  private _handleResize = () => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    this.camera.aspect = W / H;
    this.camera.updateProjectionMatrix();
    this.webglRenderer.setSize(W, H);
    this.css3dRenderer.setSize(W, H);
  };

  private _handleWheel = (e: WheelEvent) => {
    if (!this._initialized) return;
    if (this._activeCardIndex !== null) return; // Disable wheel when a card is docked

    const depth = ROUTE_DEPTH[this._currentRoute] ?? 0;
    const dockedZ = depth + this.focalLength;

    gsap.killTweensOf(this.camera.position);
    gsap.to(this.camera.position, {
      z: this.camera.position.z - e.deltaY * 0.5,
      duration: 0.3,
      ease: 'power2.out',
    });

    if (this._wheelDebounce) clearTimeout(this._wheelDebounce);
    this._wheelDebounce = setTimeout(() => {
      gsap.to(this.camera.position, {
        z: dockedZ,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      });
    }, 150);
  };

  dispose() {
    if (!this._initialized) return;
    cancelAnimationFrame(this._frameId);
    window.removeEventListener('resize', this._handleResize);
    window.removeEventListener('wheel', this._handleWheel);
    if (this._wheelDebounce) clearTimeout(this._wheelDebounce);
    gsap.killTweensOf(this.camera.position);
    gsap.killTweensOf(this.camera.rotation);
    this.webglRenderer.dispose();
    this.scene.clear();
    this._cards = [];
    this._orbitCards = [];
    this._initialized = false;
    SceneManager._instance = null;
  }
}
