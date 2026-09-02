import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { TIMING } from '../../data/mockMarineData';
import { Header } from './Header';
import { Greeting } from './Greeting';
import { VoiceAssistant } from './VoiceAssistant';
import { QuestionCard } from './QuestionCard';
import { QuickActionsGrid } from './QuickActionsGrid';
import { OrchestratorPanel } from './OrchestratorPanel';
import { useTranslation } from '../../i18n/translations';

export function HomeScreen() {
  const { voiceStage, setVoiceStage } = useAppStore();
  const { t } = useTranslation();

  useEffect(() => {
    let timers = [];
    if (voiceStage === "listening") {
      timers.push(setTimeout(() => setVoiceStage("processing"), TIMING.LISTENING_DURATION));
    }
    return () => timers.forEach(clearTimeout);
  }, [voiceStage, setVoiceStage]);

  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="flex-1 overflow-y-auto px-5 pt-[6px] pb-6">
        {voiceStage === "idle" && (
          <>
            <Greeting />
            <div className="flex flex-col items-center justify-center my-6">
              <button
                onClick={() => setVoiceStage("listening")}
                className="w-[92px] h-[92px] rounded-full border-none flex items-center justify-center cursor-pointer focus:outline-none focus:ring-4 focus:ring-aqua transition-transform hover:scale-105 active:scale-95"
                style={{
                  background: "radial-gradient(circle at 35% 30%, #22A6A0, #1B8F94 65%, #0E3A63)",
                  boxShadow: "0 0 0 8px rgba(34,166,160,0.10), 0 16px 34px rgba(27,143,148,0.4)"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
              </button>
              <div className="font-tamil text-white font-bold text-[14.5px] mt-3">
                {t('speak')}
              </div>
            </div>
            <div className="mt-2">
              <QuestionCard />
              <QuickActionsGrid />
            </div>
          </>
        )}

        {voiceStage === "listening" && <VoiceAssistant isListening />}

        {voiceStage === "processing" && <OrchestratorPanel />}
      </div>
    </div>
  );
}
