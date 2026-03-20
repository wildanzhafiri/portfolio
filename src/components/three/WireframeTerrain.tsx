import { useRef, useMemo } from 'react';
import { useFrame, invalidate } from '@react-three/fiber';
import * as THREE from 'three';

interface WireframeTerrainProps {
  segments?: number;
}

export function WireframeTerrain({ segments = 48 }: WireframeTerrainProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.PlaneGeometry(30, 30, segments, segments), [segments]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    invalidate();

    const posAttr = mesh.geometry.getAttribute('position');
    const time = clock.getElapsedTime() * 0.4;

    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z =
        Math.sin(x * 0.4 + time) * 0.6 +
        Math.cos(y * 0.3 + time * 0.7) * 0.5 +
        Math.sin((x + y) * 0.2 + time * 0.5) * 0.3;
      posAttr.setZ(i, z);
    }

    posAttr.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geo} rotation={[-Math.PI / 2.3, 0, 0]} position={[0, -3, -2]}>
      <meshBasicMaterial
        wireframe
        color="#00f0ff"
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}
