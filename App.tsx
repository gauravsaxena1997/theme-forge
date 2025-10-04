import React from 'react';
import { ThemeProvider } from './state/ThemeContext';
import Header from './components/Header';
import EditorTabs from './components/Editor/EditorTabs';
import PreviewSwitcher from './components/Preview/PreviewSwitcher';

const AppContent: React.FC = () => {
    return (
        <div className="flex flex-col h-screen font-sans antialiased bg-white text-zinc-900">
            <Header />
            <main className="flex-1 grid grid-cols-1 md:grid-cols-[500px_1fr] overflow-hidden">
                <aside className="bg-white border-r border-zinc-200 overflow-y-auto">
                    <EditorTabs />
                </aside>
                <section className="bg-zinc-50 overflow-y-auto">
                    <PreviewSwitcher />
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