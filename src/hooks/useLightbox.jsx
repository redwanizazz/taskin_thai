import { createContext, useContext, useState, useCallback } from 'react';

const LightboxContext = createContext(null);

export function LightboxProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [caption, setCaption] = useState('');

  const openLightbox = useCallback((src, cap = '') => {
    setImageSrc(src);
    setCaption(cap);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <LightboxContext.Provider value={{ isOpen, imageSrc, caption, openLightbox, closeLightbox }}>
      {children}
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error('useLightbox must be used within a LightboxProvider');
  return ctx;
}
