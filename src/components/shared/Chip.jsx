import { cn } from '../../lib/utils';

export function Chip({ children, tone = "ghost", className }) {
  const tones = {
    ghost: "bg-white/10 text-ice border-line",
    danger: "bg-[#e4572e]/16 text-[#FFD9C9] border-[#e4572e]/40",
    demo: "bg-[#e8a33d]/16 text-[#FFE3B0] border-[#e8a33d]/40",
    solid: "bg-tealBright text-navyDeep border-transparent",
  };

  return (
    <span
      className={cn(
        "text-[11px] font-semibold px-[10px] py-1 rounded-full tracking-wide inline-flex items-center gap-1 whitespace-nowrap border",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
