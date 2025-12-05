
import React from 'react';
import { Master } from '../types';
import GlassCard from './GlassCard';
import { Star, MapPin, CheckCircle, Calculator, Crown } from 'lucide-react';

interface MasterCardProps {
  master: Master;
  onOpenCalculator?: (master: Master) => void;
}

const MasterCard: React.FC<MasterCardProps> = ({ master, onOpenCalculator }) => {
  return (
    <GlassCard hoverEffect className={`flex flex-col h-full relative overflow-hidden group ${master.subscriptionTier === 'plus' ? 'border-orange-500/30' : ''}`}>
      
      {/* PLUS Badge */}
      {master.subscriptionTier === 'plus' && (
        <div className="absolute top-0 right-0 z-20">
           <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg shadow-lg flex items-center gap-1">
             <Crown size={10} className="fill-white" />
             ПЛЮС
           </div>
        </div>
      )}

      {/* Header Image Gradient */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/60 to-transparent z-0"></div>
      
      <div className="relative z-10 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="relative">
            <img 
              src={master.imageUrl} 
              alt={master.name} 
              className={`w-20 h-20 rounded-full border-2 object-cover shadow-lg ${master.subscriptionTier === 'plus' ? 'border-orange-400 ring-2 ring-orange-500/20' : 'border-cyan-400'}`}
            />
            {master.verified && (
              <div className="absolute -bottom-1 -right-1 bg-cyan-500 rounded-full p-1 shadow-lg" title="Проверен">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg backdrop-blur-md border border-white/10 mt-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="font-bold">{master.rating}</span>
            <span className="text-xs text-gray-300">({master.reviews})</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-1 drop-shadow-md">{master.name}</h3>
        <p className={`${master.subscriptionTier === 'plus' ? 'text-orange-400' : 'text-cyan-400'} text-sm font-medium mb-2`}>{master.specialty}</p>
        
        <div className="flex items-center gap-1 text-gray-300 text-xs mb-4">
          <MapPin className="w-3 h-3" />
          {master.location}
        </div>

        <p className="text-gray-200 text-sm line-clamp-2 mb-4 flex-grow">
          {master.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {master.tags.map(tag => (
            <span key={tag} className="text-xs bg-white/10 border border-white/10 px-2 py-1 rounded text-gray-200">
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 mt-auto">
          <button 
            onClick={() => onOpenCalculator?.(master)}
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm py-2 rounded-lg transition-colors border border-white/10 backdrop-blur-sm"
          >
            <Calculator className="w-4 h-4" />
            Оферта
          </button>
          <button className={`text-white text-sm py-2 rounded-lg transition-colors font-semibold shadow-lg ${master.subscriptionTier === 'plus' ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20' : 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-500/20'}`}>
            Свържи се
          </button>
        </div>
      </div>
    </GlassCard>
  );
};

export default MasterCard;
