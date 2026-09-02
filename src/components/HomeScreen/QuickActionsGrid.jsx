import { Waves, Fish, Compass, AlertTriangle } from 'lucide-react';
import { useTranslation } from '../../i18n/translations';
import { QUICK_ACTIONS } from '../../data/mockMarineData';
import { useAppStore } from '../../store/appStore';

const ICONS = { Waves, Fish, Compass, AlertTriangle };

export function QuickActionsGrid() {
  const setVoiceStage = useAppStore(s => s.setVoiceStage);
  const setCurrentIntent = useAppStore(s => s.setCurrentIntent);
  const { t } = useTranslation();

  const handleActionClick = (actionId) => {
    if (actionId === 'fishing_zone') setCurrentIntent('pfz');
    else if (actionId === 'sea_state') setCurrentIntent('weather');
    else if (actionId === 'safe_route') setCurrentIntent('route');
    else setCurrentIntent('safety');
    
    setVoiceStage('processing');
  };

  return (
    <div className="mt-[22px]">
      <div className="grid grid-cols-2 gap-2.5">
        {QUICK_ACTIONS.map((q, i) => {
          const Icon = ICONS[q.icon];
          const label = q.labelKey ? t(q.labelKey) : q.label;
          return (
            <button
              key={i}
              onClick={() => handleActionClick(q.labelKey)}
              className="glass-panel rounded-[16px] px-[12px] py-[14px] flex flex-col items-start gap-2.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-aqua hover:bg-white/10 transition-colors"
            >
              <div className="w-[30px] h-[30px] rounded-[9px] bg-[#8fe3d6]/10 flex items-center justify-center">
                <Icon size={15} className="text-aqua" />
              </div>
              <span className="font-tamil text-xs text-ice font-semibold text-left">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
