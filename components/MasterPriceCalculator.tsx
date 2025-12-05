
import React, { useState, useEffect } from 'react';
import { X, Calculator, Plus, Trash } from 'lucide-react';
import GlassCard from './GlassCard';
import GlassPillButton from './GlassPillButton';
import { Master, ServiceItem } from '../types';

interface MasterPriceCalculatorProps {
  master: Master;
  onClose: () => void;
}

const MasterPriceCalculator: React.FC<MasterPriceCalculatorProps> = ({ master, onClose }) => {
  const [selectedServices, setSelectedServices] = useState<{item: ServiceItem, qty: number}[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = selectedServices.reduce((acc, curr) => acc + (curr.item.price * curr.qty), 0);
    setTotal(sum);
  }, [selectedServices]);

  const addService = (service: ServiceItem) => {
    setSelectedServices([...selectedServices, { item: service, qty: 1 }]);
  };

  const updateQty = (index: number, delta: number) => {
    const newServices = [...selectedServices];
    newServices[index].qty = Math.max(1, newServices[index].qty + delta);
    setSelectedServices(newServices);
  };

  const removeService = (index: number) => {
    const newServices = [...selectedServices];
    newServices.splice(index, 1);
    setSelectedServices(newServices);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <GlassCard className="w-full max-w-lg relative !bg-[#0f172a] border border-white/20">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-cyan-500/20 rounded-full border border-cyan-500/30">
            <Calculator className="w-6 h-6 text-cyan-300" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Калкулатор - {master.name}</h3>
            <p className="text-sm text-gray-400">Груба сметка на база официални цени</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Services List */}
          <div>
            <h4 className="text-sm font-bold text-gray-300 uppercase mb-3">Налични Услуги</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {master.services.map(service => (
                <button 
                  key={service.id}
                  onClick={() => addService(service)}
                  className="w-full flex justify-between items-center p-3 bg-white/5 hover:bg-white/10 rounded-lg text-left transition-colors group"
                >
                  <div>
                    <div className="text-sm font-medium text-white">{service.name}</div>
                    <div className="text-xs text-gray-400">{service.price} лв. / {service.unit}</div>
                  </div>
                  <Plus size={16} className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
              {master.services.length === 0 && (
                <p className="text-gray-500 text-sm italic">Този майстор няма въведен ценоразпис.</p>
              )}
            </div>
          </div>

          {/* Calculator Output */}
          <div className="bg-black/30 rounded-xl p-4 border border-white/10 flex flex-col">
            <h4 className="text-sm font-bold text-gray-300 uppercase mb-3">Вашата Сметка</h4>
            
            <div className="flex-grow space-y-2 mb-4 overflow-y-auto max-h-40">
              {selectedServices.map((entry, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <div className="truncate max-w-[100px] text-white">{entry.item.name}</div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(idx, -1)} className="text-gray-400 hover:text-white">-</button>
                    <span className="w-4 text-center text-white">{entry.qty}</span>
                    <button onClick={() => updateQty(idx, 1)} className="text-gray-400 hover:text-white">+</button>
                    <button onClick={() => removeService(idx)} className="text-red-400 ml-1"><Trash size={14}/></button>
                  </div>
                </div>
              ))}
              {selectedServices.length === 0 && (
                <p className="text-gray-500 text-xs text-center py-4">Добавете услуги от списъка</p>
              )}
            </div>

            <div className="border-t border-white/10 pt-3 mt-auto">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">Общо:</span>
                <span className="text-2xl font-bold text-cyan-400">{total} лв.</span>
              </div>
              <GlassPillButton primary className="w-full !py-2 !text-sm">
                Поискай Оферта
              </GlassPillButton>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default MasterPriceCalculator;
