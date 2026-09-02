import { Waves, AlertTriangle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Chip } from '../shared/Chip';
import { useTranslation } from '../../i18n/translations';

export function SafetyHeroCard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <button
      onClick={() => navigate('/result')}
      className="w-full text-left border-none cursor-pointer rounded-[22px] p-[18px] bg-gradient-to-br from-[#B33A1E] to-[#7A2314] shadow-[0_14px_30px_rgba(179,58,30,0.35)] relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-danger"
    >
      <div className="absolute -top-[30px] -right-[30px] w-[130px] h-[130px] rounded-full bg-white/5" />
      
      <div className="flex items-center gap-[6px] text-xs text-[#FFD9C9] font-tamil relative z-10">
        <Waves size={14} /> {t('marine_safety')}
      </div>
      
      <div className="flex items-center gap-[10px] mt-[10px] relative z-10">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,217,201,0.2)]">
          <AlertTriangle size={20} className="text-[#FFD9C9] animate-sm-pulse" />
        </div>
        <div className="font-tamil text-xl font-extrabold text-white leading-tight">
          {t('do_not_go')}
        </div>
      </div>

      <div className="flex items-center justify-between mt-[14px] relative z-10">
        <Chip tone="danger">{t('high_risk')}</Chip>
        <div className="text-[10.5px] text-white/65">IMD + INCOIS · 10:42 AM</div>
      </div>

      <div className="mt-3 text-[12.5px] text-white font-bold flex items-center gap-1 font-tamil relative z-10">
        {t('view_details')} <ChevronRight size={14} />
      </div>
    </button>
  );
}
