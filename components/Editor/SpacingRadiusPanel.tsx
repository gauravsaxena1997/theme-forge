
import React, { useCallback } from 'react';
import { useThemeForge } from '../../state/ThemeContext';
import { produce } from 'immer';
import { Slider } from '../ui/Slider';

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
        <div className="space-y-8 py-4">
            <div>
                <h3 className="text-lg font-semibold mb-3">Spacing Scale (in pixels)</h3>
                <div className="grid grid-cols-1 gap-4">
                    {Object.entries(spacing.scale).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-4">
                            <span className="text-sm font-mono w-8 text-right">{key}</span>
                            <div className="flex-1 flex items-center gap-4">
                               <Slider
                                  value={[parseInt(value) || 0]}
                                  onValueChange={([val]) => handleChange('spacing', key, String(val))}
                                  max={128}
                                  step={2}
                                />
                               <span className="text-sm w-10 text-right">{value}px</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-3">Radius Scale (in pixels)</h3>
                <div className="grid grid-cols-1 gap-4">
                    {Object.entries(radius.scale).map(([key, value]) => (
                         <div key={key} className="flex items-center gap-4">
                            <span className="text-sm w-12">{key}</span>
                             <div className="flex-1 flex items-center gap-4">
                                <Slider
                                    value={[parseInt(value) || 0]}
                                    onValueChange={([val]) => handleChange('radius', key, String(val))}
                                    max={32}
                                    step={1}
                                    disabled={key === 'full'}
                                />
                                <span className="text-sm w-10 text-right">{key === 'full' ? '9999px' : `${value}px`}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpacingRadiusPanel;
