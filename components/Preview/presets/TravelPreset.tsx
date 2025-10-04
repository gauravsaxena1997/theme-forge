import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { StarIcon, MapPinIcon, PlaneIcon, HotelIcon, CompassIcon, UserIcon } from '../../icons';
import { useToast } from '../../ui/Toast';
import { Avatar } from '../../ui/Avatar';
import { fetchPexelsImages } from '../../../utils/pexels';
import { Skeleton } from '../../ui/Skeleton';

const destinationData = [
    { name: 'Kyoto, Japan', rating: 4.9, price: '1,200', query: 'Kyoto shrine' },
    { name: 'Swiss Alps', rating: 4.8, price: '1,500', query: 'Swiss Alps mountains' },
    { name: 'Santorini, Greece', rating: 4.9, price: '1,800', query: 'Santorini greece' },
];

const features = [
    { icon: PlaneIcon, title: 'Tailored Flights', description: 'Find the perfect flight that fits your schedule and budget.' },
    { icon: HotelIcon, title: 'Exquisite Stays', description: 'Handpicked hotels and resorts for ultimate comfort.' },
    { icon: CompassIcon, title: 'Guided Tours', description: 'Expert-led tours to discover hidden gems.' },
];

const testimonials = [
    { name: 'Alex Johnson', comment: "An absolutely unforgettable experience! Every detail was perfectly planned.", avatar: 'AJ' },
    { name: 'Samantha Miller', comment: "The best travel agency I've ever worked with. The Alps tour was breathtaking.", avatar: 'SM' },
];

const TravelPreset: React.FC = () => {
    const { toast } = useToast();
    const [images, setImages] = useState<string[]>([]);
    const [heroImage, setHeroImage] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            setIsLoading(true);
            const imagePromises = destinationData.map(d => fetchPexelsImages(d.query, 1));
            const heroPromise = fetchPexelsImages('travel landscape', 1);
            
            const [fetchedImages, fetchedHero] = await Promise.all([
                Promise.all(imagePromises),
                heroPromise
            ]);

            setImages(fetchedImages.map(imgArr => imgArr[0] || ''));
            setHeroImage(fetchedHero[0] || '');
            setIsLoading(false);
        };
        fetchImages();
    }, []);

    return (
        <div className="space-y-16">
            <section 
                className="relative text-center py-20 px-4 rounded-[var(--radius-xl)] overflow-hidden flex items-center justify-center min-h-[400px]"
            >
                {isLoading ? (
                    <Skeleton className="absolute inset-0" />
                ) : (
                    <>
                     <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out scale-100" style={{backgroundImage: `url('${heroImage}')`}}></div>
                     <div className="absolute inset-0 bg-black/50"></div>
                    </>
                )}
                 <div className="relative z-10 text-white">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                        Discover Your Next Adventure
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-white/80 mb-8">
                        Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.
                    </p>
                    <Button size="lg" variant="default" onClick={() => toast('Browsing our amazing tours!', 'info')}>Browse Tours</Button>
                </div>
            </section>

            <section>
                <Card className="shadow-[var(--shadow-lg)] -mt-32 z-20 relative mx-auto max-w-4xl">
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
                            <Button className="md:h-10" onClick={() => toast('Searching for the best flights!', 'success')}>Search Flights</Button>
                        </div>
                    </CardContent>
                </Card>
            </section>

             <section>
                <div className="text-center">
                     <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Why Choose Us?</h2>
                     <p className="max-w-2xl mx-auto text-[var(--color-muted-foreground)] mb-8">We provide a world-class travel experience, tailored to your dreams.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map(feature => (
                        <Card key={feature.title} className="text-center">
                            <CardContent className="p-6">
                                <div className="p-3 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-full inline-block mb-4">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-[var(--color-muted-foreground)]">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: 'var(--font-heading)' }}>Popular Destinations</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {destinationData.map((dest, index) => (
                        <Card key={dest.name} className="group overflow-hidden">
                            <div className="overflow-hidden h-64">
                                {isLoading ? (
                                    <Skeleton className="w-full h-full" />
                                ) : (
                                    <img src={images[index]} alt={dest.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                )}
                            </div>
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-lg flex items-center gap-2"><MapPinIcon className="w-4 h-4 text-[var(--color-muted-foreground)]" /> {dest.name}</h3>
                                        <p className="text-sm text-[var(--color-muted-foreground)] mt-1">From ${dest.price}</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm font-medium text-[var(--color-accent-foreground)] bg-[var(--color-accent)] px-2 py-1 rounded-full">
                                        <StarIcon className="w-4 h-4" style={{fill: 'currentColor'}}/>
                                        <span>{dest.rating}</span>
                                    </div>
                                </div>
                                <Button variant="secondary" className="w-full mt-4" onClick={() => toast(`Exploring details for ${dest.name}...`, 'info')}>View Details</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

             <section>
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: 'var(--font-heading)' }}>What Our Customers Say</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {testimonials.map(t => (
                        <Card key={t.name}>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <Avatar><UserIcon className="w-5 h-5"/></Avatar>
                                    <div>
                                        <CardTitle>{t.name}</CardTitle>
                                        <div className="flex items-center gap-0.5 mt-1">
                                            {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-4 h-4 text-yellow-400" style={{fill: 'currentColor'}} />)}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-[var(--color-muted-foreground)] italic">"{t.comment}"</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TravelPreset;
