
import React, { useState } from 'react';
import { LayoutDashboard, FileText, Wallet, User, ShieldCheck, Plus, Image as ImageIcon, Star, Upload, Trash, Bell, Lock, Crown, ShoppingBag, PieChart, TrendingUp, X, Check, Box, FileCheck, Umbrella } from 'lucide-react';
import GlassCard from './GlassCard';
import GlassPillButton from './GlassPillButton';
import SubscriptionModal from './SubscriptionModal';
import { INCOME_DATA, MASTER_PROJECTS, MOCK_LEADS, MOCK_FURNITURE_CATALOG, MOCK_COMMISSIONS, INSURANCE_OPTIONS, DOC_TEMPLATES } from '../services/mockData';
import { Master, GalleryItem, Lead, ServiceItem, SubscriptionTier, FurnitureItem, CommissionRecord, Project } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface MasterDashboardProps {
  master?: Master;
}

type DashboardTab = 'requests' | 'projects' | 'finance' | 'profile' | 'affiliate' | 'tools';

const MasterDashboard: React.FC<MasterDashboardProps> = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('requests');
  // Local state to simulate subscription for demo purposes
  const [currentTier, setCurrentTier] = useState<SubscriptionTier>('free'); 
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Mock Profile State
  const [eik, setEik] = useState('201451234');
  const [insurance, setInsurance] = useState('');
  const [gallery, setGallery] = useState<GalleryItem[]>([
    { id: '1', imageUrl: 'https://picsum.photos/300/200?random=10', title: 'Баня Лукс', rating: 5, clientReview: 'Перфектна работа!' },
    { id: '2', imageUrl: 'https://picsum.photos/300/200?random=11', title: 'Хол Ремонт', rating: 4 }
  ]);
  const [services, setServices] = useState<ServiceItem[]>([
    { id: 's1', name: 'Оглед', price: 30, unit: 'посещение' },
    { id: 's2', name: 'Консултация', price: 50, unit: 'час' }
  ]);
  const [newService, setNewService] = useState({ name: '', price: '', unit: '' });

  // Leads State
  const [filterRegion, setFilterRegion] = useState('Всички');
  const [filterCategory, setFilterCategory] = useState('Всички');

  // Affiliate State
  const [selectedProduct, setSelectedProduct] = useState<FurnitureItem | null>(null);
  const [commissions, setCommissions] = useState<CommissionRecord[]>(MOCK_COMMISSIONS);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const handleAddService = () => {
    if (newService.name && newService.price) {
      setServices([...services, { id: Date.now().toString(), name: newService.name, price: Number(newService.price), unit: newService.unit || 'бр.' }]);
      setNewService({ name: '', price: '', unit: '' });
    }
  };
  
  const handleOrderFurniture = (project: Project) => {
    if (!selectedProduct) return;
    
    // Calculate 10% commission on PARTNER price (or Retail, depending on business logic - usually Retail or Deal price)
    // Let's assume commission is 10% of Partner Price for simplicity
    const commissionAmount = Math.round(selectedProduct.partnerPrice * 0.10);
    
    const newRecord: CommissionRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('bg-BG'),
      itemName: selectedProduct.name,
      amount: commissionAmount,
      projectName: project.title
    };
    
    setCommissions([newRecord, ...commissions]);
    setShowOrderModal(false);
    setSelectedProduct(null);
    alert(`Поръчката за "${selectedProduct.name}" е успешна! Комисионна от ${commissionAmount} лв. е добавена към сметката ви.`);
  };

  const renderSidebar = () => (
    <div className="space-y-2">
      <button 
        onClick={() => setActiveTab('requests')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'requests' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
        <div className="relative">
          <FileText size={20} />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
        </div>
        <span className="font-medium">Нови Заявки</span>
      </button>

      <button 
        onClick={() => setActiveTab('projects')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'projects' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
        <LayoutDashboard size={20} />
        <span className="font-medium">Моите Проекти</span>
      </button>

      <button 
        onClick={() => setActiveTab('tools')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'tools' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
        <div className="flex items-center gap-2">
          <Box size={20} />
          {currentTier === 'free' && <Lock size={12} className="text-gray-500" />}
        </div>
        <span className="font-medium">Инструменти & Документи</span>
      </button>
      
      <button 
        onClick={() => setActiveTab('affiliate')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'affiliate' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
        <ShoppingBag size={20} />
        <span className="font-medium">Магазин & Комисионни</span>
      </button>

      <button 
        onClick={() => setActiveTab('finance')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'finance' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
        <div className="flex items-center gap-2">
           <Wallet size={20} />
           {currentTier === 'free' && <Lock size={12} className="text-gray-500" />}
        </div>
        <span className="font-medium">Финанси</span>
      </button>

      <button 
        onClick={() => setActiveTab('profile')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
        <User size={20} />
        <span className="font-medium">Профил и Услуги</span>
      </button>
      
      {/* Upgrade Call to Action */}
      {currentTier === 'free' && (
        <div className="mt-8 p-4 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-500/30 text-center">
          <Crown className="w-8 h-8 text-orange-400 mx-auto mb-2" />
          <h4 className="text-white font-bold text-sm mb-1">Майстор ПЛЮС</h4>
          <p className="text-xs text-gray-400 mb-3">Отключи всички лийдове</p>
          <GlassPillButton onClick={() => setShowUpgradeModal(true)} primary className="w-full !py-2 !text-xs">
            Активирай
          </GlassPillButton>
        </div>
      )}
    </div>
  );

  const renderTools = () => (
    <div className="animate-fade-in space-y-8">
      {/* 3D Planner - Available for everyone (Basic) */}
      <GlassCard>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Box className="text-cyan-400" /> 3D Планиране на Проекта
        </h3>
        <p className="text-sm text-gray-400 mb-6">
          Визуализирайте идеите си или скицирайте план на помещението директно в браузъра.
        </p>
        <div className="aspect-video w-full bg-black/40 rounded-xl overflow-hidden border border-white/10 relative">
           <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
             <Box size={48} className="mb-2 opacity-50" />
             <p>Интерактивен 3D Планер (iFrame)</p>
             <GlassPillButton className="mt-4 !py-2 !text-sm">Стартирай</GlassPillButton>
           </div>
        </div>
      </GlassCard>

      {/* Document Generator - Locked for Free */}
      <GlassCard className="relative overflow-hidden">
        {currentTier === 'free' && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-6">
            <Lock className="text-orange-400 mb-2" />
            <h4 className="text-white font-bold">Генератор на Документи</h4>
            <p className="text-sm text-gray-400 mb-4">Автоматични оферти и протоколи само за ПЛЮС членове</p>
            <GlassPillButton onClick={() => setShowUpgradeModal(true)} primary className="!py-1 !px-4 !text-xs">Отключи</GlassPillButton>
          </div>
        )}

        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <FileCheck className="text-orange-400" /> Генератор на Документи
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {DOC_TEMPLATES.map(doc => (
            <div key={doc.id} className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-orange-400/50 transition-colors cursor-pointer group">
              <div className="bg-orange-500/10 w-10 h-10 rounded-full flex items-center justify-center mb-3 text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <FileText size={20} />
              </div>
              <h4 className="font-bold text-white mb-1">{doc.title}</h4>
              <p className="text-xs text-gray-400">{doc.description}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Insurance Hub */}
      <GlassCard>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Umbrella className="text-blue-400" /> Професионална Застраховка
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Защитете бизнеса си и повишете доверието на клиентите чрез нашите партньори.
        </p>
        <div className="space-y-4">
          {INSURANCE_OPTIONS.map(ins => (
            <div key={ins.id} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                    <img src={ins.logoUrl} alt={ins.providerName} className="opacity-80" />
                 </div>
                 <div>
                   <h4 className="font-bold text-white">{ins.providerName}</h4>
                   <p className="text-xs text-emerald-400 flex items-center gap-1">
                     <ShieldCheck size={12} /> Покритие до {ins.coverageAmount.toLocaleString()} лв.
                   </p>
                 </div>
               </div>
               <div className="text-right">
                 <div className="text-white font-bold">{ins.pricePerYear} лв. <span className="text-xs font-normal text-gray-400">/ год</span></div>
                 <button className="text-cyan-400 text-xs hover:underline mt-1">Купи Онлайн</button>
               </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );

  const renderProfileSettings = () => (
    <div className="space-y-8 animate-fade-in">
      {/* Services / Price List */}
      <GlassCard>
        <h3 className="text-xl font-bold text-white mb-6">Каталог Услуги (Ценоразпис)</h3>
        <p className="text-sm text-gray-400 mb-4">Въведете базови цени за вашите услуги. Това позволява на клиентите да използват калкулатора.</p>
        
        <div className="space-y-3 mb-6">
          {services.map((svc, idx) => (
            <div key={svc.id} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/10">
              <span className="text-white font-medium">{svc.name}</span>
              <div className="flex items-center gap-4">
                <span className="text-orange-400">{svc.price} лв. / {svc.unit}</span>
                <button onClick={() => setServices(services.filter(s => s.id !== svc.id))} className="text-gray-500 hover:text-red-400"><Trash size={16}/></button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <input 
            placeholder="Услуга" 
            value={newService.name} 
            onChange={e => setNewService({...newService, name: e.target.value})}
            className="bg-white/5 border border-white/10 rounded-lg p-2 text-white"
          />
          <div className="flex gap-2">
            <input 
              placeholder="Цена" 
              type="number" 
              value={newService.price}
              onChange={e => setNewService({...newService, price: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
            />
            <input 
              placeholder="Мярка" 
              value={newService.unit}
              onChange={e => setNewService({...newService, unit: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
            />
          </div>
          <GlassPillButton onClick={handleAddService} className="!py-2 !text-sm">Добави</GlassPillButton>
        </div>
      </GlassCard>

      {/* Verification Section - Locked for Free */}
      <GlassCard className="!border-l-4 !border-l-emerald-500 relative overflow-hidden">
        {currentTier === 'free' && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-6">
            <Lock className="text-gray-400 mb-2" />
            <h4 className="text-white font-bold">Бизнес Профил в Google</h4>
            <p className="text-sm text-gray-400 mb-4">Автоматична оптимизация само за ПЛЮС членове</p>
            <GlassPillButton onClick={() => setShowUpgradeModal(true)} primary className="!py-1 !px-4 !text-xs">Отключи</GlassPillButton>
          </div>
        )}

        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <ShieldCheck className="text-emerald-400" />
          Верификация и Данни
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">ЕИК / БУЛСТАТ</label>
            <div className="relative">
              <input 
                type="text" 
                value={eik} 
                onChange={(e) => setEik(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-orange-400 outline-none backdrop-blur-sm"
              />
              <div className="absolute right-3 top-3 text-emerald-400 text-xs font-bold border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded">
                ПРОВЕРЕН
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Gallery Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Галерия с Проекти</h3>
          <GlassPillButton className="!px-4 !py-2 !text-sm">
            <Plus size={16} /> Добави Проект
          </GlassPillButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map(item => (
             <GlassCard key={item.id} className="group !p-0 overflow-hidden relative">
               <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                 <h4 className="font-bold text-white">{item.title}</h4>
                 <div className="flex items-center gap-2 mt-1">
                   {item.rating ? (
                     <div className="flex text-yellow-400">
                       {[...Array(5)].map((_, i) => (
                         <Star key={i} size={14} fill={i < item.rating! ? "currentColor" : "none"} />
                       ))}
                     </div>
                   ) : (
                     <span className="text-xs text-gray-400 italic">Очаква оценка от клиент</span>
                   )}
                 </div>
               </div>
             </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLeads = () => (
    <div className="space-y-6 animate-fade-in">
       <div className="flex gap-4 mb-6">
         <select 
           value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)}
           className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-orange-400 outline-none"
         >
           <option className="text-black" value="Всички">Всички Региони</option>
           <option className="text-black" value="София">София</option>
           <option className="text-black" value="Пловдив">Пловдив</option>
         </select>
         <select 
           value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
           className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-orange-400 outline-none"
         >
           <option className="text-black" value="Всички">Всички Категории</option>
           <option className="text-black" value="ВиК">ВиК</option>
           <option className="text-black" value="Електро">Електро</option>
           <option className="text-black" value="Покриви">Покриви</option>
         </select>
       </div>

       <div className="space-y-4">
         {MOCK_LEADS
           .filter(l => (filterRegion === 'Всички' || l.location.includes(filterRegion)) && (filterCategory === 'Всички' || l.category === filterCategory))
           .map(lead => {
             const isLocked = currentTier === 'free' && lead.isPlusOnly;
             
             return (
               <GlassCard key={lead.id} className={`transition-all relative overflow-hidden ${lead.isHighPriority ? 'border-l-4 border-l-red-500' : ''}`}>
                 
                 {/* Lock Overlay for Free users on Plus leads */}
                 {isLocked && (
                   <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-10 flex flex-col items-center justify-center text-center p-4">
                      <Lock className="text-orange-400 w-8 h-8 mb-2" />
                      <h4 className="text-white font-bold text-lg">ПЛЮС Заявка</h4>
                      <p className="text-gray-300 text-sm mb-4">Този високобюджетен проект е достъпен само за ПЛЮС членове.</p>
                      <GlassPillButton onClick={() => setShowUpgradeModal(true)} primary className="!py-2 !text-sm">
                        Отключи сега
                      </GlassPillButton>
                   </div>
                 )}

                 <div className="flex justify-between items-start mb-4">
                   <div>
                     <div className="flex items-center gap-2 mb-1">
                       <h4 className="font-bold text-lg text-white">{lead.title}</h4>
                       {lead.isHighPriority && (
                         <span className="bg-red-500/20 text-red-400 text-[10px] px-2 py-0.5 rounded-full border border-red-500/30 flex items-center gap-1">
                           <Bell size={10} /> Приоритет
                         </span>
                       )}
                     </div>
                     <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{lead.category}</span>
                        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                        <span>{lead.location}</span>
                        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                        <span>{lead.date}</span>
                     </div>
                   </div>
                   <div className="text-right">
                      <span className="block text-sm font-bold text-orange-400 mb-1">{lead.budget}</span>
                      {lead.imagesCount > 0 && (
                        <span className="text-xs text-gray-500 flex items-center justify-end gap-1">
                          <ImageIcon size={12} /> {lead.imagesCount} снимки
                        </span>
                      )}
                   </div>
                 </div>
                 
                 <p className="text-gray-300 text-sm mb-4 bg-black/20 p-3 rounded-lg border border-white/5">
                   {lead.description}
                 </p>

                 <div className="flex justify-end gap-3">
                   <button className="text-gray-400 text-sm hover:text-white px-4 py-2">Скрий</button>
                   <GlassPillButton className="!px-6 !py-2 !text-sm">Кандидатствай</GlassPillButton>
                 </div>
               </GlassCard>
             );
           })}
       </div>
    </div>
  );
  
  const renderAffiliate = () => (
    <div className="animate-fade-in space-y-8">
      {/* Introduction Card */}
      <GlassCard className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border !border-purple-500/30">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-500/20 rounded-xl">
             <ShoppingBag className="w-8 h-8 text-purple-300" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">The Commission Engine</h3>
            <p className="text-gray-300 text-sm max-w-2xl">
              Поръчайте мебели за вашия клиент директно от тук и спечелете <span className="text-purple-400 font-bold">10% комисионна</span>. Клиентът получава ексклузивна отстъпка, а вие - допълнителен доход.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Catalog Grid */}
      <div>
        <h4 className="text-lg font-bold text-white mb-4">Партньорски Каталог</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_FURNITURE_CATALOG.map(item => (
            <GlassCard key={item.id} className="group !p-0 overflow-hidden relative flex flex-col h-full hover:-translate-y-1 transition-transform">
              <div className="relative h-48">
                 <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                 <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
                   -{(100 - (item.partnerPrice / item.retailPrice * 100)).toFixed(0)}%
                 </div>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                 <h5 className="font-bold text-white mb-1">{item.name}</h5>
                 <p className="text-xs text-gray-400 mb-4">{item.category}</p>
                 
                 <div className="mt-auto space-y-3">
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-gray-400 line-through">{item.retailPrice} лв.</span>
                     <span className="text-white font-bold text-lg">{item.partnerPrice} лв.</span>
                   </div>
                   <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-2 flex justify-between items-center">
                      <span className="text-xs text-purple-300">Вашата Комисионна:</span>
                      <span className="font-bold text-purple-400">+{Math.round(item.partnerPrice * 0.10)} лв.</span>
                   </div>
                   <GlassPillButton 
                     onClick={() => { setSelectedProduct(item); setShowOrderModal(true); }}
                     primary 
                     className="w-full !py-2 !text-sm !bg-gradient-to-r !from-purple-600 !to-indigo-600"
                   >
                     Поръчай за Клиент
                   </GlassPillButton>
                 </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'profile': return renderProfileSettings();
      case 'requests': return renderLeads();
      case 'affiliate': return renderAffiliate();
      case 'tools': return renderTools();
      case 'finance': return (
        <div className="space-y-6 animate-fade-in">
          <GlassCard className="relative overflow-hidden">
              {currentTier === 'free' && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-6">
                  <Lock className="text-gray-400 mb-2" />
                  <h4 className="text-white font-bold">Финанси & Фактуриране</h4>
                  <p className="text-sm text-gray-400 mb-4">Автоматично генериране на фактури е достъпно за ПЛЮС.</p>
                  <GlassPillButton onClick={() => setShowUpgradeModal(true)} primary className="!py-1 !px-4 !text-xs">Upgrade</GlassPillButton>
                </div>
              )}
              
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-lg text-white">Приходи от Услуги</h3>
                 <span className="text-sm text-gray-400">Последна актуализация: Днес</span>
              </div>
              
              <div className="h-[250px] mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={INCOME_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" tick={{fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.4)" tick={{fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} itemStyle={{ color: '#fff' }} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                    <Bar dataKey="income" fill="#f97316" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
          </GlassCard>
          
          {/* Commissions Section */}
          <GlassCard>
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                   <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                   <h3 className="font-bold text-white">Комисионни от Мебели</h3>
                   <p className="text-xs text-gray-400">Affiliate програма</p>
                </div>
                <div className="ml-auto text-right">
                   <span className="block text-2xl font-bold text-purple-400">
                     {commissions.reduce((sum, item) => sum + item.amount, 0)} лв.
                   </span>
                   <span className="text-xs text-gray-400">Общо генерирани</span>
                </div>
             </div>
             
             <div className="space-y-3">
               {commissions.length > 0 ? (
                 commissions.map(comm => (
                   <div key={comm.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                      <div>
                        <div className="text-white font-medium text-sm">{comm.itemName}</div>
                        <div className="text-xs text-gray-500">{comm.projectName} • {comm.date}</div>
                      </div>
                      <div className="font-bold text-purple-400">+{comm.amount} лв.</div>
                   </div>
                 ))
               ) : (
                 <p className="text-center text-gray-500 py-4 text-sm">Няма активни комисионни.</p>
               )}
             </div>
          </GlassCard>
        </div>
      );
      case 'projects': return (
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
      );
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen">
      {showUpgradeModal && (
        <SubscriptionModal 
          onClose={() => setShowUpgradeModal(false)}
          onUpgrade={() => {
            setCurrentTier('plus');
            setShowUpgradeModal(false);
          }}
        />
      )}

      {/* Order Modal */}
      {showOrderModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
           <GlassCard className="w-full max-w-md !bg-[#0f172a] border border-white/20 relative">
              <button onClick={() => setShowOrderModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                <X size={20} />
              </button>
              
              <h3 className="text-xl font-bold text-white mb-4">Поръчай за Клиент</h3>
              
              <div className="flex gap-4 mb-6">
                <img src={selectedProduct.imageUrl} className="w-20 h-20 rounded-lg object-cover border border-white/10" />
                <div>
                  <h4 className="font-bold text-white">{selectedProduct.name}</h4>
                  <p className="text-gray-400 text-sm">Цена за клиент: {selectedProduct.partnerPrice} лв.</p>
                  <p className="text-purple-400 text-sm font-bold">Твоя комисионна: +{Math.round(selectedProduct.partnerPrice * 0.10)} лв.</p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-sm text-gray-300">Избери Активен Проект:</label>
                {MASTER_PROJECTS.filter(p => p.status === 'active').map(p => (
                   <button 
                     key={p.id}
                     onClick={() => handleOrderFurniture(p)}
                     className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 transition-all group"
                   >
                     <div className="font-medium text-white group-hover:text-cyan-300">{p.title}</div>
                     <div className="text-xs text-gray-500">{p.masterName || 'Клиент'} • {p.date}</div>
                   </button>
                ))}
                {MASTER_PROJECTS.filter(p => p.status === 'active').length === 0 && (
                   <p className="text-red-400 text-sm italic">Нямате активни проекти, за които да направите поръчка.</p>
                )}
              </div>
           </GlassCard>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-3 drop-shadow-md text-white">
          <div className="p-2 bg-orange-500/10 rounded-full border border-orange-500/20 backdrop-blur-md">
             <LayoutDashboard className="text-orange-400 w-6 h-6" />
          </div>
          Табло за Управление
        </h2>
        
        {currentTier === 'plus' ? (
           <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white border border-white/20 text-sm font-bold shadow-[0_0_15px_rgba(249,115,22,0.4)] flex items-center gap-2">
             <Crown size={14} className="fill-white" />
             MAISTOR PLUS
           </span>
        ) : (
           <button 
             onClick={() => setShowUpgradeModal(true)}
             className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-sm font-medium transition-colors"
           >
             Базов План
           </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <GlassCard className="sticky top-24">
             {renderSidebar()}
          </GlassCard>
        </div>
        <div className="lg:col-span-3">
           {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MasterDashboard;
