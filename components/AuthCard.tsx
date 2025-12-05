
import React, { useState } from 'react';
import { User, Hammer, ArrowRight, Mail, Lock, Building2, Chrome } from 'lucide-react';
import GlassCard from './GlassCard';
import GlassPillButton from './GlassPillButton';

interface AuthCardProps {
  onLogin: (role: 'client' | 'master', data?: any) => void;
}

const AuthCard: React.FC<AuthCardProps> = ({ onLogin }) => {
  const [activeRole, setActiveRole] = useState<'client' | 'master'>('client');
  const [isLogin, setIsLogin] = useState(true);
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [eik, setEik] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth logic
    onLogin(activeRole, { email, name, eik });
  };

  return (
    <div className="w-full max-w-md mx-auto perspective-1000">
      <GlassCard className="p-8 border border-white/20 shadow-2xl relative overflow-hidden backdrop-blur-3xl bg-white/10">
        
        {/* Glow effect behind card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/50 rounded-full blur-[2px]" />

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2 text-white drop-shadow-md">
            {isLogin ? 'Добре дошли' : 'Създай профил'}
          </h2>
          <p className="text-gray-200 text-sm opacity-80">
            {isLogin ? 'Влезте в системата за да продължите' : 'Присъединете се към най-добрата платформа'}
          </p>
        </div>

        {/* Role Toggle */}
        <div className="relative bg-black/20 rounded-full p-1 mb-6 flex h-12 backdrop-blur-xl border border-white/10">
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
            <span className="font-medium text-sm">Клиент</span>
          </button>
          
          <button 
            onClick={() => setActiveRole('master')}
            className={`flex-1 relative z-10 flex items-center justify-center gap-2 rounded-full transition-colors ${activeRole === 'master' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Hammer className="w-4 h-4" />
            <span className="font-medium text-sm">Майстор</span>
          </button>
        </div>

        {/* Google Sign In */}
        <button 
          type="button"
          onClick={() => onLogin(activeRole)} // Simulate Google Login
          className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 mb-6 transition-all backdrop-blur-sm"
        >
           {/* Simple SVG for Google */}
           <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
           </svg>
           {isLogin ? 'Вход с Google' : 'Регистрация с Google'}
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-white/10 flex-1"></div>
          <span className="text-gray-400 text-xs uppercase">или</span>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="relative group animate-fade-in">
              <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-300 group-focus-within:text-cyan-300 transition-colors" />
              <input 
                type="text" 
                placeholder="Име / Фирма" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-gray-300 focus:outline-none focus:bg-white/20 focus:border-cyan-400/50 transition-all shadow-lg backdrop-blur-md"
              />
            </div>
          )}

          <div className="relative group">
            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-300 group-focus-within:text-cyan-300 transition-colors" />
            <input 
              type="email" 
              placeholder="Имейл адрес" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-gray-300 focus:outline-none focus:bg-white/20 focus:border-cyan-400/50 transition-all shadow-lg backdrop-blur-md"
            />
          </div>
          
          <div className="relative group">
            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-300 group-focus-within:text-cyan-300 transition-colors" />
            <input 
              type="password" 
              placeholder="Парола" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-gray-300 focus:outline-none focus:bg-white/20 focus:border-cyan-400/50 transition-all shadow-lg backdrop-blur-md"
            />
          </div>

          {/* Verification Fields for Master Registration */}
          {!isLogin && activeRole === 'master' && (
            <div className="relative group animate-fade-in">
              <Building2 className="absolute left-4 top-3.5 h-5 w-5 text-gray-300 group-focus-within:text-cyan-300 transition-colors" />
              <input 
                type="text" 
                placeholder="ЕИК / БУЛСТАТ (Задължително)" 
                required
                value={eik}
                onChange={(e) => setEik(e.target.value)}
                className="w-full bg-white/10 border border-cyan-400/30 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-gray-300 focus:outline-none focus:bg-white/20 focus:border-cyan-400 transition-all shadow-lg backdrop-blur-md"
              />
              <span className="absolute right-4 top-3.5 text-xs text-cyan-300 font-medium">*Верификация</span>
            </div>
          )}

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
