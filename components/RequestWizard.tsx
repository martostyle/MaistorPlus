
import React, { useState } from 'react';
import GlassCard from './GlassCard';
import GlassPillButton from './GlassPillButton';
import { compressToWebP } from '../services/imageUtils';
import { ServiceRequestDraft, ProjectScope } from '../types';
import { 
  Hammer, Zap, PaintBucket, Home, Ruler, MapPin, 
  Camera, ArrowRight, ArrowLeft, CheckCircle, Users, User
} from 'lucide-react';

interface RequestWizardProps {
  onSubmit: (data: ServiceRequestDraft) => void;
  onCancel: () => void;
  preselectedMasterName?: string;
}

const CATEGORIES = [
  { id: 'ВиК', icon: Home, label: 'ВиК Услуги' },
  { id: 'Електро', icon: Zap, label: 'Електро' },
  { id: 'Ремонти', icon: Hammer, label: 'Строителство' },
  { id: 'Интериор', icon: PaintBucket, label: 'Интериор' },
];

const RequestWizard: React.FC<RequestWizardProps> = ({ onSubmit, onCancel, preselectedMasterName }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ServiceRequestDraft>({
    category: '',
    description: '',
    location: '',
    scope: 'medium',
    images: [],
    isPublic: !preselectedMasterName,
    targetMasterId: preselectedMasterName ? 'preselected' : undefined
  });

  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsCompressing(true);
      const newFiles: File[] = [];
      
      try {
        for (let i = 0; i < e.target.files.length; i++) {
          const file = e.target.files[i];
          // Compress to WebP
          const compressed = await compressToWebP(file);
          newFiles.push(compressed);
        }
        setFormData(prev => ({ ...prev, images: [...prev.images, ...newFiles] }));
      } catch (err) {
        console.error("Compression failed", err);
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center items-center gap-2 mb-8">
      {[1, 2, 3, 4].map(s => (
        <div key={s} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step === s ? 'bg-cyan-500 text-white shadow-[0_0_10px_#06b6d4]' : step > s ? 'bg-emerald-500 text-white' : 'bg-white/10 text-gray-500'}`}>
            {step > s ? <CheckCircle size={16} /> : s}
          </div>
          {s !== 4 && <div className={`w-8 h-0.5 mx-1 ${step > s ? 'bg-emerald-500' : 'bg-white/10'}`}></div>}
        </div>
      ))}
    </div>
  );

  const renderStep1_Category = () => (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-bold text-center text-white mb-6">Каква услуга ви трябва?</h3>
      <div className="grid grid-cols-2 gap-4">
        {CATEGORIES.map((cat) => (
          <GlassCard 
            key={cat.id}
            onClick={() => setFormData({ ...formData, category: cat.id })}
            className={`cursor-pointer transition-all hover:scale-105 flex flex-col items-center justify-center gap-3 py-8 ${formData.category === cat.id ? '!bg-cyan-500/20 !border-cyan-400' : ''}`}
          >
            <cat.icon size={32} className={formData.category === cat.id ? 'text-cyan-300' : 'text-gray-300'} />
            <span className="font-medium text-white">{cat.label}</span>
          </GlassCard>
        ))}
      </div>
    </div>
  );

  const renderStep2_Details = () => (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-2xl font-bold text-center text-white mb-6">Детайли за проекта</h3>
      
      <div>
        <label className="block text-gray-300 text-sm mb-2">Описание на проблема/проекта</label>
        <textarea 
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-400 outline-none min-h-[120px]"
          placeholder="Опишете какво трябва да се свърши..."
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 text-sm mb-2">Град / Регион</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 text-gray-400" size={16} />
            <input 
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-cyan-400 outline-none"
              placeholder="Напр. София"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-300 text-sm mb-2">Обем на работа</label>
          <div className="relative">
            <select 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-cyan-400 outline-none appearance-none cursor-pointer"
              value={formData.scope}
              onChange={(e) => setFormData({...formData, scope: e.target.value as ProjectScope})}
            >
              <option value="small" className="text-black">Малък (до 2 дни)</option>
              <option value="medium" className="text-black">Среден (до 1 седмица)</option>
              <option value="large" className="text-black">Голям (над 1 седмица)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3_Media = () => (
    <div className="animate-fade-in text-center">
      <h3 className="text-2xl font-bold text-white mb-2">Добавете снимки</h3>
      <p className="text-gray-400 text-sm mb-8">Системата автоматично оптимизира вашите изображения.</p>
      
      <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 hover:bg-white/5 transition-colors relative">
        <input 
          type="file" 
          multiple 
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="flex flex-col items-center justify-center">
          <div className="bg-cyan-500/20 p-4 rounded-full mb-4">
             <Camera size={32} className="text-cyan-300" />
          </div>
          <span className="text-white font-medium">Натисни тук за да качиш</span>
          <span className="text-gray-400 text-sm mt-1">Поддържа: JPG, PNG</span>
        </div>
      </div>

      {isCompressing && (
        <div className="mt-4 text-cyan-400 text-sm animate-pulse">Компресиране...</div>
      )}

      {formData.images.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mt-6">
          {formData.images.map((file, idx) => (
            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-white/10">
              <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[10px] text-white py-1">
                WEBP
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderStep4_Target = () => (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-bold text-center text-white mb-8">Към кого да изпратим заявката?</h3>
      
      <div className="space-y-4">
        <GlassCard 
          onClick={() => setFormData({...formData, isPublic: true})}
          className={`cursor-pointer transition-all flex items-center gap-4 ${formData.isPublic ? 'border-cyan-400 bg-cyan-500/10' : 'opacity-60 hover:opacity-100'}`}
        >
          <div className="bg-white/10 p-3 rounded-full">
            <Users size={24} className="text-white" />
          </div>
          <div>
            <h4 className="font-bold text-white text-lg">Публична Обява</h4>
            <p className="text-sm text-gray-300">Изпрати до всички налични майстори в района.</p>
          </div>
          {formData.isPublic && <CheckCircle className="ml-auto text-cyan-400" />}
        </GlassCard>

        <GlassCard 
           onClick={() => {
             if (preselectedMasterName) setFormData({...formData, isPublic: false});
           }}
           className={`cursor-pointer transition-all flex items-center gap-4 ${!formData.isPublic ? 'border-orange-400 bg-orange-500/10' : 'opacity-60 hover:opacity-100'} ${!preselectedMasterName ? 'cursor-not-allowed grayscale opacity-30' : ''}`}
        >
          <div className="bg-white/10 p-3 rounded-full">
            <User size={24} className="text-white" />
          </div>
          <div>
            <h4 className="font-bold text-white text-lg">Конкретен Майстор</h4>
            <p className="text-sm text-gray-300">
              {preselectedMasterName ? `Изпрати само на ${preselectedMasterName}` : 'Изберете майстор от търсачката първо.'}
            </p>
          </div>
          {!formData.isPublic && <CheckCircle className="ml-auto text-orange-400" />}
        </GlassCard>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <GlassCard className="w-full max-w-2xl max-h-[90vh] overflow-y-auto !bg-[#0f172a] !border-white/20 shadow-2xl relative">
        <div className="p-2">
          {renderStepIndicator()}
          
          <div className="min-h-[300px]">
            {step === 1 && renderStep1_Category()}
            {step === 2 && renderStep2_Details()}
            {step === 3 && renderStep3_Media()}
            {step === 4 && renderStep4_Target()}
          </div>

          <div className="flex justify-between mt-8 pt-4 border-t border-white/10">
            {step > 1 ? (
              <GlassPillButton onClick={() => setStep(step - 1)} icon={ArrowLeft} className="!px-6">
                Назад
              </GlassPillButton>
            ) : (
              <GlassPillButton onClick={onCancel} className="!px-6 !bg-red-500/10 hover:!bg-red-500/20 !border-red-500/30">
                Отказ
              </GlassPillButton>
            )}

            {step < 4 ? (
              <GlassPillButton onClick={() => setStep(step + 1)} primary className="!px-8">
                Напред <ArrowRight className="ml-2 w-4 h-4" />
              </GlassPillButton>
            ) : (
              <GlassPillButton onClick={() => onSubmit(formData)} primary className="!px-8 !bg-gradient-to-r !from-emerald-500 !to-green-600">
                Публикувай Заявка
              </GlassPillButton>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default RequestWizard;
