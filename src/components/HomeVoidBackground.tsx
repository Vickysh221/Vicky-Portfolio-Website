import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

type VoidPhase = {
  name: string;
  desc: string;
  geometryFactory: () => THREE.BufferGeometry;
  noise: number;
  camZ: number;
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
}

const vertexShader = `
varying vec3 vNormal;
varying vec3 vPosition;
uniform float uTime;
uniform float uExplosion;
uniform float uNoiseStrength;

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
    float n = snoise(position * 1.0 + uTime * 0.25);
    float disp = n * uNoiseStrength;
    float breathing = 1.0 + sin(uTime * 0.8) * 0.03;
    vec3 newPos = position * breathing + normal * (disp + uExplosion * 4.0);
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

void main() {
    float dist = length(vPosition);
    float intensity = 1.35 / (1.0 + dist * 0.12);
    intensity = pow(intensity, 2.0);

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

export default function HomeVoidBackground({
  phaseIndex,
  onPhaseChange,
  onBackgroundActivate,
  interactive = true,
}: HomeVoidBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const experienceRef = useRef<ExperienceState | null>(null);
  const controlledPhase = typeof phaseIndex === 'number';
  const [internalPhaseIndex, setInternalPhaseIndex] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(true);

  const phases = useMemo<VoidPhase[]>(() => [
    {
      name: 'BOSON CORE // 稳定几何',
      desc: '秩序核心：稀疏化晶格，增强通透感',
      geometryFactory: () => new THREE.IcosahedronGeometry(2.2, 40),
      noise: 0.1,
      camZ: 10,
    },
    {
      name: 'AETHER WEAVE // 以太翻绳',
      desc: '舒展意象：保留高细分星索，维持连接感',
      geometryFactory: () => new THREE.TorusKnotGeometry(3.6, 0.05, 512, 64, 3, 8),
      noise: 0.2,
      camZ: 14,
    },
    {
      name: 'CELESTIAL BEING // 灵态生命',
      desc: '有机演化：稀疏点阵，呈现轻盈脉动',
      geometryFactory: () => new THREE.IcosahedronGeometry(2.6, 50),
      noise: 0.8,
      camZ: 12,
    },
    {
      name: 'UNIVERSAL HARMONY // 万象和谐',
      desc: '聚拢平衡：低密度球体，强调颗粒美学',
      geometryFactory: () => new THREE.SphereGeometry(2.3, 80, 80),
      noise: 0.05,
      camZ: 11,
    },
    {
      name: 'GEOMETRIC PULSE // 棱角律动',
      desc: '几何发射：稀疏立方矩阵，体现大尺度结构',
      geometryFactory: () => new THREE.BoxGeometry(4.5, 4.5, 4.5, 28, 28, 28),
      noise: 0.0,
      camZ: 16,
    },
    {
      name: 'VOID COLLAPSE // 虚空坍缩',
      desc: '极度聚拢：能量坍缩形成的原始质点',
      geometryFactory: () => new THREE.TetrahedronGeometry(1.5, 32),
      noise: 0.4,
      camZ: 9,
    },
  ], []);

  const activePhaseIndex = controlledPhase ? (phaseIndex ?? 0) : internalPhaseIndex;
  const activePhase = phases[((activePhaseIndex % phases.length) + phases.length) % phases.length];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uExplosion: { value: 0 },
        uNoiseStrength: { value: phases[0].noise },
        uColor: { value: new THREE.Color(0x7d724e) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const monolith = new THREE.Points(phases[0].geometryFactory(), material);
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

    camera.position.z = 12;

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
      phaseIndex: 0,
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
      current.camera.updateProjectionMatrix();
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

      const targetZ = current.phases[current.phaseIndex].camZ;
      current.camera.position.z += (targetZ - current.camera.position.z) * 0.04;

      current.monolith.rotation.y = elapsed * 0.1 + current.mouse.x * 0.4;
      current.monolith.rotation.x = current.mouse.y * 0.2;
      current.monolith.rotation.z = elapsed * 0.03;

      current.starfield.rotation.y = elapsed * 0.005;
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
      current.material.uniforms.uNoiseStrength.value = nextPhase.noise;
      current.phaseIndex = activePhaseIndex;
      current.targetExplosion = 0;
      disposeGeometry(previousGeometry);
      current.phaseSwapTimer = null;
    }, 350);
  }, [activePhaseIndex]);

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
          display: 'flex',
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
