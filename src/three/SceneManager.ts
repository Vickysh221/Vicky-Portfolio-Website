import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import gsap from 'gsap';
import { ROUTE_DEPTH } from '../constants/routeDepth';
import { getHomeScenePreset, type HomeScenePreset, type HomeSceneStateKey } from './homePanelLayout';

interface OrbitCardData {
  css3dObj: CSS3DObject;
  inner: HTMLDivElement;
  isOrbiting: boolean;
}

const DOCKED_HOME_SCENE_STATES = [
  'home-docked-0',
  'home-docked-1',
  'home-docked-2',
] as const satisfies readonly HomeSceneStateKey[];

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
  private _currentRoute = '/';
  private _wheelDebounce: ReturnType<typeof setTimeout> | null = null;
  private _homeSceneState: HomeSceneStateKey = 'home-idle';
  private _homeCameraBasePosition = new THREE.Vector3();
  private _homeCameraBaseRotation = new THREE.Euler();
  private _interactionOffset = new THREE.Vector3();
  private _interactionRotationOffset = new THREE.Euler(0, 0, 0);
  private _idleRestoreTimer: ReturnType<typeof setTimeout> | null = null;
  private _lastInteractionAt = 0;

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

  get currentHomeSceneState(): HomeSceneStateKey {
    return this._homeSceneState;
  }

  private _getHomeOrbitLayoutPreset(count: number): HomeScenePreset | null {
    const homePreset = getHomeScenePreset(this._homeSceneState);
    return homePreset.panels.length === count ? homePreset : null;
  }

  private _getHomeCameraBaseZ(homePreset: HomeScenePreset): number {
    return homePreset.camera.position.z;
  }

  private _getHomeCameraTargetZ(depth: number, homePreset: HomeScenePreset): number {
    return depth + this.focalLength + this._getHomeCameraBaseZ(homePreset);
  }

  private _getCurrentRouteDepth(): number {
    return ROUTE_DEPTH[this._currentRoute] ?? 0;
  }

  private _getDockedHomeSceneState(index: number): HomeSceneStateKey | null {
    if (!Number.isInteger(index) || index < 0 || index >= DOCKED_HOME_SCENE_STATES.length) {
      return null;
    }
    return DOCKED_HOME_SCENE_STATES[index];
  }

  private _canApplyHomeInteraction(): boolean {
    return this._currentRoute === '/' && this._activeCardIndex === null;
  }

  private _clearInteractionIdleRestoreTimer() {
    if (this._idleRestoreTimer) {
      clearTimeout(this._idleRestoreTimer);
      this._idleRestoreTimer = null;
    }
  }

  private _resetInteractionOffset(immediate = true) {
    this._clearInteractionIdleRestoreTimer();
    this._lastInteractionAt = 0;
    gsap.killTweensOf(this._interactionOffset);
    gsap.killTweensOf(this._interactionRotationOffset);
    if (immediate) {
      this._interactionOffset.set(0, 0, 0);
      this._interactionRotationOffset.set(0, 0, 0);
      return;
    }
    gsap.to(this._interactionOffset, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
    gsap.to(this._interactionRotationOffset, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  }

  private _scheduleInteractionIdleRestore() {
    const interactionAt = Date.now();
    this._lastInteractionAt = interactionAt;
    this._clearInteractionIdleRestoreTimer();
    this._idleRestoreTimer = setTimeout(() => {
      if (this._lastInteractionAt !== interactionAt) return;
      this._resetInteractionOffset(false);
    }, 3000);
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
    const homePreset = getHomeScenePreset(this._homeSceneState);
    this._homeCameraBasePosition.copy(homePreset.camera.position);
    this._homeCameraBaseRotation.copy(homePreset.camera.rotation);
    this.camera.position.copy(homePreset.camera.position);
    this.camera.position.z += this.focalLength;
    this.camera.rotation.copy(homePreset.camera.rotation);

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

    this._createCards(projectColors.length, this._getHomeOrbitLayoutPreset(projectColors.length));
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

  private _getOrbitPosition(i: number, count: number, homePreset: HomeScenePreset | null): THREE.Vector3 {
    const panel = homePreset?.panels[i];
    if (panel) {
      return panel.position.clone();
    }
    return new THREE.Vector3((i - (count - 1) / 2) * 520, 0, 40);
  }

  private _getCardScale(i: number, homePreset: HomeScenePreset | null): number {
    const panel = homePreset?.panels[i];
    if (panel) {
      return panel.scale;
    }
    return 0.15;
  }

  private _createCards(count: number, homePreset: HomeScenePreset | null) {
    for (let i = 0; i < count; i++) {
      const group = new THREE.Group();
      const pos = this._getOrbitPosition(i, count, homePreset);
      group.position.copy(pos);
      group.rotation.y = homePreset?.panels[i]?.rotationY ?? 0;
      group.userData = {
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
    const homePreset = this._getHomeOrbitLayoutPreset(count);
    for (let i = 0; i < count; i++) {
      const outer = document.createElement('div');
      outer.style.width = '820px';
      outer.style.height = '680px';
      outer.style.pointerEvents = 'none';
      outer.style.opacity = '0.8'; // 设置面板透明度

      const inner = document.createElement('div');
      inner.style.width = '100%';
      inner.style.height = '100%';
      inner.style.overflow = 'hidden';
      inner.style.pointerEvents = 'none';
      outer.appendChild(inner);

      const obj = new CSS3DObject(outer);
      const pos = this._getOrbitPosition(i, count, homePreset);
      obj.position.copy(pos);
      const scale = this._getCardScale(i, homePreset);
      obj.scale.set(scale, scale, scale);
      obj.rotation.y = homePreset?.panels[i]?.rotationY ?? 0;
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

  private _applyHomeScenePreset(state: HomeSceneStateKey, onComplete?: () => void) {
    if (!this._initialized) return;

    const preset = getHomeScenePreset(state);
    const cardCount = Math.min(preset.panels.length, this._cards.length);
    const activeIndex = this._activeCardIndex;
    const routeDepth = this._getCurrentRouteDepth();
    this._homeCameraBasePosition.copy(preset.camera.position);
    const applyHomeRotation = this._currentRoute === '/';
    if (applyHomeRotation) {
      this._homeCameraBaseRotation.copy(preset.camera.rotation);
    }

    gsap.killTweensOf(this.camera.position);
    if (applyHomeRotation) {
      gsap.killTweensOf(this.camera.rotation);
    }

    for (let i = 0; i < cardCount; i++) {
      const panel = preset.panels[i];
      const card = this._cards[i];
      const orbitCard = this._orbitCards[i];

      if (card) {
        gsap.killTweensOf(card.position);
        gsap.killTweensOf(card.rotation);
        gsap.to(card.position, {
          x: panel.position.x,
          y: panel.position.y,
          z: panel.position.z,
          duration: preset.duration,
          ease: preset.ease,
        });
        gsap.to(card.rotation, {
          y: panel.rotationY,
          duration: preset.duration,
          ease: preset.ease,
        });
      }

      if (orbitCard && i !== activeIndex) {
        gsap.killTweensOf(orbitCard.css3dObj.position);
        gsap.killTweensOf(orbitCard.css3dObj.rotation);
        gsap.killTweensOf(orbitCard.css3dObj.scale);
        gsap.to(orbitCard.css3dObj.position, {
          x: panel.position.x,
          y: panel.position.y,
          z: panel.position.z,
          duration: preset.duration,
          ease: preset.ease,
        });
        gsap.to(orbitCard.css3dObj.rotation, {
          y: panel.rotationY,
          duration: preset.duration,
          ease: preset.ease,
        });
        gsap.to(orbitCard.css3dObj.scale, {
          x: panel.scale,
          y: panel.scale,
          z: panel.scale,
          duration: preset.duration,
          ease: preset.ease,
        });
        orbitCard.isOrbiting = true;
      }
    }

    gsap.to(this.camera.position, {
      x: this._homeCameraBasePosition.x,
      y: this._homeCameraBasePosition.y,
      z: this._getHomeCameraTargetZ(routeDepth, preset),
      duration: preset.duration,
      ease: preset.ease,
      onComplete,
    });

    if (applyHomeRotation) {
      gsap.to(this.camera.rotation, {
        x: this._homeCameraBaseRotation.x,
        y: this._homeCameraBaseRotation.y,
        z: this._homeCameraBaseRotation.z,
        duration: preset.duration,
        ease: preset.ease,
      });
    }
  }

  setHomeSceneState(state: HomeSceneStateKey, onComplete?: () => void) {
    this._homeSceneState = state;
    if (!this._initialized) return;
    this._applyHomeScenePreset(state, onComplete);
  }

  private _applyHomeScenePresetImmediately(state: HomeSceneStateKey) {
    if (!this._initialized) return;

    const preset = getHomeScenePreset(state);
    const cardCount = Math.min(preset.panels.length, this._cards.length);
    const routeDepth = this._getCurrentRouteDepth();
    this._homeSceneState = state;
    this._homeCameraBasePosition.copy(preset.camera.position);
    if (this._currentRoute === '/') {
      this._homeCameraBaseRotation.copy(preset.camera.rotation);
    }

    gsap.killTweensOf(this.camera.position);
    gsap.killTweensOf(this.camera.rotation);

    for (let i = 0; i < cardCount; i++) {
      const panel = preset.panels[i];
      const card = this._cards[i];
      const orbitCard = this._orbitCards[i];

      if (card) {
        gsap.killTweensOf(card.position);
        gsap.killTweensOf(card.rotation);
        card.position.copy(panel.position);
        card.rotation.y = panel.rotationY;
      }

      if (orbitCard) {
        gsap.killTweensOf(orbitCard.css3dObj.position);
        gsap.killTweensOf(orbitCard.css3dObj.rotation);
        gsap.killTweensOf(orbitCard.css3dObj.scale);
        orbitCard.css3dObj.position.copy(panel.position);
        orbitCard.css3dObj.rotation.y = panel.rotationY;
        orbitCard.css3dObj.scale.set(panel.scale, panel.scale, panel.scale);
        orbitCard.isOrbiting = true;
      }
    }

    this.camera.position.set(
      this._homeCameraBasePosition.x,
      this._homeCameraBasePosition.y,
      this._getHomeCameraTargetZ(routeDepth, preset),
    );

    if (this._currentRoute === '/') {
      this.camera.rotation.set(
        this._homeCameraBaseRotation.x,
        this._homeCameraBaseRotation.y,
        this._homeCameraBaseRotation.z,
      );
    }
  }

  private _setActiveOrbitCard(index: number | null) {
    this._activeCardIndex = index;
    this._orbitCards.forEach((data, i) => {
      if (index !== null && i === index) {
        data.isOrbiting = false;
      }
    });
  }

  dockCard(index: number) {
    const data = this._orbitCards[index];
    const dockedState = this._getDockedHomeSceneState(index);
    if (!data || !dockedState) return;

    this._setActiveOrbitCard(index);
    this._resetInteractionOffset();
    this.setHomeSceneState(dockedState);
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
    if (prev === null) {
      this._resetInteractionOffset();
      this.setHomeSceneState('home-idle');
      this._cards.forEach(c => {
        c.userData.isActive = false;
      });
      return;
    }

    const data = this._orbitCards[prev];
    data.inner.style.pointerEvents = 'none';
    this._setActiveOrbitCard(null);
    this._resetInteractionOffset();
    this.setHomeSceneState('home-idle');
    this._cards.forEach(c => { c.userData.isActive = false; });
  }

  resetToHomeIdle() {
    this._setActiveOrbitCard(null);
    this._orbitCards.forEach((data) => {
      data.inner.style.pointerEvents = 'none';
      data.isOrbiting = true;
    });
    this._cards.forEach((card) => {
      card.userData.isActive = false;
    });
    this._resetInteractionOffset();
    this._applyHomeScenePresetImmediately('home-idle');
  }

  flyTo(route: string, onComplete?: () => void) {
    if (!this._initialized) {
      this._pendingRoute = route;
      return;
    }
    this._currentRoute = route;
    this._resetInteractionOffset();
    const depth = ROUTE_DEPTH[route] ?? 0;
    const homePreset = getHomeScenePreset(this._homeSceneState);
    const targetZ = this._getHomeCameraTargetZ(depth, homePreset);

    // Show orbit cards only on home; hide them for all other routes
    this._setOrbitCardsVisible(route === '/');

    gsap.to(this.camera.position, {
      z: targetZ,
      duration: 1.4,
      ease: 'power3.inOut',
      onComplete,
    });

    gsap.to(this.camera.rotation, {
      x: route === '/' ? homePreset.camera.rotation.x : -0.025,
      y: homePreset.camera.rotation.y,
      z: homePreset.camera.rotation.z,
      duration: 1.4,
      ease: 'power3.inOut',
    });
  }

  private _animateLoop = () => {
    this._frameId = requestAnimationFrame(this._animateLoop);

    // Mouse parallax: gently shift camera X/Y — disabled when card is docked or off home
    const applyParallax = this._canApplyHomeInteraction();
    const targetCamX = this._homeCameraBasePosition.x + (applyParallax ? this._interactionOffset.x : 0);
    const targetCamY = this._homeCameraBasePosition.y + (applyParallax ? this._interactionOffset.y : 0);
    this.camera.position.x += (targetCamX - this.camera.position.x) * 0.04;
    this.camera.position.y += (targetCamY - this.camera.position.y) * 0.04;

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
    if (!this._canApplyHomeInteraction()) return;

    this._mouseNormX = (e.clientX / window.innerWidth) * 2 - 1;   // -1 (left) to +1 (right)
    this._mouseNormY = -((e.clientY / window.innerHeight) * 2 - 1); // +1 (top) to -1 (bottom)

    const targetX = this._mouseNormX * 85;
    const targetY = this._mouseNormY * 40;
    gsap.killTweensOf(this._interactionOffset);
    gsap.to(this._interactionOffset, {
      x: targetX,
      y: targetY,
      z: 0,
      duration: 0.25,
      ease: 'power3.out',
    });
    this._scheduleInteractionIdleRestore();
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

    gsap.killTweensOf(this.camera.position);
    gsap.to(this.camera.position, {
      z: this.camera.position.z - e.deltaY * 0.5,
      duration: 0.3,
      ease: 'power2.out',
    });

    if (this._wheelDebounce) clearTimeout(this._wheelDebounce);
    this._wheelDebounce = setTimeout(() => {
      const homePreset = getHomeScenePreset(this._homeSceneState);
      gsap.to(this.camera.position, {
        z: this._getHomeCameraTargetZ(depth, homePreset),
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
    this._clearInteractionIdleRestoreTimer();
    gsap.killTweensOf(this.camera.position);
    gsap.killTweensOf(this.camera.rotation);
    gsap.killTweensOf(this._interactionOffset);
    gsap.killTweensOf(this._interactionRotationOffset);
    this.webglRenderer.dispose();
    this.scene.clear();
    this._cards = [];
    this._orbitCards = [];
    this._initialized = false;
    SceneManager._instance = null;
  }
}
