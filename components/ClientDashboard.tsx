
import React, { useState } from 'react';
import { User, Search, Briefcase, ShieldCheck, Sofa, CheckCircle, Clock, Star, X, Lock, Unlock, Box, CreditCard, Gift, Copy, ExternalLink, Crown } from 'lucide-react';
import GlassCard from './GlassCard';
import GlassPillButton from './GlassPillButton';
import { Project, SystemSettings, Offer } from '../types';
import { MOCK_PARTNER_COUPONS } from '../services/mockData';

interface ClientDashboardProps {
  projects: Project[];
  systemSettings: SystemSettings;
  onPostRequest: () => void;
}

type ClientTab = 'dashboard' | 'club' | 'planning';

const ClientDashboard: React.FC<ClientDashboardProps> = ({ projects, systemSettings, onPostRequest }) => {
  const [activeTab, setActiveTab] = useState<ClientTab>('dashboard');
  const [comparingProject, setComparingProject] = useState<Project | null>(null);
  const [showPlanner, setShowPlanner] = useState(false);
  
  // Club Membership Logic
  // Condition 1: Active or Completed Project > 100 BGN
  const hasQualifyingProject = projects.some(p => p.amount >= 100 && (p.status === 'active' || p.status === 'completed'));
  // Condition 2: Paid Subscription (Simulated)
  const [hasPaidSubscription, setHasPaidSubscription] = useState(false);
  
  // Combined Membership Status
  const isClubMember = hasQualifyingProject || hasPaidSubscription;
  const membershipExpiry = new Date();
  membershipExpiry.setFullYear(membershipExpiry.getFullYear() + 1);

  // UI States for Club
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleSubscribe = () => {
    // Simulate payment processing
    if (confirm("Потвърдете плащане на 20.00 лв за едногодишен абонамент?")) {
      setHasPaidSubscription(true);
      alert("Плащането е успешно! Добре дошли в Клуб Предимства.");
    }
  };

  const renderOfferComparison = (project: Project) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <GlassCard className="w-full max-w-4xl max-h-[90vh] overflow-y-auto !bg-[#0f172a] !border-white/20 relative">
        <button onClick={() => setComparingProject(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>

        <h3 className="text-2xl font-bold text-white mb-2">Сравнение на Оферти</h3>
        <p className="text-gray-400 mb-8">За проект: <span className="text-cyan-400">{project.title}</span></p>

        <div className="grid md:grid-cols-3 gap-6">
          {project.offers?.map(offer => (
            <GlassCard key={offer.id} className="border-t-4 border-t-cyan-500 flex flex-col">
              <div className="mb-4">
                <h4 className="font-bold text-lg text-white">{offer.masterName}</h4>
                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                  <Star size={14} fill="currentColor" /> {offer.masterRating} Рейтинг
                </div>
              </div>

              <div className="space-y-4 mb-6 flex-grow">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-gray-400">Цена</span>
                  <span className="text-xl font-bold text-white">{offer.price} лв.</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-gray-400">Срок</span>
                  <span className="text-white flex items-center gap-1"><Clock size={14} /> {offer.duration}</span>
                </div>
                <div className="bg-white/5 p-3 rounded-lg text-sm text-gray-300 italic">
                  "{offer.comment}"
                </div>
              </div>

              <GlassPillButton primary className="w-full">
                Приеми Офертата
              </GlassPillButton>
            </GlassCard>
          ))}
          {(!project.offers || project.offers.length === 0) && (
            <div className="col-span-full text-center py-10 text-gray-500">
              Все още няма получени оферти за този проект.
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );

  const renderDashboard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 animate-fade-in">
      {/* Active Projects */}
      <div className="lg:col-span-2 space-y-6">
        <h3 className="text-xl font-semibold mb-4 text-white/90">Активни Проекти</h3>
        {projects.map(project => (
          <GlassCard key={project.id} className="flex flex-col gap-4 hover:border-white/30 transition-colors">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${project.status === 'active' ? 'bg-emerald-500/10 text-green-400 border border-green-500/20' : 'bg-white/5 text-gray-400'}`}>
                  <Briefcase size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1 text-white">{project.title}</h4>
                  <p className="text-sm text-gray-300 flex items-center gap-2">
                    <User size={14} /> {project.masterName || 'Търси се изпълнител'} 
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span> 
                    {project.date}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="font-bold text-2xl tracking-tight text-white">{project.amount} лв.</span>
                {(project.amount > systemSettings.escrowThreshold && systemSettings.isEscrowMandatory) || project.escrowSecured ? (
                  <span className="text-xs flex items-center gap-1 text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" /> Escrow Защитен
                  </span>
                ) : (
                  <span className="text-xs text-yellow-300 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                    Директно плащане
                  </span>
                )}
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex justify-end pt-4 border-t border-white/10">
              {project.status === 'pending' && (
                <button 
                  onClick={() => setComparingProject(project)}
                  className="text-sm bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 px-4 py-2 rounded-lg border border-cyan-500/30 transition-all flex items-center gap-2"
                >
                  Виж Оферти ({project.offers?.length || 0})
                </button>
              )}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Sidebar / Club Teaser */}
      <div className="space-y-6">
         <GlassCard 
           onClick={() => setActiveTab('club')}
           className={`relative overflow-hidden group cursor-pointer border hover:-translate-y-1 transition-transform ${isClubMember ? 'border-amber-400/30 bg-amber-500/5' : 'border-gray-500/20'}`}
         >
           <div className="relative z-10">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/20 rounded-lg backdrop-blur-md">
                      <Crown className="w-6 h-6 text-amber-300" />
                  </div>
                  <h3 className="font-bold text-lg text-white">Клуб Предимства</h3>
                </div>
                {isClubMember ? <Unlock size={18} className="text-amber-400" /> : <Lock size={18} className="text-gray-400" />}
             </div>
             
             {isClubMember ? (
               <>
                 <p className="text-sm text-gray-200 mb-4 leading-relaxed">
                   Вие сте активен член! Насладете се на 10% отстъпки и 3D визуализация.
                 </p>
                 <div className="text-xs text-amber-400 font-medium">Валиден до: {membershipExpiry.toLocaleDateString('bg-BG')}</div>
               </>
             ) : (
               <>
                 <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                   Отключете <span className="text-white font-bold">10% отстъпки</span> и <span className="text-white font-bold">3D Софтуер</span>.
                 </p>
                 <div className="text-xs text-center text-gray-500 border border-gray-600 rounded-full py-1">Натисни за детайли</div>
               </>
             )}
           </div>
         </GlassCard>

         <GlassCard 
           onClick={() => setActiveTab('planning')}
           className="cursor-pointer hover:border-cyan-400/30 transition-colors"
         >
            <div className="flex justify-between items-center">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-cyan-500/20 rounded-lg">
                   <Box className="text-cyan-300 w-6 h-6" />
                 </div>
                 <div>
                   <h3 className="font-bold text-white">3D Планер</h3>
                   <p className="text-xs text-gray-400">{isClubMember ? 'Активен' : 'Заключен'}</p>
                 </div>
               </div>
               {isClubMember ? <Unlock size={16} className="text-cyan-400" /> : <Lock size={16} className="text-gray-500" />}
            </div>
         </GlassCard>
      </div>
    </div>
  );

  const renderClubBenefits = () => (
    <div className="animate-fade-in space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 mb-4 drop-shadow-sm flex items-center justify-center gap-3">
          <Crown size={32} className="text-amber-400" /> Клуб Предимства
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Специална програма за лоялни клиенти, осигуряваща инструменти за планиране и ексклузивни отстъпки при нашите партньори.
        </p>
      </div>

      {!isClubMember ? (
        /* LOCKED STATE */
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Benefit Cards */}
          <div className="space-y-6">
             <GlassCard className="border !border-amber-500/20">
               <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                 <Gift className="text-amber-400" /> Какво получавате?
               </h3>
               <ul className="space-y-4">
                 <li className="flex items-start gap-3">
                   <div className="bg-emerald-500/20 p-1 rounded text-emerald-400 mt-1"><CheckCircle size={14}/></div>
                   <div>
                     <span className="block text-white font-bold">10% Едногодишна Отстъпка</span>
                     <span className="text-sm text-gray-400">В партньорски магазини за мебели, баня и строителство.</span>
                   </div>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="bg-emerald-500/20 p-1 rounded text-emerald-400 mt-1"><CheckCircle size={14}/></div>
                   <div>
                     <span className="block text-white font-bold">3D Визуализация</span>
                     <span className="text-sm text-gray-400">Неограничен достъп до професионален софтуер за планиране.</span>
                   </div>
                 </li>
               </ul>
             </GlassCard>
          </div>

          {/* Unlock Options */}
          <GlassCard className="relative overflow-hidden bg-gradient-to-br from-amber-900/10 to-black">
             <div className="absolute top-0 right-0 bg-amber-500 text-black font-bold text-xs px-3 py-1 rounded-bl-lg">ЗАКЛЮЧЕНО</div>
             <h3 className="text-xl font-bold text-white mb-6">Как да отключите?</h3>
             
             <div className="space-y-6">
               {/* Option 1 */}
               <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-amber-500/30 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-500/20 p-2 rounded-full text-blue-400"><Briefcase size={18}/></div>
                    <h4 className="font-bold text-white">Вариант 1: Активен Проект</h4>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    Стартирайте проект през платформата на стойност над <span className="text-white font-bold">100 лв.</span>
                  </p>
                  <GlassPillButton onClick={onPostRequest} className="!py-2 !text-sm w-full">
                    Публикувай Заявка
                  </GlassPillButton>
               </div>

               <div className="flex items-center gap-4">
                 <div className="h-px bg-white/10 flex-1"></div>
                 <span className="text-xs text-gray-500 uppercase">ИЛИ</span>
                 <div className="h-px bg-white/10 flex-1"></div>
               </div>

               {/* Option 2 */}
               <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20 hover:bg-amber-500/10 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-amber-500/20 p-2 rounded-full text-amber-400"><CreditCard size={18}/></div>
                    <h4 className="font-bold text-white">Вариант 2: Годишен Абонамент</h4>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    Платете еднократна такса и получете незабавен достъп за 1 година.
                  </p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-gray-500">Цена:</span>
                    <span className="text-xl font-bold text-white">20.00 лв.</span>
                  </div>
                  <GlassPillButton onClick={handleSubscribe} primary className="!py-2 !text-sm w-full !bg-gradient-to-r !from-amber-600 !to-yellow-600">
                    Абонирай се
                  </GlassPillButton>
               </div>
             </div>
          </GlassCard>
        </div>
      ) : (
        /* UNLOCKED STATE */
        <div className="space-y-8 animate-fade-in">
          {/* Status Banner */}
          <GlassCard className="bg-gradient-to-r from-emerald-900/20 to-emerald-600/10 border !border-emerald-500/30 flex justify-between items-center">
             <div className="flex items-center gap-4">
               <div className="bg-emerald-500 rounded-full p-2 text-white shadow-lg shadow-emerald-500/20">
                 <CheckCircle size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-lg text-white">Вие сте активен член</h3>
                 <p className="text-sm text-emerald-400">Валидност до: {membershipExpiry.toLocaleDateString('bg-BG')}</p>
               </div>
             </div>
             <GlassPillButton onClick={() => setActiveTab('planning')} icon={Box} className="!py-2 !text-sm">
               Към 3D Планера
             </GlassPillButton>
          </GlassCard>

          {/* Coupons Grid */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Вашите Промо Кодове (10%)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_PARTNER_COUPONS.map(coupon => (
                <GlassCard key={coupon.id} className="relative overflow-hidden group">
                   <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                     -{coupon.discountPercentage}%
                   </div>
                   
                   <div className="flex items-center gap-4 mb-4">
                     <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <img src={coupon.logoUrl} alt={coupon.partnerName} className="w-8 h-8 opacity-80" />
                     </div>
                     <div>
                       <h4 className="font-bold text-white">{coupon.partnerName}</h4>
                       <a href={`https://${coupon.website}`} target="_blank" rel="noreferrer" className="text-xs text-cyan-400 flex items-center gap-1 hover:underline">
                         {coupon.website} <ExternalLink size={10} />
                       </a>
                     </div>
                   </div>

                   <p className="text-sm text-gray-400 mb-4">Категория: {coupon.category}</p>

                   <div className="bg-black/30 border border-dashed border-white/20 rounded-lg p-3 flex justify-between items-center">
                      <code className="text-amber-400 font-mono font-bold text-lg tracking-wider">
                        {coupon.code}
                      </code>
                      <button 
                        onClick={() => handleCopyCode(coupon.code, coupon.id)}
                        className="text-gray-400 hover:text-white transition-colors"
                        title="Копирай"
                      >
                        {copiedCodeId === coupon.id ? <CheckCircle size={20} className="text-green-500" /> : <Copy size={20} />}
                      </button>
                   </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderPlanning = () => (
    <div className="animate-fade-in h-[600px] relative">
      {!isClubMember ? (
         <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md rounded-2xl border border-white/10 text-center p-8">
            <Lock size={48} className="text-gray-500 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">3D Планерът е заключен</h3>
            <p className="text-gray-400 max-w-md mb-6">
              За да използвате софтуера за визуализация, трябва да сте член на Клуб Предимства (Активен проект > 100 лв. или Абонамент).
            </p>
            <GlassPillButton onClick={() => setActiveTab('club')} primary>
              Отключи Достъп
            </GlassPillButton>
         </div>
      ) : (
        <GlassCard className="h-full w-full !p-0 overflow-hidden relative flex flex-col">
           <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40">
             <h3 className="font-bold text-white flex items-center gap-2">
               <Box className="text-cyan-400" /> 3D Project Visualizer
             </h3>
             <span className="text-xs text-green-400 flex items-center gap-1">
               <CheckCircle size={12} /> Лиценз Активен
             </span>
           </div>
           <div className="flex-grow bg-gray-900 relative flex items-center justify-center">
              {/* iFrame Simulation */}
              <div className="text-center text-gray-500">
                <Box size={64} className="mx-auto mb-4 opacity-30" />
                <p>Интеграция на външен 3D софтуер (iFrame)</p>
                <p className="text-sm mt-2">Зареждане на интерфейс...</p>
              </div>
           </div>
        </GlassCard>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen">
      {comparingProject && renderOfferComparison(comparingProject)}

      {showPlanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
           <GlassCard className="w-full max-w-6xl h-[80vh] flex flex-col !bg-[#0f172a] relative">
              <button onClick={() => setShowPlanner(false)} className="absolute top-4 right-4 text-white z-20"><X /></button>
              <div className="flex-grow bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                    <Box size={64} className="mb-4 opacity-50" />
                    <p className="text-lg">Интерактивен 3D Планер се зарежда...</p>
                 </div>
              </div>
           </GlassCard>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-3 drop-shadow-md text-white">
          <div className="p-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-md">
            <User className="text-cyan-300 w-6 h-6" />
          </div>
          Моят Профил
        </h2>
        <GlassPillButton onClick={onPostRequest} icon={Search}>
          Нов Проект
        </GlassPillButton>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'dashboard' ? 'bg-white text-blue-900' : 'bg-white/5 text-gray-400 hover:text-white'}`}
        >
          Табло
        </button>
        <button 
          onClick={() => setActiveTab('club')}
          className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${activeTab === 'club' ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-white/5 text-gray-400 hover:text-white'}`}
        >
          <Crown size={16} /> Клуб Предимства
        </button>
        <button 
          onClick={() => setActiveTab('planning')}
          className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${activeTab === 'planning' ? 'bg-cyan-500 text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}
        >
          <Box size={16} /> 3D Планиране
        </button>
      </div>

      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'club' && renderClubBenefits()}
      {activeTab === 'planning' && renderPlanning()}

    </div>
  );
};

export default ClientDashboard;