
import React, { useCallback, useState, useEffect } from 'react';
import { useThemeForge } from '../../state/ThemeContext';
import { ShadeStop } from '../../types/tokens';
import { generateOklchScale, SHADE_STOPS, hexToOklch } from '../../utils/colorUtils';
import { produce } from 'immer';

// Memoized color swatch component
const ColorSwatch = React.memo(({ color }: { color: string }) => (
    <div className="w-full h-8 rounded" style={{ backgroundColor: color }} />
));

const ColorPanel: React.FC = () => {
    const { setTokens, mode, activeModeTokens } = useThemeForge();
    const { colorScales, semanticColors } = activeModeTokens;

    const handleBaseColorChange = useCallback((scaleName: string, hexColor: string) => {
        const newBaseOklch = hexToOklch(hexColor);
        setTokens(
            produce((draft) => {
                const newScale = generateOklchScale(newBaseOklch, mode);
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

    return (
        <div className="space-y-8 py-4">
            <div>
                <h3 className="text-lg font-semibold mb-3">Core Palettes</h3>
                <div className="space-y-5">
                    {Object.entries(colorScales).map(([name, scale]) => {
                        const baseColor = scale[mode === 'light' ? 600 : 500] || 'oklch(0 0 0)';
                        return (
                            <div key={name} className="p-3 border border-[var(--color-border)] rounded-md bg-[var(--color-card)]">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="capitalize font-medium text-sm">{name}</label>
                                    <div className="relative w-8 h-8 rounded-md overflow-hidden border border-[var(--color-border)]">
                                        <div className="absolute inset-0" style={{ backgroundColor: baseColor }}></div>
                                        <input
                                            type="color"
                                            // The value must be hex. We will convert on change.
                                            // This is a limitation of input[type=color].
                                            defaultValue="#000000"
                                            onChange={(e) => handleBaseColorChange(name, e.target.value)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            title={`Change ${name} base color`}
                                        />
                                    </div>
                                </div>
                                <div className="flex space-x-1">
                                    {SHADE_STOPS.map((stop) => (
                                        <div key={stop} title={`${name}-${stop}: ${scale[stop]}`} className="w-full">
                                          <ColorSwatch color={scale[stop] ?? 'transparent'} />
                                          <p className="text-center text-xs mt-1 text-[var(--color-muted-foreground)]">{stop}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3">UI Color Roles</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {Object.entries(semanticColors).sort(([a], [b]) => a.localeCompare(b)).map(([role, { scaleRef, shade }]) => (
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
