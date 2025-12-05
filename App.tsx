import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GlassCard from './components/GlassCard';
import EscrowCalculator from './components/EscrowCalculator';
import MasterCard from './components/MasterCard';
import GlassPillButton from './components/GlassPillButton';
import { MOCK_MASTERS, CLIENT_PROJECTS, MASTER_PROJECTS, INCOME_DATA } from './services/mockData';
import { ViewState } from './types';
import { 
  ShieldCheck, 
  Sofa, 
  FileText, 
  AlertCircle,
  TrendingUp,
  Users,
  Award,
  User,
  LayoutDashboard,
  Search,
  MapPin,
  Briefcase
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'client' | 'master' | null>(null);

  const handleLogin = (role: 'client' | 'master') => {
    setIsAuthenticated(true);
    setUserRole(role);
    if (role === 'client') {
      setCurrentView(ViewState.SEARCH);
    } else {
      setCurrentView(ViewState.DASHBOARD_MASTER);
    }
  };

  const renderHome = () => (
    <Hero 
      onLoginSuccess={handleLogin} 
      onBrowse={() => setCurrentView(ViewState.SEARCH)} 
    />
  );

  const renderSearch = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-bold mb-4 drop-shadow-md text-white">Намерете Професионалист</h2>
          <p className="text-xl text-gray-200">Изберете най-добрия майстор за вашия проект</p>
        </div>
        
        {/* Advanced Search Bar */}
        <div className="w-full md:w-auto mt-6 md:mt-0">
          <GlassCard className="p-2 flex items-center gap-2 !rounded-full !bg-white/10 !border-white/30 backdrop-blur-xl">
            <Search className="ml-3 text-white/70 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Каква услуга търсите?"
              className="bg-transparent border-none text-white placeholder-white/50 focus:outline-none px-2 w-full md:w-64"
            />
            <div className="h-6 w-px bg-white/20"></div>
            <MapPin className="text-white/70 w-5 h-5 ml-1" />
             <select className="bg-transparent border-none text-white focus:outline-none cursor-pointer">
                <option className="text-black">София</option>
                <option className="text-black">Пловдив</option>
                <option className="text-black">Варна</option>
             </select>
            <GlassPillButton primary className="!px-6 !py-2 !text-sm">Търси</GlassPillButton>
          </GlassCard>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-4 mb-12">
        {['Всички', 'ВиК', 'Електро', 'Боядисване', 'Покриви', 'Интериор', 'Мебели'].map((cat, idx) => (
          <button 
            key={cat}
            className={`px-6 py-2 rounded-full border backdrop-blur-md transition-all ${idx === 0 ? 'bg-white text-blue-900 border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'bg-white/5 border-white/20 hover:bg-white/10 text-white hover:border-white/40'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_MASTERS.map(master => (
          <MasterCard key={master.id} master={master} />
        ))}
      </div>
      
      <div className="mt-20">
         <EscrowCalculator />
      </div>
    </div>
  );

  const renderClientDashboard = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-3 drop-shadow-md text-white">
          <div className="p-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-md">
            <User className="text-cyan-300 w-6 h-6" />
          </div>
          Моят Профил
        </h2>
        <GlassPillButton onClick={() => setCurrentView(ViewState.SEARCH)} icon={Search}>
          Нов Проект
        </GlassPillButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Active Projects */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-semibold mb-4 text-white/90">Активни Проекти</h3>
          {CLIENT_PROJECTS.map(project => (
            <GlassCard key={project.id} className="flex flex-col md:flex-row justify-between items-center gap-4 hover:border-white/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${project.status === 'active' ? 'bg-emerald-500/10 text-green-400 border border-green-500/20' : 'bg-white/5 text-gray-400'}`}>
                  <Briefcase size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1 text-white">{project.title}</h4>
                  <p className="text-sm text-gray-300 flex items-center gap-2">
                    <User size={14} /> {project.masterName} 
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span> 
                    {project.date}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="font-bold text-2xl tracking-tight text-white">{project.amount} лв.</span>
                {project.escrowSecured ? (
                  <span className="text-xs flex items-center gap-1 text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" /> Escrow Защитен
                  </span>
                ) : (
                  <span className="text-xs text-yellow-300 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                    Директно плащане
                  </span>
                )}
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Benefits Sidebar */}
        <div className="space-y-6">
           <GlassCard className="relative overflow-hidden !border-purple-400/30 group">
             <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-50 group-hover:opacity-70 transition-opacity"></div>
             <div className="relative z-10">
               <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-purple-500/20 rounded-lg backdrop-blur-md">
                    <Sofa className="w-6 h-6 text-purple-300" />
                 </div>
                 <h3 className="font-bold text-lg text-white">Партньорски Отстъпки</h3>
               </div>
               <p className="text-sm text-gray-200 mb-6 leading-relaxed">
                 Тъй като имате активен проект над 500 лв, вие отключихте специални цени за мебели.
               </p>
               <GlassPillButton className="w-full !py-2 !text-sm">
                 Разгледай Каталог
               </GlassPillButton>
             </div>
           </GlassCard>

           <GlassCard>
             <h3 className="font-bold mb-4 text-white/90">Инструменти</h3>
             <ul className="space-y-4">
               <li className="flex items-center gap-3 text-sm text-gray-300 hover:text-white cursor-pointer group">
                 <div className="w-2 h-2 bg-cyan-400 rounded-full group-hover:shadow-[0_0_10px_#22d3ee] transition-all"></div> 
                 3D Визуализатор (Безплатно)
               </li>
               <li className="flex items-center gap-3 text-sm text-gray-300 hover:text-white cursor-pointer group">
                 <div className="w-2 h-2 bg-cyan-400 rounded-full group-hover:shadow-[0_0_10px_#22d3ee] transition-all"></div> 
                 Правна помощ
               </li>
             </ul>
           </GlassCard>
        </div>
      </div>
    </div>
  );

  const renderMasterDashboard = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-3 drop-shadow-md text-white">
          <div className="p-2 bg-orange-500/10 rounded-full border border-orange-500/20 backdrop-blur-md">
             <LayoutDashboard className="text-orange-400 w-6 h-6" />
          </div>
          Табло за Управление
        </h2>
        <span className="px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-300 border border-orange-500/30 text-sm font-bold backdrop-blur-md shadow-[0_0_15px_rgba(249,115,22,0.2)]">
          PRO Plan Active
        </span>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <GlassCard>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-200 font-medium">Приходи (Юли)</span>
            <TrendingUp className="text-emerald-400 w-5 h-5" />
          </div>
          <div className="text-4xl font-bold text-white tracking-tight">4,300 лв.</div>
          <div className="text-sm text-emerald-400 mt-2 font-medium bg-emerald-500/10 inline-block px-2 py-0.5 rounded border border-emerald-500/20">+12% спрямо Юни</div>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-200 font-medium">Нови Запитвания</span>
            <Users className="text-blue-400 w-5 h-5" />
          </div>
          <div className="text-4xl font-bold text-white tracking-tight">14</div>
          <div className="text-sm text-gray-300 mt-2">3 чакат отговор</div>
        </GlassCard>
        <GlassCard>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-200 font-medium">Рейтинг</span>
            <Award className="text-yellow-400 w-5 h-5" />
          </div>
          <div className="text-4xl font-bold text-white tracking-tight">4.9</div>
          <div className="text-sm text-yellow-200/70 mt-2">Топ 5% в региона</div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart Area */}
        <div className="lg:col-span-2">
          <GlassCard className="h-[400px]">
            <h3 className="font-bold mb-6 text-lg text-white">Финансов Обзор</h3>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={INCOME_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" tick={{fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.4)" tick={{fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', backdropFilter: 'blur(10px)' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="income" fill="url(#colorIncome)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>

          <div className="mt-8">
             <h3 className="font-bold mb-4 text-lg text-white">Последни Проекти</h3>
             <div className="space-y-4">
                {MASTER_PROJECTS.map(proj => (
                  <GlassCard key={proj.id} className="p-4 flex justify-between items-center hover:border-white/20 cursor-pointer">
                    <div>
                      <h4 className="font-bold text-white">{proj.title}</h4>
                      <div className="mt-1">
                        <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase ${proj.status === 'active' ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'}`}>
                          {proj.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-white">{proj.amount} лв.</div>
                      <div className="text-xs text-gray-400">{proj.date}</div>
                    </div>
                  </GlassCard>
                ))}
             </div>
          </div>
        </div>

        {/* B2B Services Sidebar */}
        <div className="space-y-6">
          <GlassCard className="!border-orange-500/30 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <h3 className="font-bold text-orange-400 mb-6 flex items-center gap-2">
               <ShieldCheck size={18} />
               Maistor Plus Services
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group backdrop-blur-sm">
                <span className="text-sm font-medium group-hover:text-white text-gray-300">Генерирай Фактура</span>
                <FileText className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group backdrop-blur-sm">
                <span className="text-sm font-medium group-hover:text-white text-gray-300">Застраховка "Труд"</span>
                <ShieldCheck className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group backdrop-blur-sm">
                <span className="text-sm font-medium group-hover:text-white text-gray-300">Поръчай Мебели (-10%)</span>
                <Sofa className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
              </button>
            </div>
          </GlassCard>

          <GlassCard className="!bg-gradient-to-br !from-blue-900/40 !to-transparent">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-500/20 rounded-lg shrink-0 backdrop-blur-md">
                 <AlertCircle className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Съвет за растеж</h4>
                <p className="text-xs text-gray-200 mt-2 leading-relaxed">
                  Попълнете портфолиото си с още 3 проекта, за да отключите значката "Вдъхновяващ Майстор" и да излизате напред в търсенето.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans text-white overflow-x-hidden relative">
      <Navbar currentView={currentView} onChangeView={setCurrentView} />
      
      {/* Background for inner pages - Dark, Abstract, Professional */}
      {currentView !== ViewState.HOME && (
        <div className="fixed inset-0 z-0 bg-[#020617]"> {/* Slate 950 base */}
          {/* Subtle Ambient Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>
          
          {/* Very faint localized blurs to allow glass effect to work without being distracting */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] opacity-50"></div>
        </div>
      )}

      <main className="relative z-10">
        {currentView === ViewState.HOME && renderHome()}
        {currentView === ViewState.SEARCH && renderSearch()}
        {currentView === ViewState.DASHBOARD_CLIENT && renderClientDashboard()}
        {currentView === ViewState.DASHBOARD_MASTER && renderMasterDashboard()}
      </main>

      {/* Footer (Simplified for glass look) */}
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-lg py-8 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p className="text-sm">&copy; 2024 Maistor Plus. Сигурност и Качество.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;