import React from 'react';
import { LucideIcon } from 'lucide-react';

interface GlassPillButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: LucideIcon;
  primary?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const GlassPillButton: React.FC<GlassPillButtonProps> = ({ 
  children, 
  onClick, 
  icon: Icon, 
  primary = false,
  className = '',
  type = "button"
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        relative group overflow-hidden
        rounded-full px-8 py-3 font-medium transition-all duration-300
        flex items-center justify-center gap-2
        ${primary 
          ? 'bg-gradient-to-r from-cyan-500/80 to-blue-600/80 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] border border-cyan-400/30' 
          : 'bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md shadow-lg'}
        ${className}
      `}
    >
      {/* Shine Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      
      {Icon && <Icon className="w-5 h-5" />}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default GlassPillButton;