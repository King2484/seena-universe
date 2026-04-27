'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticleHero() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ 
        antialias: window.devicePixelRatio < 2,
        alpha: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false
      });
    } catch (e) {
      console.warn('WebGL high-performance failed in Hero, falling back.');
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn('Hero WebGL Context Lost.');
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 200);
    camera.position.set(0, 0, 7);

    const palette: [number, number, number][] = [
      [0.831, 0.667, 0.439], // #D4AA70 warm gold
      [0.769, 0.576, 0.353], // #C4935A oak
      [0.961, 0.925, 0.843], // #F5ECD7 cream
      [0.776, 0.482, 0.302], // #C67B4D rust gold
      [0.910, 0.784, 0.596], // #E8C898 light gold
      [0.545, 0.369, 0.176], // #8B5E2D dark rust
    ];

    const COUNT = 4200;
    const geo = new THREE.BufferGeometry();
    const pos  = new Float32Array(COUNT * 3);
    const col  = new Float32Array(COUNT * 3);
    const sz   = new Float32Array(COUNT);
    const vel  = new Float32Array(COUNT * 3);
    const ph   = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const cluster = Math.floor(Math.random() * 3);
      const cx = [-3, 0, 3.5][cluster];
      const cy = [-1, 1, -0.5][cluster];
      const spread = [4, 6, 3.5][cluster];

      pos[i3]     = cx + (Math.random() - 0.5) * spread * 2;
      pos[i3 + 1] = cy + (Math.random() - 0.5) * spread;
      pos[i3 + 2] = (Math.random() - 0.5) * 5;

      const c = palette[Math.floor(Math.random() * palette.length)];
      const b = 0.4 + Math.random() * 0.6;
      col[i3]     = c[0] * b;
      col[i3 + 1] = c[1] * b;
      col[i3 + 2] = c[2] * b;

      const r = Math.random();
      sz[i] = r > 0.97 ? 4 + Math.random() * 3
             : r > 0.88 ? 1.5 + Math.random() * 1.5
             : 0.25 + Math.random() * 0.8;

      vel[i3]     = (Math.random() - 0.5) * 0.0025;
      vel[i3 + 1] = 0.001 + Math.random() * 0.003;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.001;
      ph[i] = Math.random() * Math.PI * 2;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos,  3));
    geo.setAttribute('color',    new THREE.BufferAttribute(col,  3));
    geo.setAttribute('size',     new THREE.BufferAttribute(sz,   1));
    geo.setAttribute('phase',    new THREE.BufferAttribute(ph,   1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime:       { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uMouseVel:   { value: 0 },
      },
      vertexShader: /* glsl */`
        attribute float size;
        attribute vec3  color;
        attribute float phase;
        varying vec3  vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uMouseVel;

        void main() {
          vColor = color;
          float zFade = 1.0 - abs(position.z) * 0.18;
          zFade = clamp(zFade, 0.05, 1.0);
          float twinkle = sin(uTime * (1.2 + uMouseVel * 2.0) + phase * 3.14) * 0.35 + 0.65;
          float breathe = sin(uTime * 0.4 + phase) * (0.1 + uMouseVel * 0.2) + 0.9;
          vAlpha = twinkle * zFade;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * breathe * uPixelRatio * (300.0 / -mvPos.z);
          gl_Position  = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: /* glsl */`
        varying vec3  vColor;
        varying float vAlpha;
        void main() {
          vec2  uv   = gl_PointCoord - 0.5;
          float dist = length(uv);
          if (dist > 0.5) discard;
          float core = smoothstep(0.5, 0.0, dist);
          float glow = pow(core, 2.2);
          float halo = smoothstep(0.5, 0.1, dist) * 0.3;
          float alpha = vAlpha * (glow + halo);
          vec3  rgb   = vColor + vColor * glow * 0.4;
          gl_FragColor = vec4(rgb, alpha);
        }
      `,
      transparent: true,
      depthWrite:  false,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    const nebula = new THREE.Points(geo, mat);
    scene.add(nebula);

    // Mouse velocity calculation
    let mx = 0, my = 0, cx = 0, cy = 0;
    let lastMouseX = 0, lastMouseY = 0;
    let mouseVel = 0;

    const onMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = -(e.clientY / window.innerHeight - 0.5) * 2;
      
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      const dist = Math.sqrt(dx*dx + dy*dy);
      mouseVel = Math.min(dist * 0.02, 1.0);
      
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mat.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let rafId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(mount);

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (!isVisible) return;

      const t = clock.getElapsedTime();
      
      mouseVel *= 0.95; // Decay velocity
      mat.uniforms.uTime.value = t;
      mat.uniforms.uMouseVel.value = mouseVel;

      const arr = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        const speedMult = 1.0 + mouseVel * 3.0;
        arr[i3]     += (vel[i3]     + Math.sin(t * 0.25 + ph[i]) * 0.0008) * speedMult;
        arr[i3 + 1] += vel[i3 + 1] * speedMult;
        arr[i3 + 2] += vel[i3 + 2] * speedMult;

        if (arr[i3 + 1] > 8) {
          arr[i3 + 1] = -8;
          arr[i3] = (Math.random() - 0.5) * 14;
        }
        if (arr[i3] >  9) arr[i3] = -9;
        if (arr[i3] < -9) arr[i3] =  9;
      }
      geo.attributes.position.needsUpdate = true;

      cx += (mx * 0.35 - cx) * 0.025;
      cy += (my * 0.25 - cy) * 0.025;
      camera.position.x = cx;
      camera.position.y = cy;
      camera.lookAt(0, 0, 0);

      nebula.rotation.y = t * 0.012;
      nebula.rotation.z = t * 0.006;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      geo.dispose();
      mat.dispose();
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
}
