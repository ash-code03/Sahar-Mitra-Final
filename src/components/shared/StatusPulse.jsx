import { motion } from 'framer-motion';

export function StatusPulse({ color = '#22A6A0' }) {
  return (
    <span className="relative inline-flex w-2 h-2">
      <motion.span
        className="absolute inset-0 rounded-full opacity-50"
        style={{ backgroundColor: color }}
        animate={{ scale: [0.9, 1.8], opacity: [0.7, 0] }}
        transition={{ duration: 1.8, ease: "easeOut", repeat: Infinity }}
      />
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
    </span>
  );
}
