import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from './Welcome.module.css';
import { productCategories, PRODUCTS_BASE } from '../../data/products';
import { useLightbox } from '../../hooks/useLightbox';

const Welcome = () => {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { openLightbox } = useLightbox();

  const checkScroll = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = trackRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scrollByAmount = (direction) => {
    if (!trackRef.current) return;
    const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cardWidth = trackRef.current.clientWidth > 600 ? 384 : trackRef.current.clientWidth * 0.85;
    const amount = direction === 'left' ? -cardWidth : cardWidth;
    trackRef.current.scrollBy({
      left: amount,
      behavior: isReduced ? 'auto' : 'smooth',
    });
  };

  return (
    <section id="welcome" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={`${styles.sectionHead} reveal`}>
            <h2 className={styles.h2}>Produce Showcase</h2>
            <p className={styles.desc}>
              Explore our comprehensive wholesale selection of fresh vegetables, aromatic roots, culinary herbs, and premium imported fruits.
            </p>
          </div>

          <div className={styles.navControls} aria-label="Showcase navigation">
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() => scrollByAmount('left')}
              disabled={!canScrollLeft}
              aria-label="Previous produce categories"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() => scrollByAmount('right')}
              disabled={!canScrollRight}
              aria-label="Next produce categories"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${styles.trackWrap} reveal`}
        ref={trackRef}
        role="region"
        aria-label="Produce Categories Carousel"
        tabIndex={0}
      >
        <div className={styles.track}>
          {productCategories.map((category, index) => {
            const imageSrc = `${PRODUCTS_BASE}/${category.slug}/${category.images[0]}`;
            const catLabel = `CATEGORY ${String(index + 1).padStart(2, '0')}`;
            return (
              <div
                key={category.slug}
                className={styles.card}
                role="button"
                tabIndex={0}
                aria-label={`View enlarged photo of ${category.label}`}
                onClick={() => openLightbox(imageSrc, `${category.label} — ${category.description}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(imageSrc, `${category.label} — ${category.description}`);
                  }
                }}
              >
                <div className={styles.cardBg}>
                  <img
                    src={imageSrc}
                    alt={`${category.label} produce category showcase`}
                    className={styles.bgImage}
                    loading="lazy"
                  />
                  <div className={styles.overlay} />
                </div>

                <div className={styles.cardTop}>
                  <span className={styles.pillLabel}>{catLabel}</span>
                  <span className={styles.imageCountBadge}>
                    {category.images.length} {category.images.length === 1 ? 'photo' : 'photos'}
                  </span>
                </div>

                <div className={styles.cardBottom}>
                  <h3 className={styles.cardTitle}>{category.label}</h3>
                  <p className={styles.cardDesc}>{category.description}</p>

                  <div className={styles.tagsRow}>
                    {category.tags?.map((tag) => (
                      <span key={tag} className={styles.tagPill}>{tag}</span>
                    ))}
                  </div>

                  <div className={styles.cardFooter}>
                    <a
                      href="#products"
                      className={styles.viewRangeLink}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <span>View Range</span>
                      <span className={styles.arrowIcon} aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Welcome;
