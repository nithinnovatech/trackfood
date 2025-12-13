import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Heart, ShoppingBag, User, LogOut, Package, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Cart from './Cart';
import MegaMenu from './MegaMenu';
import SearchBar from './SearchBar';
import asianBasketLogo from '@/assets/asian-basket-logo-light.jpg';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-card shadow-sm border-b border-border">
      {/* 1. Announcement Bar */}
      <div className="bg-primary text-primary-foreground py-1.5 px-4 text-xs font-medium text-center hidden sm:block">
        <p>🚚 Free Next Day Delivery on orders over €50! | 📞 Call us: +353 123 456 789</p>
      </div>

      {/* 2. Main Header */}
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">

          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link to="/" className="text-lg font-bold text-primary">Home</Link>
                  <Link to="/orders" className="text-lg font-medium">My Orders</Link>
                  <hr />
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground uppercase">Categories</p>
                    <Link to="/cat/fruits" className="block py-2">Fruits & Veg</Link>
                    <Link to="/cat/meat" className="block py-2">Meat & Poultry</Link>
                    <Link to="/cat/seafood" className="block py-2">Seafood</Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={asianBasketLogo}
                alt="Asian Basket - Fresh Organic Authentic"
                className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </Link>
          </div>

          {/* Search Bar - Hidden on small mobile, visible on desktop */}
          <div className="hidden md:flex flex-1 justify-center">
            <SearchBar />
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-1 md:gap-3">
            {/* Wishlist - Hidden on mobile */}
            <Button variant="ghost" size="icon" className="hidden md:inline-flex text-muted-foreground hover:text-primary hover:bg-secondary">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Account */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-3 bg-secondary/50 hover:bg-secondary text-primary rounded-full">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {user?.name?.[0].toUpperCase()}
                    </div>
                    <span className="hidden lg:inline-block max-w-[100px] truncate text-sm font-medium">
                      {user?.name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                    My Account
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/orders')}>
                    <Package className="mr-2 h-4 w-4" /> My Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <MapPin className="mr-2 h-4 w-4" /> Addresses
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" className="hidden md:inline-flex items-center gap-2 font-medium hover:text-primary">
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </Button>
              </Link>
            )}

            {/* Cart Trigger */}
            <Button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 md:px-5 h-10 md:h-11 shadow-md hover:shadow-lg transition-all"
            >
              <ShoppingBag className="h-5 w-5 md:mr-2" />
              <span className="hidden md:inline font-bold">My Cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-0.5 rounded-full border-2 border-background min-w-[20px]">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar - Mobile Only */}
        <div className="mt-3 md:hidden">
          <SearchBar />
        </div>
      </div>

      {/* 3. Mega Menu (Desktop only) */}
      <MegaMenu />

      <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </header>
  );
};

export default Header;
