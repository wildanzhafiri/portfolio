import { useUIStore } from '../app/store/ui.store';
import type { CursorVariant } from '../app/store/ui.store';

export function useCursor(variant: CursorVariant) {
  const setCursor = useUIStore((s) => s.setCursorVariant);
  return {
    onMouseEnter: () => setCursor(variant),
    onMouseLeave: () => setCursor('default'),
  };
}
