import React from 'react';
import { Card, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { StarIcon, MapPinIcon } from '../../icons';

const destinations = [
    { name: 'Kyoto, Japan', rating: 4.9, image: 'https://picsum.photos/seed/travel1/400/500' },
    { name: 'Swiss Alps', rating: 4.8, image: 'https://picsum.photos/seed/travel2/400/500' },
    { name: 'Santorini, Greece', rating: 4.9, image: 'https://picsum.photos/seed/travel3/400/500' },
];

const TravelPreset: React.FC = () => {
    return (
        <div className="space-y-12">
            <section 
                className="relative text-center py-20 px-4 rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-accent)]/20"
            >
                 <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('https://picsum.photos/seed/hero/1200/400')"}}></div>
                 <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-[var(--color-accent-foreground)]" style={{ fontFamily: 'var(--font-heading)' }}>
                        Discover Your Next Adventure
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-[var(--color-accent-foreground)]/80 mb-8">
                        Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.
                    </p>
                    <Button size="lg" variant="default">Browse Tours</Button>
                </div>
            </section>

            <section>
                <Card className="shadow-[var(--shadow-lg)]">
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Destination</label>
                                <Input placeholder="e.g. Paris, France" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Dates</label>
                                <Input type="date" />
                            </div>
                            <Button className="md:h-10">Search Flights</Button>
                        </div>
                    </CardContent>
                </Card>
            </section>

            <section>
                <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Popular Destinations</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {destinations.map(dest => (
                        <Card key={dest.name} className="group overflow-hidden">
                            <img src={dest.image} alt={dest.name} className="w-full h-64 object-cover transition-transform group-hover:scale-105" />
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-lg flex items-center gap-2"><MapPinIcon className="w-4 h-4 text-[var(--color-muted-foreground)]" /> {dest.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm font-medium text-[var(--color-accent-foreground)] bg-[var(--color-accent)]/80 px-2 py-1 rounded-full">
                                        <StarIcon className="w-4 h-4" style={{fill: 'currentColor'}}/>
                                        <span>{dest.rating}</span>
                                    </div>
                                </div>
                                <Button variant="secondary" className="w-full mt-4">View Details</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TravelPreset;