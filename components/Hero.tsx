import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <div className="relative w-full h-[70vh] bg-liwisi-black text-white overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/id/1031/1600/900" 
          alt="Modern Interior" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
        <div className="inline-block mb-4 px-3 py-1 border border-liwisi-gold text-liwisi-gold text-xs font-bold uppercase tracking-widest rounded-full bg-black/50 backdrop-blur-sm">
          Black Friday Event
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
          Elevate Your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Sanctuary</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light">
          Up to 50% off premium furniture. Timeless designs crafted for modern living. 
          Redefine comfort this season.
        </p>
        <button 
          onClick={onShopNow}
          className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold text-sm uppercase tracking-wider hover:bg-liwisi-gold hover:text-white transition-all duration-300 rounded-sm"
        >
          Shop The Collection
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
