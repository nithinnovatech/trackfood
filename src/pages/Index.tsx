import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CategoryTabs from "@/components/CategoryTabs";
import TrendingSection from "@/components/TrendingSection";
import CategorySection from "@/components/CategorySection";
import BottomNav from "@/components/BottomNav";

// Mock Data for Grocery Style Transformation
const riceProducts = [
  { id: "r1", name: "Premium Basmati Rice - 5kg", price: 18.99, category: "Pantry", image: "https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "r2", name: "Sona Masoori Rice - 10kg", price: 24.50, category: "Pantry", image: "https://images.pexels.com/photos/7456426/pexels-photo-7456426.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "r3", name: "Organic Brown Rice - 1kg", price: 6.99, category: "Pantry", image: "https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "r4", name: "Jasmine Rice - 2kg", price: 8.50, category: "Pantry", image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "r5", name: "Idli Rice - 5kg", price: 14.99, category: "Pantry", image: "https://images.pexels.com/photos/7456426/pexels-photo-7456426.jpeg?auto=compress&cs=tinysrgb&w=400" },
];

const vegProducts = [
  { id: "v1", name: "Fresh Okra (Bhindi) - 500g", price: 4.99, category: "Vegetables", image: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "v2", name: "Fresh Curry Leaves - Bunch", price: 1.50, category: "Vegetables", image: "https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "v3", name: "Green Chilli - 200g", price: 2.20, category: "Vegetables", image: "https://images.pexels.com/photos/7456396/pexels-photo-7456396.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "v4", name: "Red Onion - 1kg", price: 1.80, category: "Vegetables", image: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "v5", name: "Coriander Bunch", price: 1.20, category: "Vegetables", image: "https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=400" },
];

const meatProducts = [
  { id: "m1", name: "Fresh Chicken Breast - 1kg", price: 9.99, category: "Meat", image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: "m2", name: "Lamb Curry Cut - 1kg", price: 16.50, category: "Meat", image: "https://images.pexels.com/photos/3688/food-dinner-lunch-unhealthy.jpg?auto=compress&cs=tinysrgb&w=400" },
  { id: "m3", name: "Beef Mince - 500g", price: 5.99, category: "Meat", image: "https://images.pexels.com/photos/3688/food-dinner-lunch-unhealthy.jpg?auto=compress&cs=tinysrgb&w=400" },
  { id: "m4", name: "Whole Chicken - 1.2kg", price: 8.50, category: "Meat", image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400" },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />

      {/* 1. Hero */}
      <div className="pt-[106px] md:pt-[132px]"> {/* Adjusting for fixed header height */}
        <Hero />
      </div>

      {/* 2. Category Tabs */}
      <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 3. Trending Tags */}
      <TrendingSection />

      <main>
        {/* 4. Category Sections */}
        {(activeTab === 'all' || activeTab === 'pantry') && (
          <CategorySection title="Rice & Staples" products={riceProducts} />
        )}

        {(activeTab === 'all' || activeTab === 'vegetables') && (
          <CategorySection title="Fresh Vegetables" products={vegProducts} bgColor="bg-secondary/20" />
        )}

        {(activeTab === 'all' || activeTab === 'meat') && (
          <CategorySection title="Meat & Poultry" products={meatProducts} />
        )}

        {/* 5. Additional Promo Section */}
        <section className="py-12 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative rounded-2xl overflow-hidden h-[250px] md:h-[300px] group cursor-pointer">
                <img src="https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&q=80&w=800" alt="Exotic Fruits" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8 z-10">
                  <h3 className="text-3xl font-bold text-white mb-2">Exotic Fruits</h3>
                  <p className="text-white/90 mb-4">Fresh seasonal fruits from around the world.</p>
                  <button className="w-fit bg-white text-primary px-6 py-2 rounded-full font-bold hover:bg-white/90">Shop Range</button>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden h-[250px] md:h-[300px] group cursor-pointer">
                <img src="https://images.unsplash.com/photo-1615486511484-92e590508937?auto=format&fit=crop&q=80&w=800" alt="Frozen Foods" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8 z-10">
                  <h3 className="text-3xl font-bold text-white mb-2">Frozen Essentials</h3>
                  <p className="text-white/90 mb-4">Stock up your freezer with our premium range.</p>
                  <button className="w-fit bg-white text-primary px-6 py-2 rounded-full font-bold hover:bg-white/90">View All</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Newsletter / Club */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join VegSpot Community Club</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Receive latest updates about discount offers, new products, and exclusive recipes directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 h-12 px-4 rounded-full text-foreground border-none focus:ring-2 focus:ring-white"
              />
              <button className="h-12 px-8 bg-secondary text-secondary-foreground font-bold rounded-full hover:bg-secondary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default Index;
