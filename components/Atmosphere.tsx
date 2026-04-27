'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AtmosphereProps {
  type: 'zen' | 'ink';
}

export default function Atmosphere({ type }: AtmosphereProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ 
        antialias: window.devicePixelRatio < 2, // Only antialias on low-dpi screens
        alpha: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false
      });
    } catch (e) {
      console.warn('WebGL high-performance failed, falling back to basic.');
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Handle context loss
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn('WebGL Context Lost. Atmosphere suspended.');
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 200);
    camera.position.set(0, 0, 7);

    // ─── Setup based on type ─────────────────────────────────
    const COUNT = type === 'zen' ? 150 : 250;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const sz  = new Float32Array(COUNT);
    const vel = new Float32Array(COUNT * 3);
    const ph  = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      pos[i3]     = (Math.random() - 0.5) * 15;
      pos[i3 + 1] = (Math.random() - 0.5) * 10;
      pos[i3 + 2] = (Math.random() - 0.5) * 5;

      if (type === 'zen') {
        // Soft cream/white for Seena
        col[i3]     = 0.961; // #F5ECD7
        col[i3 + 1] = 0.925;
        col[i3 + 2] = 0.843;
        sz[i] = 10 + Math.random() * 40;
        vel[i3] = (Math.random() - 0.5) * 0.002;
        vel[i3 + 1] = (Math.random() - 0.5) * 0.002;
      } else {
        // Dark charcoal/ink for The Canvas
        const b = 0.05 + Math.random() * 0.1;
        col[i3]     = b;
        col[i3 + 1] = b;
        col[i3 + 2] = b;
        sz[i] = 2 + Math.random() * 8;
        vel[i3] = (Math.random() - 0.5) * 0.005;
        vel[i3 + 1] = (Math.random() - 0.5) * 0.005;
      }
      vel[i3 + 2] = (Math.random() - 0.5) * 0.001;
      ph[i] = Math.random() * Math.PI * 2;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
    geo.setAttribute('size',     new THREE.BufferAttribute(sz,  1));
    geo.setAttribute('phase',    new THREE.BufferAttribute(ph,  1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime:       { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uType:       { value: type === 'zen' ? 0.0 : 1.0 },
        uMouse:      { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: /* glsl */`
        attribute float size;
        attribute vec3  color;
        attribute float phase;
        varying vec3  vColor;
        varying float vAlpha;
        varying vec2  vPos;
        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uType;

        void main() {
          vColor = color;
          
          float twinkle = sin(uTime * 0.5 + phase) * 0.3 + 0.7;
          float breathe = sin(uTime * 0.2 + phase) * 0.1 + 0.9;
          
          vAlpha = twinkle;
          if(uType > 0.5) { // ink
             vAlpha *= (0.3 + 0.7 * smoothstep(0.0, 1.0, sin(uTime * 1.5 + phase)));
          }

          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vPos = mvPos.xy;

          gl_PointSize = size * breathe * uPixelRatio * (200.0 / -mvPos.z);
          gl_Position  = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: /* glsl */`
        varying vec3  vColor;
        varying float vAlpha;
        varying vec2  vPos;
        uniform float uType;
        uniform vec2  uMouse;

        void main() {
          vec2  uv   = gl_PointCoord - 0.5;
          float dist = length(uv);
          if (dist > 0.5) discard;

          float alpha = vAlpha;
          
          // Spotlight effect
          float mouseDist = length(vPos - uMouse * 8.0); // scaled for view
          float spotlight = 1.0;
          
          if(uType < 0.5) { // zen: very soft
            alpha *= pow(1.0 - dist * 2.0, 3.0) * 0.2;
            spotlight = smoothstep(6.0, 0.0, mouseDist) * 0.5 + 0.5;
          } else { // ink: harder core
            alpha *= smoothstep(0.5, 0.0, dist) * 0.6;
            spotlight = smoothstep(5.0, 0.0, mouseDist) * 0.8 + 0.2;
          }

          gl_FragColor = vec4(vColor, alpha * spotlight);
        }
      `,
      transparent: true,
      depthWrite:  false,
      vertexColors: true,
      blending: type === 'zen' ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Mouse follow
    let mx = 0, my = 0, cx = 0, cy = 0;
    const onMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = -(e.clientY / window.innerHeight - 0.5) * 2;
      mat.uniforms.uMouse.value.set(mx, my);
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
      mat.uniforms.uTime.value = t;

      const arr = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        arr[i3]     += vel[i3];
        arr[i3 + 1] += vel[i3 + 1];
        arr[i3 + 2] += vel[i3 + 2];

        // Wrap
        if (Math.abs(arr[i3])) arr[i3] *= 0.999; // slight drift center
        if (arr[i3 + 1] > 10) arr[i3 + 1] = -10;
        if (arr[i3 + 1] < -10) arr[i3 + 1] = 10;
        if (arr[i3] > 15) arr[i3] = -15;
        if (arr[i3] < -15) arr[i3] = 15;
      }
      geo.attributes.position.needsUpdate = true;

      cx += (mx * 0.2 - cx) * 0.05;
      cy += (my * 0.2 - cy) * 0.05;
      camera.position.x = cx;
      camera.position.y = cy;
      camera.lookAt(0, 0, 0);

      points.rotation.y = t * 0.02;
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
  }, [type]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
