import { useMemo } from 'react';

export type DeviceTier = 'high' | 'mid' | 'low';

export interface DeviceCapability {
  tier: DeviceTier;
  isLowEnd: boolean;
  isIOS: boolean;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  supportsWebGL: boolean;
  enable3D: boolean;
  enableParallax: boolean;
  particleCount: number;
  terrainSegments: number;
  floatingShapeCount: number;
}

function detectCapability(): DeviceCapability {
  const cores = navigator.hardwareConcurrency || 2;
  const isLowEnd = cores <= 2;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isOldiOS = /iPhone OS (1[0-4])_/i.test(navigator.userAgent);

  let supportsWebGL = false;
  try {
    const canvas = document.createElement('canvas');
    supportsWebGL = !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    supportsWebGL = false;
  }

  let tier: DeviceTier;
  if (prefersReducedMotion || isLowEnd || isOldiOS || !supportsWebGL) {
    tier = 'low';
  } else if (isMobile) {
    tier = 'mid';
  } else {
    tier = 'high';
  }

  const enable3D = tier !== 'low';
  const enableParallax = tier === 'high';

  return {
    tier,
    isLowEnd,
    isIOS,
    isMobile,
    prefersReducedMotion,
    supportsWebGL,
    enable3D,
    enableParallax,
    particleCount: tier === 'high' ? 600 : tier === 'mid' ? 250 : 0,
    terrainSegments: tier === 'high' ? 48 : 24,
    floatingShapeCount: tier === 'high' ? 5 : 2,
  };
}

export function useDeviceCapability(): DeviceCapability {
  return useMemo(() => detectCapability(), []);
}
