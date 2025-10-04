export type Mode = 'light' | 'dark';

export type ColorRole =
  | 'primary' | 'primaryForeground'
  | 'accent' | 'accentForeground'
  | 'warning' | 'danger' | 'success'
  | 'background' | 'foreground'
  | 'card' | 'cardForeground'
  | 'muted' | 'mutedForeground'
  | 'border';

// New simplified structure for direct color editing
export type SemanticColors = Record<string, string>;

export interface Typography {
  fontFamilies: {
    heading: string;
    body: string;
    mono?: string;
  };
  sizes: Record<string, string>;
  lineHeights: Record<string, string>;
  weights: Record<string, number>; // Weights remain for styling but are not edited in UI
  letterSpacings?: Record<string, string>;
}

export interface Spacing {
  scale: Record<string, string>;
}

export interface Radius {
  scale: Record<string, string>;
}

export interface Shadows {
  scale: Record<string, string>;
}

export interface ZIndex {
  scale: Record<string, number>;
}

export interface ModeTokens {
  semanticColors: SemanticColors;
  typography: Typography;
  spacing: Spacing;
  radius: Radius;
  shadows: Shadows;
  zIndex: ZIndex;
  borders?: { widths: Record<string, string> };
}

export interface ThemeTokens {
  light: ModeTokens;
  dark: ModeTokens;
  meta: { name: string; version: string; createdAt: string };
}