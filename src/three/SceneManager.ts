import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import gsap from 'gsap';
import { ROUTE_DEPTH } from '../constants/routeDepth';

// Orbit layout constants
const ORBIT_X_RADIUS = 400;
const ORBIT_Y_RADIUS = 70;
const ORBIT_Z_RADIUS = 30;
const ORBIT_PHASE = Math.PI / 6; // 30° offset so panels start left/right spread
const ORBIT_SCALE = 0.5;
const ORBIT_SPEED = 0.10;

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

  // Mouse parallax state
  private _mouseNormX = 0;
  private _mouseNormY = 0;

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

    this._createCards(projectColors.length);
    this._createParticles();

    window.addEventListener('resize', this._handleResize);
    window.addEventListener('wheel', this._handleWheel, { passive: true });
    window.addEventListener('mousemove', this._handleMouseMove);

    this._animateLoop();

    // Apply any navigation that was requested before init
    if (this._pendingRoute) {
      const route = this._pendingRoute;
      this._pendingRoute = null;
      this.flyTo(route);
    }
  }

  /** Initial world position for orbit card i out of count total. */
  private _getOrbitPosition(i: number, count: number): THREE.Vector3 {
    const angle = (i / count) * Math.PI * 2 + ORBIT_PHASE;
    return new THREE.Vector3(
      Math.cos(angle) * ORBIT_X_RADIUS,
      Math.sin(angle) * ORBIT_Y_RADIUS,
      Math.sin(angle * 0.5) * ORBIT_Z_RADIUS,
    );
  }

  private _createCards(count: number) {
    for (let i = 0; i < count; i++) {
      const group = new THREE.Group();
      const pos = this._getOrbitPosition(i, count);
      group.position.copy(pos);
      // Store baseAngle including phase offset so animation stays in sync
      group.userData = {
        baseAngle: (i / count) * Math.PI * 2 + ORBIT_PHASE,
        index: i,
        isActive: false,
      };
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
      obj.scale.set(ORBIT_SCALE, ORBIT_SCALE, ORBIT_SCALE);
      this.scene.add(obj);

      // Force synchronous render so divs are in DOM before React portals target them
      this.css3dRenderer.render(this.scene, this.camera);

      this._orbitCards.push({ css3dObj: obj, inner, isOrbiting: true });
      inners.push(inner);
    }
    return inners;
  }

  private _setOrbitCardsVisible(visible: boolean) {
    this._orbitCards.forEach(data => {
      data.css3dObj.element.style.visibility = visible ? '' : 'hidden';
    });
  }

  dockCard(index: number) {
    this._activeCardIndex = index;
    const data = this._orbitCards[index];
    data.isOrbiting = false;

    // Bring active card to center, slightly in front of others
    gsap.to(data.css3dObj.position, { x: 0, y: 0, z: 40, duration: 0.75, ease: 'power3.inOut' });
    gsap.to(data.css3dObj.scale, { x: 1, y: 1, z: 1, duration: 0.75, ease: 'power3.inOut' });

    // Enable pointer events on inner div so detail panel is interactive
    data.inner.style.pointerEvents = 'auto';

    // Hide other cards (very small, effectively invisible)
    this._orbitCards.forEach((d, i) => {
      if (i === index) return;
      gsap.to(d.css3dObj.scale, { x: 0.05, y: 0.05, z: 0.05, duration: 0.5, ease: 'power2.inOut' });
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
        gsap.to(data.css3dObj.scale, { x: ORBIT_SCALE, y: ORBIT_SCALE, z: ORBIT_SCALE, duration: 0.6, ease: 'power3.inOut' });
      } else {
        gsap.to(data.css3dObj.scale, { x: ORBIT_SCALE, y: ORBIT_SCALE, z: ORBIT_SCALE, duration: 0.6, ease: 'power3.inOut' });
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

    // Show orbit cards only on home; hide them for all other routes
    this._setOrbitCardsVisible(route === '/');

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
    this._t += 0.0015;

    // Mouse parallax: gently shift camera X/Y — disabled when card is docked or off home
    const applyParallax = this._activeCardIndex === null && this._currentRoute === '/';
    const targetCamX = applyParallax ? this._mouseNormX * 85 : 0;
    const targetCamY = applyParallax ? this._mouseNormY * 40 : 0;
    this.camera.position.x += (targetCamX - this.camera.position.x) * 0.04;
    this.camera.position.y += (targetCamY - this.camera.position.y) * 0.04;

    this._cards.forEach((card, i) => {
      const baseAngle = (card.userData.baseAngle as number) + this._t * ORBIT_SPEED;
      const targetX = Math.cos(baseAngle) * ORBIT_X_RADIUS;
      const targetY = Math.sin(baseAngle) * ORBIT_Y_RADIUS;
      const targetZ = Math.sin(baseAngle * 0.5) * ORBIT_Z_RADIUS;

      card.position.x += (targetX - card.position.x) * 0.025;
      card.position.y += (targetY + Math.sin(this._t * 2 + i) * 5 - card.position.y) * 0.04;
      card.position.z += (targetZ - card.position.z) * 0.025;

      card.rotation.y = Math.sin(this._t * 0.4 + i) * 0.06;
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

  private _handleMouseMove = (e: MouseEvent) => {
    this._mouseNormX = (e.clientX / window.innerWidth) * 2 - 1;   // -1 (left) to +1 (right)
    this._mouseNormY = -((e.clientY / window.innerHeight) * 2 - 1); // +1 (top) to -1 (bottom)
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
    if (this._activeCardIndex !== null) return;

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
    window.removeEventListener('mousemove', this._handleMouseMove);
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
