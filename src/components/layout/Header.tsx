import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, User, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">MaxMove</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/delivery" className="text-gray-600 hover:text-primary transition-colors">
              Send Package
            </Link>
            <Link to="/tracking" className="text-gray-600 hover:text-primary transition-colors">
              Track Delivery
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
              About Us
            </Link>
            <Button asChild variant="outline">
              <Link to="/login">
                <User className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link
                  to="/delivery"
                  className="text-lg font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Send Package
                </Link>
                <Link
                  to="/tracking"
                  className="text-lg font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Track Delivery
                </Link>
                <Link
                  to="/about"
                  className="text-lg font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Button asChild className="w-full">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <User className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;