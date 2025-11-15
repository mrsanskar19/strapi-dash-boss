import React from 'react';

export function DataNotFound () {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No Data Found</h2>
        <p className="text-gray-600 dark:text-gray-300">The requested data could not be found.</p>
      </div>
    </div>
  );
};
