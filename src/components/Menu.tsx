import { useState, useMemo } from 'react';
import { Search, Plus, Minus, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useCart, MenuItem } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import riceBowlImg from '@/assets/menu/rice-bowl.jpg';
import friedChickenImg from '@/assets/menu/fried-chicken.jpg';
import koreanTacoImg from '@/assets/menu/korean-taco.jpg';
import bulgogiFriesImg from '@/assets/menu/bulgogi-fries.jpg';
import kidsFriesImg from '@/assets/menu/kids-fries.jpg';
import dessertImg from '@/assets/menu/dessert.jpg';
import beveragesImg from '@/assets/menu/beverages.jpg';

const menuData: MenuItem[] = [
  // Rice Bowls
  { id: 'rb1', name: 'Bulgogi Rice Bowl', price: 16.99, category: 'Rice Bowls', image: riceBowlImg },
  { id: 'rb2', name: 'KFC Rice Bowl', price: 14.50, category: 'Rice Bowls', image: riceBowlImg },
  { id: 'rb3', name: 'GFC Rice Bowl', price: 14.50, category: 'Rice Bowls', image: riceBowlImg },
  { id: 'rb4', name: 'Plant Based Rice Bowl (Vegan)', price: 14.50, category: 'Rice Bowls', image: riceBowlImg },
  
  // Korean Fried Chicken
  { id: 'kfc1', name: '10 pcs Korean Fried Chicken', price: 14.00, category: 'Korean Fried Chicken', image: friedChickenImg },
  { id: 'kfc2', name: '10 pcs Glazed Fried Chicken (Sweet and Spicy)', price: 14.00, category: 'Korean Fried Chicken', image: friedChickenImg },
  { id: 'kfc3', name: '10 pcs Glazed Fried Chicken (Soy Garlic)', price: 14.00, category: 'Korean Fried Chicken', image: friedChickenImg },
  
  // Korean Tacos
  { id: 'kt1', name: 'Bulgogi Taco', price: 6.50, category: 'Korean Tacos', image: koreanTacoImg },
  { id: 'kt2', name: 'Gangjung Fried Chicken Taco', price: 6.50, category: 'Korean Tacos', image: koreanTacoImg },
  { id: 'kt3', name: 'KFC Taco', price: 6.50, category: 'Korean Tacos', image: koreanTacoImg },
  { id: 'kt4', name: '3 Homies', price: 16.00, category: 'Korean Tacos', image: koreanTacoImg },
  
  // Appetizers/Sides
  { id: 'app1', name: 'Bulgogi Fries', price: 13.00, category: 'Appetizers/Sides', image: bulgogiFriesImg },
  { id: 'app2', name: 'Fried Mandu', price: 7.00, category: 'Appetizers/Sides', image: bulgogiFriesImg },
  { id: 'app3', name: 'Mandu Gangjung', price: 9.00, category: 'Appetizers/Sides', image: bulgogiFriesImg },
  
  // Kids Friendly
  { id: 'kf1', name: 'Dino Nuggets (4)', price: 5.99, category: 'Kids Friendly', image: kidsFriesImg },
  { id: 'kf2', name: 'Onion Rings', price: 5.99, category: 'Kids Friendly', image: kidsFriesImg },
  { id: 'kf3', name: 'Veg Spring Rolls', price: 4.99, category: 'Kids Friendly', image: kidsFriesImg },
  { id: 'kf4', name: 'Crinkle Cut Fries', price: 6.50, category: 'Kids Friendly', image: kidsFriesImg },
  
  // Desserts
  { id: 'des1', name: 'Chocolate Chip Cookie', price: 3.00, category: 'Desserts', image: dessertImg },
  { id: 'des2', name: 'Chewy Marshmallow with Brown Butter Bar', price: 4.00, category: 'Desserts', image: dessertImg },
  { id: 'des3', name: 'Coffee Cake Sour Cream', price: 4.00, category: 'Desserts', image: dessertImg },
  
  // Beverages
  { id: 'bev1', name: 'Soft Drinks (Coke/Sprite/Dr. Pepper)', price: 2.50, category: 'Beverages', image: beveragesImg },
  { id: 'bev2', name: 'Iced Tea', price: 2.99, category: 'Beverages', image: beveragesImg },
  { id: 'bev3', name: 'Water', price: 1.00, category: 'Beverages', image: beveragesImg },
];

const categories = ['All', ...Array.from(new Set(menuData.map(item => item.category)))];

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { addToCart } = useCart();
  const { toast } = useToast();

  const filteredItems = useMemo(() => {
    return menuData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getQuantity = (itemId: string) => quantities[itemId] || 1;

  const incrementQuantity = (itemId: string) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 1) + 1
    }));
  };

  const decrementQuantity = (itemId: string) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) - 1)
    }));
  };

  const handleAddToCart = (item: MenuItem) => {
    const quantity = getQuantity(item.id);
    for (let i = 0; i < quantity; i++) {
      addToCart(item);
    }
    toast({
      title: 'Added to cart',
      description: `${quantity}x ${item.name} has been added to your cart.`,
    });
    setQuantities(prev => ({ ...prev, [item.id]: 1 }));
  };

  return (
    <section id="menu" className="py-16 px-4 md:px-8 bg-background relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
          Our Menu
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Authentic Korean flavors served fresh from our food truck
        </p>

        {/* Search Bar */}
        <div className="mb-8 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-2 focus:border-secondary"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-10 overflow-x-auto">
          <div className="flex gap-2 justify-center flex-wrap min-w-max px-4">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={`${
                  selectedCategory === category
                    ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                    : 'hover:bg-secondary/10'
                } transition-all duration-300 whitespace-nowrap`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-secondary overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-semibold text-white bg-primary px-3 py-1 rounded-full shadow-lg">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <CardContent className="pt-4">
                <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors min-h-[3rem]">
                  {item.name}
                </h3>
                <p className="text-2xl font-bold text-primary">
                  ${item.price.toFixed(2)}
                </p>
              </CardContent>
              
              <CardFooter className="flex-col gap-3 pb-4">
                {/* Quantity Selector */}
                <div className="flex items-center justify-center gap-3 w-full">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => decrementQuantity(item.id)}
                    className="h-9 w-9 rounded-full border-2 border-secondary hover:bg-secondary hover:text-secondary-foreground transition-all"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-bold text-foreground min-w-[2rem] text-center">
                    {getQuantity(item.id)}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => incrementQuantity(item.id)}
                    className="h-9 w-9 rounded-full border-2 border-secondary hover:bg-secondary hover:text-secondary-foreground transition-all"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Add to Cart Button */}
                <Button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold group/btn h-11"
                >
                  <Plus className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No items found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Floating Category Filter Button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-24 right-6 h-14 w-14 rounded-full shadow-2xl bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-110 transition-all duration-300 z-40 md:hidden"
          >
            <Filter className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[50vh]">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-primary">Filter by Category</SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={`${
                  selectedCategory === category
                    ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                    : 'hover:bg-secondary/10'
                } transition-all duration-300 h-12 text-base`}
              >
                {category}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default Menu;
