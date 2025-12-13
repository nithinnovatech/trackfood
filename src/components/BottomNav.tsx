import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, ShoppingBag, User, Grid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

interface BottomNavProps {
    setIsCartOpen: (isOpen: boolean) => void;
}

const BottomNav = ({ setIsCartOpen }: BottomNavProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems } = useCart();
    const { isAuthenticated } = useAuth();
    const isActive = (path: string) => location.pathname === path;

    const handleAccountClick = () => {
        if (isAuthenticated) {
            navigate('/profile');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 md:hidden pb-safe">
            <div className="flex justify-around items-center h-16">
                <Link
                    to="/"
                    className={cn(
                        "flex flex-col items-center justify-center w-full h-full space-y-1 text-xs font-medium transition-colors",
                        isActive('/') ? "text-primary" : "text-muted-foreground hover:text-primary"
                    )}
                >
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                </Link>

                <Link
                    to="/categories"
                    className={cn(
                        "flex flex-col items-center justify-center w-full h-full space-y-1 text-xs font-medium transition-colors",
                        isActive('/categories') ? "text-primary" : "text-muted-foreground hover:text-primary"
                    )}
                >
                    <Grid className="h-5 w-5" />
                    <span>Catalog</span>
                </Link>

                <Link
                    to="/search"
                    className={cn(
                        "flex flex-col items-center justify-center w-full h-full space-y-1 text-xs font-medium transition-colors",
                        isActive('/search') ? "text-primary" : "text-muted-foreground hover:text-primary"
                    )}
                >
                    <Search className="h-5 w-5" />
                    <span>Search</span>
                </Link>

                <button
                    onClick={handleAccountClick}
                    className={cn(
                        "flex flex-col items-center justify-center w-full h-full space-y-1 text-xs font-medium transition-colors",
                        (isActive('/profile') || isActive('/login')) ? "text-primary" : "text-muted-foreground hover:text-primary"
                    )}
                >
                    <User className="h-5 w-5" />
                    <span>Account</span>
                </button>

                <button
                    onClick={() => setIsCartOpen(true)}
                    className="flex flex-col items-center justify-center w-full h-full space-y-1 text-xs font-medium text-muted-foreground hover:text-primary transition-colors relative"
                >
                    <div className="relative">
                        <ShoppingBag className="h-5 w-5" />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border border-white">
                                {cartItems.length}
                            </span>
                        )}
                    </div>
                    <span>Cart</span>
                </button>
            </div>
        </div>
    );
};

export default BottomNav;
