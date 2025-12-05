
import React from 'react';
import { Shield, Lock, Scale } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (tab: 'terms' | 'escrow' | 'liability') => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  return (
    <footer className="border-t border-white/10 bg-black/60 backdrop-blur-lg py-12 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
             <img src="https://i.imgur.com/LlEKJyG.jpeg" className="h-12 w-auto mb-4 rounded-md" alt="Logo" />
             <p className="text-gray-400 text-sm">
               Първата дигитална платформа в България с гарантирана сигурност и Ескроу защита.
             </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">За Клиенти</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button className="hover:text-cyan-400">Намери Майстор</button></li>
              <li><button className="hover:text-cyan-400">Публикувай Заявка</button></li>
              <li><button className="hover:text-cyan-400">Ескроу Калкулатор</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">За Майстори</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button className="hover:text-cyan-400">Стани Партньор</button></li>
              <li><button className="hover:text-cyan-400">Цени и Планове</button></li>
              <li><button className="hover:text-cyan-400">Affiliate Програма</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Правна Информация</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={() => onOpenLegal('terms')} className="hover:text-cyan-400 flex items-center gap-2">
                  Общи Условия
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('escrow')} className="hover:text-emerald-400 flex items-center gap-2">
                  <Shield size={14} /> Ескроу Правила
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('liability')} className="hover:text-red-400 flex items-center gap-2">
                  <Scale size={14} /> Отговорност
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-gray-500 mb-2">
            "Майстор Плюс" е регистрирана търговска марка. Платформата оперира в съответствие с българското законодателство.
          </p>
          <p className="text-xs text-gray-600">
            &copy; 2024 Maistor Plus BG. Всички права запазени.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
