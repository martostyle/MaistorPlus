
import React from 'react';
import { X, Check, Crown, Zap, Shield, FileText, Search } from 'lucide-react';
import GlassCard from './GlassCard';
import GlassPillButton from './GlassPillButton';

interface SubscriptionModalProps {
  onClose: () => void;
  onUpgrade: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ onClose, onUpgrade }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <GlassCard className="w-full max-w-4xl relative !bg-[#0f172a] !border-white/20 overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>

        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-10">
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Изберете своя план</h2>
          <p className="text-gray-400">Отключете пълния потенциал на Майстор Плюс</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 relative z-10">
          {/* Base Plan */}
          <GlassCard className="border !border-white/10 hover:!border-white/20 transition-all flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-300">Базов Достъп</h3>
              <div className="mt-2 text-3xl font-bold text-white">0 лв. <span className="text-sm font-normal text-gray-500">/ месец</span></div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <Check className="text-emerald-500 w-5 h-5 flex-shrink-0" /> Създаване на профил & Галерия
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <Check className="text-emerald-500 w-5 h-5 flex-shrink-0" /> Обявяване на цени
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <Check className="text-emerald-500 w-5 h-5 flex-shrink-0" /> Ограничен достъп до лийдове
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500 line-through decoration-gray-500">
                <Crown className="text-gray-600 w-5 h-5 flex-shrink-0" /> Приоритет в търсенето
              </li>
            </ul>

            <button 
              onClick={onClose}
              className="w-full py-3 rounded-xl border border-white/10 text-gray-300 font-medium hover:bg-white/5 transition-colors"
            >
              Оставам на Базов
            </button>
          </GlassCard>

          {/* PLUS Plan */}
          <GlassCard className="border !border-orange-500/50 bg-orange-500/5 hover:bg-orange-500/10 transition-all relative flex flex-col">
            <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
              ПРЕПОРЪЧАН
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-orange-400 flex items-center gap-2">
                <Crown size={20} className="fill-orange-400" />
                Майстор ПЛЮС
              </h3>
              <div className="mt-2 text-3xl font-bold text-white">10 лв. <span className="text-sm font-normal text-gray-500">/ месец</span></div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3 text-sm text-white font-medium">
                <Search className="text-orange-400 w-5 h-5 flex-shrink-0" /> Приоритетно класиране (ТОП Резултати)
              </li>
              <li className="flex items-center gap-3 text-sm text-white">
                <Zap className="text-orange-400 w-5 h-5 flex-shrink-0" /> Неограничен достъп до всички лийдове
              </li>
              <li className="flex items-center gap-3 text-sm text-white">
                <FileText className="text-orange-400 w-5 h-5 flex-shrink-0" /> Автоматично фактуриране
              </li>
              <li className="flex items-center gap-3 text-sm text-white">
                <Shield className="text-orange-400 w-5 h-5 flex-shrink-0" /> Лого "Майстор Плюс" & Проверка
              </li>
            </ul>

            <GlassPillButton 
              onClick={onUpgrade}
              primary 
              className="w-full !bg-gradient-to-r !from-orange-500 !to-amber-600 shadow-[0_0_20px_rgba(249,115,22,0.4)]"
            >
              Активирай ПЛЮС
            </GlassPillButton>
          </GlassCard>
        </div>
      </GlassCard>
    </div>
  );
};

export default SubscriptionModal;
