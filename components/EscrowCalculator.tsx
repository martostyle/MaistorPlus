import React, { useState } from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import GlassCard from './GlassCard';

const EscrowCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(1000);
  const feePercentage = 0.05;
  const fee = amount * feePercentage;
  const total = amount + fee;

  return (
    <GlassCard className="h-full border-t border-white/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-cyan-500/20 rounded-full border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <ShieldCheck className="w-6 h-6 text-cyan-300" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Escrow Калкулатор</h3>
          <p className="text-sm text-gray-300">Гарантирана сигурност за вашите пари</p>
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
          <div className="flex justify-between text-sm text-gray-300">
            <span>Сума за изпълнителя:</span>
            <span>{amount.toLocaleString()} лв.</span>
          </div>
          <div className="flex justify-between text-sm text-cyan-300">
            <span className="flex items-center gap-1">
              Такса сигурност (5%) 
              <Info className="w-3 h-3 cursor-help" title="Покрива застраховка и арбитраж" />
            </span>
            <span>{fee.toFixed(2)} лв.</span>
          </div>
          <div className="h-px bg-white/10 my-2"></div>
          <div className="flex justify-between text-lg font-bold text-white">
            <span>Общо за плащане:</span>
            <span>{total.toFixed(2)} лв.</span>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg shadow-cyan-500/20 border border-cyan-400/20">
          Започни Сигурен Проект
        </button>

        <p className="text-xs text-center text-gray-400 mt-4">
          Парите се освобождават само след вашето одобрение на свършената работа.
        </p>
      </div>
    </GlassCard>
  );
};

export default EscrowCalculator;