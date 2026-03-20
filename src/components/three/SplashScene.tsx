import { useRef, useMemo } from 'react';
import { useFrame, invalidate } from '@react-three/fiber';
import * as THREE from 'three';

interface SplashSceneProps {
  phase: 'forming' | 'hold' | 'explode' | 'done';
  progress: number;
  particleCount?: number;
}

export function SplashScene({ phase, progress, particleCount = 600 }: SplashSceneProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { targetPositions, scatteredPositions, velocities } = useMemo(() => {
    const detail = particleCount > 400 ? 4 : 2;
    const geo = new THREE.IcosahedronGeometry(2.2, detail);
    const posAttr = geo.getAttribute('position');
    const targets: THREE.Vector3[] = [];
    const scattered: THREE.Vector3[] = [];
    const vels: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      const idx = i % posAttr.count;
      targets.push(
        new THREE.Vector3(
          posAttr.getX(idx) + (Math.random() - 0.5) * 0.15,
          posAttr.getY(idx) + (Math.random() - 0.5) * 0.15,
          posAttr.getZ(idx) + (Math.random() - 0.5) * 0.15
        )
      );

      scattered.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        )
      );

      const dir = targets[i].clone().normalize();
      vels.push(
        dir
          .multiplyScalar(4 + Math.random() * 6)
          .add(
            new THREE.Vector3(
              (Math.random() - 0.5) * 4,
              (Math.random() - 0.5) * 4,
              (Math.random() - 0.5) * 4
            )
          )
      );
    }

    geo.dispose();
    return { targetPositions: targets, scatteredPositions: scattered, velocities: vels };
  }, [particleCount]);

  useFrame(() => {
    const mesh = meshRef.current;
    const group = groupRef.current;
    if (!mesh || !group) return;

    invalidate();

    if (phase === 'forming' || phase === 'hold') {
      group.rotation.y += 0.003;
      group.rotation.x += 0.001;
    }

    if (phase === 'hold') {
      group.scale.setScalar(1 + progress * 0.12);
    } else if (phase === 'explode') {
      group.scale.setScalar(1.12 - progress * 0.12);
    } else {
      group.scale.setScalar(1);
    }

    for (let i = 0; i < particleCount; i++) {
      const scattered = scatteredPositions[i];
      const target = targetPositions[i];
      const vel = velocities[i];

      let x: number, y: number, z: number;
      let scale = 1;

      if (phase === 'forming') {
        const t = progress * progress * (3 - 2 * progress);
        x = scattered.x + (target.x - scattered.x) * t;
        y = scattered.y + (target.y - scattered.y) * t;
        z = scattered.z + (target.z - scattered.z) * t;
        scale = 0.3 + t * 0.7;
      } else if (phase === 'hold') {
        x = target.x;
        y = target.y;
        z = target.z;
        scale = 1 + Math.sin(progress * Math.PI * 3) * 0.08;
      } else if (phase === 'explode') {
        const t = progress;
        const eased = t * t;
        x = target.x + vel.x * eased;
        y = target.y + vel.y * eased;
        z = target.z + vel.z * eased;
        scale = Math.max(0, 1 - t * 1.8);
      } else {
        x = 0; y = 0; z = 0; scale = 0;
      }

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(scale * 0.028);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
        <sphereGeometry args={[1, particleCount > 400 ? 6 : 4, particleCount > 400 ? 6 : 4]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.9} />
      </instancedMesh>
    </group>
  );
}
