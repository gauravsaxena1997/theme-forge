
import React from 'react';
import { useThemeForge } from '../state/ThemeContext';
import { CopyJSONButton } from './CopyJSONButton';
import { SunIcon, MoonIcon, CodeIcon } from './icons';
import { defaultPreset } from '../data/defaultPreset';

const Header: React.FC = () => {
    const { mode, setMode, setTokens } = useThemeForge();

    const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === 'default') {
            setTokens(() => defaultPreset);
        }
        // In a real app, you would load other presets here.
    };

    return (
        <header className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border)] h-14 shrink-0">
            <div className="flex items-center gap-2">
                <CodeIcon className="w-6 h-6 text-[var(--color-primary)]" />
                <h1 className="text-xl font-semibold tracking-tight">ThemeForge</h1>
            </div>
            <div className="flex items-center gap-4">
                <select 
                    onChange={handlePresetChange}
                    className="px-3 py-1.5 text-sm border rounded-md appearance-none bg-[var(--color-card)] border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                >
                    <option value="default">Default Preset</option>
                </select>

                <button
                    onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                    className="p-2 rounded-full hover:bg-[var(--color-muted)] transition-colors"
                    aria-label="Toggle dark mode"
                >
                    {mode === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                </button>
                
                <CopyJSONButton />
            </div>
        </header>
    );
};

export default Header;
