import { useState } from 'react';
import { ChevronDown, ChevronRight, Apple, Beef, Wheat, Coffee, Fish, Milk } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const categories = [
    {
        id: 'fruits-veg',
        name: 'Fruits & Vegetables',
        icon: Apple,
        subcategories: [
            'Fresh Vegetables', 'Fresh Fruits', 'Leafy Vegetables', 'Exotic Fruits', 'Organic Produce'
        ]
    },
    {
        id: 'meat',
        name: 'Meat & Poultry',
        icon: Beef,
        subcategories: [
            'Fresh Chicken', 'Lamb & Mutton', 'Fresh Beef', 'Marinated Meat', 'Frozen Meat'
        ]
    },
    {
        id: 'seafood',
        name: 'Fresh Seafood',
        icon: Fish,
        subcategories: [
            'Fresh Fish', 'Prawns & Shrimps', 'Crab & Lobster', 'Frozen Seafood', 'Dry Fish'
        ]
    },
    {
        id: 'staples',
        name: 'Rice & Flour',
        icon: Wheat,
        subcategories: [
            'Basmati Rice', 'Sona Masoori', 'Atta & Flours', 'Pulses & Dals', 'Cooking Oils'
        ]
    },
    {
        id: 'dairy',
        name: 'Dairy & Bakery',
        icon: Milk,
        subcategories: [
            'Milk & Curd', 'Paneer', 'Butter & Ghee', 'Bread & Buns', 'Eggs'
        ]
    },
    {
        id: 'snacks',
        name: 'Snacks & Drinks',
        icon: Coffee,
        subcategories: [
            'Biscuits', 'Noodles', 'Tea & Coffee', 'Cold Drinks', 'Indian Sweets'
        ]
    }
];

const MegaMenu = () => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    return (
        <div className="hidden md:block bg-secondary/30 border-b border-border">
            <div className="container mx-auto px-4">
                <ul className="flex items-center justify-between gap-1 text-sm font-medium">
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className="group relative"
                            onMouseEnter={() => setActiveCategory(category.id)}
                            onMouseLeave={() => setActiveCategory(null)}
                        >
                            <Link
                                to={`/category/${category.id}`}
                                className={cn(
                                    "flex items-center gap-2 py-3 px-4 hover:bg-white hover:text-primary transition-colors rounded-t-md",
                                    activeCategory === category.id && "bg-white text-primary shadow-sm"
                                )}
                            >
                                <category.icon className="w-4 h-4" />
                                {category.name}
                                <ChevronDown className="w-3 h-3 opacity-50" />
                            </Link>

                            {/* Mega Dropdown */}
                            <div
                                className={cn(
                                    "absolute top-full left-0 w-64 bg-white shadow-xl rounded-b-md border border-border z-50 transform origin-top transition-all duration-200",
                                    activeCategory === category.id
                                        ? "opacity-100 scale-100 visible"
                                        : "opacity-0 scale-95 invisible"
                                )}
                            >
                                <ul className="py-2">
                                    {category.subcategories.map((sub, idx) => (
                                        <li key={idx}>
                                            <Link
                                                to={`/search?q=${sub}`}
                                                className="flex items-center justify-between px-4 py-2 hover:bg-secondary/50 text-foreground/80 hover:text-primary transition-colors"
                                            >
                                                {sub}
                                                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        </li>
                                    ))}
                                    <li className="mt-2 pt-2 border-t border-dashed border-border px-4 pb-2">
                                        <Link to={`/category/${category.id}`} className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                                            View all {category.name} <ChevronRight className="w-3 h-3" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    ))}
                    <li>
                        <Link to="/offers" className="flex items-center gap-2 py-3 px-4 text-accent hover:text-accent/80 font-bold animate-pulse">
                            Offers
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MegaMenu;
