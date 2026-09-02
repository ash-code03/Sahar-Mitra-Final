export function PhoneFrame({ children }) {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#0A0F16] p-6 font-inter">
      <div className="w-[390px] h-[844px] max-w-full max-h-[100vh] rounded-[40px] border-[10px] border-[#12181F] overflow-hidden relative bg-gradient-to-b from-navy to-navyDeep shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[22px] bg-[#12181F] rounded-b-[16px] z-40" />
        
        {/* Screen Content */}
        {children}
      </div>
    </div>
  );
}
