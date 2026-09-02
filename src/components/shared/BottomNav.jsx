import { Home, Compass, Bell } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useTranslation } from '../../i18n/translations';
import { useAppStore } from '../../store/appStore';

export function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navs = [
    { icon: Home, labelKey: "nav_home", path: "/" },
    { icon: Compass, labelKey: "nav_map", path: "/result" },
    { icon: Bell, labelKey: "nav_alerts", path: "/alerts" },
  ];

  return (
    <div className="bg-[#0A0F16] border-t border-line pb-[30px] pt-3 px-6 relative z-40">
      <div className="flex justify-between items-center max-w-[280px] mx-auto">
        {navs.map((n, i) => {
          const isActive = pathname === n.path;
          return (
            <button
              key={i}
              onClick={() => {
                if (n.path !== '/alerts') {
                  if (n.path === '/') {
                    useAppStore.getState().setVoiceStage('idle');
                    useAppStore.getState().setCurrentQuery('');
                  }
                  navigate(n.path);
                }
              }}
              className="flex flex-col items-center gap-[5px] bg-transparent border-none cursor-pointer focus:outline-none"
            >
              <div className={cn(
                "p-[7px] rounded-[10px] transition-colors",
                isActive ? "bg-white/10" : ""
              )}>
                <n.icon size={20} className={isActive ? "text-white" : "text-slateLight"} />
              </div>
              <span className={cn(
                "font-tamil text-[10px] font-bold tracking-wide transition-colors",
                isActive ? "text-white" : "text-slateLight"
              )}>
                {t(n.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
