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
import { usePreview } from '../../state/PreviewContext';
import { ExpandIcon, XIcon } from '../icons';
import { ToastProvider } from '../ui/Toast';

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
    const { isPreviewFullScreen, toggleFullScreen } = usePreview();
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

    const containerClasses = isPreviewFullScreen
        ? 'h-screen w-screen'
        : 'p-4 md:p-6 h-full flex flex-col';
    
    const headerClasses = isPreviewFullScreen
        ? 'flex items-center justify-between gap-4 mb-4 bg-white/80 backdrop-blur-sm p-2 rounded-lg border border-zinc-200 absolute top-4 left-4 right-4 z-20'
        : 'flex items-center justify-between gap-4 mb-4 bg-white p-2 rounded-lg border border-zinc-200 sticky top-0 z-10';

    return (
        <div className={containerClasses}>
            <div className={headerClasses}>
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
                <div className="flex items-center gap-2">
                    {previewMode === 'presets' && (
                        <Select 
                            value={activePreset} 
                            onChange={(e) => setActivePreset(e.target.value as Preset)}
                            className="w-48 h-9 text-sm"
                        >
                            {PRESETS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </Select>
                    )}
                    <Button variant="ghost" size="icon" onClick={toggleFullScreen} className="h-9 w-9">
                        {isPreviewFullScreen ? <XIcon className="w-5 h-5" /> : <ExpandIcon className="w-5 h-5" />}
                    </Button>
                </div>
            </div>
            <ToastProvider>
                 <div 
                    id="theme-preview-content"
                    className={`${mode} flex-1 overflow-y-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-200`}
                >
                    <div className="p-4 md:p-6">
                       {previewMode === 'presets' ? renderPreset() : <ComponentsGallery />}
                    </div>
                </div>
            </ToastProvider>
        </div>
    );
};

export default PreviewSwitcher;