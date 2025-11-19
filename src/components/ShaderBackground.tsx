"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NoisePlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const start = useMemo(() => Date.now(), []);

  useFrame(() => {
    const t = (Date.now() - start) / 1000;
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = t;
    }
  });

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(1, 1) },
      u_opacity: { value: 0.18 }, // keep subtle for readability
      u_colorA: { value: new THREE.Color(0x6ee7f9) }, // cyan
      u_colorB: { value: new THREE.Color(0xa78bfa) }, // purple
    }),
    []
  );

  const vertexShader = /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // Simple animated FBM noise with iridescent gradient
  const fragmentShader = /* glsl */ `
    precision highp float;
    varying vec2 vUv;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform float u_opacity;
    uniform vec3 u_colorA;
    uniform vec3 u_colorB;

    // hash & noise helpers
    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
    float noise(in vec2 p){
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p *= 2.0;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = vUv;
      // center & scale
      vec2 p = uv * 3.0;
      p.x += u_time * 0.03;
      p.y += sin(u_time * 0.2) * 0.05;

      float n = fbm(p + fbm(p + u_time * 0.05));
      float shimmer = 0.5 + 0.5 * sin(6.28318 * (uv.x + u_time * 0.05) + n * 2.0);

      vec3 base = mix(u_colorA, u_colorB, uv.y);
      vec3 col = mix(base, vec3(1.0), n * 0.15) + shimmer * 0.05;

      gl_FragColor = vec4(col, u_opacity);
    }
  `;

  return (
    <mesh scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export function ShaderBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0, // keep behind content (content should have higher z)
        pointerEvents: "none",
      }}
    >
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 1], fov: 50 }}
        style={{ width: "100%", height: "100%", opacity: 0.85 }}
      >
        {/* A subtle color space and fog can help keep contrast gentle */}
        <color attach="background" args={["transparent"]} />
        <NoisePlane />
      </Canvas>
    </div>
  );
}
