
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import ColorPanel from './ColorPanel';
import TypographyPanel from './TypographyPanel';
import SpacingRadiusPanel from './SpacingRadiusPanel';
import ShadowsPanel from './ShadowsPanel';

const EditorTabs: React.FC = () => {
    return (
        <Tabs defaultValue="colors" className="p-4">
            <TabsList>
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="typography">Typography</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
                <TabsTrigger value="shadows">Shadows</TabsTrigger>
            </TabsList>
            <TabsContent value="colors"><ColorPanel /></TabsContent>
            <TabsContent value="typography"><TypographyPanel /></TabsContent>
            <TabsContent value="layout"><SpacingRadiusPanel /></TabsContent>
            <TabsContent value="shadows"><ShadowsPanel /></TabsContent>
        </Tabs>
    );
};

export default EditorTabs;
