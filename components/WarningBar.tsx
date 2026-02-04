import React from 'react';
import { TriangleAlert } from 'lucide-react';

export const WarningBar: React.FC = () => {
  return (
    <div className="bg-brand-warning w-full py-4 md:py-5 px-4 flex items-center justify-center text-center">
      <div className="flex items-center justify-center gap-2 md:gap-3 max-w-7xl mx-auto">
        <TriangleAlert className="w-6 h-6 md:w-7 md:h-7 text-black fill-black flex-shrink-0" strokeWidth={2} />
        <span className="font-bold text-black text-base md:text-xl tracking-tight leading-snug">
          <span className="underline decoration-2 underline-offset-4">WARNING:</span> This AI is ONLY For Solar Business Owners Capable Of Handling Multiple New Clients Per Month...
        </span>
      </div>
    </div>
  );
};