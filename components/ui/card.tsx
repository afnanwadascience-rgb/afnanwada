import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
};