import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="text-center pt-20 pb-12 px-4 md:px-6 max-w-6xl mx-auto">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.2] tracking-tight">
        Get 30 New Solar Appointments <br className="hidden lg:block"/>
        in the next 90 Days With Our <span className="text-brand-orange italic">AI</span> <br className="hidden lg:block"/>
        <span className="text-brand-orange italic">Integration</span> Or We Work For Free.
      </h1>
      
      <h2 className="text-lg md:text-2xl font-medium text-white mt-14 tracking-wide">
        **Never Hire Marketing Agencies Or Pay For Leads Ever Again**
      </h2>
    </div>
  );
};