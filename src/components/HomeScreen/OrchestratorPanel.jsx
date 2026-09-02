import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from '../../i18n/translations';
import { useAppStore } from '../../store/appStore';
import { cn } from '../../lib/utils';
import { Check, AlertTriangle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function OrchestratorPanel() {
  const { t } = useTranslation();
  const { dataMode, currentIntent } = useAppStore();
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const navigate = useNavigate();
  const [hasHazard, setHasHazard] = useState(false);

  // Dynamic step generation based on intent
  const getSteps = () => {
    let steps = [
      { id: 1, label: "Language", status: "Query understood", color: "text-aqua" },
      { id: 2, label: "Intent", status: "Intent identified", color: "text-aqua" },
      { id: 3, label: "Planner", status: "Creating analysis plan", color: "text-aqua" },
    ];

    if (currentIntent === 'pfz') {
      steps.push(
        { id: 4, label: "PFZ Agent", status: "Locating zones", color: "text-tealBright" },
        { id: 5, label: "Ocean Agent", status: "Checking sea state", color: "text-tealBright" },
        { id: 6, label: "Evidence", status: "Sources verified", color: "text-tealBright" }
      );
    } else if (currentIntent === 'route') {
      steps.push(
        { id: 4, label: "Route Agent", status: "Plotting path", color: "text-tealBright" },
        { id: 5, label: "Weather Agent", status: "Checking conditions", color: "text-tealBright" },
        { id: 6, label: "Geofence Agent", status: "Checking bounds", color: "text-tealBright" }
      );
    } else if (currentIntent === 'geofence') {
      steps.push(
        { id: 4, label: "Geofence Agent", status: "Checking location", color: "text-amber" },
        { id: 5, label: "Risk Engine", status: "Safety calculation", color: "text-tealBright" }
      );
    } else {
      // Default / Safety / Weather
      steps.push(
        { id: 4, label: "Weather Agent", status: "Wind and rainfall checked", color: "text-tealBright" },
        { id: 5, label: "Ocean Agent", status: "Wave conditions checked", color: "text-tealBright" }
      );
      
      // Dynamic hazard addition if in safety mode and demo
      if (currentIntent === 'safety' && dataMode === 'demo') {
        steps.push({ id: 6, label: "Hazard Agent", status: "Hazard detected", color: "text-amber", isHazard: true });
        if (hasHazard) {
          steps.push(
            { id: 7, label: "Cyclone Agent", status: "Cyclone conditions verified", color: "text-danger" },
            { id: 8, label: "Alert Agent", status: "Safety advisory generated", color: "text-danger" }
          );
        }
      } else {
        steps.push({ id: 6, label: "Hazard Agent", status: "No hazards", color: "text-tealBright" });
      }
    }

    steps.push({ id: 99, label: "Risk Engine", status: "Deterministic safety calculation", color: "text-aqua" });
    steps.push({ id: 100, label: "Explanation", status: "Preparing response", color: "text-aqua" });

    return steps;
  };

  const steps = getSteps();

  useEffect(() => {
    const timers = [];
    let cumulativeDelay = 0;

    steps.forEach((step, index) => {
      // If it's a hazard step, we pause, trigger the state update to show re-planning, and continue
      if (step.isHazard && !hasHazard) {
        cumulativeDelay += 1000;
        timers.push(setTimeout(() => {
          setCurrentStepIdx(index);
          setTimeout(() => setHasHazard(true), 1500); // trigger re-plan visually
        }, cumulativeDelay));
        cumulativeDelay += 2000; // wait for re-plan visual
      } else {
        cumulativeDelay += 600;
        timers.push(setTimeout(() => {
          setCurrentStepIdx(index);
        }, cumulativeDelay));
      }
    });

    // Final navigation
    timers.push(setTimeout(() => navigate('/result'), cumulativeDelay + 800));

    return () => timers.forEach(clearTimeout);
  }, [hasHazard, dataMode, currentIntent, navigate]); // re-run if hazard state changes

  return (
    <div className="mt-[26px] mb-[22px]">
      <div className="flex items-center gap-3 justify-center mb-1">
        <div className="w-5 h-5 rounded-full border-[2px] border-aqua border-t-transparent animate-spin" />
        <span className="font-tamil text-[14.5px] font-bold text-white tracking-wide">
          Processing...
        </span>
      </div>

      <div className="mt-[14px] rounded-[18px] glass-panel p-4 relative">
        <div className="absolute left-[23px] top-7 bottom-7 w-px bg-gradient-to-b from-tealBright/40 to-transparent"></div>
        {steps.map((s, i) => {
          const isDone = i < currentStepIdx;
          const isActive = i === currentStepIdx;
          
          if (i > currentStepIdx && !s.isHazard) return null; // hide future steps until active, except if it's the hazard we're waiting for

          return (
            <div
              key={s.id}
              className={cn(
                "flex items-center gap-[10px] py-[7px] transition-all duration-300",
                isDone || isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}
            >
              <div className="w-5 h-5 rounded-full bg-[#103652] flex items-center justify-center shrink-0 border border-tealBright/30 shadow-[0_0_10px_rgba(34,166,160,0.2)] relative z-10">
                {isDone ? (
                  s.isHazard ? <AlertTriangle size={11} className="text-amber animate-sm-pulse" /> : <Check size={11} className="text-tealBright" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-tealBright animate-pulse" />
                )}
              </div>
              
              <div className="flex flex-col">
                <div className={cn("text-[10px] uppercase font-bold tracking-wider", s.color)}>
                  {s.label}
                </div>
                <div className="text-[12.5px] font-tamil text-white/90">
                  {s.status}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <AnimatePresence>
        {hasHazard && currentStepIdx >= 6 && currentStepIdx < steps.length - 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-[14px] rounded-[16px] bg-[#e8a33d]/10 border border-[#e8a33d]/35 py-3 px-[14px] flex gap-[10px] items-start shadow-[0_4px_15px_rgba(232,163,61,0.15)]"
          >
            <AlertTriangle size={16} className="text-amber mt-[1px] shrink-0 animate-sm-pulse" />
            <div>
              <div className="font-tamil text-[12.5px] font-bold text-[#FFE3B0]">
                ⚠ Hazard Discovered
              </div>
              <div className="font-tamil text-[11px] text-[#FFE3B0]/80 mt-0.5 leading-[1.4]">
                Re-evaluating plan... Activating Cyclone & Alert Agents.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
