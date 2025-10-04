import React, { useState } from 'react';
import { Card, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { Slider } from '../../ui/Slider';
import { HeartIcon, SearchIcon, ShoppingCartIcon } from '../../icons';

const products = [
    { name: 'Quantum Hoodie', price: 69.99, image: 'https://picsum.photos/seed/product1/400/400', sale: true },
    { name: 'Nebula T-Shirt', price: 29.99, image: 'https://picsum.photos/seed/product2/400/400' },
    { name: 'Gravity Sneakers', price: 129.99, image: 'https://picsum.photos/seed/product3/400/400' },
    { name: 'Cosmic Cap', price: 24.99, image: 'https://picsum.photos/seed/product4/400/400', sale: true },
    { name: 'Stardust Socks', price: 12.99, image: 'https://picsum.photos/seed/product5/400/400' },
    { name: 'Meteor Joggers', price: 89.99, image: 'https://picsum.photos/seed/product6/400/400' },
];

const EcommercePreset: React.FC = () => {
    const [price, setPrice] = useState(75);

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row items-center justify-between gap-4">
                <h1 className="text-3xl font-bold tracking-tight" style={{fontFamily: 'var(--font-heading)'}}>New Arrivals</h1>
                <div className="relative w-full md:w-64">
                    <Input placeholder="Search products..." className="pr-10" />
                    <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted-foreground)]" />
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="lg:col-span-1">
                    <Card>
                        <CardContent className="p-4">
                            <h3 className="text-lg font-semibold mb-4">Filters</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Price</label>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Slider value={[price]} onValueChange={([v]) => setPrice(v)} max={150} step={1} />
                                        <span className="text-sm w-16 text-right">${price.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </aside>

                <main className="lg:col-span-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <Card key={product.name} className="overflow-hidden group">
                                <div className="relative">
                                    <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
                                    {product.sale && <Badge className="absolute top-2 left-2">SALE</Badge>}
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="secondary" size="icon" className="w-8 h-8 rounded-full">
                                            <HeartIcon className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <CardContent className="p-4 space-y-2">
                                    <h3 className="font-semibold text-lg">{product.name}</h3>
                                    <p className="text-[var(--color-muted-foreground)]">${product.price.toFixed(2)}</p>
                                    <Button className="w-full">
                                        <ShoppingCartIcon className="w-4 h-4 mr-2" /> Add to Cart
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default EcommercePreset;