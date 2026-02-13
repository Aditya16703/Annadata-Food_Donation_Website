import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500 border-t-transparent"></div>
    </div>
  );
};

export default LoadingSpinner;
