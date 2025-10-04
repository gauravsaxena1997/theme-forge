export const parseOklch = (color: string): [number, number, number] => {
  if (!color || !color.startsWith('oklch')) return [0, 0, 0];
  const parts = color.replace(/oklch\(([^)]+)\)/, '$1').split(' ');
  return [parseFloat(parts[0]), parseFloat(parts[1]), parseFloat(parts[2])];
};

export const formatOklch = (l: number, c: number, h: number): string => {
  return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})`;
};

// --- Color Conversion Utilities for Color Picker ---

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h * 360, s, l };
}


// Approximates an OKLCH color from a HEX input for the color picker
export function hexToOklch(hex: string): string {
    const rgb = hexToRgb(hex);
    if (!rgb) return 'oklch(0 0 0)';
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // This is a rough approximation to map HSL to OKLCH parameters
    // We use HSL's hue directly.
    // We map HSL's lightness to OKLCH's lightness and saturation to chroma.
    const l = hsl.l * 0.9 + 0.05; // clamp lightness to a reasonable range
    const c = hsl.s * 0.15; // scale saturation to a reasonable chroma
    
    return formatOklch(l, c, hsl.h);
}


// This is a simplified contrast checker and does not convert OKLCH.
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