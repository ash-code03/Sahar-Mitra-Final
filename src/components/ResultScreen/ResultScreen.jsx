import { useState, useEffect } from 'react';
import { ArrowLeft, Anchor, Fish, AlertTriangle, X, Navigation, Layers, Compass, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { 
  DEMO_FACTORS, DEMO_METRICS, DEMO_EVIDENCE, DEMO_ALERTS, 
  PFZ_METRICS, PFZ_EVIDENCE, PFZ_ALERTS, 
  WEATHER_METRICS, WEATHER_EVIDENCE, WEATHER_ALERTS,
  GEOFENCE_METRICS, GEOFENCE_EVIDENCE, GEOFENCE_ALERTS,
  ROUTE_METRICS, ROUTE_EVIDENCE, ROUTE_ALERTS
} from '../../data/mockMarineData';
import { calculateRiskScore } from '../../lib/riskEngine';
import { StatusPulse } from '../shared/StatusPulse';
import { Chip } from '../shared/Chip';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import { useTranslation } from '../../i18n/translations';

export function ResultScreen() {
  const navigate = useNavigate();
  const { engineOpen, setEngineOpen, spoken, setSpoken } = useAppStore();
  const [scoreAnim, setScoreAnim] = useState(0);
  const { t } = useTranslation();

  const riskScore = calculateRiskScore(DEMO_FACTORS);
  const dataMode = useAppStore(s => s.dataMode);
  const currentIntent = useAppStore(s => s.currentIntent);

  const activeMetrics = currentIntent === 'pfz' ? PFZ_METRICS : currentIntent === 'weather' ? WEATHER_METRICS : currentIntent === 'geofence' ? GEOFENCE_METRICS : currentIntent === 'route' ? ROUTE_METRICS : DEMO_METRICS;
  const activeAlerts = currentIntent === 'pfz' ? PFZ_ALERTS : currentIntent === 'weather' ? WEATHER_ALERTS : currentIntent === 'geofence' ? GEOFENCE_ALERTS : currentIntent === 'route' ? ROUTE_ALERTS : DEMO_ALERTS;
  const activeEvidence = currentIntent === 'pfz' ? PFZ_EVIDENCE : currentIntent === 'weather' ? WEATHER_EVIDENCE : currentIntent === 'geofence' ? GEOFENCE_EVIDENCE : currentIntent === 'route' ? ROUTE_EVIDENCE : DEMO_EVIDENCE;

  useEffect(() => {
    const timer = setTimeout(() => setScoreAnim(riskScore), 200);
    return () => clearTimeout(timer);
  }, [riskScore]);

  return (
    <div className="h-full flex flex-col">
      {/* Top bar */}
      <div className="pt-[18px] px-5 pb-2 flex items-center justify-between">
        <button
          onClick={() => {
            useAppStore.getState().setVoiceStage('idle');
            useAppStore.getState().setCurrentQuery('');
            navigate('/');
          }}
          className="w-8 h-8 rounded-[10px] border border-line bg-white/5 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-aqua"
        >
          <ArrowLeft size={16} className="text-white" />
        </button>
        <div className="font-tamil text-[15px] font-extrabold text-white">
          {t('marine_safety')}
        </div>
        <div className="flex items-center gap-[5px]">
          {dataMode === 'live' && <StatusPulse color="#8FE3D6" />}
          {dataMode === 'demo' && <StatusPulse color="#E8A33D" />}
          <span className="text-[10px] font-bold uppercase" style={{ color: dataMode === 'live' ? '#8FE3D6' : dataMode === 'demo' ? '#E8A33D' : '#9AB0BE' }}>
            {dataMode}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-2.5 pb-6">
        {/* Safety result card */}
        <div className={cn(
          "rounded-[22px] p-[18px] shadow-[0_14px_28px_rgba(0,0,0,0.3)] transition-colors duration-500",
          currentIntent === 'safety' 
            ? "bg-gradient-to-br from-[#B33A1E] to-[#6E200F]"
            : currentIntent === 'geofence'
              ? "bg-gradient-to-br from-amber to-[#8c570b]"
              : "bg-gradient-to-br from-tealBright to-[#103652]"
        )}>
          <AlertTriangle size={22} className={cn(
            currentIntent === 'safety' ? "text-[#FFD9C9]" : currentIntent === 'geofence' ? "text-[#FFF0D4]" : "text-navyDeep"
          )} />
          <div className="font-tamil text-[19px] font-extrabold text-white mt-2.5 leading-[1.3]">
            {currentIntent === 'safety' ? t('do_not_go') : currentIntent === 'geofence' ? t('val_fishing_banned') : "பாதுகாப்பானது (Safe)"}
          </div>
          <div className={cn(
            "font-tamil text-[13px] font-bold mt-1",
            currentIntent === 'safety' ? "text-[#FFD9C9]" : currentIntent === 'geofence' ? "text-[#FFF0D4]" : "text-ice"
          )}>
            {currentIntent === 'safety' ? t('high_risk') : currentIntent === 'geofence' ? t('val_restricted') : "குறைந்த ஆபத்து (Low Risk)"}
          </div>

          <div className="flex gap-2 mt-[14px] flex-wrap">
            {activeAlerts.map((r, i) => {
              const icons = { Waves: Anchor, Wind: Anchor, AlertTriangle: AlertTriangle, Fish: Fish, Compass: Compass };
              const Icon = icons[r.icon] || Anchor;
              const label = r.labelKey ? t(r.labelKey) : r.label;
              return (
                <div key={i} className="flex items-center gap-[5px] bg-white/10 rounded-full px-2.5 py-1.5">
                  <Icon size={12} className={currentIntent === 'safety' ? "text-[#FFD9C9]" : "text-white"} />
                  <span className="font-tamil text-[11px] text-white">{label}</span>
                </div>
              );
            })}
          </div>

          {currentIntent === 'safety' && (
            <div className="mt-4 pt-[14px] border-t border-white/15">
              <div className="text-[10px] text-white/60 tracking-[0.4px] font-bold mb-1.5 uppercase flex items-center gap-1">
                <AlertTriangle size={10} className="text-danger" />
                {t('official_override')}
              </div>
              <div className="text-xs text-white leading-snug">
                {t('official_override_desc')}
              </div>
            </div>
          )}
        </div>

        {/* AI Answer Block */}
        <div className="mt-[18px] rounded-[20px] p-4 glass-panel">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-[8px] bg-gradient-to-br from-tealBright to-ocean flex items-center justify-center shadow-[0_0_10px_rgba(34,166,160,0.3)]">
              <Anchor size={12} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-tamil text-[13.5px] font-bold text-white">
              {t('ai_answer_title')}
            </span>
          </div>
          <div className="font-tamil text-[13px] text-ice leading-[1.6]">
            {currentIntent === 'pfz' 
              ? t('ai_expl_pfz') 
              : currentIntent === 'weather'
                ? t('ai_expl_weather')
                : currentIntent === 'geofence'
                  ? t('ai_expl_geofence')
                  : currentIntent === 'route'
                    ? t('ai_expl_route')
                    : t('ai_explanation')}
          </div>
          
          {/* Confidence Indicator */}
          <div className="mt-3 pt-3 border-t border-white/10 flex items-start justify-between">
            <div>
              <div className="text-[10px] text-slateLight font-bold uppercase tracking-wider">{t('confidence')}</div>
              <div className="text-[11px] text-white mt-0.5">{dataMode === 'demo' ? t('demo_conf') : t('conf_desc')}</div>
            </div>
            <div className="px-2 py-1 bg-[#22A6A0]/20 text-tealBright text-[10px] font-bold rounded-md">
              {t('conf_high')}
            </div>
          </div>
        </div>

        {/* Marine map */}
        <div className="mt-[18px] rounded-[22px] overflow-hidden relative h-[230px] border border-line bg-[#04101F]">
          {/* Base Radar Grid */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #155A8A 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          
          <svg width="100%" height="100%" className="absolute inset-0 opacity-40">
            {currentIntent === 'pfz' && (
              <>
                {/* PFZ Heatmap Blob */}
                <path d="M 60 180 Q 150 110, 260 160 T 380 200" stroke="none" fill="rgba(34, 166, 160, 0.25)" filter="blur(8px)" />
                <path d="M 60 180 Q 150 110, 260 160 T 380 200" stroke="#22A6A0" strokeWidth="2" strokeDasharray="4 4" fill="none" opacity="0.8" />
              </>
            )}
            
            {(currentIntent === 'safety' || currentIntent === 'geofence') && (
              <>
                {/* Geofence / Hazard bounds */}
                <path d="M 190 100 L 280 80 L 310 140 L 220 160 Z" stroke="#E4572E" strokeWidth="1.5" strokeDasharray="6 4" fill="rgba(228, 87, 46, 0.15)" />
              </>
            )}

            {currentIntent === 'route' && (
              <>
                {/* Route Path */}
                <path d="M 110 40 Q 180 80, 150 112 T 210 180" stroke="#8FE3D6" strokeWidth="3" strokeDasharray="4 4" fill="none" />
              </>
            )}
          </svg>

          {/* Radar Sweep Animation */}
          <div className="absolute inset-0 origin-center animate-radar-sweep pointer-events-none"
               style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(143,227,214,0.15) 100%)' }} />

          <div className="absolute top-6 right-[30px] w-[88px] h-[88px] rounded-full border border-dashed border-[#e4572e]/60"
               style={{ background: 'radial-gradient(circle, rgba(228,87,46,0.35), rgba(228,87,46,0.05))' }} />

          <div className="absolute bottom-[70px] left-5 w-[110px] h-[60px] rounded-full"
               style={{ background: 'radial-gradient(circle, rgba(143,227,214,0.22), rgba(143,227,214,0.02))' }} />

          <MapMarker top={112} left={150} icon={Anchor} tone="aqua" pulse />
          <MapMarker top={180} left={210} icon={Fish} tone="teal" />
          <MapMarker top={120} left={250} icon={AlertTriangle} tone="danger" pulse />
          <MapMarker top={60} left={270} icon={X} tone="danger" />

          {/* Map Controls */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {[Navigation, Layers].map((Ic, i) => (
              <div key={i} className="w-8 h-8 rounded-[10px] glass-panel flex items-center justify-center shadow-lg">
                <Ic size={15} className="text-white" />
              </div>
            ))}
          </div>
          <div className="absolute bottom-2.5 left-3.5 text-[10.5px] text-ice font-semibold px-2 py-1 glass-panel rounded-md">
            {t('gulf_of_mannar')}
          </div>
        </div>

        {/* Bottom Sheet Data */}
        <div className="-mt-[18px] mx-2 relative z-10 rounded-[18px] bg-[#142c44]/95 border border-line p-[14px_16px] shadow-[0_10px_24px_rgba(0,0,0,0.3)]">
          <div className="w-[34px] h-1 rounded-full bg-slateLight opacity-50 mx-auto mb-2.5" />
          <div className="flex items-center justify-between">
            <div className="font-tamil text-[13.5px] font-bold text-white">
              {t('current_sea_state')}
            </div>
            {dataMode === 'demo' && <Chip tone="demo">{t('demo_data')}</Chip>}
          </div>

          <div className="grid grid-cols-4 gap-2 mt-3">
            {activeMetrics.map((m) => {
              const value = m.vKey ? t(m.vKey) : m.v;
              const label = m.labelKey ? t(m.labelKey) : m.l;
              return (
                <div key={m.l} className="text-center">
                  <div className="text-[12.5px] font-extrabold text-white">{value}</div>
                  <div className="text-[9.5px] text-slateLight mt-0.5">{label}</div>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-between mt-3 pt-2.5 border-t border-line text-[10px] text-slateLight">
            <span>Source: IMD + INCOIS</span>
            <span>Updated 10:42 AM</span>
          </div>
        </div>

        {/* Evidence */}
        <div className="mt-[22px]">
          <div className="flex items-center justify-between mb-4">
            <div className="font-tamil text-[14.5px] font-extrabold text-white">
              {t('why_decision')}
            </div>
            <button className="bg-transparent border-none font-tamil text-[10.5px] font-bold text-aqua cursor-pointer focus:outline-none hover:opacity-80 transition-opacity">
              {t('view_evidence')}
            </button>
          </div>
          <div className="relative flex flex-col gap-3 pl-3">
            {/* Graph connecting line */}
            <div className="absolute left-[21px] top-4 bottom-4 w-px bg-gradient-to-b from-tealBright/50 to-transparent"></div>
            
            {activeEvidence.map((e, i) => {
              const label = e.labelKey ? t(e.labelKey) : e.label;
              return (
                <div key={i} className="flex items-center gap-3 relative z-10">
                  <div className="w-5 h-5 rounded-full bg-[#103652] border-2 border-tealBright flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(34,166,160,0.3)]">
                    <span className="text-[10px]">{e.icon}</span>
                  </div>
                  <div className="flex-1 flex items-center justify-between glass-panel rounded-[14px] p-[12px_14px]">
                    <div className="text-[12.5px] text-ice font-semibold tracking-wide">{label}</div>
                    <div className="text-right">
                      <div className="text-[11px] text-aqua font-bold">{e.src}</div>
                      <div className="text-[9.5px] text-slateLight">{e.time}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Engine Panel */}
        <button
          onClick={() => setEngineOpen(!engineOpen)}
          className="w-full text-left mt-5 glass-panel rounded-[18px] p-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-aqua block hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="font-tamil text-[13.5px] font-extrabold text-white">{t('safety_engine')}</span>
            <Chip tone="solid">{t('deterministic')}</Chip>
          </div>
          <div className="flex items-baseline gap-2 mt-2.5">
            <span className="text-[28px] font-black text-white">
              {scoreAnim}
            </span>
            <span className="text-[13px] text-slateLight">/ 100</span>
            <Chip tone="danger">{t('high_risk').toUpperCase()}</Chip>
          </div>
          <div className="font-tamil text-[10.5px] text-slateLight mt-0.5">{t('prototype_risk')}</div>

          {engineOpen && (
            <div className="mt-3.5">
              {DEMO_FACTORS.map((f) => {
                const label = f.labelKey ? t(f.labelKey) : f.label;
                return (
                  <div key={f.label} className="mb-[9px]">
                    <div className="flex justify-between text-[11px] text-ice mb-1">
                      <span>{label}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${f.pct}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className={cn(
                          "h-full rounded-full",
                          f.pct > 90 ? "bg-danger" : f.pct > 70 ? "bg-amber" : "bg-tealBright"
                        )}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="font-tamil text-[10.5px] text-slateLight mt-2 leading-[1.5]">
                {t('risk_desc')}
              </div>
            </div>
          )}
        </button>

        {/* Final Actions */}
        <div className="grid grid-cols-2 gap-2.5 mt-5">
          <button
            onClick={() => setSpoken(true)}
            className={cn(
              "cursor-pointer rounded-[16px] p-[16px_10px] flex flex-col items-center gap-2 focus:outline-none focus:ring-2 focus:ring-aqua transition-colors",
              spoken ? "glass-panel bg-[#8fe3d6]/15 border-[#8fe3d6]/50" : "glass-panel hover:bg-white/10"
            )}
          >
            <Volume2 size={20} className="text-aqua" />
            <span className="font-tamil text-[12.5px] font-bold text-white">{t('listen')}</span>
            {spoken && (
              <span className="font-tamil text-[9.5px] text-aqua text-center leading-[1.4]">
                "{t('spoken_warning')}"
              </span>
            )}
          </button>
          
          <button className="glass-panel hover:bg-white/10 transition-colors cursor-pointer rounded-[16px] p-[16px_10px] flex flex-col items-center gap-2 focus:outline-none focus:ring-2 focus:ring-aqua">
            <Compass size={20} className="text-aqua" />
            <span className="font-tamil text-[12.5px] font-bold text-white text-center">
              {t('view_map')}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}

function MapMarker({ top, left, icon: Icon, tone, pulse }) {
  const tones = {
    aqua: { bg: "bg-tealBright", fg: "text-navyDeep" },
    teal: { bg: "bg-[#8FE3D6]/90", fg: "text-navyDeep" },
    danger: { bg: "bg-danger", fg: "text-white" },
  };
  const t = tones[tone];
  
  return (
    <div className="absolute" style={{ top, left }}>
      {pulse && (
        <span className="absolute -inset-2 rounded-full opacity-35 animate-sm-pulse" style={{ backgroundColor: tone === 'aqua' ? '#22A6A0' : '#E4572E' }} />
      )}
      <div className={cn("relative w-[26px] h-[26px] rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.35)]", t.bg)}>
        <Icon size={13} className={t.fg} />
      </div>
    </div>
  );
}
