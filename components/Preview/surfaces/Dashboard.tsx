
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { ActivityIcon, CreditCardIcon, DollarSignIcon, UsersIcon, ArrowUpRightIcon } from '../../icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Jan', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Feb', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Mar', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Apr', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'May', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Jun', total: Math.floor(Math.random() * 5000) + 1000 },
];

const Dashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Dashboard</h1>
                <Button>Download Report</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* FIX: Use ArrowUpRightIcon to indicate positive trends */}
                <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Revenue</CardTitle><DollarSignIcon className="h-4 w-4 text-[var(--color-muted-foreground)]" /></CardHeader><CardContent><div className="text-2xl font-bold">$45,231.89</div><p className="text-xs text-[var(--color-muted-foreground)] flex items-center"><ArrowUpRightIcon className="w-3 h-3 mr-1" />+20.1% from last month</p></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Subscriptions</CardTitle><UsersIcon className="h-4 w-4 text-[var(--color-muted-foreground)]" /></CardHeader><CardContent><div className="text-2xl font-bold">+2350</div><p className="text-xs text-[var(--color-muted-foreground)] flex items-center"><ArrowUpRightIcon className="w-3 h-3 mr-1" />+180.1% from last month</p></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Sales</CardTitle><CreditCardIcon className="h-4 w-4 text-[var(--color-muted-foreground)]" /></CardHeader><CardContent><div className="text-2xl font-bold">+12,234</div><p className="text-xs text-[var(--color-muted-foreground)] flex items-center"><ArrowUpRightIcon className="w-3 h-3 mr-1" />+19% from last month</p></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Active Now</CardTitle><ActivityIcon className="h-4 w-4 text-[var(--color-muted-foreground)]" /></CardHeader><CardContent><div className="text-2xl font-bold">+573</div><p className="text-xs text-[var(--color-muted-foreground)]">+201 since last hour</p></CardContent></Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350}>
                             <BarChart data={chartData}>
                                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false}/>
                                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`}/>
                                <Tooltip cursor={{fill: 'var(--color-muted)'}} contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}/>
                                <Bar dataKey="total" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader><CardTitle>Recent Sales</CardTitle><CardDescription>You made 265 sales this month.</CardDescription></CardHeader>
                    <CardContent className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center">
                            <div className="h-9 w-9 flex items-center justify-center rounded-full bg-[var(--color-muted)]">
                                <span className="text-sm font-bold">AV</span>
                            </div>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">Olivia Martin</p>
                                <p className="text-sm text-[var(--color-muted-foreground)]">olivia.martin@email.com</p>
                            </div>
                            <div className="ml-auto font-medium">+$1,999.00</div>
                        </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;