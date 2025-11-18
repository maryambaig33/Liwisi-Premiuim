import React, { useState, useEffect } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { generateProductInsight } from '../services/gemini';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [aiHook, setAiHook] = useState<string>("");

  useEffect(() => {
    // Simulate lazy loading AI insights for interaction
    let mounted = true;
    const fetchHook = async () => {
      if (Math.random() > 0.7) { // Only generate for some to show variety/save tokens
         const hook = await generateProductInsight(product.name, product.description);
         if (mounted) setAiHook(hook);
      }
    };
    fetchHook();
    return () => { mounted = false; };
  }, [product]);

  return (
    <div className="group relative flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        {product.salePrice && (
          <div className="absolute top-3 left-3 z-20 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
            -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
          </div>
        )}
        {product.tags.includes('Black Friday Deal') && (
            <div className="absolute top-3 right-3 z-20 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              Black Friday
            </div>
        )}
        
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />

        {/* Quick Add Button (Mobile optimized: always visible on mobile, hover on desktop) */}
        <button 
          onClick={() => onAddToCart(product)}
          className="absolute bottom-4 right-4 w-10 h-10 bg-white text-black flex items-center justify-center rounded-full shadow-lg translate-y-14 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:bg-liwisi-gold hover:text-white"
          aria-label="Add to cart"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="text-xs text-gray-500 mb-1">{product.category}</div>
        <h3 className="font-serif text-lg font-bold text-gray-900 mb-1 group-hover:text-liwisi-gold transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-baseline gap-2 mb-3">
          {product.salePrice ? (
            <>
              <span className="text-red-600 font-medium">${product.salePrice}</span>
              <span className="text-gray-400 text-sm line-through">${product.price}</span>
            </>
          ) : (
            <span className="text-gray-900 font-medium">${product.price}</span>
          )}
        </div>

        {/* AI Insight Badge */}
        {aiHook && (
          <div className="mt-auto pt-3 border-t border-gray-100 flex items-start gap-2 text-xs text-gray-600 italic">
            <Sparkles className="w-3 h-3 text-liwisi-gold flex-shrink-0 mt-0.5" />
            <span>"{aiHook}"</span>
          </div>
        )}
      </div>
    </div>
  );
};
