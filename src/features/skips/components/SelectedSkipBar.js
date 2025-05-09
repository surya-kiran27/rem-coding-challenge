import React, { useEffect, useState } from 'react';
import { calculateTotalPrice, getSkipImageSource } from '../../../utils/skipHelpers';

const SelectedSkipBar = ({ selectedSkip, onContinue, onBack }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (selectedSkip) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [selectedSkip]);

  if (!selectedSkip) return null;

  // Calculate the total price including VAT
  const totalPrice = calculateTotalPrice(selectedSkip.price_before_vat, selectedSkip.vat);
  
  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 shadow-xl z-50 transform fixed-bar smooth-transition ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="container mx-auto">
        <div className="px-4 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4 mb-3 sm:mb-0">
            <div className="bg-[#002DA1]/20 rounded-lg p-1.5 overflow-hidden w-14 h-14 flex-shrink-0 flex items-center justify-center border border-[#002DA1]/30">
              <img 
                src={getSkipImageSource(selectedSkip.size)}
                alt={`${selectedSkip.size} Yard Skip`}
                className="w-full h-full object-cover rounded"
              />
            </div>
            
            <div>
              <div className="font-medium text-gray-100">{selectedSkip.size} Yard Skip</div>
              <div className="font-bold text-xl text-[#82A4FF]">£{totalPrice}</div>
              <div className="text-sm text-gray-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {selectedSkip.hire_period_days} day hire
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto sm:space-x-3">
            <button 
              onClick={onBack}
              className="px-4 sm:px-5 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-gray-300 font-medium hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 w-[48%] sm:w-auto"
              aria-label="Go back"
            >
              Back
            </button>
            
            <button 
              onClick={onContinue}
              className="px-4 sm:px-6 py-2.5 bg-[#002DA1] hover:bg-[#002DA1]/80 text-white rounded-lg font-medium shadow-sm transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#002DA1] focus:ring-opacity-50 w-[48%] sm:w-auto"
              aria-label="Continue with selected skip"
            >
              Continue
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedSkipBar; 