import { Anchor, MapPin, ChevronDown, Check } from 'lucide-react';
import { useState } from 'react';
import { StatusPulse } from '../shared/StatusPulse';
import { useAppStore } from '../../store/appStore';
import { LANGUAGES } from '../../i18n/translations';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const dataMode = useAppStore(s => s.dataMode);
  const language = useAppStore(s => s.language);
  const setLanguage = useAppStore(s => s.setLanguage);
  const [langOpen, setLangOpen] = useState(false);
  
  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <div className="pt-[18px] px-5 pb-[10px] relative z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[9px]">
          <div className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-tealBright to-ocean flex items-center justify-center">
            <Anchor size={17} className="text-white" strokeWidth={2.2} />
          </div>
          <div>
            <div className="text-[14.5px] font-extrabold text-white tracking-[0.2px]">
              SAGAR-MITRA
            </div>
            <div className="text-[9.5px] text-slateLight -mt-[1px]">
              Agentic Marine Intelligence
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[6px]">
          {dataMode === 'live' && <StatusPulse color="#8FE3D6" />}
          {dataMode === 'demo' && <StatusPulse color="#E8A33D" />}
          <span className="text-[10.5px] font-bold tracking-[0.3px] uppercase" style={{ color: dataMode === 'live' ? '#8FE3D6' : dataMode === 'demo' ? '#E8A33D' : '#9AB0BE' }}>
            {dataMode}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-[5px] text-slateLight text-xs">
          <MapPin size={13} />
          <span>Rameswaram</span>
        </div>
        <div className="relative">
          <button 
            onClick={() => setLangOpen(!langOpen)}
            className="text-xs font-tamil text-ice bg-white/10 px-[10px] py-[3px] rounded-full border border-line flex items-center gap-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-aqua"
          >
            {currentLang.native}
            <ChevronDown size={12} />
          </button>

          <AnimatePresence>
            {langOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setLangOpen(false)}
                  className="fixed inset-0 bg-black/40 z-40"
                />
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-8 w-40 glass-panel bg-[#0A0F16]/80 rounded-[14px] shadow-2xl z-50 overflow-hidden"
                >
                  <div className="flex flex-col py-1">
                    {LANGUAGES.map(l => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLanguage(l.code);
                          setLangOpen(false);
                        }}
                        className="flex items-center justify-between px-4 py-2.5 text-left text-[13px] bg-transparent border-none cursor-pointer hover:bg-white/5 focus:outline-none"
                      >
                        <span className={`font-tamil ${l.code === language ? 'text-aqua font-bold' : 'text-ice'}`}>
                          {l.native}
                        </span>
                        {l.code === language && <Check size={14} className="text-aqua" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
