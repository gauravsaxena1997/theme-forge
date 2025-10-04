import React, { useState } from 'react';
import ComponentsGallery from './surfaces/ComponentsGallery';
import { useThemeForge } from '../../state/ThemeContext';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import EcommercePreset from './presets/EcommercePreset';
import TravelPreset from './presets/TravelPreset';
import DashboardPreset from './presets/DashboardPreset';
import ChatPreset from './presets/ChatPreset';
import MessengerPreset from './presets/MessengerPreset';

type PreviewMode = 'presets' | 'components';
type Preset = 'ecommerce' | 'travel' | 'dashboard' | 'chat' | 'messenger';

const PRESETS: { id: Preset, name: string }[] = [
    { id: 'ecommerce', name: 'E-commerce Site' },
    { id: 'travel', name: 'Travel Site' },
    { id: 'dashboard', name: 'SaaS Dashboard' },
    { id: 'chat', name: 'AI Chatbot' },
    { id: 'messenger', name: 'Messenger App' },
];

const PreviewSwitcher: React.FC = () => {
    const { mode } = useThemeForge();
    const [previewMode, setPreviewMode] = useState<PreviewMode>('presets');
    const [activePreset, setActivePreset] = useState<Preset>('ecommerce');
    
    const renderPreset = () => {
        switch (activePreset) {
            case 'ecommerce': return <EcommercePreset />;
            case 'travel': return <TravelPreset />;
            case 'dashboard': return <DashboardPreset />;
            case 'chat': return <ChatPreset />;
            case 'messenger': return <MessengerPreset />;
            default: return <EcommercePreset />;
        }
    };

    return (
        <div className="p-4 md:p-6 h-full flex flex-col">
            <div className="flex items-center justify-between gap-4 mb-4 bg-white p-2 rounded-lg border border-zinc-200 sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <Button 
                        variant={previewMode === 'presets' ? 'secondary' : 'ghost'} 
                        size="sm" 
                        onClick={() => setPreviewMode('presets')}
                    >
                        Preview
                    </Button>
                    <Button 
                        variant={previewMode === 'components' ? 'secondary' : 'ghost'} 
                        size="sm"
                        onClick={() => setPreviewMode('components')}
                    >
                        UI Components
                    </Button>
                </div>
                {previewMode === 'presets' && (
                    <Select 
                        value={activePreset} 
                        onChange={(e) => setActivePreset(e.target.value as Preset)}
                        className="w-48 h-9 text-sm"
                    >
                        {PRESETS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </Select>
                )}
            </div>
            <div 
                id="theme-preview-content"
                className={`${mode} flex-1 overflow-y-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-200`}
            >
                <div className="p-4 md:p-6">
                   {previewMode === 'presets' ? renderPreset() : <ComponentsGallery />}
                </div>
            </div>
        </div>
    );
};

export default PreviewSwitcher;