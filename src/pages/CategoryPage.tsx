import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import CategorySection from '@/components/CategorySection';

// Mock product data - you can expand this later
const allProducts = {
    'fruits-veg': [
        { id: "fv1", name: "Fresh Tomatoes - 1kg", price: 3.99, category: "Vegetables", image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: "fv2", name: "Green Apples - 6pcs", price: 4.50, category: "Fruits", image: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: "fv3", name: "Fresh Spinach - Bunch", price: 2.20, category: "Vegetables", image: "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: "fv4", name: "Bananas - 1kg", price: 2.99, category: "Fruits", image: "https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400" },
    ],
    'meat': [
        { id: "m1", name: "Fresh Chicken Breast - 1kg", price: 9.99, category: "Meat", image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: "m2", name: "Lamb Curry Cut - 1kg", price: 16.50, category: "Meat", image: "https://images.pexels.com/photos/3688/food-dinner-lunch-unhealthy.jpg?auto=compress&cs=tinysrgb&w=400" },
        { id: "m3", name: "Beef Mince - 500g", price: 5.99, category: "Meat", image: "https://images.pexels.com/photos/3688/food-dinner-lunch-unhealthy.jpg?auto=compress&cs=tinysrgb&w=400" },
    ],
    'seafood': [
        { id: "sf1", name: "Fresh Salmon - 500g", price: 12.99, category: "Seafood", image: "https://images.pexels.com/photos/1683545/pexels-photo-1683545.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: "sf2", name: "Prawns - 500g", price: 14.50, category: "Seafood", image: "https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=400" },
    ],
    'staples': [
        { id: "r1", name: "Premium Basmati Rice - 5kg", price: 18.99, category: "Pantry", image: "https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: "r2", name: "Sona Masoori Rice - 10kg", price: 24.50, category: "Pantry", image: "https://images.pexels.com/photos/7456426/pexels-photo-7456426.jpeg?auto=compress&cs=tinysrgb&w=400" },
    ],
    'dairy': [
        { id: "d1", name: "Fresh Milk - 1L", price: 1.99, category: "Dairy", image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: "d2", name: "Paneer - 200g", price: 3.50, category: "Dairy", image: "https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=400" },
    ],
    'snacks': [
        { id: "sn1", name: "Potato Chips - 200g", price: 2.99, category: "Snacks", image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { id: "sn2", name: "Biscuits Pack", price: 3.50, category: "Snacks", image: "https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg?auto=compress&cs=tinysrgb&w=400" },
    ],
};

const categoryNames: Record<string, string> = {
    'fruits-veg': 'Fruits & Vegetables',
    'meat': 'Meat & Poultry',
    'seafood': 'Fresh Seafood',
    'staples': 'Rice & Flour',
    'dairy': 'Dairy & Bakery',
    'snacks': 'Snacks & Drinks',
};

const CategoryPage = () => {
    const { id } = useParams<{ id: string }>();
    const products = id ? allProducts[id as keyof typeof allProducts] || [] : [];
    const categoryName = id ? categoryNames[id] || 'Products' : 'Products';

    return (
        <div className="min-h-screen bg-background pb-16 md:pb-0">
            <Header />

            <div className="pt-[106px] md:pt-[132px]">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-2 text-primary">{categoryName}</h1>
                    <p className="text-muted-foreground mb-8">Browse our selection of {categoryName.toLowerCase()}</p>
                </div>

                {products.length > 0 ? (
                    <CategorySection title={categoryName} products={products} />
                ) : (
                    <div className="container mx-auto px-4 py-16 text-center">
                        <p className="text-muted-foreground">No products found in this category.</p>
                    </div>
                )}
            </div>

            <Footer />
            <BottomNav />
        </div>
    );
};

export default CategoryPage;
