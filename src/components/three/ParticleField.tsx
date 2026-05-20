"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type PetalDatum = {
  x: number;
  y: number;
  z: number;
  speed: number;
  drift: number;
  rot: number;
  rotSpeed: number;
  scale: number;
};

function makePetals(count: number): PetalDatum[] {
  return Array.from({ length: count }).map(() => ({
    x: (Math.random() - 0.5) * 10,
    y: (Math.random() - 0.5) * 6,
    z: (Math.random() - 0.5) * 4,
    speed: 0.05 + Math.random() * 0.15,
    drift: 0.4 + Math.random() * 0.6,
    rot: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.6,
    scale: 0.06 + Math.random() * 0.12,
  }));
}

function Petals({ count = 60 }: { count?: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const [dummy] = useState(() => new THREE.Object3D());
  const [data] = useState<PetalDatum[]>(() => makePetals(count));

  useFrame((_, dt) => {
    const m = ref.current;
    if (!m) return;
    const t = performance.now() * 0.001;
    data.forEach((p, i) => {
      p.y -= p.speed * dt;
      p.x += Math.sin(t * p.drift + i) * 0.004;
      p.rot += p.rotSpeed * dt;
      if (p.y < -4) {
        p.y = 4 + Math.random() * 2;
        p.x = (Math.random() - 0.5) * 10;
      }
      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rot * 0.4, p.rot, p.rot * 0.6);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  // small petal geometry — built once
  const [geo] = useState(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.3, 0.2, 0.45, 0.8, 0, 1.2);
    shape.bezierCurveTo(-0.45, 0.8, -0.3, 0.2, 0, 0);
    const g = new THREE.ShapeGeometry(shape, 12);
    g.center();
    return g;
  });

  return (
    <instancedMesh ref={ref} args={[geo, undefined, count]}>
      <meshBasicMaterial
        color={"#FFB3C1"}
        transparent
        opacity={0.55}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Petals count={50} />
      </Canvas>
    </div>
  );
}
