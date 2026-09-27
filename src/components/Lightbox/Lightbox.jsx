import React, { useEffect, useRef } from 'react';
import styles from './Lightbox.module.css';
import { useLightbox } from '../../hooks/useLightbox';

const Lightbox = () => {
  const { isOpen, imageSrc, caption, closeLightbox } = useLightbox();
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeLightbox();
      } else if (e.key === 'Tab' && isOpen) {
        // Prevent tab from escaping the modal into background page elements
        e.preventDefault();
        closeBtnRef.current?.focus();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      // Focus trap initial focus
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeLightbox]);

  if (!isOpen) return null;

  return (
    <div 
      className={styles.lightboxOverlay} 
      onClick={closeLightbox}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
        <button 
          className={styles.closeBtn} 
          onClick={closeLightbox}
          ref={closeBtnRef}
          aria-label="Close lightbox"
        >
          &#10005;
        </button>
        <img src={imageSrc} alt={caption || 'Enlarged view'} className={styles.lightboxImg} />
        {caption && <div className={styles.lightboxCaption}>{caption}</div>}
      </div>
    </div>
  );
};

export default Lightbox;
