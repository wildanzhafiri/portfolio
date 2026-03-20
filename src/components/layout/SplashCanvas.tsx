import { Canvas } from '@react-three/fiber';
import { SplashScene } from '../three/SplashScene';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';

interface SplashCanvasProps {
  phase: 'forming' | 'hold' | 'explode' | 'done';
  progress: number;
}

export default function SplashCanvas({ phase, progress }: SplashCanvasProps) {
  const { particleCount, tier } = useDeviceCapability();

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      dpr={tier === 'mid' ? [1, 1] : [1, 1.5]}
      frameloop={tier === 'mid' ? 'demand' : 'always'}
    >
      <SplashScene phase={phase} progress={progress} particleCount={particleCount} />
    </Canvas>
  );
}
