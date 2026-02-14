import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed bottom-5 right-5 ${bgColor} text-white-900 px-6 py-3 rounded-lg shadow-2xl transition-all duration-300 animate-bounce flex items-center`}>
      <span className="mr-2">
        {type === 'success' ? (
          <i className="fa-solid fa-circle-check"></i>
        ) : (
          <i className="fa-solid fa-circle-exclamation"></i>
        )}
      </span>
      {message}
    </div>
  );
};

export default Toast;
