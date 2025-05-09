import React, { useState, useEffect } from 'react';
import SkipCard from '../features/skips/components/SkipCard';
import SkipInfoModal from '../features/skips/components/SkipInfoModal';
import SelectedSkipBar from '../features/skips/components/SelectedSkipBar';
import useSkipData from '../hooks/useSkipData';

const SkipSelectionPage = () => {
  const { skips, loading, error } = useSkipData();
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortedSkips, setSortedSkips] = useState([]);

  useEffect(() => {
    if (skips.length > 0) {
      const sorted = [...skips].sort((a, b) => a.size - b.size);
      setSortedSkips(sorted);
      
      if (selectedSkip) {
        const updatedSkip = sorted.find(s => s.id === selectedSkip.id);
        if (updatedSkip) {
          setSelectedSkip(updatedSkip);
        }
      }
    }
  }, [skips, selectedSkip]);

  const handleSkipSelect = (skip) => {
    setSelectedSkip(skip);
  };

  const handleSkipInfoClick = (skip) => {
    setSelectedSkip(skip);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleContinue = () => {
    // TODO
  };

  const handleBack = () => {
    // TODO
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#002DA1]"></div>
      </div>
    );
  }

  if (error && sortedSkips.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-900">
        <div className="bg-red-900 border border-red-800 text-red-200 px-6 py-4 rounded-xl shadow-sm max-w-md w-full" role="alert">
          <span className="font-medium">Error:</span> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen pb-for-fixed-bar">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-gray-100">Choose Your Skip Size</h1>
          <p className="text-gray-400">Select the skip size that best suits your waste removal needs</p>
        </div>

        {error && (
          <div className="mb-6 bg-yellow-900 border border-yellow-800 text-yellow-200 p-4 rounded-xl shadow-sm" role="alert">
            <span className="font-medium">Note:</span> {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSkips.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              selected={selectedSkip?.id === skip.id}
              onSelect={handleSkipSelect}
              onInfoClick={handleSkipInfoClick}
            />
          ))}
        </div>

        {showModal && (
          <SkipInfoModal skip={selectedSkip} onClose={closeModal} />
        )}
      </div>
      
      <SelectedSkipBar 
        selectedSkip={selectedSkip}
        onContinue={handleContinue}
        onBack={handleBack}
      />
    </div>
  );
};

export default SkipSelectionPage; 