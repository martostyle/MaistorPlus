
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GlassCard from './components/GlassCard';
import EscrowCalculator from './components/EscrowCalculator';
import MasterCard from './components/MasterCard';
import MasterDashboard from './components/MasterDashboard';
import ClientDashboard from './components/ClientDashboard';
import MasterPriceCalculator from './components/MasterPriceCalculator';
import RequestWizard from './components/RequestWizard';
import GlassPillButton from './components/GlassPillButton';
import Footer from './components/Footer';
import LegalModals from './components/LegalModals';
import { MOCK_MASTERS, CLIENT_PROJECTS } from './services/mockData';
import { ViewState, SystemSettings, Master, ServiceRequestDraft } from './types';
import { 
  ShieldCheck, 
  Sofa, 
  Search,
  MapPin,
  Briefcase,
  User,
  Settings,
  Filter
} from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'client' | 'master' | null>(null);
  
  // Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('Всички');
  const [selectedCategory, setSelectedCategory] = useState('Всички');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [filteredMasters, setFilteredMasters] = useState<Master[]>(MOCK_MASTERS);

  // Calculator State
  const [calculatorMaster, setCalculatorMaster] = useState<Master | null>(null);

  // Legal Modal State
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [legalTab, setLegalTab] = useState<'terms' | 'escrow' | 'liability'>('terms');

  // Platform Architecture: System Settings
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    isEscrowMandatory: true,
    escrowThreshold: 500
  });

  // Effect to filter and SORT masters (Priority Ranking)
  useEffect(() => {
    let result = [...MOCK_MASTERS];

    if (selectedCity !== 'Всички') {
      result = result.filter(m => m.location === selectedCity);
    }

    if (selectedCategory !== 'Всички') {
      result = result.filter(m => 
        m.specialty.toLowerCase().includes(selectedCategory.toLowerCase()) || 
        m.tags.some(t => t.toLowerCase().includes(selectedCategory.toLowerCase()))
      );
    }

    if (onlyAvailable) {
      result = result.filter(m => m.isAvailable);
    }

    if (searchTerm) {
      result = result.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Priority Ranking: PLUS members first, then by rating
    result.sort((a, b) => {
      if (a.subscriptionTier === 'plus' && b.subscriptionTier !== 'plus') return -1;
      if (a.subscriptionTier !== 'plus' && b.subscriptionTier === 'plus') return 1;
      return b.rating - a.rating; // Secondary sort by rating
    });

    setFilteredMasters(result);
  }, [searchTerm, selectedCity, selectedCategory, onlyAvailable]);


  const handleLogin = (role: 'client' | 'master') => {
    setIsAuthenticated(true);
    setUserRole(role);
    if (role === 'client') {
      setCurrentView(ViewState.SEARCH);
    } else {
      setCurrentView(ViewState.DASHBOARD_MASTER);
    }
  };

  const handlePostRequest = (data: ServiceRequestDraft) => {
    console.log("Submitting Request:", data);
    // Here you would upload to backend
    setCurrentView(ViewState.DASHBOARD_CLIENT); // Redirect to dashboard after success
  };

  const handleOpenLegal = (tab: 'terms' | 'escrow' | 'liability') => {
    setLegalTab(tab);
    setShowLegalModal(true);
  };

  const renderHome = () => (
    <Hero 
      onLoginSuccess={handleLogin} 
      onBrowse={() => setCurrentView(ViewState.SEARCH)} 
      onPostRequest={() => setCurrentView(ViewState.POST_REQUEST)}
    />
  );

  const renderSearch = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-bold mb-4 drop-shadow-md text-white">Намерете Професионалист</h2>
          <p className="text-xl text-gray-200">Изберете най-добрия майстор за вашия проект</p>
        </div>
        
        {/* Advanced Search Engine */}
        <div className="w-full md:w-auto mt-6 md:mt-0">
          <GlassCard className="p-4 flex flex-col md:flex-row items-center gap-4 !bg-white/10 !border-white/30 backdrop-blur-xl">
            
            {/* Search Input */}
            <div className="flex items-center gap-2 border-b md:border-b-0 md:border-r border-white/20 pb-2 md:pb-0 md:pr-4 w-full md:w-auto">
               <Search className="text-white/70 w-5 h-5" />
               <input 
                 type="text" 
                 placeholder="Каква услуга търсите?"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="bg-transparent border-none text-white placeholder-white/50 focus:outline-none px-2 w-full md:w-48"
               />
            </div>

            {/* City Filter */}
            <div className="flex items-center gap-2 border-b md:border-b-0 md:border-r border-white/20 pb-2 md:pb-0 md:pr-4 w-full md:w-auto">
               <MapPin className="text-white/70 w-5 h-5" />
               <select 
                 value={selectedCity}
                 onChange={(e) => setSelectedCity(e.target.value)}
                 className="bg-transparent border-none text-white focus:outline-none cursor-pointer w-full md:w-auto [&>option]:text-black"
               >
                  <option value="Всички">Всички Градове</option>
                  <option value="София">София</option>
                  <option value="Пловдив">Пловдив</option>
                  <option value="Варна">Варна</option>
               </select>
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center gap-2 w-full md:w-auto">
               <label className="flex items-center gap-2 cursor-pointer text-sm text-white select-none">
                 <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${onlyAvailable ? 'bg-cyan-500 border-cyan-500' : 'border-white/50'}`}>
                    {onlyAvailable && <div className="w-2 h-2 bg-white rounded-[1px]" />}
                    <input type="checkbox" className="hidden" checked={onlyAvailable} onChange={() => setOnlyAvailable(!onlyAvailable)} />
                 </div>
                 Само Свободни
               </label>
            </div>

            {/* Search Button */}
            <GlassPillButton primary className="!px-6 !py-2 !text-sm w-full md:w-auto">Търси</GlassPillButton>
          </GlassCard>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-4 mb-12">
        {['Всички', 'ВиК', 'Електро', 'Боядисване', 'Покриви', 'Интериор', 'Мебели'].map((cat) => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full border backdrop-blur-md transition-all ${selectedCategory === cat ? 'bg-white text-blue-900 border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'bg-white/5 border-white/20 hover:bg-white/10 text-white hover:border-white/40'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMasters.length > 0 ? (
          filteredMasters.map(master => (
            <MasterCard 
              key={master.id} 
              master={master} 
              onOpenCalculator={(m) => setCalculatorMaster(m)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-gray-400">Няма намерени майстори с тези критерии.</p>
          </div>
        )}
      </div>
      
      <div className="mt-20">
         <EscrowCalculator />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans text-white overflow-x-hidden relative flex flex-col">
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

      {/* Calculator Modal */}
      {calculatorMaster && (
        <MasterPriceCalculator 
          master={calculatorMaster} 
          onClose={() => setCalculatorMaster(null)} 
        />
      )}

      {/* Legal Modals */}
      {showLegalModal && (
        <LegalModals initialTab={legalTab} onClose={() => setShowLegalModal(false)} />
      )}

      {/* Admin / System Settings Toggle (Hidden in production, visible for architecture demo) */}
      <div className="fixed bottom-4 right-4 z-50">
        <GlassCard className="!p-2 flex items-center gap-3 !bg-black/80">
           <Settings size={16} className="text-gray-400" />
           <div className="flex items-center gap-2">
             <span className="text-xs text-gray-400">Escrow {'>'} 500лв:</span>
             <button 
               onClick={() => setSystemSettings(prev => ({...prev, isEscrowMandatory: !prev.isEscrowMandatory}))}
               className={`w-8 h-4 rounded-full relative transition-colors ${systemSettings.isEscrowMandatory ? 'bg-green-500' : 'bg-gray-600'}`}
             >
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${systemSettings.isEscrowMandatory ? 'left-4.5' : 'left-0.5'}`}></div>
             </button>
           </div>
        </GlassCard>
      </div>

      <main className="relative z-10 flex-grow">
        {currentView === ViewState.HOME && renderHome()}
        {currentView === ViewState.SEARCH && renderSearch()}
        {currentView === ViewState.POST_REQUEST && (
          <RequestWizard 
            onSubmit={handlePostRequest} 
            onCancel={() => setCurrentView(ViewState.HOME)} 
          />
        )}
        {currentView === ViewState.DASHBOARD_CLIENT && (
          <ClientDashboard 
            projects={CLIENT_PROJECTS} 
            systemSettings={systemSettings} 
            onPostRequest={() => setCurrentView(ViewState.POST_REQUEST)}
          />
        )}
        {currentView === ViewState.DASHBOARD_MASTER && <MasterDashboard />}
      </main>

      {/* Footer */}
      <Footer onOpenLegal={handleOpenLegal} />
    </div>
  );
};

export default App;
