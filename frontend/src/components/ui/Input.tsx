import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className={`flex flex-col items-start w-full mb-4 ${className}`}>
      {label && <label className="text-sm font-medium text-gray-800 mb-1.5 ml-1">{label}</label>}
      <input 
        className="w-full px-4 py-3 text-base bg-gray-100 border-2 border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all duration-200 placeholder-gray-400" 
        {...props} 
      />
    </div>
  );
};
