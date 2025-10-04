import { ThemeTokens, ModeTokens } from '../types/tokens';

function toKebabCase(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

function generateCssVariablesForMode(modeTokens: ModeTokens): string {
    let variables = '';

    for (const role in modeTokens.semanticColors) {
        const colorValue = modeTokens.semanticColors[role] || 'transparent';
        variables += `--color-${toKebabCase(role)}: ${colorValue};\n`;
    }

    variables += `--font-heading: ${modeTokens.typography.fontFamilies.heading};\n`;
    variables += `--font-body: ${modeTokens.typography.fontFamilies.body};\n`;
    if (modeTokens.typography.fontFamilies.mono) {
        variables += `--font-mono: ${modeTokens.typography.fontFamilies.mono};\n`;
    }

    Object.entries(modeTokens.typography.sizes).forEach(([k, v]) => variables += `--size-${k}: ${v};\n`);
    Object.entries(modeTokens.typography.lineHeights).forEach(([k, v]) => variables += `--lh-${k}: ${v};\n`);
    Object.entries(modeTokens.typography.weights).forEach(([k, v]) => variables += `--weight-${k}: ${String(v)};\n`);
    
    if (modeTokens.typography.letterSpacings) {
      Object.entries(modeTokens.typography.letterSpacings).forEach(([k, v]) => variables += `--tracking-${k}: ${v};\n`);
    }

    Object.entries(modeTokens.spacing.scale).forEach(([k, v]) => variables += `--space-${k}: ${v}px;\n`);

    Object.entries(modeTokens.radius.scale).forEach(([k, v]) => {
        const radiusValue = k === 'full' ? '9999px' : `${v}px`;
        variables += `--radius-${k}: ${radiusValue};\n`;
    });

    Object.entries(modeTokens.shadows.scale).forEach(([k, v]) => variables += `--shadow-${k}: ${v};\n`);
    Object.entries(modeTokens.zIndex.scale).forEach(([k, v]) => variables += `--z-${k}: ${String(v)};\n`);
    
    if (modeTokens.borders) {
        Object.entries(modeTokens.borders.widths).forEach(([k, v]) => variables += `--border-width-${k}: ${v};\n`);
    }

    return variables;
}

export function applyScopedTokensToStyleTag(tokens: ThemeTokens) {
    const styleTagId = 'theme-forge-styles';
    let styleTag = document.getElementById(styleTagId) as HTMLStyleElement | null;
    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = styleTagId;
        document.head.appendChild(styleTag);
    }

    const lightCss = generateCssVariablesForMode(tokens.light);
    const darkCss = generateCssVariablesForMode(tokens.dark);

    styleTag.textContent = `
        #theme-preview-content.light {
            ${lightCss}
        }
        #theme-preview-content.dark {
            ${darkCss}
        }
    `;
}
