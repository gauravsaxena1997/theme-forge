
import React, { useCallback } from 'react';
import { useThemeForge } from '../../state/ThemeContext';
import { ShadeStop } from '../../types/tokens';
import { generateOklchScale, parseOklch, formatOklch, getContrastRating, getContrastRatio, SHADE_STOPS } from '../../utils/colorUtils';
import { produce } from 'immer';

const ColorPanel: React.FC = () => {
    const { tokens, setTokens, mode, activeModeTokens } = useThemeForge();
    const { colorScales, semanticColors } = activeModeTokens;

    const handleBaseColorChange = useCallback((scaleName: string, newBaseColor: string) => {
        setTokens(
            produce((draft) => {
                const newScale = generateOklchScale(newBaseColor, mode);
                draft[mode].colorScales[scaleName] = newScale;
            })
        );
    }, [setTokens, mode]);

    const handleSemanticChange = useCallback((role: string, scaleRef: string, shade: ShadeStop) => {
        setTokens(
            produce((draft) => {
                draft[mode].semanticColors[role] = { scaleRef, shade };
            })
        );
    }, [setTokens, mode]);

    const resolveRole = (role: string) => {
      const def = semanticColors[role];
      if (!def) return 'transparent';
      return colorScales[def.scaleRef]?.[def.shade] || 'transparent';
    }
    
    const contrast = getContrastRatio(resolveRole('foreground'), resolveRole('background'));
    const contrastRating = getContrastRating(contrast);

    return (
        <div className="space-y-6 py-4">
            <div>
                <h3 className="text-lg font-semibold mb-2">Contrast Check</h3>
                <div className="p-3 rounded-md border border-[var(--color-border)] bg-[var(--color-card)]">
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Foreground on Background</span>
                        <span className={`font-bold text-sm ${contrastRating.color}`}>{contrast.toFixed(2)} ({contrastRating.rating})</span>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Color Scales</h3>
                <div className="space-y-4">
                    {Object.entries(colorScales).map(([name, scale]) => {
                        const baseColor = scale[mode === 'light' ? 600 : 500] || 'oklch(0 0 0)';
                        const [, , baseH] = parseOklch(baseColor);
                        return (
                            <div key={name} className="p-3 border border-[var(--color-border)] rounded-md bg-[var(--color-card)]">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="capitalize font-medium text-sm">{name}</label>
                                    <input
                                        type="color"
                                        value="#000000" // Input type color doesn't support OKLCH, so we fake it.
                                        onChange={(e) => {
                                            // A real color picker would be needed here.
                                            // This is a simplified change handler.
                                            const randomL = 0.5 + Math.random() * 0.2;
                                            const randomC = 0.1 + Math.random() * 0.1;
                                            handleBaseColorChange(name, formatOklch(randomL, randomC, baseH));
                                        }}
                                        className="w-8 h-8 p-0 border-none rounded-md cursor-pointer bg-clip-content"
                                        style={{ backgroundColor: baseColor }}
                                    />
                                </div>
                                <div className="flex space-x-1">
                                    {SHADE_STOPS.map((stop) => (
                                        <div key={stop} title={`${name}-${stop}: ${scale[stop]}`} className="w-full h-8 rounded" style={{ backgroundColor: scale[stop] }}></div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Semantic Roles</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {Object.entries(semanticColors).map(([role, { scaleRef, shade }]) => (
                        <div key={role} className="flex flex-col space-y-1">
                            <label className="text-xs text-[var(--color-muted-foreground)] capitalize">{role.replace(/-/g, ' ')}</label>
                            <div className="flex gap-2">
                                <select value={scaleRef} onChange={(e) => handleSemanticChange(role, e.target.value, shade)} className="w-full text-sm p-1.5 border rounded-md bg-[var(--color-card)] border-[var(--color-border)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]">
                                    {Object.keys(colorScales).map(name => <option key={name} value={name}>{name}</option>)}
                                </select>
                                <select value={shade} onChange={(e) => handleSemanticChange(role, scaleRef, parseInt(e.target.value) as ShadeStop)} className="w-24 text-sm p-1.5 border rounded-md bg-[var(--color-card)] border-[var(--color-border)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]">
                                    {SHADE_STOPS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ColorPanel;
