import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import Cart from '@/components/Cart';
import CategorySection from '@/components/CategorySection';

// Mock product data - Food Truck Menu Categories
const allProducts = {
    'rice-bowls': [
        { id: "rb1", name: "Korean BBQ Bowl", price: 12.99, category: "Rice Bowls", image: "https://images.pexels.com/photos/2092906/pexels-photo-2092906.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: "rb2", name: "Bulgogi Rice Bowl", price: 13.99, category: "Rice Bowls", image: "https://images.pexels.com/photos/5409020/pexels-photo-5409020.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: "rb3", name: "Spicy Pork Bowl", price: 11.99, category: "Rice Bowls", image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400" },
    ],
    'korean-fried-chicken': [
        { id: "kfc1", name: "Classic Fried Chicken", price: 10.99, category: "Korean Fried Chicken", image: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: "kfc2", name: "Spicy Gochujang Wings", price: 11.99, category: "Korean Fried Chicken", image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: "kfc3", name: "Honey Garlic Chicken", price: 12.99, category: "Korean Fried Chicken", image: "https://images.pexels.com/photos/6210747/pexels-photo-6210747.jpeg?auto=compress&cs=tinysrgb&w=400" },
    ],
    'korean-tacos': [
        { id: "kt1", name: "Bulgogi Tacos (3pcs)", price: 9.99, category: "Korean Tacos", image: "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: "kt2", name: "Spicy Pork Tacos (3pcs)", price: 9.99, category: "Korean Tacos", image: "https://images.pexels.com/photos/4958641/pexels-photo-4958641.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: "kt3", name: "Chicken Tacos (3pcs)", price: 8.99, category: "Korean Tacos", image: "https://images.pexels.com/photos/7613568/pexels-photo-7613568.jpeg?auto=compress&cs=tinysrgb&w=400" },
    ],
    'appetizers-sides': [
        { id: "as1", name: "Korean Fried Dumplings", price: 6.99, category: "Appetizers/Sides", image: "https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: "as2", name: "Kimchi Fries", price: 5.99, category: "Appetizers/Sides", image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: "as3", name: "Korean Corn Dog", price: 4.99, category: "Appetizers/Sides", image: "https://images.pexels.com/photos/4518655/pexels-photo-4518655.jpeg?auto=compress&cs=tinysrgb&w=400" },
    ],
    'kids-friendly': [
        { id: "kf1", name: "Mini Chicken Bites", price: 6.99, category: "Kids Friendly", image: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: "kf2", name: "Kids Rice Bowl", price: 7.99, category: "Kids Friendly", image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400" },
    ],
    'desserts': [
        { id: "ds1", name: "Korean Bingsu", price: 7.99, category: "Desserts", image: "https://images.pexels.com/photos/1352270/pexels-photo-1352270.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: "ds2", name: "Hotteok (Sweet Pancake)", price: 4.99, category: "Desserts", image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400" },
    ],
    'beverages': [
        { id: "bv1", name: "Korean Iced Tea", price: 3.99, category: "Beverages", image: "https://images.pexels.com/photos/792613/pexels-photo-792613.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: "bv2", name: "Banana Milk", price: 2.99, category: "Beverages", image: "https://images.pexels.com/photos/1435706/pexels-photo-1435706.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: "bv3", name: "Soda", price: 1.99, category: "Beverages", image: "https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?auto=compress&cs=tinysrgb&w=400" },
    ],
};

const categoryNames: Record<string, string> = {
    'rice-bowls': 'Rice Bowls',
    'korean-fried-chicken': 'Korean Fried Chicken',
    'korean-tacos': 'Korean Tacos',
    'appetizers-sides': 'Appetizers/Sides',
    'kids-friendly': 'Kids Friendly',
    'desserts': 'Desserts',
    'beverages': 'Beverages',
};

const CategoryPage = () => {
    const { id } = useParams<{ id: string }>();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const products = id ? allProducts[id as keyof typeof allProducts] || [] : [];
    const categoryName = id ? categoryNames[id] || 'Products' : 'Products';

    return (
        <div className="min-h-screen bg-background pb-16 md:pb-0">
            <Header />

            <div className="pt-[188px] md:pt-[200px]">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-2 text-primary">{categoryName}</h1>
                    <p className="text-muted-foreground mb-8">Browse our selection of {categoryName.toLowerCase()}</p>
                </div>

                {products.length > 0 ? (
                    <CategorySection title={categoryName} products={products} categorySlug={id || ''} />
                ) : (
                    <div className="container mx-auto px-4 py-16 text-center">
                        <p className="text-muted-foreground">No products found in this category.</p>
                    </div>
                )}
            </div>

            <Footer />
            <BottomNav setIsCartOpen={setIsCartOpen} />
            <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
        </div>
    );
};

export default CategoryPage;
