import React, { useCallback, useState, useEffect } from 'react';
import { useThemeForge } from '../../state/ThemeContext';
import { produce } from 'immer';
import { Slider } from '../ui/Slider';

interface ShadowParts {
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: string;
    opacity: number;
}

// Simple parser for "X Y Blur Spread Color" format. Handles simple cases.
const parseShadow = (shadowString: string): ShadowParts => {
    // This regex is simplified and targets the default format
    const match = shadowString.match(/(-?\d+)px\s(-?\d+)px\s(\d+)px\s(-?\d+)px\srgba\((\d+,\s*\d+,\s*\d+),\s*([\d.]+)\)/);
    if (match) {
        return {
            x: parseInt(match[1], 10),
            y: parseInt(match[2], 10),
            blur: parseInt(match[3], 10),
            spread: parseInt(match[4], 10),
            color: `rgb(${match[5]})`,
            opacity: parseFloat(match[6]),
        };
    }
     // Fallback for simpler shadows like "0 1px 2px 0 rgba(0,0,0,0.05)"
    const simpleMatch = shadowString.match(/(-?\d+(?:\.\d+)?|\d+)px\s(-?\d+(?:\.\d+)?|\d+)px\s(-?\d+(?:\.\d+)?|\d+)px\s*rgba\((\d+,\s*\d+,\s*\d+),\s*([\d.]+)\)/);
     if (simpleMatch) {
        return {
            x: parseFloat(simpleMatch[1]),
            y: parseFloat(simpleMatch[2]),
            blur: parseFloat(simpleMatch[3]),
            spread: 0,
            color: `rgb(${simpleMatch[4]})`,
            opacity: parseFloat(simpleMatch[5]),
        };
    }
    // Default fallback
    return { x: 0, y: 0, blur: 0, spread: 0, color: '#000000', opacity: 0 };
};

const formatShadow = (parts: ShadowParts): string => {
    const rgb = parts.color.match(/\d+/g)?.join(', ');
    return `${parts.x}px ${parts.y}px ${parts.blur}px ${parts.spread}px rgba(${rgb || '0, 0, 0'}, ${parts.opacity.toFixed(2)})`;
};

const ShadowEditor: React.FC<{ name: string; value: string; onChange: (value: string) => void; }> = ({ name, value, onChange }) => {
    const [parts, setParts] = useState(() => parseShadow(value));
    
    useEffect(() => {
        onChange(formatShadow(parts));
    }, [parts, onChange]);

    const handlePartChange = (part: keyof ShadowParts, newValue: number | string) => {
        setParts(prev => ({ ...prev, [part]: newValue }));
    };
    
    return (
        <div className="p-4 border border-zinc-200 rounded-md space-y-4 bg-white">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium capitalize text-zinc-900">{name}</h4>
                 <div className="w-24 h-12 rounded-md flex items-center justify-center bg-zinc-50 border border-zinc-200" style={{ boxShadow: value }}>
                    <span className="text-xs text-zinc-500"></span>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3 text-zinc-700">
                <div className="grid grid-cols-[80px_1fr_40px] items-center gap-2"><label className="text-xs">Offset X</label><Slider value={[parts.x]} onValueChange={([v]) => handlePartChange('x', v)} min={-20} max={20} step={1} /><span className="text-xs text-right">{parts.x}px</span></div>
                <div className="grid grid-cols-[80px_1fr_40px] items-center gap-2"><label className="text-xs">Offset Y</label><Slider value={[parts.y]} onValueChange={([v]) => handlePartChange('y', v)} min={-20} max={20} step={1} /><span className="text-xs text-right">{parts.y}px</span></div>
                <div className="grid grid-cols-[80px_1fr_40px] items-center gap-2"><label className="text-xs">Blur</label><Slider value={[parts.blur]} onValueChange={([v]) => handlePartChange('blur', v)} min={0} max={40} step={1} /><span className="text-xs text-right">{parts.blur}px</span></div>
                <div className="grid grid-cols-[80px_1fr_40px] items-center gap-2"><label className="text-xs">Spread</label><Slider value={[parts.spread]} onValueChange={([v]) => handlePartChange('spread', v)} min={-20} max={20} step={1} /><span className="text-xs text-right">{parts.spread}px</span></div>
                <div className="grid grid-cols-[80px_1fr_40px] items-center gap-2"><label className="text-xs">Opacity</label><Slider value={[parts.opacity]} onValueChange={([v]) => handlePartChange('opacity', v)} min={0} max={1} step={0.01} /><span className="text-xs text-right">{parts.opacity.toFixed(2)}</span></div>
            </div>
        </div>
    )
};


const ShadowsPanel: React.FC = () => {
    const { setTokens, mode, activeModeTokens } = useThemeForge();
    const { shadows } = activeModeTokens;

    const handleChange = useCallback((key: string, value: string) => {
        setTokens(produce(draft => {
            draft[mode].shadows.scale[key] = value;
        }));
    }, [setTokens, mode]);

    return (
        <div className="space-y-6 py-4">
            <div>
                <h3 className="text-lg font-semibold mb-3 text-zinc-900">Shadows</h3>
                <div className="space-y-4">
                    {Object.entries(shadows.scale).map(([key, value]) => (
                        <ShadowEditor key={key} name={key} value={value} onChange={(newValue) => handleChange(key, newValue)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShadowsPanel;
