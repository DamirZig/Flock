import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Icon } from '@iconify/react';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Alert: React.FC<AlertProps> = ({ type, message, isVisible, onClose }) => {
  const nodeRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const borderColor = type === 'success' ? 'border-green-200' : 'border-red-200';
  const iconName = type === 'success' ? 'solar:check-circle-bold' : 'solar:danger-circle-bold';
  const iconColor = type === 'success' ? 'text-green-500' : 'text-red-500';

  return (
    <CSSTransition
      in={isVisible}
      timeout={300}
      classNames="alert"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div 
        ref={nodeRef}
        className={`fixed top-4 right-4 z-50 flex items-center p-4 mb-4 text-sm rounded-xl border shadow-lg ${bgColor} ${textColor} ${borderColor}`}
        role="alert"
      >
        <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3 ${iconColor}`}>
            <Icon icon={iconName} width="24" height="24" />
        </div>
        <div className="font-medium mr-2">{message}</div>
        <button 
          type="button" 
          className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 ${textColor} hover:bg-black/5 transition-colors duration-200`} 
          onClick={onClose}
        >
          <span className="sr-only">Close</span>
          <Icon icon="solar:close-circle-linear" width="20" height="20" />
        </button>
      </div>
    </CSSTransition>
  );
};
