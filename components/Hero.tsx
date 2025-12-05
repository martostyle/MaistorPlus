
import React, { useState } from 'react';
import AuthCard from './AuthCard';
import { ViewState } from '../types';
import { Sparkles, PlusCircle } from 'lucide-react';

interface HeroProps {
  onLoginSuccess: (role: 'client' | 'master') => void;
  onBrowse: () => void;
  onPostRequest: () => void;
}

const Hero: React.FC<HeroProps> = ({ onLoginSuccess, onBrowse, onPostRequest }) => {
  // Primary (HQ from Cloudinary) and Fallback (Standard from Imgur) video sources
  const HQ_VIDEO = "https://res.cloudinary.com/diz5migwi/video/upload/v1764930620/MaistoriNa4aloKlip_oeissg.mp4";
  const FALLBACK_VIDEO = "https://i.imgur.com/3I9Azg3.mp4";
  
  const [videoSrc, setVideoSrc] = useState(HQ_VIDEO);

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden">
      
      {/* CSS Styles for responsive video behavior */}
      <style>{`
        .hero-bg-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>

      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-black">
        <video 
          key={videoSrc} // Ensures element recreates if src changes
          src={videoSrc} 
          autoPlay 
          muted 
          playsInline
          onError={() => {
            console.warn("HQ Video failed to load, switching to fallback.");
            setVideoSrc(FALLBACK_VIDEO);
          }}
          className="hero-bg-video"
        />
        
        {/* Top Header Fade - Blends the header into the video so it doesn't look cut off */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/40 to-transparent pointer-events-none z-10"></div>

        {/* Gradient Overlay: Darker on left (tools) by 40%, absolutely clear on right (woman) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/5 to-transparent pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text (Artlist Style) */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium tracking-wide uppercase text-white/90">AI & Escrow Powered</span>
            </div>
            
            <h1 className="leading-tight tracking-tight drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)]">
              <span className="block text-3xl md:text-5xl lg:text-6xl font-[Arial] font-bold text-white mb-2 whitespace-nowrap">
                Създайте домът
              </span>
              <span className="block text-3xl md:text-5xl lg:text-6xl font-bold font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-white to-purple-500 text-glow whitespace-nowrap">
                за който мечтаете
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-100 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed drop-shadow-md">
              Първата платформа в България, която гарантира парите ви. 
              Свържете се с проверени майстори и визуализирайте идеите си.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
              <button 
                onClick={onPostRequest}
                className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center gap-2 transform hover:scale-105"
              >
                <PlusCircle size={20} />
                Публикувай Заявка
              </button>
              <button 
                onClick={onBrowse}
                className="text-white/80 hover:text-white border-b border-white/30 hover:border-white transition-all pb-1 text-sm font-medium h-[48px]"
              >
                Разгледай без регистрация &rarr;
              </button>
            </div>
          </div>

          {/* Right Column: Auth Card (Floating Glass) */}
          <div className="relative">
             {/* Abstract blobs behind the card for depth - kept subtle */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
             <AuthCard onLogin={onLoginSuccess} />
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient Fade for smooth transition to content if any - also changed to black */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10"></div>
    </div>
  );
};

export default Hero;