import React from 'react';
import skipDimensions from '../../../utils/skipDimensions';
import { calculateTotalPrice, getSkipImageSource } from '../../../utils/skipHelpers';

const SkipCard = ({ skip, selected, onSelect, onInfoClick }) => {
  const { size, hire_period_days, price_before_vat, vat, allowed_on_road } = skip;
  
  const totalPrice = calculateTotalPrice(price_before_vat, vat);
  
  // Format price to display with pound sign
  const formattedPrice = `£${totalPrice}`;
  
  // Get bin bag capacity
  const binBags = skipDimensions[size]?.binBags || "N/A";
  
  return (
    <div 
      className={`rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col ${
        selected ? 'ring-2 ring-[#002DA1] border border-[#002DA1] bg-gray-800' : 'bg-gray-800 border border-gray-700'
      }`}
      onClick={() => onSelect(skip)}
    >
      <div className="relative">
        {/* Skip image */}
        <div className="bg-gray-700 h-48 overflow-hidden">
          <img 
            src={getSkipImageSource(size)}
            alt={`${size} Yard Skip`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 bg-[#002DA1] text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
            {size} Yards
          </div>
          <div className="absolute top-3 left-3 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
            {binBags} bin bags
          </div>
        </div>
        
        {/* Not allowed on road warning */}
        {!allowed_on_road && (
          <div className="absolute bottom-0 left-0 right-0 bg-yellow-600 bg-opacity-90 text-white px-3 py-2 text-sm flex items-center justify-center font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Not Allowed On Road
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-100">{size} Yard Skip</h3>
          <button 
            className="text-[#82A4FF] hover:text-[#82A4FF]/80 focus:outline-none flex-shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onInfoClick(skip);
            }}
            aria-label="More information"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-2 mb-4">
          <div className="flex items-center">
            <div>
              <span className="text-gray-400 text-xs">Hire:</span>
              <span className="ml-1 font-medium text-gray-100">{hire_period_days} {hire_period_days === 1 ? 'day' : 'days'}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-gray-300 text-sm">Total Price (inc. VAT)</div>
              <div className="text-2xl font-bold text-[#82A4FF]">{formattedPrice}</div>
            </div>
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selected 
                  ? 'bg-[#002DA1] text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(skip);
              }}
            >
              {selected ? 'Selected' : 'Select'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkipCard; 