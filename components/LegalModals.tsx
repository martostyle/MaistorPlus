
import React, { useState } from 'react';
import { X, Scale, Shield, FileText } from 'lucide-react';
import GlassCard from './GlassCard';

type LegalTab = 'terms' | 'escrow' | 'liability';

interface LegalModalsProps {
  initialTab?: LegalTab;
  onClose: () => void;
}

const LegalModals: React.FC<LegalModalsProps> = ({ initialTab = 'terms', onClose }) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  const renderContent = () => {
    switch (activeTab) {
      case 'terms':
        return (
          <div className="space-y-4 text-gray-300">
            <h3 className="text-xl font-bold text-white mb-4">Общи Условия за Ползване</h3>
            <p>1. <strong>Предмет:</strong> Платформата "Майстор Плюс" предоставя посреднически услуги между Възложители (Клиенти) и Изпълнители (Майстори).</p>
            <p>2. <strong>Регистрация:</strong> Всеки потребител носи отговорност за верността на предоставените данни. Майсторите са длъжни да предоставят коректен ЕИК/БУЛСТАТ.</p>
            <p>3. <strong>Поведение:</strong> Забранява се използването на обиден език и нелоялни търговски практики.</p>
            <p>4. <strong>Прекратяване:</strong> Платформата запазва правото да блокира профили при нарушения на правилата.</p>
          </div>
        );
      case 'escrow':
        return (
          <div className="space-y-4 text-gray-300">
            <h3 className="text-xl font-bold text-white mb-4">Правила на Ескроу Системата</h3>
            <p>1. <strong>Дефиниция:</strong> Ескроу сметката е доверителна сметка, където средствата на Клиента се съхраняват до завършване на работата.</p>
            <p>2. <strong>Освобождаване:</strong> Средствата се освобождават към Майстора само след подписване на "Протокол за Приемане" от страна на Клиента.</p>
            <p>3. <strong>Арбитраж:</strong> При спор, средствата се блокират до решаване на казуса от независим арбитър или съд.</p>
            <p>4. <strong>Такси:</strong> За услугата се удържа такса в размер на 5% от стойността на проекта.</p>
          </div>
        );
      case 'liability':
        return (
          <div className="space-y-4 text-gray-300">
            <h3 className="text-xl font-bold text-white mb-4">Ограничаване на Отговорността</h3>
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm mb-4">
               <strong>ВАЖНО:</strong> "Майстор Плюс" е информационен посредник и не е страна по договорите за изпълнение.
            </div>
            <p>1. Платформата <strong>НЕ носи отговорност</strong> за качеството на извършените ремонти.</p>
            <p>2. Платформата <strong>НЕ носи отговорност</strong> за преки или косвени щети, нанесени от Майстора в имота на Клиента.</p>
            <p>3. Всички претенции за лошо изпълнение се насочват директно към Изпълнителя съгласно ЗЗД.</p>
            <p>4. Отговорността на Платформата е ограничена до размера на таксата за администриране на Ескроу плащането.</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <GlassCard className="w-full max-w-3xl max-h-[85vh] flex flex-col !bg-[#0f172a] !border-white/20 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="flex border-b border-white/10 mb-6">
          <button 
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${activeTab === 'terms' ? 'border-cyan-500 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
          >
            <FileText size={18} /> Общи Условия
          </button>
          <button 
            onClick={() => setActiveTab('escrow')}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${activeTab === 'escrow' ? 'border-emerald-500 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
          >
            <Shield size={18} /> Ескроу Правила
          </button>
          <button 
            onClick={() => setActiveTab('liability')}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${activeTab === 'liability' ? 'border-red-500 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
          >
            <Scale size={18} /> Отговорност
          </button>
        </div>

        <div className="overflow-y-auto pr-2 custom-scrollbar flex-grow p-2">
          {renderContent()}
        </div>

        <div className="pt-6 border-t border-white/10 mt-6 text-center text-xs text-gray-500">
           Последна актуализация: 01.12.2024. Всички права запазени.
        </div>
      </GlassCard>
    </div>
  );
};

export default LegalModals;
