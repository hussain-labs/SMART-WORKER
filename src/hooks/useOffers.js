import { useState, useEffect } from 'react';

const STORAGE_KEY = 'smartWorkerOffers';

export const useOffers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setOffers(JSON.parse(saved));
    }
  }, []);

  const saveOffers = (newOffers) => {
    setOffers(newOffers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newOffers));
  };

  const sendOffer = (offerData) => {
    const newOffer = {
      id: Date.now().toString(),
      ...offerData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    saveOffers([newOffer, ...offers]);
    return newOffer;
  };

  const updateOfferStatus = (offerId, newStatus) => {
    const updated = offers.map(offer => 
      offer.id === offerId ? { ...offer, status: newStatus } : offer
    );
    saveOffers(updated);
  };

  return { offers, sendOffer, updateOfferStatus };
};
