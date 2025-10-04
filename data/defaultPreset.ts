
import { ThemeTokens } from '../types/tokens';
import { generateOklchScale } from '../utils/colorUtils';

const primaryLightBase = 'oklch(0.62 0.15 254)';
const primaryDarkBase = 'oklch(0.70 0.16 254)';
const neutralLightBase = 'oklch(0.6 0.01 260)';
const neutralDarkBase = 'oklch(0.5 0.01 260)';
const successBase = 'oklch(0.6 0.15 150)';
const warningBase = 'oklch(0.7 0.15 80)';
const dangerBase = 'oklch(0.6 0.18 25)';

export const defaultPreset: ThemeTokens = {
  meta: {
    name: "ThemeForge Default",
    version: "1.0.0",
    createdAt: new Date().toISOString(),
  },
  light: {
    colorScales: {
      primary: generateOklchScale(primaryLightBase, 'light'),
      neutral: generateOklchScale(neutralLightBase, 'light'),
      success: generateOklchScale(successBase, 'light'),
      warning: generateOklchScale(warningBase, 'light'),
      danger: generateOklchScale(dangerBase, 'light'),
    },
    semanticColors: {
      primary: { scaleRef: "primary", shade: 600 },
      'primary-foreground': { scaleRef: "neutral", shade: 50 },
      secondary: { scaleRef: "neutral", shade: 700 },
      'secondary-foreground': { scaleRef: "neutral", shade: 50 },
      accent: { scaleRef: "primary", shade: 400 },
      'accent-foreground': { scaleRef: "neutral", shade: 950 },
      success: { scaleRef: "success", shade: 600 },
      warning: { scaleRef: "warning", shade: 600 },
      danger: { scaleRef: "danger", shade: 600 },
      info: { scaleRef: "primary", shade: 500 },
      background: { scaleRef: "neutral", shade: 50 },
      foreground: { scaleRef: "neutral", shade: 900 },
      card: { scaleRef: "neutral", shade: 50 },
      'card-foreground': { scaleRef: "neutral", shade: 900 },
      muted: { scaleRef: "neutral", shade: 200 },
      'muted-foreground': { scaleRef: "neutral", shade: 700 },
      border: { scaleRef: "neutral", shade: 300 },
    },
    typography: {
      fontFamilies: { heading: "Inter, sans-serif", body: "Roboto, sans-serif", mono: "JetBrains Mono, monospace" },
      sizes: { xs:"12px", sm:"14px", base:"16px", lg:"18px", xl:"20px", "2xl":"24px", "3xl":"30px", "4xl":"36px" },
      lineHeights:  { tight:"1.2", normal:"1.5", relaxed:"1.7" },
      weights: { normal:400, medium:500, semibold:600, bold:700 },
    },
    spacing: { scale: { "0":"0", "1":"4", "2":"8", "3":"12", "4":"16", "6":"24", "8":"32", "12":"48" } }, // Removed px for slider
    radius:  { scale: { none:"0", sm:"4", md:"8", lg:"12", xl:"16", full:"9999" } }, // Removed px for slider
    shadows: { scale: { sm:"0 1px 2px 0 rgba(0,0,0,0.05)", md:"0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)", lg:"0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)" } },
    zIndex:  { scale: { dropdown: 1000, modal: 1050, popover: 1100 } },
    borders: { widths: { hairline:"1px", thin:"2px" } }
  },
  dark: {
    colorScales: {
      primary: generateOklchScale(primaryDarkBase, 'dark'),
      neutral: generateOklchScale(neutralDarkBase, 'dark'),
      success: generateOklchScale(successBase, 'dark'),
      warning: generateOklchScale(warningBase, 'dark'),
      danger: generateOklchScale(dangerBase, 'dark'),
    },
    semanticColors: {
      primary: { scaleRef: "primary", shade: 500 },
      'primary-foreground': { scaleRef: "neutral", shade: 950 },
      secondary: { scaleRef: "neutral", shade: 400 },
      'secondary-foreground': { scaleRef: "neutral", shade: 950 },
      accent: { scaleRef: "primary", shade: 600 },
      'accent-foreground': { scaleRef: "neutral", shade: 50 },
      success: { scaleRef: "success", shade: 500 },
      warning: { scaleRef: "warning", shade: 500 },
      danger: { scaleRef: "danger", shade: 500 },
      info: { scaleRef: "primary", shade: 500 },
      background: { scaleRef: "neutral", shade: 50 },
      foreground: { scaleRef: "neutral", shade: 900 },
      card: { scaleRef: "neutral", shade: 100 },
      'card-foreground': { scaleRef: "neutral", shade: 900 },
      muted: { scaleRef: "neutral", shade: 200 },
      'muted-foreground': { scaleRef: "neutral", shade: 600 },
      border: { scaleRef: "neutral", shade: 300 },
    },
    typography: {
      fontFamilies: { heading: "Inter, sans-serif", body: "Roboto, sans-serif", mono: "JetBrains Mono, monospace" },
      sizes: { xs:"12px", sm:"14px", base:"16px", lg:"18px", xl:"20px", "2xl":"24px", "3xl":"30px", "4xl":"36px" },
      lineHeights:  { tight:"1.2", normal:"1.5", relaxed:"1.7" },
      weights: { normal:400, medium:500, semibold:600, bold:700 },
    },
    spacing: { scale: { "0":"0", "1":"4", "2":"8", "3":"12", "4":"16", "6":"24", "8":"32", "12":"48" } }, // Removed px for slider
    radius:  { scale: { none:"0", sm:"4", md:"8", lg:"12", xl:"16", full:"9999" } }, // Removed px for slider
    shadows: { scale: { sm:"0 1px 2px 0 rgba(0,0,0,0.5)", md:"0 4px 6px -1px rgba(0,0,0,0.6), 0 2px 4px -2px rgba(0,0,0,0.6)", lg:"0 10px 15px -3px rgba(0,0,0,0.6), 0 4px 6px -4px rgba(0,0,0,0.6)" } },
    zIndex:  { scale: { dropdown: 1000, modal: 1050, popover: 1100 } },
    borders: { widths: { hairline:"1px", thin:"2px" } }
  }
};
