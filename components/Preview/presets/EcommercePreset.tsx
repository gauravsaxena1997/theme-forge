import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { Slider } from '../../ui/Slider';
import { Select } from '../../ui/Select';
import { HeartIcon, SearchIcon, ShoppingCartIcon } from '../../icons';
import { useToast } from '../../ui/Toast';
import { fetchPexelsImages } from '../../../utils/pexels';
import { Skeleton } from '../../ui/Skeleton';

const productData = [
    { name: 'Quantum Hoodie', price: 69.99, category: 'Apparel', onSale: true, inStock: true, query: 'modern hoodie' },
    { name: 'Nebula T-Shirt', price: 29.99, category: 'Apparel', onSale: false, inStock: true, query: 'stylish t-shirt' },
    { name: 'Gravity Sneakers', price: 129.99, category: 'Footwear', onSale: false, inStock: true, query: 'fashion sneaker' },
    { name: 'Cosmic Cap', price: 24.99, category: 'Accessories', onSale: true, inStock: false, query: 'baseball cap' },
    { name: 'Stardust Socks', price: 12.99, category: 'Accessories', onSale: false, inStock: true, query: 'colorful socks' },
    { name: 'Meteor Joggers', price: 89.99, category: 'Apparel', onSale: false, inStock: true, query: 'grey joggers' },
];

const CATEGORIES = ['All', 'Apparel', 'Footwear', 'Accessories'];
const SORT_OPTIONS = [{value: 'price-asc', label: 'Price: Low to High'}, {value: 'price-desc', label: 'Price: High to Low'}];


const EcommercePreset: React.FC = () => {
    const { toast } = useToast();
    const [price, setPrice] = useState(150);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const [sortBy, setSortBy] = useState('price-asc');
    const [images, setImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            setIsLoading(true);
            const imagePromises = productData.map(p => fetchPexelsImages(p.query, 1));
            const fetchedImages = await Promise.all(imagePromises);
            setImages(fetchedImages.map(imgArr => imgArr[0] || ''));
            setIsLoading(false);
        };
        fetchImages();
    }, []);

    const filteredProducts = useMemo(() => {
        let products = productData
            .filter(p => p.price <= price)
            .filter(p => searchTerm === '' || p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        
        if (category !== 'All') {
            products = products.filter(p => p.category === category);
        }

        products.sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            return 0;
        });

        return products;
    }, [price, searchTerm, category, sortBy]);
    
    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row items-center justify-between gap-4">
                <h1 className="text-3xl font-bold tracking-tight" style={{fontFamily: 'var(--font-heading)'}}>New Arrivals</h1>
                <div className="relative w-full md:w-64">
                    <Input placeholder="Search products..." className="pr-10" onChange={e => setSearchTerm(e.target.value)} value={searchTerm} />
                    <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted-foreground)]" />
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardContent className="p-4">
                            <h3 className="text-lg font-semibold mb-4">Filters</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Max Price</label>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Slider value={[price]} onValueChange={([v]) => setPrice(v)} max={150} step={1} />
                                        <span className="text-sm w-16 text-right">${price.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Category</label>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {CATEGORIES.map(cat => (
                                            <Button key={cat} variant={category === cat ? 'default' : 'outline'} size="sm" onClick={() => setCategory(cat)}>
                                                {cat}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </aside>

                <main className="lg:col-span-3">
                    <div className="flex justify-end mb-4">
                         <Select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-48 h-9 text-sm">
                            {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </Select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredProducts.map((product, index) => (
                            <Card key={product.name} className="overflow-hidden group">
                                <div className="relative">
                                    {isLoading ? (
                                        <Skeleton className="w-full h-56" />
                                    ) : (
                                        <img src={images[productData.findIndex(p => p.name === product.name)]} alt={product.name} className="w-full h-56 object-cover" />
                                    )}
                                    {product.onSale && <Badge className="absolute top-2 left-2">SALE</Badge>}
                                    {!product.inStock && <Badge variant="destructive" className="absolute top-2 left-2">Out of Stock</Badge>}
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="secondary" size="icon" className="w-8 h-8 rounded-full" onClick={() => toast('Added to your wishlist!', 'info')}>
                                            <HeartIcon className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <CardContent className="p-4 space-y-2">
                                    <h3 className="font-semibold text-lg">{product.name}</h3>
                                    <p className="text-[var(--color-muted-foreground)]">${product.price.toFixed(2)}</p>
                                    <Button className="w-full" disabled={!product.inStock} onClick={() => toast('Item added to cart!', 'success')}>
                                        <ShoppingCartIcon className="w-4 h-4 mr-2" /> {product.inStock ? 'Add to Cart' : 'Out of Stock'}
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
