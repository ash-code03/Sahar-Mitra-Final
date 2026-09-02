import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
      
      currentQuery: '',
      setCurrentQuery: (q) => set({ currentQuery: q }),
      
      currentIntent: 'safety',
      setCurrentIntent: (intent) => set({ currentIntent: intent }),
      
      dataMode: 'demo', // 'live' | 'demo' | 'cached' | 'unavailable'
      setDataMode: (mode) => set({ dataMode: mode }),
      
      voiceStage: 'idle', // 'idle' | 'listening' | 'processing' | 'done'
      setVoiceStage: (stage) => set({ voiceStage: stage }),
      
      spoken: false,
      setSpoken: (val) => set({ spoken: val }),
      
      engineOpen: false,
      setEngineOpen: (val) => set({ engineOpen: typeof val === 'function' ? val(set.engineOpen) : val }),
    }),
    {
      name: 'sagar-mitra-storage',
      partialize: (state) => ({ language: state.language }),
    }
  )
);
