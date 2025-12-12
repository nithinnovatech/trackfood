import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, ShoppingBag, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/fow-logo.webp";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src={logo}
                alt="Flavor on Wheels"
                className="h-16 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="/#home"
              className="text-primary-foreground hover:text-accent font-semibold transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              Home
            </a>
            <a
              href="/#menu"
              className="text-primary-foreground hover:text-accent font-semibold transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              Menu
            </a>
            <a
              href="/#food"
              className="text-primary-foreground hover:text-accent font-semibold transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              About
            </a>
            <a
              href="/#contact"
              className="text-primary-foreground hover:text-accent font-semibold transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </a>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-primary-foreground hover:bg-primary/80 hover:text-accent"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <span className="text-accent-foreground font-bold text-sm">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-semibold">{user?.name?.split(' ')[0]}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/orders')}>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
                  Login
                </Button>
              </Link>
            )}

            <a
              href="/#menu"
              className="bg-accent text-accent-foreground px-6 py-2.5 rounded-full font-bold hover:bg-accent/90 transition-all duration-300 hover:scale-105 shadow-md"
            >
              Order Now
            </a>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col items-center justify-center gap-1">
              <span
                className={`w-6 h-0.5 bg-accent transition-all duration-300 ease-in-out ${isOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
              />
              <span
                className={`w-4 h-0.5 bg-accent transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"
                  }`}
              />
              <span
                className={`w-6 h-0.5 bg-accent transition-all duration-300 ease-in-out ${isOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <nav className="py-4 space-y-2">
            <a
              href="/#home"
              className="block px-4 py-2.5 text-primary-foreground hover:bg-primary/80 hover:text-accent font-semibold rounded-lg transition-all duration-200"
              onClick={toggleMenu}
            >
              Home
            </a>
            <a
              href="/#menu"
              className="block px-4 py-2.5 text-primary-foreground hover:bg-primary/80 hover:text-accent font-semibold rounded-lg transition-all duration-200"
              onClick={toggleMenu}
            >
              Menu
            </a>
            <a
              href="/#food"
              className="block px-4 py-2.5 text-primary-foreground hover:bg-primary/80 hover:text-accent font-semibold rounded-lg transition-all duration-200"
              onClick={toggleMenu}
            >
              About
            </a>
            <a
              href="/#contact"
              className="block px-4 py-2.5 text-primary-foreground hover:bg-primary/80 hover:text-accent font-semibold rounded-lg transition-all duration-200"
              onClick={toggleMenu}
            >
              Contact
            </a>

            {/* Mobile User Section */}
            {isAuthenticated ? (
              <>
                <div className="border-t border-primary-foreground/20 my-2" />
                <div className="px-4 py-2 flex items-center gap-2 text-primary-foreground">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-accent-foreground font-bold text-sm">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-semibold">{user?.name}</span>
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2.5 text-primary-foreground hover:bg-primary/80 hover:text-accent font-semibold rounded-lg transition-all duration-200"
                  onClick={toggleMenu}
                >
                  <User className="inline mr-2 h-4 w-4" />
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-2.5 text-primary-foreground hover:bg-primary/80 hover:text-accent font-semibold rounded-lg transition-all duration-200"
                  onClick={toggleMenu}
                >
                  <ShoppingBag className="inline mr-2 h-4 w-4" />
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full text-left px-4 py-2.5 text-red-300 hover:bg-primary/80 font-semibold rounded-lg transition-all duration-200"
                >
                  <LogOut className="inline mr-2 h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-2.5 text-primary-foreground hover:bg-primary/80 hover:text-accent font-semibold rounded-lg transition-all duration-200"
                onClick={toggleMenu}
              >
                <User className="inline mr-2 h-4 w-4" />
                Login / Sign Up
              </Link>
            )}

            <a
              href="/#menu"
              className="block mx-4 mt-4 px-6 py-2.5 bg-accent text-accent-foreground text-center rounded-full font-bold hover:bg-accent/90 transition-all duration-200"
              onClick={toggleMenu}
            >
              Order Now
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

