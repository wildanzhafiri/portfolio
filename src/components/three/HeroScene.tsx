import { Canvas } from '@react-three/fiber';
import { WireframeTerrain } from './WireframeTerrain';
import { FloatingGeometry } from './FloatingGeometry';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';

interface HeroSceneProps {
  mouseX?: number;
  mouseY?: number;
}

function Scene({ mouseX = 0, mouseY = 0 }: HeroSceneProps & { segments: number; shapeCount: number; enableParallax: boolean }) {
  return (
    <>
      <group
        rotation={[mouseY * 0.05, mouseX * 0.08, 0]}
      >
        <WireframeTerrain segments={48} />
        <FloatingGeometry count={5} />
      </group>
    </>
  );
}

function SceneMid() {
  return (
    <>
      <group>
        <WireframeTerrain segments={24} />
        <FloatingGeometry count={2} />
      </group>
    </>
  );
}

export default function HeroScene({ mouseX, mouseY }: HeroSceneProps) {
  const { tier, enableParallax } = useDeviceCapability();

  return (
    <Canvas
      camera={{ position: [0, 1, 8], fov: 45 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      dpr={tier === 'mid' ? [1, 1] : [1, 1.5]}
      frameloop={tier === 'mid' ? 'demand' : 'always'}
    >
      {tier === 'high' ? (
        <Scene
          mouseX={enableParallax ? mouseX : 0}
          mouseY={enableParallax ? mouseY : 0}
          segments={48}
          shapeCount={5}
          enableParallax={enableParallax}
        />
      ) : (
        <SceneMid />
      )}
    </Canvas>
  );
}
