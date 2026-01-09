import React from 'react';

interface LogoProps {
  className?: string;
  withText?: boolean;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ className = "", withText = true, onClick }) => {
  const Wrapper = onClick ? 'button' : 'div';

  return (
    <Wrapper
      className={`flex items-center gap-2 ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="relative w-8 h-8 flex items-center justify-center">
        {/* Abstract "Flock" Icon - birds/arrows converging */}
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-primary">
          <path d="M6 16L14 24L26 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="opacity-100" />
          <path d="M6 8L14 16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="opacity-60" />
        </svg>
        <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full"></div>
      </div>

      {withText && (
        <span className="font-extrabold text-xl tracking-tight text-gray-900">
          Flock
        </span>
      )}
    </Wrapper>
  );
};

