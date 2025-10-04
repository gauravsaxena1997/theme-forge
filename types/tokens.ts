
export type Mode = 'light' | 'dark';

export type ColorRole =
  | 'primary' | 'secondary' | 'accent'
  | 'success' | 'warning' | 'danger' | 'info'
  | 'background' | 'foreground' | 'muted' | 'border'
  | 'primary-foreground' | 'secondary-foreground' | 'accent-foreground'
  | 'muted-foreground' | 'card' | 'card-foreground';

export type ShadeStop = 50|100|200|300|400|500|600|700|800|900|950;

export type ColorScale = Partial<Record<ShadeStop, string>>; // hex or oklch()

export interface SemanticColor {
    scaleRef: string;
    shade: ShadeStop;
}
export interface SemanticColors {
  [role: string]: SemanticColor;
}

export interface ColorScales {
  [scaleName: string]: ColorScale;
}

export interface Typography {
  fontFamilies: {
    heading: string;
    body: string;
    mono?: string;
  };
  sizes: Record<string, string>;
  lineHeights: Record<string, string>;
  weights: Record<string, number>;
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
  colorScales: ColorScales;
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
