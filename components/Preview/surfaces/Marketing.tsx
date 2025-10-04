
import React from 'react';
import { Button } from '../../ui/Button';
import { CheckCircleIcon } from '../../icons';

const Marketing: React.FC = () => {
    return (
        <div className="space-y-12">
            <section className="text-center py-16">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    Build Your Perfect UI, <span className="text-[var(--color-primary)]">Faster.</span>
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-[var(--color-muted-foreground)] mb-8">
                    ThemeForge gives you the power to create stunning, consistent, and accessible themes for your next project. Visually.
                </p>
                <div className="flex justify-center gap-4">
                    <Button size="lg">Get Started Now</Button>
                    <Button size="lg" variant="secondary">View Demos</Button>
                </div>
            </section>

            <section className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Real-time Previews</h3>
                    <p className="text-[var(--color-muted-foreground)]">See your changes instantly across a suite of component and page demos.</p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold">shadcn/ui Compatible</h3>
                    <p className="text-[var(--color-muted-foreground)]">Export CSS variables ready to be used with the best React component library.</p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Export with One Click</h3>
                    <p className="text-[var(--color-muted-foreground)]">Copy your entire theme as a clean, structured JSON file.</p>
                </div>
            </section>

             <section className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <span className="text-sm font-semibold text-[var(--color-primary)]">PRICING</span>
                        <h2 className="text-3xl font-bold mt-2" style={{ fontFamily: 'var(--font-heading)'}}>Completely Free, For Everyone</h2>
                        <p className="mt-4 text-[var(--color-muted-foreground)]">
                            Our mission is to empower developers and designers. ThemeForge is free, open, and will never have a paywall for core features.
                        </p>
                        <ul className="mt-6 space-y-2">
                            <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-[var(--color-success)]" /> Unlimited Theme Generation</li>
                            <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-[var(--color-success)]" /> All Preview Components</li>
                            <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-[var(--color-success)]" /> One-Click JSON Export</li>
                        </ul>
                    </div>
                    <div className="flex items-center justify-center p-8 bg-[var(--color-background)] rounded-[var(--radius-md)]">
                        <img src="https://picsum.photos/400/300" alt="Abstract placeholder" className="rounded-[var(--radius-md)] shadow-[var(--shadow-lg)]" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Marketing;
