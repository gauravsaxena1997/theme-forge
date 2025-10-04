
import React, { useCallback } from 'react';
import { useThemeForge } from '../../state/ThemeContext';
import { produce } from 'immer';
import { Input } from '../ui/Input';

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
                <h3 className="text-lg font-semibold mb-2">Shadows</h3>
                <div className="space-y-2">
                    {Object.entries(shadows.scale).map(([key, value]) => (
                        <div key={key} className="flex flex-col gap-1">
                            <label className="text-sm capitalize">{key}</label>
                            <Input 
                                value={value} 
                                onChange={(e) => handleChange(key, e.target.value)} 
                                placeholder="e.g., 0 1px 2px rgba(0,0,0,0.1)"
                            />
                            <div className="w-full h-16 rounded-md flex items-center justify-center bg-[var(--color-card)] mt-1" style={{ boxShadow: value }}>
                                <span className="text-sm text-[var(--color-muted-foreground)]">Preview</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShadowsPanel;
