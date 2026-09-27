import React from 'react';
import styles from './Facilities.module.css';
import { useLightbox } from '../../hooks/useLightbox';
import { facilityStats, facilityImages } from '../../data/facilities';

const Facilities = () => {
  const { openLightbox } = useLightbox();

  return (
    <section id="facilities" className={`${styles.facilities} section`}>
      <div className={styles.container}>
        <div className="section-head center reveal">
          <h2>Our Facilities</h2>
          <p>State-of-the-art storage and processing centers designed to maintain optimal conditions for every product category.</p>
        </div>

        <div className={styles.facStats}>
          {facilityStats.map((stat, index) => (
            <div className={`${styles.statCard} reveal delay-${index + 1}`} key={index}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.masonryGallery}>
          {facilityImages.map((item, index) => (
            <div 
              className={`${styles.galleryItem} reveal`} 
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`View facility photo: ${item.caption}`}
              onClick={() => openLightbox(item.src, item.caption)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(item.src, item.caption);
                }
              }}
            >
              <img src={item.src} alt={item.caption} loading="lazy" />
              <div className={styles.captionOverlay}>
                <span>{item.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
