import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Avatar } from '../../ui/Avatar';
import { Badge } from '../../ui/Badge';
import { SearchIcon, MoreVerticalIcon, SendIcon, PaperclipIcon, UserIcon } from '../../icons';
import { useToast } from '../../ui/Toast';
import { produce } from 'immer';

type Message = { id: number; text: string; sender: 'me' | 'them'; time: string; };
type Contact = { id: string; name: string; online: boolean; };

const contactsData: Contact[] = [
    { id: '1', name: 'Elena Rodriguez', online: true },
    { id: '2', name: 'Marcus Chen', online: false },
    { id: '3', name: 'Sophia Dubois', online: true },
    { id: '4', name: 'Ben Carter (Design)', online: true },
    { id: '5', name: 'Liam Gallagher', online: false },
];

const initialConversations: Record<string, Message[]> = {
    '1': [
        { id: 1, text: 'Hey! Are we still on for lunch today at 1 PM?', sender: 'them', time: '10:40 AM' },
        { id: 2, text: 'Yep, absolutely! See you there.', sender: 'me', time: '10:41 AM' },
        { id: 3, text: 'Great, see you tomorrow!', sender: 'them', time: '10:42 AM' },
    ],
    '2': [{ id: 1, text: 'Sounds good, thanks!', sender: 'them', time: '10:30 AM' }],
    '3': [{ id: 1, text: 'Here is the photo you requested.', sender: 'them', time: '9:15 AM' }],
    '4': [{ id: 1, text: 'Can you review the latest designs when you have a moment?', sender: 'them', time: 'Yesterday' }],
    '5': [{ id: 1, text: 'Okay, I will call you back.', sender: 'them', time: 'Yesterday' }],
};

const MessengerPreset: React.FC = () => {
    const { toast } = useToast();
    const [conversations, setConversations] = useState(initialConversations);
    const [activeChatId, setActiveChatId] = useState('1');
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');

    const activeContact = useMemo(() => contactsData.find(c => c.id === activeChatId), [activeChatId]);
    const activeMessages = useMemo(() => conversations[activeChatId] || [], [conversations, activeChatId]);

    const filteredContacts = useMemo(() => 
        contactsData.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())), 
    [searchTerm]);
    
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() === '') return;
        
        const newMessage: Message = {
            id: Date.now(),
            text: message,
            sender: 'me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        const updatedConversations = produce(conversations, draft => {
            draft[activeChatId].push(newMessage);
        });

        setConversations(updatedConversations);
        setMessage('');
        toast('Message sent!', 'success');

        // Simulate reply
        setTimeout(() => {
            const replyMessage: Message = {
                id: Date.now() + 1,
                text: 'Got it, thanks!',
                sender: 'them',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
             setConversations(produce(draft => {
                draft[activeChatId].push(replyMessage);
            }));
        }, 1500);
    };


    return (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 h-[80vh] gap-4">
            {/* Sidebar */}
            <Card className="md:col-span-1 xl:col-span-1 flex flex-col">
                <div className="p-4 border-b border-[var(--color-border)]">
                    <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)'}}>Chats</h2>
                    <div className="relative mt-2">
                        <Input placeholder="Search..." className="pr-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        <SearchIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {filteredContacts.map(contact => {
                        const lastMessage = conversations[contact.id]?.[conversations[contact.id].length - 1];
                        return (
                            <button 
                                key={contact.id} 
                                className={`flex items-center gap-3 p-3 w-full text-left cursor-pointer border-b border-[var(--color-border)] transition-colors ${activeChatId === contact.id ? 'bg-[var(--color-accent)]/20' : 'hover:bg-[var(--color-accent)]/20'}`}
                                onClick={() => setActiveChatId(contact.id)}
                            >
                                <div className="relative">
                                    <Avatar><UserIcon className="w-5 h-5"/></Avatar>
                                    {contact.online && <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-[var(--color-card)]" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold truncate">{contact.name}</p>
                                    <p className="text-sm text-[var(--color-muted-foreground)] truncate">{lastMessage?.text}</p>
                                </div>
                                <div className="text-right text-xs shrink-0">
                                    <p className="text-[var(--color-muted-foreground)]">{lastMessage?.time}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </Card>

            {/* Chat Window */}
            {activeContact && (
                 <Card className="md:col-span-2 xl:col-span-3 flex flex-col">
                    <header className="flex items-center justify-between p-3 border-b border-[var(--color-border)] shrink-0">
                        <div className="flex items-center gap-3">
                            <Avatar><UserIcon className="w-5 h-5"/></Avatar>
                            <div>
                                <p className="font-semibold">{activeContact.name}</p>
                                {activeContact.online && <p className="text-xs text-green-500">Online</p>}
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => toast('Showing chat options', 'info')}><MoreVerticalIcon className="w-5 h-5"/></Button>
                    </header>
                    <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto">
                        {activeMessages.map(msg => (
                             <div key={msg.id} className={`flex items-start gap-3 max-w-sm ${msg.sender === 'me' ? 'ml-auto justify-end' : ''}`}>
                                {msg.sender === 'them' && <Avatar className="w-8 h-8"><UserIcon className="w-4 h-4"/></Avatar>}
                                <div className={`p-3 rounded-[var(--radius-lg)] ${msg.sender === 'me' ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-br-none' : 'bg-[var(--color-muted)] text-[var(--color-muted-foreground)] rounded-tl-none'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                    <footer className="p-4 border-t border-[var(--color-border)] shrink-0">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                            <Button variant="ghost" type="button" size="icon" onClick={() => toast('Attach a file', 'info')}><PaperclipIcon className="w-5 h-5" /></Button>
                            <Input placeholder="Type a message" className="flex-1" value={message} onChange={e => setMessage(e.target.value)} />
                            <Button type="submit"><SendIcon className="w-5 h-5" /></Button>
                        </form>
                    </footer>
                </Card>
            )}
        </div>
    );
};

export default MessengerPreset;