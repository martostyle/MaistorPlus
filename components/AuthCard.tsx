import React, { useState } from 'react';
import { User, Hammer, ArrowRight, Mail, Lock } from 'lucide-react';
import GlassCard from './GlassCard';
import GlassPillButton from './GlassPillButton';
import { ViewState } from '../types';

interface AuthCardProps {
  onLogin: (role: 'client' | 'master') => void;
}

const AuthCard: React.FC<AuthCardProps> = ({ onLogin }) => {
  const [activeRole, setActiveRole] = useState<'client' | 'master'>('client');
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full max-w-md mx-auto perspective-1000">
      <GlassCard className="p-8 border border-white/20 shadow-2xl relative overflow-hidden backdrop-blur-3xl bg-white/10">
        
        {/* Glow effect behind card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/50 rounded-full blur-[2px]" />

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-white drop-shadow-md">
            {isLogin ? 'Добре дошли' : 'Създай профил'}
          </h2>
          <p className="text-gray-200 text-sm opacity-80">
            {isLogin ? 'Влезте в системата за да продължите' : 'Присъединете се към най-добрата платформа'}
          </p>
        </div>

        {/* Custom Segmented Toggle (Sleep/Do Not Disturb style) */}
        <div className="relative bg-black/20 rounded-full p-1 mb-8 flex h-14 backdrop-blur-xl border border-white/10">
          <div 
            className={`absolute top-1 bottom-1 rounded-full bg-white/15 shadow-lg border border-white/10 transition-all duration-300 ease-out z-0`}
            style={{
              left: activeRole === 'client' ? '4px' : '50%',
              width: 'calc(50% - 4px)'
            }}
          />
          
          <button 
            onClick={() => setActiveRole('client')}
            className={`flex-1 relative z-10 flex items-center justify-center gap-2 rounded-full transition-colors ${activeRole === 'client' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <User className="w-4 h-4" />
            <span className="font-medium">Клиент</span>
          </button>
          
          <button 
            onClick={() => setActiveRole('master')}
            className={`flex-1 relative z-10 flex items-center justify-center gap-2 rounded-full transition-colors ${activeRole === 'master' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Hammer className="w-4 h-4" />
            <span className="font-medium">Майстор</span>
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(activeRole); }}>
          <div className="relative group">
            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-300 group-focus-within:text-cyan-300 transition-colors" />
            <input 
              type="email" 
              placeholder="Имейл адрес" 
              className="w-full bg-white/10 border border-white/20 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-gray-300 focus:outline-none focus:bg-white/20 focus:border-cyan-400/50 transition-all shadow-lg backdrop-blur-md"
            />
          </div>
          
          <div className="relative group">
            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-300 group-focus-within:text-cyan-300 transition-colors" />
            <input 
              type="password" 
              placeholder="Парола" 
              className="w-full bg-white/10 border border-white/20 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-gray-300 focus:outline-none focus:bg-white/20 focus:border-cyan-400/50 transition-all shadow-lg backdrop-blur-md"
            />
          </div>

          <GlassPillButton primary className="w-full mt-6" type="submit">
             {isLogin ? 'Вход' : 'Регистрация'} <ArrowRight className="w-4 h-4 ml-1" />
          </GlassPillButton>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-300">
            {isLogin ? 'Нямате акаунт? ' : 'Имате акаунт? '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-cyan-300 hover:text-cyan-200 font-semibold underline underline-offset-4 decoration-cyan-300/30"
            >
              {isLogin ? 'Регистрирайте се' : 'Влезте тук'}
            </button>
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-purple-400/10 rounded-full blur-2xl pointer-events-none" />
      </GlassCard>
    </div>
  );
};

export default AuthCard;