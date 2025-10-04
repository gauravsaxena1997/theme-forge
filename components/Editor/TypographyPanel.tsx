import React, { useCallback } from 'react';
import { useThemeForge } from '../../state/ThemeContext';
import { produce } from 'immer';
import { Input } from '../ui/Input';

const FONT_FAMILIES = ["Inter, sans-serif", "Roboto, sans-serif", "system-ui, sans-serif", "Georgia, serif", "JetBrains Mono, monospace"];

const TypographyPanel: React.FC = () => {
    const { setTokens, mode, activeModeTokens } = useThemeForge();
    const { typography } = activeModeTokens;
    
    const handleChange = useCallback(<K extends keyof typeof typography.fontFamilies, V extends (typeof typography.fontFamilies)[K]>(
        key: K,
        value: V
    ) => {
        setTokens(produce(draft => {
            draft[mode].typography.fontFamilies[key] = value;
        }));
    }, [setTokens, mode]);

    const handleGenericChange = useCallback((category: keyof typeof typography, key: string, value: string | number) => {
         setTokens(produce(draft => {
            (draft[mode].typography[category] as any)[key] = value;
        }));
    }, [setTokens, mode]);

    return (
        <div className="space-y-6 py-4 text-zinc-900">
            <div>
                <h3 className="text-lg font-semibold mb-2">Font Families</h3>
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Heading</label>
                    <select value={typography.fontFamilies.heading} onChange={(e) => handleChange('heading', e.target.value)} className="w-full text-sm p-1.5 border rounded-md bg-white border-zinc-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        {FONT_FAMILIES.map(font => <option key={font} value={font}>{font.split(',')[0]}</option>)}
                    </select>
                     <label className="block text-sm font-medium">Body</label>
                    <select value={typography.fontFamilies.body} onChange={(e) => handleChange('body', e.target.value)} className="w-full text-sm p-1.5 border rounded-md bg-white border-zinc-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        {FONT_FAMILIES.map(font => <option key={font} value={font}>{font.split(',')[0]}</option>)}
                    </select>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Font Sizes</h3>
                <div className="grid grid-cols-2 gap-2">
                    {Object.entries(typography.sizes).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                            <span className="text-sm w-8">{key}</span>
                            <Input value={value} onChange={(e) => handleGenericChange('sizes', key, e.target.value)} />
                        </div>
                    ))}
                </div>
            </div>

             <div>
                <h3 className="text-lg font-semibold mb-2">Line Heights</h3>
                <div className="grid grid-cols-2 gap-2">
                    {Object.entries(typography.lineHeights).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                            <span className="text-sm w-20">{key}</span>
                            <Input type="number" step={0.1} value={value} onChange={(e) => handleGenericChange('lineHeights', key, e.target.value)} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TypographyPanel;
