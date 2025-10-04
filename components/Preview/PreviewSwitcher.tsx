
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import Dashboard from './surfaces/Dashboard';
import Marketing from './surfaces/Marketing';
import ComponentsGallery from './surfaces/ComponentsGallery';

interface PreviewSwitcherProps {
    activePreview: string;
    setActivePreview: (value: string) => void;
}

const PreviewSwitcher: React.FC<PreviewSwitcherProps> = ({ activePreview, setActivePreview }) => {
    return (
        <div className="p-4 md:p-6">
            <Tabs value={activePreview} onValueChange={setActivePreview}>
                <TabsList>
                    <TabsTrigger value="Dashboard">SaaS Dashboard</TabsTrigger>
                    <TabsTrigger value="Marketing">Marketing Page</TabsTrigger>
                    <TabsTrigger value="Components">Components</TabsTrigger>
                </TabsList>
                <div className="mt-4 p-4 md:p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)]">
                    {activePreview === 'Dashboard' && <Dashboard />}
                    {activePreview === 'Marketing' && <Marketing />}
                    {activePreview === 'Components' && <ComponentsGallery />}
                </div>
            </Tabs>
        </div>
    );
};

export default PreviewSwitcher;
