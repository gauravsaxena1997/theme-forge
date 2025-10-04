
import { ThemeTokens } from '../types/tokens';
import { generateOklchScale } from '../utils/colorUtils';

const brandBlueLightBase = 'oklch(0.62 0.15 254)';
const brandBlueDarkBase = 'oklch(0.70 0.16 254)';
const grayLightBase = 'oklch(0.6 0.01 260)';
const grayDarkBase = 'oklch(0.5 0.01 260)';
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
      brandBlue: generateOklchScale(brandBlueLightBase, 'light'),
      gray: generateOklchScale(grayLightBase, 'light'),
      success: generateOklchScale(successBase, 'light'),
      warning: generateOklchScale(warningBase, 'light'),
      danger: generateOklchScale(dangerBase, 'light'),
    },
    semanticColors: {
      primary: { scaleRef: "brandBlue", shade: 600 },
      'primary-foreground': { scaleRef: "gray", shade: 50 },
      secondary: { scaleRef: "gray", shade: 700 },
      'secondary-foreground': { scaleRef: "gray", shade: 50 },
      accent: { scaleRef: "brandBlue", shade: 400 },
      'accent-foreground': { scaleRef: "gray", shade: 950 },
      success: { scaleRef: "success", shade: 600 },
      warning: { scaleRef: "warning", shade: 600 },
      danger: { scaleRef: "danger", shade: 600 },
      info: { scaleRef: "brandBlue", shade: 500 },
      background: { scaleRef: "gray", shade: 50 },
      foreground: { scaleRef: "gray", shade: 900 },
      card: { scaleRef: "gray", shade: 50 },
      'card-foreground': { scaleRef: "gray", shade: 900 },
      muted: { scaleRef: "gray", shade: 200 },
      'muted-foreground': { scaleRef: "gray", shade: 700 },
      border: { scaleRef: "gray", shade: 300 },
    },
    typography: {
      fontFamilies: { heading: "Inter, sans-serif", body: "Roboto, sans-serif", mono: "JetBrains Mono, monospace" },
      sizes: { xs:"12px", sm:"14px", base:"16px", lg:"18px", xl:"20px", "2xl":"24px", "3xl":"30px", "4xl":"36px" },
      lineHeights:  { tight:"1.2", normal:"1.5", relaxed:"1.7" },
      weights: { normal:400, medium:500, semibold:600, bold:700 },
    },
    spacing: { scale: { "0":"0px", "1":"4px", "2":"8px", "3":"12px", "4":"16px", "6":"24px", "8":"32px", "12":"48px" } },
    radius:  { scale: { none:"0px", sm:"4px", md:"8px", lg:"12px", xl:"16px", full:"9999px" } },
    shadows: { scale: { sm:"0 1px 2px rgba(0,0,0,0.05)", md:"0 4px 6px rgba(0,0,0,0.1)", lg:"0 10px 15px rgba(0,0,0,0.15)" } },
    zIndex:  { scale: { dropdown: 1000, modal: 1050, popover: 1100 } },
    borders: { widths: { hairline:"1px", thin:"2px" } }
  },
  dark: {
    colorScales: {
      brandBlue: generateOklchScale(brandBlueDarkBase, 'dark'),
      gray: generateOklchScale(grayDarkBase, 'dark'),
      success: generateOklchScale(successBase, 'dark'),
      warning: generateOklchScale(warningBase, 'dark'),
      danger: generateOklchScale(dangerBase, 'dark'),
    },
    semanticColors: {
      primary: { scaleRef: "brandBlue", shade: 500 },
      'primary-foreground': { scaleRef: "gray", shade: 950 },
      secondary: { scaleRef: "gray", shade: 400 },
      'secondary-foreground': { scaleRef: "gray", shade: 950 },
      accent: { scaleRef: "brandBlue", shade: 600 },
      'accent-foreground': { scaleRef: "gray", shade: 50 },
      success: { scaleRef: "success", shade: 500 },
      warning: { scaleRef: "warning", shade: 500 },
      danger: { scaleRef: "danger", shade: 500 },
      info: { scaleRef: "brandBlue", shade: 500 },
      background: { scaleRef: "gray", shade: 50 },
      foreground: { scaleRef: "gray", shade: 900 },
      card: { scaleRef: "gray", shade: 100 },
      'card-foreground': { scaleRef: "gray", shade: 900 },
      muted: { scaleRef: "gray", shade: 200 },
      'muted-foreground': { scaleRef: "gray", shade: 600 },
      border: { scaleRef: "gray", shade: 300 },
    },
    typography: {
      fontFamilies: { heading: "Inter, sans-serif", body: "Roboto, sans-serif", mono: "JetBrains Mono, monospace" },
      sizes: { xs:"12px", sm:"14px", base:"16px", lg:"18px", xl:"20px", "2xl":"24px", "3xl":"30px", "4xl":"36px" },
      lineHeights:  { tight:"1.2", normal:"1.5", relaxed:"1.7" },
      weights: { normal:400, medium:500, semibold:600, bold:700 },
    },
    spacing: { scale: { "0":"0px", "1":"4px", "2":"8px", "3":"12px", "4":"16px", "6":"24px", "8":"32px", "12":"48px" } },
    radius:  { scale: { none:"0px", sm:"4px", md:"8px", lg:"12px", xl:"16px", full:"9999px" } },
    shadows: { scale: { sm:"0 1px 2px rgba(0,0,0,0.5)", md:"0 4px 6px rgba(0,0,0,0.6)", lg:"0 10px 15px rgba(0,0,0,0.65)" } },
    zIndex:  { scale: { dropdown: 1000, modal: 1050, popover: 1100 } },
    borders: { widths: { hairline:"1px", thin:"2px" } }
  }
};
