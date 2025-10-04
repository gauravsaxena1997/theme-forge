import React, { useCallback } from 'react';
import { useThemeForge } from '../../state/ThemeContext';
import { hexToOklch } from '../../utils/colorUtils';
import { produce } from 'immer';

// Utility to format role names for display
const formatRoleName = (role: string) => {
    return role
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase());
};

const ColorEditorRow: React.FC<{ role: string; color: string; onChange: (hexColor: string) => void }> = ({ role, color, onChange }) => {
    return (
        <div className="flex items-center justify-between p-2 rounded-md hover:bg-zinc-100/50">
            <label className="text-sm font-medium text-zinc-800">{formatRoleName(role)}</label>
            <div className="relative w-8 h-8 rounded-md overflow-hidden border border-zinc-300 cursor-pointer">
                <div className="absolute inset-0" style={{ backgroundColor: color }}></div>
                <input
                    type="color"
                    defaultValue="#000000" 
                    onChange={(e) => onChange(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    title={`Change ${role} color`}
                />
            </div>
        </div>
    );
};

const ColorPanel: React.FC = () => {
    const { setTokens, mode, activeModeTokens } = useThemeForge();
    const { semanticColors } = activeModeTokens;

    const handleColorChange = useCallback((role: string, hexColor: string) => {
        const newOklchColor = hexToOklch(hexColor);
        setTokens(
            produce((draft) => {
                draft[mode].semanticColors[role] = newOklchColor;
            })
        );
    }, [setTokens, mode]);

    const colorRoles = Object.entries(semanticColors).sort(([a], [b]) => a.localeCompare(b));

    const structuralColors = colorRoles.filter(([k]) => ['background', 'foreground', 'border', 'card', 'cardForeground', 'muted', 'mutedForeground'].includes(k));
    const brandColors = colorRoles.filter(([k]) => ['primary', 'primaryForeground', 'accent', 'accentForeground'].includes(k));
    const feedbackColors = colorRoles.filter(([k]) => ['warning', 'danger'].includes(k));

    return (
        <div className="space-y-6 py-4">
            <div>
                <h3 className="text-lg font-semibold mb-2 text-zinc-900">UI Colors</h3>
                <div className="p-2 border border-zinc-200 rounded-md bg-white space-y-1">
                    <h4 className="px-2 py-1 text-xs font-semibold text-zinc-500">Brand</h4>
                    {brandColors.map(([role, color]) => (
                        <ColorEditorRow key={role} role={role} color={color} onChange={(hex) => handleColorChange(role, hex)} />
                    ))}
                     <h4 className="px-2 pt-2 pb-1 text-xs font-semibold text-zinc-500">Structure</h4>
                     {structuralColors.map(([role, color]) => (
                        <ColorEditorRow key={role} role={role} color={color} onChange={(hex) => handleColorChange(role, hex)} />
                    ))}
                    <h4 className="px-2 pt-2 pb-1 text-xs font-semibold text-zinc-500">Feedback</h4>
                     {feedbackColors.map(([role, color]) => (
                        <ColorEditorRow key={role} role={role} color={color} onChange={(hex) => handleColorChange(role, hex)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ColorPanel;
