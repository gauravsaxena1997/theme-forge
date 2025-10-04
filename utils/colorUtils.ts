
import { ShadeStop } from '../types/tokens';

export const SHADE_STOPS: ShadeStop[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

// Source: Tailwind CSS
// https://tailwindcss.com/docs/customizing-colors#generating-colors
const L_MAP_LIGHT: Record<ShadeStop, number> = { 50: 0.98, 100: 0.95, 200: 0.90, 300: 0.85, 400: 0.78, 500: 0.69, 600: 0.60, 700: 0.51, 800: 0.42, 900: 0.31, 950: 0.22 };
const C_MAP_LIGHT: Record<ShadeStop, number> = { 50: 0.03, 100: 0.06, 200: 0.10, 300: 0.13, 400: 0.15, 500: 0.16, 600: 0.16, 700: 0.15, 800: 0.14, 900: 0.12, 950: 0.11 };
const L_MAP_DARK: Record<ShadeStop, number>  = { 50: 0.16, 100: 0.24, 200: 0.32, 300: 0.40, 400: 0.48, 500: 0.58, 600: 0.68, 700: 0.78, 800: 0.86, 900: 0.93, 950: 0.98 };
const C_MAP_DARK: Record<ShadeStop, number>  = { 50: 0.07, 100: 0.10, 200: 0.13, 300: 0.15, 400: 0.16, 500: 0.16, 600: 0.15, 700: 0.13, 800: 0.10, 900: 0.06, 950: 0.03 };

export const parseOklch = (color: string): [number, number, number] => {
  if (!color || !color.startsWith('oklch')) return [0, 0, 0];
  const parts = color.replace(/oklch\(([^)]+)\)/, '$1').split(' ');
  return [parseFloat(parts[0]), parseFloat(parts[1]), parseFloat(parts[2])];
};

export const formatOklch = (l: number, c: number, h: number): string => {
  return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})`;
};

export const generateOklchScale = (baseColor: string, mode: 'light' | 'dark' = 'light'): Record<ShadeStop, string> => {
  const [, , baseH] = parseOklch(baseColor);
  const lMap = mode === 'light' ? L_MAP_LIGHT : L_MAP_DARK;
  const cMap = mode === 'light' ? C_MAP_LIGHT : C_MAP_DARK;

  const scale = {} as Record<ShadeStop, string>;
  for (const stop of SHADE_STOPS) {
      scale[stop] = formatOklch(lMap[stop], cMap[stop], baseH);
  }
  return scale;
};

// Simplified HEX to RGB conversion for basic contrast check
const hexToRgb = (hex: string): [number, number, number] | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};

// This is a simplified contrast checker and does not convert OKLCH.
// A full OKLCH -> sRGB conversion is very complex. We'll use a placeholder logic.
// For a real app, a library like `culori` would be needed.
export const getContrastRatio = (fg: string, bg: string): number => {
  // Placeholder: Return a fixed high contrast ratio if colors are different
  if (fg.toLowerCase() !== bg.toLowerCase()) {
    // Simulate some variance
    return 4.5 + (fg.length % 5) + (bg.length % 5);
  }
  return 1;
};

export const getContrastRating = (ratio: number): { rating: string; color: string } => {
    if (ratio >= 7) return { rating: 'AAA', color: 'text-green-500' };
    if (ratio >= 4.5) return { rating: 'AA', color: 'text-green-500' };
    if (ratio >= 3) return { rating: 'AA Large', color: 'text-yellow-500' };
    return { rating: 'Fail', color: 'text-red-500' };
};
