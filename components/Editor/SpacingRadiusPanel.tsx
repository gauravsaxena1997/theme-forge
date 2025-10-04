
import React, { useCallback } from 'react';
import { useThemeForge } from '../../state/ThemeContext';
import { produce } from 'immer';
import { Input } from '../ui/Input';

const SpacingRadiusPanel: React.FC = () => {
    const { setTokens, mode, activeModeTokens } = useThemeForge();
    const { spacing, radius } = activeModeTokens;

    const handleChange = useCallback((
        category: 'spacing' | 'radius', 
        key: string, 
        value: string
    ) => {
        setTokens(produce(draft => {
            draft[mode][category].scale[key] = value;
        }));
    }, [setTokens, mode]);

    return (
        <div className="space-y-6 py-4">
            <div>
                <h3 className="text-lg font-semibold mb-2">Spacing Scale</h3>
                <div className="grid grid-cols-2 gap-2">
                    {Object.entries(spacing.scale).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                            <span className="text-sm font-mono w-8">{key}</span>
                            <Input value={value} onChange={(e) => handleChange('spacing', key, e.target.value)} />
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">Radius Scale</h3>
                <div className="grid grid-cols-2 gap-2">
                    {Object.entries(radius.scale).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                            <span className="text-sm w-12">{key}</span>
                            <Input value={value} onChange={(e) => handleChange('radius', key, e.target.value)} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpacingRadiusPanel;
