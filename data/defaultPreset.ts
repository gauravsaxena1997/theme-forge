import { ThemeTokens } from '../types/tokens';

export const defaultPreset: ThemeTokens = {
  meta: {
    name: "ThemeForge Default",
    version: "1.0.0",
    createdAt: new Date().toISOString(),
  },
  light: {
    semanticColors: {
      background: 'oklch(0.99 0.01 260)',
      foreground: 'oklch(0.22 0.01 260)',
      card: 'oklch(0.99 0.01 260)',
      cardForeground: 'oklch(0.22 0.01 260)',
      primary: 'oklch(0.62 0.15 254)',
      primaryForeground: 'oklch(0.98 0.01 260)',
      accent: 'oklch(0.78 0.15 254)',
      accentForeground: 'oklch(0.22 0.01 260)',
      muted: 'oklch(0.95 0.01 260)',
      mutedForeground: 'oklch(0.51 0.01 260)',
      border: 'oklch(0.90 0.01 260)',
      warning: 'oklch(0.7 0.15 80)',
      danger: 'oklch(0.6 0.18 25)',
    },
    typography: {
      fontFamilies: { heading: "Inter, sans-serif", body: "Roboto, sans-serif", mono: "JetBrains Mono, monospace" },
      sizes: { xs:"12px", sm:"14px", base:"16px", lg:"18px", xl:"20px", "2xl":"24px", "3xl":"30px", "4xl":"36px" },
      lineHeights:  { tight:"1.2", normal:"1.5", relaxed:"1.7" },
      weights: { normal:400, medium:500, semibold:600, bold:700 },
    },
    spacing: { scale: { "0":"0", "1":"4", "2":"8", "3":"12", "4":"16", "6":"24", "8":"32", "12":"48" } },
    radius:  { scale: { none:"0", sm:"4", md:"8", lg:"12", xl:"16", full:"9999" } },
    shadows: { scale: { sm:"0 1px 2px 0 rgba(0,0,0,0.05)", md:"0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)", lg:"0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)" } },
    zIndex:  { scale: { dropdown: 1000, modal: 1050, popover: 1100 } },
    borders: { widths: { hairline:"1px", thin:"2px" } }
  },
  dark: {
    semanticColors: {
      background: 'oklch(0.16 0.01 260)',
      foreground: 'oklch(0.93 0.01 260)',
      card: 'oklch(0.24 0.01 260)',
      cardForeground: 'oklch(0.93 0.01 260)',
      primary: 'oklch(0.70 0.16 254)',
      primaryForeground: 'oklch(0.22 0.01 260)',
      accent: 'oklch(0.68 0.15 254)',
      accentForeground: 'oklch(0.98 0.01 260)',
      muted: 'oklch(0.32 0.01 260)',
      mutedForeground: 'oklch(0.78 0.01 260)',
      border: 'oklch(0.40 0.01 260)',
      warning: 'oklch(0.75 0.15 80)',
      danger: 'oklch(0.65 0.18 25)',
    },
    typography: {
      fontFamilies: { heading: "Inter, sans-serif", body: "Roboto, sans-serif", mono: "JetBrains Mono, monospace" },
      sizes: { xs:"12px", sm:"14px", base:"16px", lg:"18px", xl:"20px", "2xl":"24px", "3xl":"30px", "4xl":"36px" },
      lineHeights:  { tight:"1.2", normal:"1.5", relaxed:"1.7" },
      weights: { normal:400, medium:500, semibold:600, bold:700 },
    },
    spacing: { scale: { "0":"0", "1":"4", "2":"8", "3":"12", "4":"16", "6":"24", "8":"32", "12":"48" } },
    radius:  { scale: { none:"0", sm:"4", md:"8", lg:"12", xl:"16", full:"9999" } },
    shadows: { scale: { sm:"0 1px 2px 0 rgba(0,0,0,0.5)", md:"0 4px 6px -1px rgba(0,0,0,0.6), 0 2px 4px -2px rgba(0,0,0,0.6)", lg:"0 10px 15px -3px rgba(0,0,0,0.6), 0 4px 6px -4px rgba(0,0,0,0.6)" } },
    zIndex:  { scale: { dropdown: 1000, modal: 1050, popover: 1100 } },
    borders: { widths: { hairline:"1px", thin:"2px" } }
  }
};