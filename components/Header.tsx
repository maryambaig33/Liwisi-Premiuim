import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, Search, X } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <header 
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Left: Menu (Mobile) / Nav (Desktop) */}
        <div className="flex items-center gap-4">
          <button 
            className="lg:hidden text-current"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className={`w-6 h-6 ${isScrolled ? 'text-black' : 'text-white'}`} />
          </button>
          
          <nav className={`hidden lg:flex gap-8 text-sm font-medium uppercase tracking-wider ${isScrolled ? 'text-gray-800' : 'text-white/90'}`}>
            <a href="#" className="hover:text-liwisi-gold transition-colors">New Arrivals</a>
            <a href="#" className="hover:text-liwisi-gold transition-colors">Living</a>
            <a href="#" className="hover:text-liwisi-gold transition-colors">Dining</a>
            <a href="#" className="hover:text-liwisi-gold transition-colors text-liwisi-gold font-bold">Black Friday</a>
          </nav>
        </div>

        {/* Center: Logo */}
        <div className={`absolute left-1/2 -translate-x-1/2 font-serif text-2xl font-bold tracking-widest ${isScrolled ? 'text-black' : 'text-white'}`}>
          LIWISI
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-5">
          <button className={`hover:opacity-70 transition-opacity ${isScrolled ? 'text-black' : 'text-white'}`}>
            <Search className="w-5 h-5" />
          </button>
          <button 
            onClick={onCartClick}
            className={`relative hover:opacity-70 transition-opacity ${isScrolled ? 'text-black' : 'text-white'}`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-liwisi-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>

    {/* Mobile Menu Overlay */}
    <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-10">
                <span className="font-serif text-2xl font-bold">LIWISI</span>
                <button onClick={() => setMobileMenuOpen(false)}>
                    <X className="w-6 h-6" />
                </button>
            </div>
            <nav className="flex flex-col gap-6 text-lg font-medium">
                <a href="#" className="border-b pb-2" onClick={() => setMobileMenuOpen(false)}>New Arrivals</a>
                <a href="#" className="border-b pb-2" onClick={() => setMobileMenuOpen(false)}>Living Room</a>
                <a href="#" className="border-b pb-2" onClick={() => setMobileMenuOpen(false)}>Dining</a>
                <a href="#" className="border-b pb-2" onClick={() => setMobileMenuOpen(false)}>Bedroom</a>
                <a href="#" className="text-red-600 font-bold" onClick={() => setMobileMenuOpen(false)}>Black Friday Sale</a>
            </nav>
            <div className="mt-auto text-sm text-gray-500">
                <p>© 2025 Liwisi Inc.</p>
            </div>
        </div>
    </div>
    </>
  );
};
