import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { AIChat } from './components/AIChat';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import { Filter, X, ShoppingBag } from 'lucide-react';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  
  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const cartTotal = cart.reduce((sum, item) => sum + ((item.salePrice || item.price) * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-liwisi-cream selection:bg-liwisi-gold selection:text-white">
      <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      
      <Hero onShopNow={() => {
        document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
      }} />

      <main id="collection" className="max-w-7xl mx-auto px-4 py-16">
        {/* Filter Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Black Friday Collection</h2>
            <p className="text-gray-500">Curated pieces for the modern home.</p>
          </div>
          
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
             {categories.map(cat => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                   activeCategory === cat 
                     ? 'bg-liwisi-black text-white' 
                     : 'bg-white border border-gray-200 text-gray-600 hover:border-black'
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-liwisi-black text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">LIWISI</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Redefining modern living with timeless furniture pieces. 
              Sustainability meets luxury.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-gray-500">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white">Best Sellers</a></li>
              <li><a href="#" className="hover:text-white">Black Friday</a></li>
            </ul>
          </div>
           <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-gray-500">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>
           <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-gray-500">Newsletter</h4>
            <div className="flex border-b border-gray-700 pb-2">
              <input type="email" placeholder="Enter your email" className="bg-transparent w-full outline-none text-sm placeholder-gray-500" />
              <button className="text-sm font-bold hover:text-liwisi-gold">JOIN</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          © 2025 Liwisi Inc. All rights reserved.
        </div>
      </footer>

      {/* Cart Drawer */}
      <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
        
        {/* Drawer */}
        <div className={`relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 flex justify-between items-center border-b border-gray-100">
            <h2 className="font-serif text-xl font-bold">Shopping Cart ({cartCount})</h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                <p>Your cart is empty</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 text-liwisi-black font-bold underline hover:text-liwisi-gold"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                         <h3 className="font-medium text-gray-900">{item.name}</h3>
                         <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                           <X className="w-4 h-4" />
                         </button>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold">${item.salePrice || item.price}</span>
                        <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold text-lg">${cartTotal.toFixed(2)}</span>
              </div>
              <button className="w-full py-4 bg-liwisi-black text-white font-bold uppercase tracking-wider hover:bg-liwisi-gold transition-colors rounded-sm">
                Checkout
              </button>
              <p className="text-center text-xs text-gray-400 mt-4">Shipping & taxes calculated at checkout</p>
            </div>
          )}
        </div>
      </div>

      <AIChat />
    </div>
  );
}

export default App;