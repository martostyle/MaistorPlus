
import React, { useState } from 'react';
import { ShieldCheck, Info, Landmark } from 'lucide-react';
import GlassCard from './GlassCard';

const EscrowCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(1000);
  const feePercentage = 0.05;
  const isQualityFundApplicable = amount > 500;
  
  // Logic: 
  // If > 500: Client pays Amount. Master receives Amount - 5% (Fund Fee).
  // If <= 500: Client pays Amount. Master receives Amount. (Or Escrow fee could be on top, but prompt emphasizes the 5% Fund deduction specifically).
  // Assuming basic Escrow is free/included below 500 for simplicity of this demo, or just showing the Fund Fee trigger.
  
  const fundFee = isQualityFundApplicable ? amount * feePercentage : 0;
  const masterReceives = amount - fundFee;

  return (
    <GlassCard className="h-full border-t border-white/10">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-full border shadow-[0_0_15px_rgba(6,182,212,0.3)] ${isQualityFundApplicable ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-cyan-500/20 border-cyan-500/30'}`}>
          {isQualityFundApplicable ? <Landmark className="w-6 h-6 text-emerald-300" /> : <ShieldCheck className="w-6 h-6 text-cyan-300" />}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Калкулатор на Проекта</h3>
          <p className="text-sm text-gray-300">
            {isQualityFundApplicable ? 'Включва Фонд "Застраховка Качество"' : 'Гарантирана сигурност за вашите пари'}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Стойност на проекта (BGN)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-all placeholder-gray-400 backdrop-blur-sm"
          />
        </div>

        <div className="space-y-3 p-4 bg-black/20 rounded-lg border border-white/5 backdrop-blur-md">
          <div className="flex justify-between text-lg font-bold text-white border-b border-white/10 pb-2 mb-2">
            <span>Клиентът плаща:</span>
            <span>{amount.toLocaleString()} лв.</span>
          </div>

          {isQualityFundApplicable ? (
             <>
               <div className="flex justify-between text-sm text-emerald-400">
                  <span className="flex items-center gap-1">
                    Такса Фонд Качество (5%)
                    <Info className="w-3 h-3 cursor-help" title="Удържа се от майстора за гаранционен фонд" />
                  </span>
                  <span>- {fundFee.toFixed(2)} лв.</span>
               </div>
               <div className="flex justify-between text-sm text-gray-400">
                 <span>Гаранция:</span>
                 <span className="text-emerald-300 font-bold">1 Година (Задължителна)</span>
               </div>
             </>
          ) : (
             <p className="text-xs text-gray-500 italic text-center py-1">
               Под 500 лв. не се начислва такса за Фонд Качество.
             </p>
          )}

          <div className="h-px bg-white/10 my-2"></div>
          
          <div className="flex justify-between text-sm text-gray-300">
            <span>Майсторът получава:</span>
            <span className="font-bold text-white">{masterReceives.toFixed(2)} лв.</span>
          </div>
        </div>

        <button className={`w-full text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg border ${isQualityFundApplicable ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border-emerald-400/20' : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border-cyan-400/20'}`}>
          {isQualityFundApplicable ? 'Стартирай с Гаранция' : 'Стартирай Проект'}
        </button>

        <p className="text-xs text-center text-gray-400 mt-4">
          {isQualityFundApplicable 
             ? 'Парите са защитени. Майсторът получава плащане след одобрение на работата.'
             : 'Парите се освобождават само след вашето одобрение.'}
        </p>
      </div>
    </GlassCard>
  );
};

export default EscrowCalculator;
