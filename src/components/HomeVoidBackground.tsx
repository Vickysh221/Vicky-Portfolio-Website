import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

type VoidPhase = {
  name: string;
  desc: string;
  geometryFactory: () => THREE.BufferGeometry;
  noise: number;
  isGeometric: number;
  camZ: number;
  rotationSpeed: number;
  fragmentIntensityPower: number;
};

type ExperienceState = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  clock: THREE.Clock;
  mouse: THREE.Vector2;
  targetMouse: THREE.Vector2;
  material: THREE.ShaderMaterial;
  monolith: THREE.Points;
  starfield: THREE.Points;
  phases: VoidPhase[];
  phaseIndex: number;
  explosion: number;
  targetExplosion: number;
  phaseSwapTimer: number | null;
  frameId: number | null;
};

export interface HomeVoidBackgroundProps {
  phaseIndex?: number;
  onPhaseChange?: (nextPhaseIndex: number) => void;
  onBackgroundActivate?: (nextPhaseIndex: number) => void;
  interactive?: boolean;
  chromeVisible?: boolean;
  visualState?: {
    cameraZOffset?: number;
    noiseMultiplier?: number;
    starOpacity?: number;
    rotationScale?: number;
  };
}

const DEFAULT_PHASE_INDEX = 1;
const PHASE_AXIS_NDC_X = -0.5;

const vertexShader = `
varying vec3 vNormal;
varying vec3 vPosition;
uniform float uTime;
uniform float uExplosion;
uniform float uNoiseStrength;
uniform float uIsGeometric;

mat2 rotate2D(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0 / 7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

void main() {
    vNormal = normal;
    vec3 basePos = position;
    float n = snoise(basePos * 1.0 + uTime * 0.25);
    float disp = n * uNoiseStrength;
    float breathing = 1.0 + sin(uTime * 0.8) * 0.03;
    vec3 newPos = basePos * breathing + normal * (disp + uExplosion * 4.0);

    if (uIsGeometric > 0.5) {
        vec3 pos = basePos;
        float t = uTime * 0.4;
        float cycle = mod(t, 4.0);

        vec3 cube = pos * (1.2 / max(abs(pos.x), max(abs(pos.y), abs(pos.z))));
        vec3 octa = pos * (1.2 / (abs(pos.x) + abs(pos.y) + abs(pos.z) + 0.0001));
        vec3 star = mix(cube, octa, 0.5) * (1.0 + 0.8 * abs(sin(t * 2.0)));

        if (cycle < 1.0) {
            pos = mix(cube, star, smoothstep(0.0, 1.0, cycle));
        } else if (cycle < 2.0) {
            pos = mix(star, octa, smoothstep(1.0, 2.0, cycle));
        } else if (cycle < 3.0) {
            pos = mix(octa, cube, smoothstep(2.0, 3.0, cycle));
        } else {
            pos = cube;
        }

        float distFromCenter = length(pos);
        pos.xy *= rotate2D(distFromCenter * 0.5 * sin(uTime * 0.5));
        pos.xz *= rotate2D(distFromCenter * 0.3 * cos(uTime * 0.7));

        pos *= 2.5 + 0.5 * sin(uTime * 1.5);
        newPos = pos + normal * (disp * 0.6 + uExplosion * 4.0);
        n = snoise(newPos * 0.24 + uTime * 0.3);
    }

    vPosition = newPos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    gl_PointSize = (3.5 + n * 1.5) * (1.0 + uExplosion * 0.8);
}
`;

const fragmentShader = `
varying vec3 vNormal;
varying vec3 vPosition;
uniform float uTime;
uniform vec3 uColor;
uniform float uIntensityPower;

void main() {
    float dist = length(vPosition);
    float intensity = 1.35 / (1.0 + dist * 0.12);
    intensity = pow(intensity, uIntensityPower);

    vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), viewDir)), 3.0);
    vec3 col = mix(uColor, vec3(1.0), fresnel * 0.5);

    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = dot(cxy, cxy);
    if (r > 1.0) discard;
    float alpha = 1.0 - smoothstep(0.7, 1.0, r);

    float scan = smoothstep(0.98, 1.0, sin(vPosition.y * 25.0 - uTime * 3.5));
    col += scan * 0.1;

    gl_FragColor = vec4(col * intensity, alpha * intensity);
}
`;

