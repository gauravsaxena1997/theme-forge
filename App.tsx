
import React, { useState } from 'react';
import { ThemeProvider, useThemeForge } from './state/ThemeContext';
import Header from './components/Header';
import EditorTabs from './components/Editor/EditorTabs';
import PreviewSwitcher from './components/Preview/PreviewSwitcher';

const AppContent: React.FC = () => {
    const { mode } = useThemeForge();
    const [activePreview, setActivePreview] = useState('Dashboard');

    return (
        <div className={`flex flex-col h-screen font-sans antialiased bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-200 ${mode}`}>
            <Header />
            <main className="flex-1 grid grid-cols-1 md:grid-cols-[500px_1fr] overflow-hidden">
                <aside className="border-r border-[var(--color-border)] overflow-y-auto">
                    <EditorTabs />
                </aside>
                <section className="bg-[var(--color-muted)]/30 overflow-y-auto">
                    <PreviewSwitcher activePreview={activePreview} setActivePreview={setActivePreview} />
                </section>
            </main>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
};

export default App;
