import React from 'react';
import { Card, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Avatar } from '../../ui/Avatar';
import { BotIcon, SendIcon, UserIcon } from '../../icons';
import { useToast } from '../../ui/Toast';

const ChatPreset: React.FC = () => {
    const { toast } = useToast();
    return (
        <div className="flex flex-col h-[70vh] max-w-3xl mx-auto">
            <header className="text-center mb-4">
                <h1 className="text-3xl font-bold tracking-tight" style={{fontFamily: 'var(--font-heading)'}}>AI Assistant</h1>
                <p className="text-[var(--color-muted-foreground)]">Powered by ThemeForge</p>
            </header>
            <Card className="flex-1 flex flex-col">
                <CardContent className="p-4 flex-1 overflow-y-auto space-y-4">
                    {/* AI Message */}
                    <div className="flex items-start gap-3">
                        <Avatar><BotIcon className="w-5 h-5"/></Avatar>
                        <div className="p-3 rounded-[var(--radius-lg)] rounded-tl-none bg-[var(--color-muted)] text-[var(--color-muted-foreground)] max-w-[80%]">
                            <p className="font-semibold text-sm mb-1 text-[var(--color-foreground)]">AI Assistant</p>
                            <p>Hello! How can I help you design a great theme today?</p>
                        </div>
                    </div>

                    {/* User Message */}
                    <div className="flex items-start gap-3 justify-end">
                        <div className="p-3 rounded-[var(--radius-lg)] rounded-br-none bg-[var(--color-primary)] text-[var(--color-primary-foreground)] max-w-[80%]">
                            <p>Can you show me an example of a code block?</p>
                        </div>
                        <Avatar><UserIcon className="w-5 h-5"/></Avatar>
                    </div>

                    {/* AI Message with Code */}
                    <div className="flex items-start gap-3">
                        <Avatar><BotIcon className="w-5 h-5"/></Avatar>
                        <div className="space-y-2 max-w-[80%] w-full">
                            <div className="p-3 rounded-[var(--radius-lg)] rounded-tl-none bg-[var(--color-muted)] text-[var(--color-muted-foreground)]">
                                <p className="font-semibold text-sm mb-1 text-[var(--color-foreground)]">AI Assistant</p>
                                <p>Certainly! Here is a simple JavaScript function:</p>
                            </div>
                            <pre className="p-4 rounded-[var(--radius-md)] bg-[var(--color-muted)]/50 text-sm overflow-x-auto" style={{fontFamily: 'var(--font-mono)'}}>
                                <code className="text-[var(--color-foreground)]">
{`function greet(name) {
  return \`Hello, \${name}!\`;
}`}
                                </code>
                            </pre>
                        </div>
                    </div>
                </CardContent>
                <div className="p-4 border-t border-[var(--color-border)]">
                    <div className="relative">
                        <Input placeholder="Type your message..." className="pr-12" />
                        <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8" onClick={() => toast('Message sent!', 'info')}>
                            <SendIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ChatPreset;