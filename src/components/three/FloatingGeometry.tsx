import { useRef } from 'react';
import { useFrame, invalidate } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingShapeProps {
  position: [number, number, number];
  geometry: 'torus' | 'icosahedron' | 'octahedron' | 'torusKnot';
  speed?: number;
  size?: number;
}

const ALL_SHAPES: FloatingShapeProps[] = [
  { position: [-4, 1.5, -3], geometry: 'torus', speed: 0.2, size: 0.8 },
  { position: [3.5, 0.5, -2], geometry: 'icosahedron', speed: 0.25, size: 0.5 },
  { position: [-2, -0.5, -4], geometry: 'octahedron', speed: 0.35, size: 0.4 },
  { position: [5, 2, -5], geometry: 'torusKnot', speed: 0.15, size: 0.6 },
  { position: [0, 3, -6], geometry: 'torus', speed: 0.18, size: 0.35 },
];

function FloatingShape({ position, geometry, speed = 0.3, size = 0.6 }: FloatingShapeProps) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    invalidate();
    const t = clock.getElapsedTime() * speed;
    ref.current.rotation.x = t * 0.5;
    ref.current.rotation.y = t * 0.3;
    ref.current.position.y = position[1] + Math.sin(t) * 0.3;
  });

  return (
    <mesh ref={ref} position={position}>
      {geometry === 'torus' && <torusGeometry args={[size, size * 0.35, 12, 24]} />}
      {geometry === 'icosahedron' && <icosahedronGeometry args={[size, 0]} />}
      {geometry === 'octahedron' && <octahedronGeometry args={[size, 0]} />}
      {geometry === 'torusKnot' && <torusKnotGeometry args={[size * 0.7, size * 0.2, 48, 8]} />}
      <meshBasicMaterial wireframe color="#00f0ff" transparent opacity={0.12} />
    </mesh>
  );
}

interface FloatingGeometryProps {
  count?: number;
}

export function FloatingGeometry({ count = 5 }: FloatingGeometryProps) {
  const shapes = ALL_SHAPES.slice(0, count);

  return (
    <group>
      {shapes.map((props, i) => (
        <FloatingShape key={i} {...props} />
      ))}
    </group>
  );
}
