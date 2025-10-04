
import { ModeTokens, Mode } from '../types/tokens';

function toKebabCase(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

export function applyTokensToCSS(modeTokens: ModeTokens, mode: Mode) {
  const root = document.documentElement;
  
  // Clear previous styles to prevent light/dark mode bleed
  root.style.cssText = '';

  const resolveRole = (role: string): string => {
    const def = modeTokens.semanticColors[role];
    if (!def) return 'transparent'; // Fallback for undefined roles
    const scale = modeTokens.colorScales[def.scaleRef] || {};
    return scale[def.shade] || '#FF0000'; // Fallback for undefined shades
  };

  // Semantic colors
  for (const role in modeTokens.semanticColors) {
    root.style.setProperty(`--color-${toKebabCase(role)}`, resolveRole(role));
  }
  
  // Raw color scales for utility
  for (const scaleName in modeTokens.colorScales) {
    for (const shade in modeTokens.colorScales[scaleName]) {
      root.style.setProperty(`--color-${toKebabCase(scaleName)}-${shade}`, modeTokens.colorScales[scaleName][shade as any]!);
    }
  }

  // Typography
  root.style.setProperty('--font-heading', modeTokens.typography.fontFamilies.heading);
  root.style.setProperty('--font-body', modeTokens.typography.fontFamilies.body);
  if(modeTokens.typography.fontFamilies.mono) {
    root.style.setProperty('--font-mono', modeTokens.typography.fontFamilies.mono);
  }
  Object.entries(modeTokens.typography.sizes).forEach(([k, v]) => root.style.setProperty(`--size-${k}`, v));
  Object.entries(modeTokens.typography.lineHeights).forEach(([k, v]) => root.style.setProperty(`--lh-${k}`, v));
  Object.entries(modeTokens.typography.weights).forEach(([k, v]) => root.style.setProperty(`--weight-${k}`, String(v)));
  if (modeTokens.typography.letterSpacings) {
    Object.entries(modeTokens.typography.letterSpacings).forEach(([k, v]) => root.style.setProperty(`--tracking-${k}`, v));
  }
  
  // Spacing
  Object.entries(modeTokens.spacing.scale).forEach(([k, v]) => root.style.setProperty(`--space-${k}`, v));

  // Radius
  Object.entries(modeTokens.radius.scale).forEach(([k, v]) => root.style.setProperty(`--radius-${k}`, v));
  
  // Shadows
  Object.entries(modeTokens.shadows.scale).forEach(([k, v]) => root.style.setProperty(`--shadow-${k}`, v));
  
  // Z-Index
  Object.entries(modeTokens.zIndex.scale).forEach(([k, v]) => root.style.setProperty(`--z-${k}`, String(v)));

  // Borders
  if (modeTokens.borders) {
    Object.entries(modeTokens.borders.widths).forEach(([k, v]) => root.style.setProperty(`--border-width-${k}`, v));
  }
}
