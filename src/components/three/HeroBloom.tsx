"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ─── Petal geometry ─────────────────────────────────────────────────── */
function buildPetalGeometry() {
  // Curved teardrop petal via 2D shape + extrude with bevel
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.4, 0.3, 0.55, 1.0, 0, 1.6);
  shape.bezierCurveTo(-0.55, 1.0, -0.4, 0.3, 0, 0);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.08,
    bevelEnabled: true,
    bevelSegments: 4,
    bevelSize: 0.06,
    bevelThickness: 0.08,
    curveSegments: 24,
  });
  geo.center();
  // Gentle bend
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const z = pos.getZ(i);
    pos.setZ(i, z + Math.sin(y * 1.5) * 0.18);
  }
  geo.computeVertexNormals();
  return geo;
}

function Petal({
  index,
  count,
  hoverRef,
}: {
  index: number;
  count: number;
  hoverRef: React.RefObject<{ x: number; y: number }>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const angle = (index / count) * Math.PI * 2;
  const geometry = useMemo(() => buildPetalGeometry(), []);

  useFrame((_, dt) => {
    const m = ref.current;
    if (!m) return;
    // Subtle individual breathing
    const t = performance.now() * 0.001;
    const breathe = Math.sin(t * 0.8 + index) * 0.04;
    m.scale.setScalar(1 + breathe);
    // Soft tilt from mouse
    const tx = hoverRef.current.y * 0.25;
    const ty = hoverRef.current.x * 0.25;
    m.rotation.x += (tx - m.rotation.x) * Math.min(1, dt * 2);
    // base rotation persists; we only nudge:
    const targetZ = angle + ty * 0.1;
    m.rotation.z += (targetZ - m.rotation.z) * Math.min(1, dt * 2);
  });

  return (
    <mesh
      ref={ref}
      geometry={geometry}
      position={[Math.cos(angle) * 0.35, Math.sin(angle) * 0.35, 0]}
      rotation={[0, 0, angle]}
    >
      <meshPhysicalMaterial
        color={"#FFD4D8"}
        roughness={0.4}
        metalness={0.05}
        clearcoat={0.85}
        clearcoatRoughness={0.2}
        transmission={0.18}
        thickness={0.4}
        sheen={1}
        sheenColor={"#FF8FAB"}
        sheenRoughness={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Center() {
  return (
    <mesh position={[0, 0, 0.12]}>
      <sphereGeometry args={[0.32, 48, 48]} />
      <meshPhysicalMaterial
        color={"#E8456B"}
        roughness={0.25}
        clearcoat={1}
        clearcoatRoughness={0.15}
        emissive={"#FF8FAB"}
        emissiveIntensity={0.18}
      />
    </mesh>
  );
}

function Bloom({ hoverRef }: { hoverRef: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (group.current) {
      group.current.rotation.y += dt * 0.18; // slow auto-rotate
      group.current.rotation.x = hoverRef.current.y * 0.2;
      group.current.rotation.z = hoverRef.current.x * 0.08;
    }
  });

  const count = 6;
  return (
    <group ref={group}>
      {Array.from({ length: count }).map((_, i) => (
        <Petal key={i} index={i} count={count} hoverRef={hoverRef} />
      ))}
      <Center />
    </group>
  );
}

function MouseTracker({ hoverRef }: { hoverRef: React.RefObject<{ x: number; y: number }> }) {
  useFrame(({ pointer }) => {
    hoverRef.current.x += (pointer.x - hoverRef.current.x) * 0.08;
    hoverRef.current.y += (pointer.y - hoverRef.current.y) * 0.08;
  });
  return null;
}

export default function HeroBloom() {
  const hoverRef = useRef({ x: 0, y: 0 });

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 4, 5]} intensity={1.4} color={"#FFE8E5"} />
          <directionalLight position={[-3, -2, 2]} intensity={0.6} color={"#B7DBFF"} />
          <pointLight position={[0, 0, 2]} intensity={0.4} color={"#FF8FAB"} />
          <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.4}>
            <Bloom hoverRef={hoverRef} />
          </Float>
          <MouseTracker hoverRef={hoverRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
