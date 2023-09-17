import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 h-12 w-12"></div>
    </div>
  );
}

export default LoadingSpinner;
