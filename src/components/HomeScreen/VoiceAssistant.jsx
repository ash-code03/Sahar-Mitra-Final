import { Mic } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { motion } from 'framer-motion';
import { useTranslation } from '../../i18n/translations';

export function VoiceAssistant() {
  const { setVoiceStage, setCurrentQuery, setCurrentIntent, language } = useAppStore();
  const { t } = useTranslation();
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError(true);
      const timer = setTimeout(() => {
        // Fallback for demo if speech isn't supported
        setCurrentQuery("Can I go fishing today?");
        setCurrentIntent('safety');
        setVoiceStage('processing');
      }, 3000);
      return () => clearTimeout(timer);
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const result = event.results[current][0].transcript;
      setTranscript(result);
    };

    recognition.onspeechend = () => {
      recognition.stop();
    };

    recognition.onend = () => {
      if (transcript.trim()) {
        setCurrentQuery(transcript);
        
        const q = transcript.toLowerCase();
        if (q.includes('fish') || q.includes('மீன்') || q.includes('pfz')) {
          setCurrentIntent('pfz');
        } else if (q.includes('weather') || q.includes('wind') || q.includes('வானிலை') || q.includes('rain')) {
          setCurrentIntent('weather');
        } else if (q.includes('route') || q.includes('பாதை') || q.includes('map')) {
          setCurrentIntent('route');
        } else if (q.includes('here') || q.includes('fish in this') || q.includes('அனுமதி')) {
          setCurrentIntent('geofence');
        } else {
          setCurrentIntent('safety');
        }
        
        setVoiceStage('processing');
      } else {
        setVoiceStage('idle');
      }
    };

    recognition.onerror = (e) => {
      console.error(e);
      setError(true);
      setTimeout(() => setVoiceStage('idle'), 2000);
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-12 mb-8">
      <div className="relative flex items-center justify-center w-24 h-24 mb-6">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-tealBright"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          className="absolute inset-2 rounded-full bg-tealBright"
        />
        <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-tealBright to-teal rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,166,160,0.5)]">
          <Mic size={28} className="text-navyDeep" />
        </div>
      </div>

      <div className="font-tamil text-lg font-bold text-white mb-2">
        {error ? "Voice input unavailable. You can type your question." : t('listening')}
      </div>
      
      {transcript && (
        <div className="font-tamil text-[15px] text-ice text-center px-6 leading-relaxed bg-white/5 rounded-xl p-3 border border-line">
          "{transcript}"
        </div>
      )}

      {!error && (
        <div className="flex items-center gap-1.5 mt-6 h-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              animate={{ height: ["12px", "28px", "12px"] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
              className="w-1.5 bg-aqua rounded-full"
            />
          ))}
        </div>
      )}
    </div>
  );
}
