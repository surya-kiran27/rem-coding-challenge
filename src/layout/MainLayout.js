import React from 'react';

/**
 * Main layout component that provides consistent structure across pages
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element}
 */
const MainLayout = ({ children }) => {
  return (
    <div className="bg-gray-900 min-h-screen">
     
      
      <main>
        {children}
      </main>
      
   
    </div>
  );
};

export default MainLayout; 