function disposeGeometry(geometry: THREE.BufferGeometry) {
  geometry.dispose();
}

function applyProjectionOffset(camera: THREE.PerspectiveCamera) {
  camera.updateProjectionMatrix();
  camera.projectionMatrix.elements[8] = PHASE_AXIS_NDC_X;
  camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
}

export default function HomeVoidBackground({
  phaseIndex,
  onPhaseChange,
  onBackgroundActivate,
  interactive = true,
  chromeVisible = true,
  visualState,
}: HomeVoidBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const experienceRef = useRef<ExperienceState | null>(null);
  const visualTargetsRef = useRef({
    cameraZOffset: 0,
    noiseMultiplier: 1,
    starOpacity: 0.12,
    rotationScale: 1,
  });
  const controlledPhase = typeof phaseIndex === 'number';
  const [internalPhaseIndex, setInternalPhaseIndex] = useState(DEFAULT_PHASE_INDEX);
  const [overlayVisible, setOverlayVisible] = useState(true);

  const phases = useMemo<VoidPhase[]>(() => [
    {
      name: 'BOSON CORE // 稳定几何',
      desc: '秩序核心：稀疏化晶格，增强通透感',
      geometryFactory: () => new THREE.IcosahedronGeometry(2.2, 40),
      noise: 0.1,
      isGeometric: 0.0,
      camZ: 10,
      rotationSpeed: 0.1,
      fragmentIntensityPower: 2.0,
    },
    {
      name: 'AETHER WEAVE // 以太翻绳',
      desc: '舒展意象：保留高细分星索，维持连接感',
      geometryFactory: () => new THREE.TorusKnotGeometry(3.6, 0.05, 512, 64, 3, 8),
      noise: 0.2,
      isGeometric: 0.0,
      camZ: 14,
      rotationSpeed: 0.1,
      fragmentIntensityPower: 2.0,
    },
    {
      name: 'CELESTIAL BEING // 灵态生命',
      desc: '有机演化：稀疏点阵，呈现轻盈脉动',
      geometryFactory: () => new THREE.IcosahedronGeometry(2.6, 50),
      noise: 0.8,
      isGeometric: 0.0,
      camZ: 12,
      rotationSpeed: 0.1,
      fragmentIntensityPower: 2.0,
    },
    {
      name: 'UNIVERSAL HARMONY // 万象和谐',
      desc: '聚拢平衡：低密度球体，强调颗粒美学',
      geometryFactory: () => new THREE.SphereGeometry(2.3, 80, 80),
      noise: 0.05,
      isGeometric: 0.0,
      camZ: 11,
      rotationSpeed: 0.1,
      fragmentIntensityPower: 2.0,
    },
    {
      name: 'MORPHIC PULSE // 几何发射',
      desc: '幅度进化：在超维立方与星体间剧烈重构',
      geometryFactory: () => new THREE.SphereGeometry(2.0, 50, 50),
      noise: 0.0,
      isGeometric: 1.0,
      camZ: 18,
      rotationSpeed: 0.4,
      fragmentIntensityPower: 2.2,
    },
    {
      name: 'VOID COLLAPSE // 虚空坍缩',
      desc: '极度聚拢：能量坍缩形成的原始质点',
      geometryFactory: () => new THREE.TetrahedronGeometry(1.5, 32),
      noise: 0.4,
      isGeometric: 0.0,
      camZ: 9,
      rotationSpeed: 0.1,
      fragmentIntensityPower: 2.0,
    },
  ], []);

  const activePhaseIndex = controlledPhase ? (phaseIndex ?? DEFAULT_PHASE_INDEX) : internalPhaseIndex;
  const activePhase = phases[((activePhaseIndex % phases.length) + phases.length) % phases.length];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    applyProjectionOffset(camera);

    const initialPhase = phases[DEFAULT_PHASE_INDEX];

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uExplosion: { value: 0 },
        uNoiseStrength: { value: initialPhase.noise },
        uColor: { value: new THREE.Color(0x7d724e) },
        uIsGeometric: { value: initialPhase.isGeometric },
        uIntensityPower: { value: initialPhase.fragmentIntensityPower },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const monolith = new THREE.Points(initialPhase.geometryFactory(), material);
    scene.add(monolith);

    const starGeo = new THREE.BufferGeometry();
    const starCount = 3000;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 1) {
      positions[i] = (Math.random() - 0.5) * 100;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const starfield = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({
        size: 0.015,
        color: 0x7d724e,
        transparent: true,
        opacity: 0.12,
      }),
    );
    scene.add(starfield);

    camera.position.z = initialPhase.camZ;

    const experience: ExperienceState = {
      scene,
      camera,
      renderer,
      clock: new THREE.Clock(),
      mouse: new THREE.Vector2(),
      targetMouse: new THREE.Vector2(),
      material,
      monolith,
      starfield,
      phases,
      phaseIndex: DEFAULT_PHASE_INDEX,
      explosion: 0,
      targetExplosion: 0,
      phaseSwapTimer: null,
      frameId: null,
    };
    experienceRef.current = experience;

    const handleResize = () => {
      const current = experienceRef.current;
      if (!current) return;
      current.camera.aspect = window.innerWidth / window.innerHeight;
      applyProjectionOffset(current.camera);
      current.renderer.setSize(window.innerWidth, window.innerHeight);
      current.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const handleMouseMove = (event: MouseEvent) => {
      const current = experienceRef.current;
      if (!current) return;
      current.targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      current.targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const animate = () => {
      const current = experienceRef.current;
      if (!current) return;

      const elapsed = current.clock.getElapsedTime();
      current.mouse.x += (current.targetMouse.x - current.mouse.x) * 0.035;
      current.mouse.y += (current.targetMouse.y - current.mouse.y) * 0.035;

      current.material.uniforms.uTime.value = elapsed;
      current.explosion += (current.targetExplosion - current.explosion) * 0.1;
      current.material.uniforms.uExplosion.value = current.explosion;

      const targetZ = current.phases[current.phaseIndex].camZ + visualTargetsRef.current.cameraZOffset;
      current.camera.position.z += (targetZ - current.camera.position.z) * 0.04;

      const phase = current.phases[current.phaseIndex];
      current.monolith.rotation.y = elapsed * phase.rotationSpeed * visualTargetsRef.current.rotationScale + current.mouse.x * 0.4;
      current.monolith.rotation.x = current.mouse.y * 0.2;
      current.monolith.rotation.z = elapsed * phase.rotationSpeed * 0.25 * visualTargetsRef.current.rotationScale;

      current.starfield.rotation.y = elapsed * 0.005;
      const starMaterial = current.starfield.material;
      if (!Array.isArray(starMaterial)) {
        starMaterial.opacity += (visualTargetsRef.current.starOpacity - starMaterial.opacity) * 0.06;
      }
      current.camera.position.x += (current.mouse.x * 2.5 - current.camera.position.x) * 0.04;
      current.camera.position.y += (current.mouse.y * 2.5 - current.camera.position.y) * 0.04;
      current.camera.lookAt(0, 0, 0);

      current.renderer.render(current.scene, current.camera);
      current.frameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    const overlayTimer = window.setTimeout(() => {
      setOverlayVisible(false);
    }, 1500);

    return () => {
      window.clearTimeout(overlayTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);

      const current = experienceRef.current;
      if (current) {
        if (current.frameId !== null) {
          window.cancelAnimationFrame(current.frameId);
        }
        if (current.phaseSwapTimer !== null) {
          window.clearTimeout(current.phaseSwapTimer);
        }
        disposeGeometry(current.monolith.geometry);
        disposeGeometry(current.starfield.geometry);
        const starMaterial = current.starfield.material;
        if (Array.isArray(starMaterial)) {
          starMaterial.forEach((item) => item.dispose());
        } else {
          starMaterial.dispose();
        }
        current.material.dispose();
        current.renderer.dispose();
      }
      experienceRef.current = null;
    };
  }, [phases]);

  useEffect(() => {
    const current = experienceRef.current;
    if (!current) return;
    if (current.phaseIndex === activePhaseIndex) return;

    current.targetExplosion = 1.8;
    if (current.phaseSwapTimer !== null) {
      window.clearTimeout(current.phaseSwapTimer);
    }

    current.phaseSwapTimer = window.setTimeout(() => {
      const nextPhase = current.phases[activePhaseIndex];
      const previousGeometry = current.monolith.geometry;
      current.monolith.geometry = nextPhase.geometryFactory();
      current.material.uniforms.uNoiseStrength.value = nextPhase.noise * visualTargetsRef.current.noiseMultiplier;
      current.material.uniforms.uIsGeometric.value = nextPhase.isGeometric;
      current.material.uniforms.uIntensityPower.value = nextPhase.fragmentIntensityPower;
      current.phaseIndex = activePhaseIndex;
      current.targetExplosion = 0;
      disposeGeometry(previousGeometry);
      current.phaseSwapTimer = null;
    }, 350);
  }, [activePhaseIndex]);

  useEffect(() => {
    visualTargetsRef.current = {
      cameraZOffset: visualState?.cameraZOffset ?? 0,
      noiseMultiplier: visualState?.noiseMultiplier ?? 1,
      starOpacity: visualState?.starOpacity ?? 0.12,
      rotationScale: visualState?.rotationScale ?? 1,
    };

    const current = experienceRef.current;
    if (!current) return;
    const phase = current.phases[current.phaseIndex];
    current.material.uniforms.uNoiseStrength.value = phase.noise * visualTargetsRef.current.noiseMultiplier;
    current.material.uniforms.uIsGeometric.value = phase.isGeometric;
    current.material.uniforms.uIntensityPower.value = phase.fragmentIntensityPower;
  }, [
    visualState?.cameraZOffset,
    visualState?.noiseMultiplier,
    visualState?.rotationScale,
    visualState?.starOpacity,
  ]);

  const cyclePhase = () => {
    if (!interactive) return;
    const nextIndex = (activePhaseIndex + 1) % phases.length;
    if (!controlledPhase) {
      setInternalPhaseIndex(nextIndex);
    }
    onPhaseChange?.(nextIndex);
    onBackgroundActivate?.(nextIndex);
  };

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        background: '#020202',
      }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={cyclePhase}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'block',
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: interactive ? 'auto' : 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          display: chromeVisible ? 'flex' : 'none',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '50px',
          boxSizing: 'border-box',
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            opacity: 0.45,
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: '13px',
                letterSpacing: '0.6em',
                textTransform: 'uppercase',
                fontWeight: 300,
                color: '#ffffff',
              }}
            >
              VOID MONOLITH
            </h1>
            <p
              style={{
                margin: '10px 0 0',
                fontSize: '9px',
                letterSpacing: '0.4em',
                color: '#7d724e',
              }}
            >
              STRING FIGURES // HARMONY // BEINGS
            </p>
          </div>

          <div
            style={{
              fontSize: '10px',
              textAlign: 'right',
              letterSpacing: '0.25em',
              color: '#7d724e',
              lineHeight: 1.8,
            }}
          >
            {`PHASE: ${activePhase.name}`}
            <br />
            {`STATUS: ${activePhase.desc}`}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '10px',
              letterSpacing: '0.7em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)',
              animation: 'voidBackgroundBreathe 6s ease-in-out infinite',
            }}
          >
            点击核心 以观测维度的超经验演化
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: '#000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
          letterSpacing: '1.2em',
          fontSize: '11px',
          color: '#7d724e',
          opacity: overlayVisible ? 1 : 0,
          transition: 'opacity 3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        TRANSCENDING VOID
      </div>
    </div>
  );
}
