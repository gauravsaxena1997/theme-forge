import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Avatar } from '../../ui/Avatar';
import { BotIcon, SendIcon, UserIcon } from '../../icons';
import { useToast } from '../../ui/Toast';
import { produce } from 'immer';

type Message = {
    id: number;
    text: React.ReactNode;
    sender: 'user' | 'ai';
};

const initialMessages: Message[] = [
    { id: 1, text: 'Hello! How can I help you design a great theme today?', sender: 'ai' },
];

const hardcodedResponses = [
    "That's an interesting idea! Could you tell me more?",
    "I see. Have you considered adjusting the 'accent' color to complement that?",
    "Excellent choice. Don't forget to check the contrast in dark mode.",
    "I've noted that down. What's next on your mind?",
    <>Here's some example code using your theme:
        <pre className="mt-2 p-3 rounded-[var(--radius-md)] bg-[var(--color-card)] text-sm overflow-x-auto" style={{fontFamily: 'var(--font-mono)'}}>
            <code className="text-[var(--color-foreground)]">
{`<Button variant="primary">
    Click Me
</Button>`}
            </code>
        </pre>
    </>
];

const ChatPreset: React.FC = () => {
    const { toast } = useToast();
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === '' || isTyping) return;

        const userMessage: Message = {
            id: Date.now(),
            text: inputValue,
            sender: 'user'
        };

        setMessages(produce(draft => {
            draft.push(userMessage);
        }));
        setInputValue('');
        setIsTyping(true);
        
        setTimeout(() => {
            const aiResponse: Message = {
                id: Date.now() + 1,
                text: hardcodedResponses[Math.floor(Math.random() * hardcodedResponses.length)],
                sender: 'ai'
            };
            setMessages(produce(draft => {
                draft.push(aiResponse);
            }));
            setIsTyping(false);
        }, 1500);

        toast('Message sent!', 'info');
    };

    return (
        <div className="flex flex-col h-[70vh] max-w-3xl mx-auto">
            <header className="text-center mb-4">
                <h1 className="text-3xl font-bold tracking-tight" style={{fontFamily: 'var(--font-heading)'}}>AI Assistant</h1>
                <p className="text-[var(--color-muted-foreground)]">Powered by ThemeForge</p>
            </header>
            <Card className="flex-1 flex flex-col">
                <CardContent className="p-4 flex-1 overflow-y-auto" ref={scrollRef}>
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                                {message.sender === 'ai' && <Avatar><BotIcon className="w-5 h-5"/></Avatar>}
                                <div className={`p-3 rounded-[var(--radius-lg)] max-w-[80%] ${
                                    message.sender === 'ai'
                                    ? 'rounded-tl-none bg-[var(--color-muted)] text-[var(--color-muted-foreground)]'
                                    : 'rounded-br-none bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                                }`}>
                                     {message.sender === 'ai' && <p className="font-semibold text-sm mb-1 text-[var(--color-foreground)]">AI Assistant</p>}
                                     <div>{message.text}</div>
                                </div>
                                {message.sender === 'user' && <Avatar><UserIcon className="w-5 h-5"/></Avatar>}
                            </div>
                        ))}
                         {isTyping && (
                             <div className="flex items-start gap-3">
                                <Avatar><BotIcon className="w-5 h-5"/></Avatar>
                                <div className="p-3 rounded-[var(--radius-lg)] rounded-tl-none bg-[var(--color-muted)] text-[var(--color-muted-foreground)]">
                                   <div className="flex items-center gap-1.5">
                                       <span className="h-2 w-2 bg-[var(--color-muted-foreground)] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                       <span className="h-2 w-2 bg-[var(--color-muted-foreground)] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                       <span className="h-2 w-2 bg-[var(--color-muted-foreground)] rounded-full animate-bounce"></span>
                                   </div>
                                </div>
                            </div>
                         )}
                    </div>
                </CardContent>
                <div className="p-4 border-t border-[var(--color-border)]">
                    <form onSubmit={handleSendMessage} className="relative">
                        <Input
                            placeholder="Type your message..."
                            className="pr-12"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            disabled={isTyping}
                        />
                        <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8" disabled={isTyping}>
                            <SendIcon className="w-4 h-4" />
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default ChatPreset;