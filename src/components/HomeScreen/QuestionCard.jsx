import { Mic, Send } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { useTranslation } from '../../i18n/translations';

export function QuestionCard() {
  const setVoiceStage = useAppStore(s => s.setVoiceStage);
  const setCurrentQuery = useAppStore(s => s.setCurrentQuery);
  const setCurrentIntent = useAppStore(s => s.setCurrentIntent);
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setCurrentQuery(query);
      
      const q = query.toLowerCase();
      // Match keywords in English or using translation keys if needed, but for demo simple ascii matching is safer
      if (q.includes('fish') || q.includes('pfz') || q.includes('zone')) {
        setCurrentIntent('pfz');
      } else if (q.includes('weather') || q.includes('wind') || q.includes('rain')) {
        setCurrentIntent('weather');
      } else if (q.includes('route') || q.includes('map') || q.includes('path')) {
        setCurrentIntent('route');
      } else if (q.includes('here') || q.includes('allow') || q.includes('restrict')) {
        setCurrentIntent('geofence');
      } else {
        setCurrentIntent('safety');
      }
      
      setVoiceStage("processing");
    } else {
      setVoiceStage("listening");
    }
  };

  return (
    <div className="rounded-[20px] p-4 glass-panel">
      <div className="font-tamil text-[13.5px] font-bold text-white mb-2.5">
        {t('ask_sagar_mitra')}
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-[14px] px-3 py-1.5 focus-within:border-aqua transition-colors">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('example_question')}
            className="w-full bg-transparent border-none text-[13px] text-white placeholder:text-white/40 focus:outline-none font-tamil py-2"
          />
          <button 
            type="button"
            onClick={() => setVoiceStage("listening")}
            className="bg-transparent border-none p-2 cursor-pointer text-aqua hover:bg-white/5 rounded-full flex-shrink-0"
          >
            <Mic size={18} />
          </button>
        </div>

        <button
          type="submit"
          className="w-full mt-3 border-none cursor-pointer rounded-[14px] py-[13px] bg-gradient-to-br from-tealBright to-teal text-navyDeep font-tamil font-extrabold text-[14px] focus:outline-none focus:ring-2 focus:ring-aqua flex justify-center items-center gap-2"
        >
          {t('check_button')}
        </button>
      </form>
    </div>
  );
}
