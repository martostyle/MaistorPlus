import React, { useState } from 'react';
import { Menu, X, Hammer, ShieldCheck, User, LayoutDashboard } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer gap-2"
            onClick={() => onChangeView(ViewState.HOME)}
          >
            <div className="bg-gradient-to-tr from-blue-500 to-cyan-400 p-2 rounded-lg shadow-lg shadow-blue-500/20">
              <Hammer className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Майстор <span className="text-cyan-400">Плюс</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => onChangeView(ViewState.SEARCH)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === ViewState.SEARCH ? 'text-cyan-400 bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
              >
                Намери Майстор
              </button>
              <button 
                onClick={() => onChangeView(ViewState.DASHBOARD_CLIENT)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === ViewState.DASHBOARD_CLIENT ? 'text-cyan-400 bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
              >
                Вход за Клиенти
              </button>
              <button 
                onClick={() => onChangeView(ViewState.DASHBOARD_MASTER)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${currentView === ViewState.DASHBOARD_MASTER ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Вход за Майстори
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t-0">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => { onChangeView(ViewState.SEARCH); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10">Намери Майстор</button>
            <button onClick={() => { onChangeView(ViewState.DASHBOARD_CLIENT); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10">Вход за Клиенти</button>
            <button onClick={() => { onChangeView(ViewState.DASHBOARD_MASTER); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-orange-400 hover:bg-white/10">Вход за Майстори</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;