import React from 'react';
import { useThemeForge } from '../state/ThemeContext';
import { CopyJSONButton } from './CopyJSONButton';
import { SunIcon, MoonIcon, CodeIcon } from './icons';

const Header: React.FC = () => {
    const { mode, setMode } = useThemeForge();

    return (
        <header className="flex items-center justify-between px-4 py-2 border-b border-zinc-200 h-14 shrink-0 bg-white">
            <div className="flex items-center gap-2">
                <CodeIcon className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold tracking-tight">ThemeForge</h1>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                    className="p-2 rounded-full hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900 transition-colors"
                    aria-label="Toggle dark mode for preview"
                >
                    {mode === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                </button>
                
                <CopyJSONButton />
            </div>
        </header>
    );
};

export default Header;
