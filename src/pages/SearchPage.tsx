import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import Cart from '@/components/Cart';
import CategorySection from '@/components/CategorySection';

// All available products for searching
const allProducts = [
    // Rice & Staples
    { id: "r1", name: "Premium Basmati Rice - 5kg", price: 18.99, category: "Pantry", image: "https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "r2", name: "Sona Masoori Rice - 10kg", price: 24.50, category: "Pantry", image: "https://images.pexels.com/photos/7456426/pexels-photo-7456426.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "r3", name: "Organic Brown Rice - 1kg", price: 6.99, category: "Pantry", image: "https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=400" },

    // Vegetables
    { id: "v1", name: "Fresh Okra (Bhindi) - 500g", price: 4.99, category: "Vegetables", image: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "v2", name: "Fresh Curry Leaves - Bunch", price: 1.50, category: "Vegetables", image: "https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "v3", name: "Green Chilli - 200g", price: 2.20, category: "Vegetables", image: "https://images.pexels.com/photos/7456396/pexels-photo-7456396.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "v4", name: "Red Onion - 1kg", price: 1.80, category: "Vegetables", image: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "v5", name: "Fresh Tomatoes - 1kg", price: 3.99, category: "Vegetables", image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "v6", name: "Fresh Spinach - Bunch", price: 2.20, category: "Vegetables", image: "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=400" },

    // Fruits
    { id: "f1", name: "Green Apples - 6pcs", price: 4.50, category: "Fruits", image: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "f2", name: "Bananas - 1kg", price: 2.99, category: "Fruits", image: "https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400" },

    // Meat
    { id: "m1", name: "Fresh Chicken Breast - 1kg", price: 9.99, category: "Meat", image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "m2", name: "Lamb Curry Cut - 1kg", price: 16.50, category: "Meat", image: "https://images.pexels.com/photos/3688/food-dinner-lunch-unhealthy.jpg?auto=compress&cs=tinysrgb&w=400" },
    { id: "m3", name: "Fresh Chicken - Whole", price: 8.50, category: "Meat", image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400" },

    // Seafood
    { id: "sf1", name: "Fresh Salmon - 500g", price: 12.99, category: "Seafood", image: "https://images.pexels.com/photos/1683545/pexels-photo-1683545.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "sf2", name: "Prawns - 500g", price: 14.50, category: "Seafood", image: "https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "sf3", name: "Fresh Fish - 1kg", price: 11.99, category: "Seafood", image: "https://images.pexels.com/photos/1683545/pexels-photo-1683545.jpeg?auto=compress&cs=tinysrgb&w=400" },

    // Dairy
    { id: "d1", name: "Fresh Milk - 1L", price: 1.99, category: "Dairy", image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "d2", name: "Paneer - 200g", price: 3.50, category: "Dairy", image: "https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=400" },
];

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const query = searchParams.get('q') || '';

    // Filter products based on search query
    const searchResults = allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background pb-16 md:pb-0">
            <Header />

            <div className="pt-[106px] md:pt-[132px]">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-2 text-primary">Search Results</h1>
                    <p className="text-muted-foreground mb-8">
                        {searchResults.length > 0
                            ? `Found ${searchResults.length} product${searchResults.length !== 1 ? 's' : ''} for "${query}"`
                            : `No products found for "${query}"`
                        }
                    </p>
                </div>

                {searchResults.length > 0 ? (
                    <CategorySection title={`Results for "${query}"`} products={searchResults} />
                ) : (
                    <div className="container mx-auto px-4 py-16 text-center">
                        <p className="text-muted-foreground mb-4">Try searching for something else</p>
                        <p className="text-sm text-muted-foreground">Popular searches: Rice, Vegetables, Chicken, Fish</p>
                    </div>
                )}
            </div>

            <Footer />
            <BottomNav setIsCartOpen={setIsCartOpen} />
            <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
        </div>
    );
};

export default SearchPage;
