import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  variant?: 'glass' | 'surface'; // Kept for compatibility but treated same or similar
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hoverEffect = false,
  variant = 'glass'
}) => {
  const baseStyles = "rounded-2xl p-6 transition-all duration-300";
  
  // Unified Glass Style (Returning to the previous version)
  // Using a slightly more transparent and blurry mix for everything
  const glassStyle = "bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg";

  return (
    <div 
      className={`
        ${baseStyles}
        ${glassStyle}
        ${hoverEffect ? 'hover:-translate-y-1 hover:shadow-2xl hover:bg-white/10 hover:border-white/20 cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;