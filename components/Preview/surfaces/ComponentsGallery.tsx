
import React from 'react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../ui/Card';
import { AlertCircleIcon, TerminalIcon } from '../../icons';

const ComponentsGallery: React.FC = () => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Buttons</h2>
                <div className="flex flex-wrap gap-4 items-center">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Inputs & Selects</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="Enter your email..." />
                    <Select>
                        <option>Apple</option>
                        <option>Banana</option>
                        <option>Blueberry</option>
                        <option>Grapes</option>
                        <option>Pineapple</option>
                    </Select>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Cards</h2>
                <Card className="max-w-sm">
                    <CardHeader>
                        <CardTitle>Create project</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input placeholder="Project Name" />
                        <Button className="w-full">Deploy</Button>
                    </CardContent>
                </Card>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Alerts</h2>
                <div className="space-y-4">
                    <div className="p-4 rounded-md border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-card-foreground)] flex items-start gap-3">
                        <TerminalIcon className="w-5 h-5 mt-0.5" />
                        <div>
                            <h5 className="font-semibold">Heads up!</h5>
                            <p className="text-sm">You can use utility classes for this.</p>
                        </div>
                    </div>
                    <div className="p-4 rounded-md border border-[var(--color-danger)]/50 text-[var(--color-danger)] bg-[var(--color-danger)]/10 flex items-start gap-3">
                         <AlertCircleIcon className="w-5 h-5 mt-0.5" />
                        <div>
                            <h5 className="font-semibold text-[var(--color-danger)]">Error</h5>
                            <p className="text-sm">Your session has expired. Please log in again.</p>
                        </div>
                    </div>
                </div>
            </div>
            
             <div>
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Badges</h2>
                <div className="flex flex-wrap gap-4 items-center">
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">Primary</span>
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)]">Secondary</span>
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full border border-[var(--color-border)] text-[var(--color-foreground)]">Outline</span>
                </div>
            </div>
        </div>
    );
};

export default ComponentsGallery;
