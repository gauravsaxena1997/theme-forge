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
import { cn } from '../../lib/utils';

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
    
    // Updated headerClasses for full screen mode
    const headerClasses = isPreviewFullScreen
        ? 'flex items-center justify-between gap-4 bg-white p-2 rounded-lg border border-zinc-200 shadow-md absolute top-4 left-4 right-4 z-20'
        : 'flex items-center justify-between gap-4 mb-4 bg-white p-2 rounded-lg border border-zinc-200 sticky top-0 z-10';

    // Static classes for controls in full screen mode
    const fullScreenButtonClasses = 'bg-transparent text-zinc-600 hover:bg-zinc-100';
    const fullScreenActiveButtonClasses = 'bg-zinc-200 text-zinc-900 hover:bg-zinc-300';
    const fullScreenSelectClasses = 'bg-white border-zinc-300 text-zinc-900 focus:ring-blue-500 focus:ring-1 focus:outline-none';
    const fullScreenIconButtonClasses = 'bg-transparent text-zinc-600 hover:bg-zinc-100';


    return (
        <div className={containerClasses}>
            <div className={headerClasses}>
                <div className="flex items-center gap-2">
                    <Button 
                        size="sm" 
                        onClick={() => setPreviewMode('presets')}
                        variant={isPreviewFullScreen ? undefined : (previewMode === 'presets' ? 'secondary' : 'ghost')}
                        className={isPreviewFullScreen ? (previewMode === 'presets' ? fullScreenActiveButtonClasses : fullScreenButtonClasses) : ''}
                    >
                        Preview
                    </Button>
                    <Button 
                        size="sm"
                        onClick={() => setPreviewMode('components')}
                        variant={isPreviewFullScreen ? undefined : (previewMode === 'components' ? 'secondary' : 'ghost')}
                        className={isPreviewFullScreen ? (previewMode === 'components' ? fullScreenActiveButtonClasses : fullScreenButtonClasses) : ''}
                    >
                        UI Components
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    {previewMode === 'presets' && (
                        <Select 
                            value={activePreset} 
                            onChange={(e) => setActivePreset(e.target.value as Preset)}
                            className={cn("w-48 h-9 text-sm", isPreviewFullScreen && fullScreenSelectClasses)}
                        >
                            {PRESETS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </Select>
                    )}
                    <Button
                        size="icon"
                        onClick={toggleFullScreen}
                        variant={isPreviewFullScreen ? undefined : 'ghost'}
                        className={cn("h-9 w-9", isPreviewFullScreen && fullScreenIconButtonClasses)}
                    >
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