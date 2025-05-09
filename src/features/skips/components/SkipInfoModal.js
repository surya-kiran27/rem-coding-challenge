import React, { useRef, useEffect, useState } from 'react';
import skipDimensions from '../../../utils/skipDimensions';
import { calculateTotalPrice, getSkipImageSource } from '../../../utils/skipHelpers';

const SkipInfoModal = ({ skip, onClose }) => {
  const modalRef = useRef();
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);
  
  if (!skip) return null;
  
  const {
    size,
    hire_period_days,
    price_before_vat,
    vat,
    allowed_on_road,
    allows_heavy_waste
  } = skip;
  
  // Calculate the total price including VAT
  const totalPrice = calculateTotalPrice(price_before_vat, vat);

  // Get dimensions for the selected skip size
  const dimensions = skipDimensions[size] || null;
  
  // Get bin bag capacity
  const binBags = dimensions?.binBags || "N/A";
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[60] bg-black bg-opacity-80 p-4">
      <div 
        ref={modalRef}
        className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 id="modal-title" className="text-2xl font-bold text-gray-100">{size} Yard Skip</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 focus:outline-none transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="rounded-lg overflow-hidden h-40">
              <img
                src={getSkipImageSource(size, imageError)}
                alt={`${size} Yard Skip`}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            </div>
            
            <div className="flex bg-[#002DA1]/10 rounded-lg p-3 mb-1">
             
              <div>
                <p className="font-medium text-[#82A4FF] text-base">Capacity: <span className="font-bold text-lg">{binBags} bin bags</span></p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-700 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="text-gray-400 text-sm">Size:</span>
                  <span className="ml-2 font-medium text-gray-100 text-base">{size} Yards</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-400 text-sm">Hire Period:</span>
                  <span className="ml-2 font-medium text-gray-100 text-base">{hire_period_days} {hire_period_days === 1 ? 'day' : 'days'}</span>
                </div>
              </div>
              
              <div className="bg-gray-700 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Total Price:</span>
                  <span className="font-medium text-[#82A4FF] text-lg">£{totalPrice}</span>
                </div>
                <div className="text-gray-400 text-sm mt-1 text-right">(VAT included)</div>
              </div>
            </div>
            
            {dimensions && (
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-base font-medium text-gray-300 mb-2">Dimensions:</p>
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center">
                    <span className="text-gray-400 text-sm block">Vol</span>
                    <p className="text-sm text-gray-200">{dimensions.metric.size}</p>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-gray-400 text-sm block">Length</span>
                    <p className="text-sm text-gray-200">{dimensions.metric.length}</p>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-gray-400 text-sm block">Width</span>
                    <p className="text-sm text-gray-200">{dimensions.metric.width}</p>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-gray-400 text-sm block">Height</span>
                    <p className="text-sm text-gray-200">{dimensions.metric.height}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-base font-medium text-gray-300 mb-2">Features:</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${allowed_on_road ? 'bg-green-500' : 'bg-red-500'}`}>
                    {allowed_on_road ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-300 text-sm">{'Allowed On Road'}</span>
                </div>
                
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${allows_heavy_waste ? 'bg-green-500' : 'bg-red-500'}`}>
                    {allows_heavy_waste ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-300 text-sm">{'Heavy Waste'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <button
              onClick={onClose}
              className="w-full bg-[#002DA1] hover:bg-[#002DA1]/80 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#002DA1] focus:ring-opacity-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkipInfoModal; 