
import React, { useState } from 'react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../ui/Card';
import { AlertCircleIcon, TerminalIcon, UserIcon } from '../../icons';
import { Slider } from '../../ui/Slider';
import { Avatar } from '../../ui/Avatar';
import { Badge } from '../../ui/Badge';

const ComponentsGallery: React.FC = () => {
    const [sliderValue, setSliderValue] = useState(50);
    return (
        <div className="space-y-10">
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

             <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Avatars & Badges</h2>
                    <div className="flex gap-4 items-center">
                        <Avatar><UserIcon className="w-5 h-5" /></Avatar>
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge variant="outline">Outline</Badge>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Slider</h2>
                     <div className="flex items-center gap-4">
                        <Slider value={[sliderValue]} onValueChange={([v]) => setSliderValue(v)} max={100} step={1} />
                        <span className="text-sm font-mono w-12 text-center">{sliderValue}</span>
                    </div>
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

            <div className="grid md:grid-cols-2 gap-8 items-start">
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
            </div>
        </div>
    );
};

export default ComponentsGallery;
