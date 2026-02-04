import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="h-[1px] bg-gray-600/50 w-full mb-8"></div>
        <p className="text-gray-300 text-center text-sm md:text-base leading-relaxed max-w-4xl mx-auto font-light">
          This website is not a part of the Facebook website or Facebook Inc. Additionally, this website is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
        </p>
      </div>
    </footer>
  );
};