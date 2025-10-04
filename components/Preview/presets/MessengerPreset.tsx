import React from 'react';
import { Card, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Avatar } from '../../ui/Avatar';
import { Badge } from '../../ui/Badge';
import { SearchIcon, MoreVerticalIcon, SendIcon, PaperclipIcon, UserIcon } from '../../icons';

const contacts = [
    { name: 'Elena Rodriguez', lastMessage: 'See you tomorrow!', time: '10:42 AM', unread: 2, online: true },
    { name: 'Marcus Chen', lastMessage: 'Sounds good, thanks!', time: '10:30 AM', online: false },
    { name: 'Sophia Dubois', lastMessage: 'Photo', time: '9:15 AM', online: true },
    { name: 'Design Team', lastMessage: 'Ben: Can you review this?', time: 'Yesterday', unread: 5, online: true },
    { name: 'Liam Gallagher', lastMessage: 'Okay, I will call you back.', time: 'Yesterday', online: false },
];

const MessengerPreset: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 h-[80vh] gap-4">
            {/* Sidebar */}
            <Card className="md:col-span-1 xl:col-span-1 flex flex-col">
                <div className="p-4 border-b border-[var(--color-border)]">
                    <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)'}}>Chats</h2>
                    <div className="relative mt-2">
                        <Input placeholder="Search..." className="pr-8" />
                        <SearchIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {contacts.map(contact => (
                        <div key={contact.name} className="flex items-center gap-3 p-3 hover:bg-[var(--color-accent)]/20 cursor-pointer border-b border-[var(--color-border)]">
                            <div className="relative">
                                <Avatar><UserIcon className="w-5 h-5"/></Avatar>
                                {contact.online && <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-[var(--color-card)]" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold truncate">{contact.name}</p>
                                <p className="text-sm text-[var(--color-muted-foreground)] truncate">{contact.lastMessage}</p>
                            </div>
                            <div className="text-right text-xs shrink-0">
                                <p className="text-[var(--color-muted-foreground)]">{contact.time}</p>
                                {contact.unread && <Badge className="mt-1">{contact.unread}</Badge>}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Chat Window */}
            <Card className="md:col-span-2 xl:col-span-3 flex flex-col">
                <header className="flex items-center justify-between p-3 border-b border-[var(--color-border)] shrink-0">
                    <div className="flex items-center gap-3">
                         <Avatar><UserIcon className="w-5 h-5"/></Avatar>
                         <div>
                            <p className="font-semibold">Elena Rodriguez</p>
                            <p className="text-xs text-green-500">Online</p>
                         </div>
                    </div>
                    <Button variant="ghost" size="icon"><MoreVerticalIcon className="w-5 h-5"/></Button>
                </header>
                <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {/* Received */}
                    <div className="flex items-start gap-3">
                        <Avatar><UserIcon className="w-5 h-5"/></Avatar>
                        <div className="p-3 rounded-[var(--radius-lg)] rounded-tl-none bg-[var(--color-muted)] text-[var(--color-muted-foreground)] max-w-xs">Hey! Are we still on for lunch today at 1 PM?</div>
                    </div>
                     {/* Sent */}
                    <div className="flex items-start gap-3 justify-end">
                        <div className="p-3 rounded-[var(--radius-lg)] rounded-br-none bg-[var(--color-primary)] text-[var(--color-primary-foreground)] max-w-xs">Yep, absolutely! See you there.</div>
                    </div>
                     {/* Received */}
                    <div className="flex items-start gap-3">
                        <Avatar><UserIcon className="w-5 h-5"/></Avatar>
                        <div className="p-3 rounded-[var(--radius-lg)] rounded-tl-none bg-[var(--color-muted)] text-[var(--color-muted-foreground)] max-w-xs">Great, see you tomorrow!</div>
                    </div>
                </CardContent>
                <footer className="p-4 border-t border-[var(--color-border)] shrink-0">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon"><PaperclipIcon className="w-5 h-5" /></Button>
                        <Input placeholder="Type a message" className="flex-1" />
                        <Button><SendIcon className="w-5 h-5" /></Button>
                    </div>
                </footer>
            </Card>
        </div>
    );
};

export default MessengerPreset;
