import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface WeightOption {
    weight: string;
    label: string;
}

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    pricePerKg?: number;
    availableWeights?: WeightOption[];
}

interface CategorySectionProps {
    title: string;
    products: Product[];
    bgColor?: string;
    categorySlug: string;
}

const CategorySection = ({ title, products, bgColor = 'bg-white', categorySlug }: CategorySectionProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { addToCart } = useCart();
    const { toast } = useToast();
    const [selectedWeights, setSelectedWeights] = useState<Record<string, string>>({});
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

    const handleWeightChange = (productId: string, weight: string) => {
        setSelectedWeights(prev => ({ ...prev, [productId]: weight }));
    };

    const calculatePrice = (product: Product) => {
        if (!product.pricePerKg || !product.availableWeights) return product.price;
        const selectedWeight = selectedWeights[product.id] || product.availableWeights[0]?.weight || '1';
        return product.pricePerKg * parseFloat(selectedWeight);
    };

    const handleAddToCart = (item: Product) => {
        const selectedWeight = selectedWeights[item.id];
        const finalPrice = calculatePrice(item);
        const weightLabel = item.availableWeights?.find(w => w.weight === selectedWeight)?.label || '';

        addToCart({
            ...item,
            price: finalPrice,
            name: weightLabel ? `${item.name} - ${weightLabel}` : item.name
        });
        toast({
            title: "Added to cart",
            description: `${item.name}${weightLabel ? ` (${weightLabel})` : ''} has been added to your cart.`,
        });
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.8;
            if (direction === 'left') {
                scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            <section className={`py-12 ${bgColor}`}>
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                            {title}
                        </h2>
                        <div className="flex items-center gap-2">
                            <Link to={`/category/${categorySlug}`} className="text-sm font-semibold text-primary hover:underline mr-2 hidden sm:block">
                                View All
                            </Link>
                            <Button
                                variant="outline" size="icon"
                                className="h-8 w-8 rounded-full border-primary/20 hover:bg-primary hover:text-white transition-colors"
                                onClick={() => scroll('left')}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline" size="icon"
                                className="h-8 w-8 rounded-full border-primary/20 hover:bg-primary hover:text-white transition-colors"
                                onClick={() => scroll('right')}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x"
                    >
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="min-w-[200px] w-[200px] md:min-w-[240px] md:w-[240px] snap-start bg-card rounded-xl border border-border p-3 hover:shadow-lg transition-all group relative"
                            >
                                {/* Product Image */}
                                <div
                                    className="relative aspect-square rounded-lg overflow-hidden mb-3 bg-secondary/10 cursor-pointer"
                                    onClick={() => setQuickViewProduct(product)}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        crossOrigin="anonymous"
                                        loading="lazy"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = 'https://placehold.co/400x400/6B9B5A/white?text=Product+Image';
                                        }}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />

                                    {/* Overlay Buttons */}
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        {/* Quick View Button */}
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="h-8 w-8 rounded-full shadow-md bg-white hover:bg-white text-foreground"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setQuickViewProduct(product);
                                            }}
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    {/* Badge if needed */}
                                    <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                        FRESH
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-sm line-clamp-2 min-h-[40px]" title={product.name}>
                                        {product.name}
                                    </h3>

                                    {/* Weight Selector for products with variants */}
                                    {product.availableWeights && product.availableWeights.length > 0 && (
                                        <Select
                                            value={selectedWeights[product.id] || product.availableWeights[0].weight}
                                            onValueChange={(value) => handleWeightChange(product.id, value)}
                                        >
                                            <SelectTrigger className="h-8 text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {product.availableWeights.map((option) => (
                                                    <SelectItem key={option.weight} value={option.weight} className="text-xs">
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}

                                    <div className="flex items-center justify-between mt-2">
                                        <div>
                                            {product.pricePerKg ? (
                                                <>
                                                    <div className="text-xs text-muted-foreground mb-0.5">
                                                        €{product.pricePerKg.toFixed(2)}/kg
                                                    </div>
                                                    <div className="font-bold text-lg text-primary">
                                                        €{calculatePrice(product).toFixed(2)}
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-xs text-muted-foreground line-through mr-1">
                                                        €{(product.price * 1.2).toFixed(2)}
                                                    </span>
                                                    <div className="font-bold text-lg text-primary">
                                                        €{product.price.toFixed(2)}
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <Button
                                            size="icon"
                                            className="h-9 w-9 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-white shadow-sm transition-colors border border-primary/10"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            <Plus className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick View Modal */}
            <Dialog open={!!quickViewProduct} onOpenChange={(open) => !open && setQuickViewProduct(null)}>
                <DialogContent className="max-w-3xl p-0 overflow-hidden">
                    <DialogTitle className="sr-only">
                        {quickViewProduct?.name || 'Product Quick View'}
                    </DialogTitle>
                    {quickViewProduct && (
                        <div className="relative">
                            {/* Close Button */}
                            <Button
                                size="icon"
                                variant="ghost"
                                className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white rounded-full"
                                onClick={() => setQuickViewProduct(null)}
                            >
                                <X className="h-5 w-5" />
                            </Button>

                            {/* Large Product Image */}
                            <div className="w-full aspect-square max-h-[70vh] bg-secondary/10">
                                <img
                                    src={quickViewProduct.image}
                                    alt={quickViewProduct.name}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'https://placehold.co/800x800/6B9B5A/white?text=Product+Image';
                                    }}
                                />
                            </div>

                            {/* Product Info */}
                            <div className="p-6 bg-white">
                                <h2 className="text-xl font-bold mb-2">{quickViewProduct.name}</h2>
                                <p className="text-2xl font-bold text-primary">
                                    €{quickViewProduct.price.toFixed(2)}
                                </p>
                                <Button
                                    className="w-full mt-4 bg-primary hover:bg-primary/90"
                                    onClick={() => {
                                        handleAddToCart(quickViewProduct);
                                        setQuickViewProduct(null);
                                    }}
                                >
                                    <Plus className="h-5 w-5 mr-2" />
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CategorySection;
