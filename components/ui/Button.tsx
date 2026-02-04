import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 rounded-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none uppercase font-display";
  
  const variants = {
    primary: "bg-red-500 hover:bg-red-600 text-white shadow-[0_0_20px_rgba(255,59,48,0.3)] hover:shadow-[0_0_30px_rgba(255,59,48,0.5)] border border-transparent",
    outline: "bg-transparent border border-white/20 text-white hover:border-red-500 hover:text-red-500",
    ghost: "bg-transparent text-neutral-400 hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};