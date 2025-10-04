import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { DollarSignIcon, UsersIcon, CreditCardIcon, ActivityIcon } from '../../icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useToast } from '../../ui/Toast';

const overviewData = [
  { name: 'Jan', total: 2431 }, { name: 'Feb', total: 3123 },
  { name: 'Mar', total: 4231 }, { name: 'Apr', total: 3897 },
  { name: 'May', total: 4890 }, { name: 'Jun', total: 4576 },
];

const trafficData = [
  { source: 'Google', value: 4890, fill: 'var(--color-primary)' },
  { source: 'Facebook', value: 3123, fill: 'var(--color-accent)' },
  { source: 'Direct', value: 2431, fill: 'var(--color-muted-foreground)' },
  { source: 'Other', value: 1897, fill: 'var(--color-border)' },
];

const transactions = [
    { name: 'Liam Johnson', email: 'liam@example.com', amount: '$250.00', status: 'Paid' },
    { name: 'Olivia Smith', email: 'olivia@example.com', amount: '$150.00', status: 'Paid' },
    { name: 'Noah Williams', email: 'noah@example.com', amount: '$350.00', status: 'Pending' },
    { name: 'Emma Brown', email: 'emma@example.com', amount: '$450.00', status: 'Paid' },
    { name: 'Ava Jones', email: 'ava@example.com', amount: '$550.00', status: 'Failed' },
    { name: 'James Davis', email: 'james@example.com', amount: '$200.00', status: 'Paid' },
];

const getStatusVariant = (status: string) => {
    switch(status) {
        case 'Paid': return 'success';
        case 'Pending': return 'outline';
        case 'Failed': return 'destructive';
        default: return 'secondary';
    }
};

const DashboardPreset: React.FC = () => {
    const { toast } = useToast();
    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row items-center justify-between gap-4">
                <h1 className="text-3xl font-bold tracking-tight" style={{fontFamily: 'var(--font-heading)'}}>Dashboard</h1>
                <div className="flex items-center gap-2">
                    <Button variant="outline">Date Range</Button>
                    <Button onClick={() => toast('Report downloaded successfully!', 'success')}>Download Report</Button>
                </div>
            </header>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Revenue</CardTitle><DollarSignIcon className="h-4 w-4 text-[var(--color-muted-foreground)]" /></CardHeader><CardContent><div className="text-2xl font-bold">$45,231.89</div><p className="text-xs text-[var(--color-muted-foreground)]">+20.1% from last month</p></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Subscriptions</CardTitle><UsersIcon className="h-4 w-4 text-[var(--color-muted-foreground)]" /></CardHeader><CardContent><div className="text-2xl font-bold">+2350</div><p className="text-xs text-[var(--color-muted-foreground)]">+180.1% from last month</p></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Sales</CardTitle><CreditCardIcon className="h-4 w-4 text-[var(--color-muted-foreground)]" /></CardHeader><CardContent><div className="text-2xl font-bold">+12,234</div><p className="text-xs text-[var(--color-muted-foreground)]">+19% from last month</p></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Active Now</CardTitle><ActivityIcon className="h-4 w-4 text-[var(--color-muted-foreground)]" /></CardHeader><CardContent><div className="text-2xl font-bold">+573</div><p className="text-xs text-[var(--color-muted-foreground)]">+201 since last hour</p></CardContent></Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader><CardTitle>Revenue Overview</CardTitle></CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={overviewData}>
                                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                                <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }} />
                                <Line type="monotone" dataKey="total" stroke="var(--color-primary)" strokeWidth={2} dot={{ r: 4, fill: 'var(--color-primary)' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-3">
                    <CardHeader><CardTitle>Traffic by Source</CardTitle></CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={trafficData} layout="vertical" margin={{ left: -10 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="source" type="category" tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} />
                                <Tooltip cursor={{ fill: 'var(--color-accent-hover)' }} contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
                                <Bar dataKey="value" barSize={20} radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader><CardTitle>Recent Sales</CardTitle><CardDescription>You made 265 sales this month.</CardDescription></CardHeader>
                <CardContent className="space-y-4">
                    {transactions.map(t => (
                        <div key={t.email} className="flex items-center">
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">{t.name}</p>
                                <p className="text-sm text-[var(--color-muted-foreground)]">{t.email}</p>
                            </div>
                            <div className="text-right">
                                <div className="font-medium">{t.amount}</div>
                                <Badge variant={getStatusVariant(t.status)} className="text-xs">{t.status}</Badge>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardPreset;