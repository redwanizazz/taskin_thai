import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Products.module.css';
import { useLightbox } from '../../hooks/useLightbox';
import { 
  productCategories, 
  productCategorySubdivisions, 
  PRODUCTS_BASE, 
  PRODUCT_SLIDE_INTERVAL
} from '../../data/products';

// Curated 5 products for hero rotation
const HERO_ROTATION_INTERVAL = 5500; // ~5.5s auto-advance
const INACTIVITY_RESUME_DELAY = 9000; // 9s inactivity before auto-advance resumes

const HERO_SLUGS = [
  'bawang_holland',
  'chili_merah_besar',
  'brokoli',
  'carrot',
  'nippis',
];

const getCategoryLabel = (catId) => {
  const match = productCategorySubdivisions.find((c) => c.id === catId);
  return match ? match.label : catId;
};

function ProductCard({ category, index }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { openLightbox } = useLightbox();
  
  const images = category.images.map(
    (filename) => `${PRODUCTS_BASE}/${category.slug}/${filename}`
  );

  useEffect(() => {
    if (images.length <= 1) return;
    
    function nextDelay() {
      return PRODUCT_SLIDE_INTERVAL + Math.random() * 2500;
    }
    
    let timer;
    function advance() {
      setActiveIndex((prev) => (prev + 1) % images.length);
      timer = setTimeout(advance, nextDelay());
    }
    
    timer = setTimeout(advance, nextDelay());
    return () => clearTimeout(timer);
  }, [images.length]);

  const handleClick = () => {
    openLightbox(
      images[activeIndex], 
      `${category.label} — ${getCategoryLabel(category.category)}`
    );
  };

  return (
    <div 
      className={`${styles.prodCard} reveal delay-${(index % 5) + 1}`} 
      role="button"
      tabIndex={0}
      aria-label={`View ${category.label} photo gallery (${getCategoryLabel(category.category)})`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className={styles.prodThumb}>
        {images.map((src, i) => (
          <img 
            key={i} 
            src={src} 
            alt={`${category.label} produce photo ${i + 1}`} 
            className={i === activeIndex ? styles.active : ''} 
            loading="lazy"
          />
        ))}
        {images.length > 1 && (
          <div className={styles.dots}>
            {images.map((_, i) => (
              <span key={i} className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`} />
            ))}
          </div>
        )}
      </div>

      <div className={styles.prodLabel}>
        <div className={styles.prodMetaRow}>
          <span className={styles.cardCategory}>{getCategoryLabel(category.category)}</span>
          {images.length > 1 && (
            <span className={styles.photoCountBadge}>{images.length} photos</span>
          )}
        </div>

        <div className={styles.prodTitleRow}>
          <h3>{category.label}</h3>
        </div>
      </div>
    </div>
  );
}

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [heroIndex, setHeroIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isManuallyInteracting, setIsManuallyInteracting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const inactivityTimerRef = useRef(null);
  const { openLightbox } = useLightbox();

  // 5 Curated products for hero rotation
  const heroProducts = HERO_SLUGS.map((slug) => 
    productCategories.find((p) => p.slug === slug)
  ).filter(Boolean);

  const currentHero = heroProducts[heroIndex] || heroProducts[0];

  // 1. Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // 2. Preload hero images to avoid mismatched content or delay
  useEffect(() => {
    heroProducts.forEach((prod) => {
      const img = new Image();
      img.src = `${PRODUCTS_BASE}/${prod.slug}/${prod.images[0]}`;
    });
  }, [heroProducts]);

  // 3. User interaction handler (resets inactivity countdown)
  const handleManualAction = useCallback((nextIndex) => {
    setHeroIndex(nextIndex);
    setIsManuallyInteracting(true);

    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      setIsManuallyInteracting(false);
    }, INACTIVITY_RESUME_DELAY);
  }, []);

  const handlePrev = useCallback(() => {
    handleManualAction((heroIndex - 1 + heroProducts.length) % heroProducts.length);
  }, [heroIndex, heroProducts.length, handleManualAction]);

  const handleNext = useCallback(() => {
    handleManualAction((heroIndex + 1) % heroProducts.length);
  }, [heroIndex, heroProducts.length, handleManualAction]);

  const handleDotClick = useCallback((idx) => {
    handleManualAction(idx);
  }, [handleManualAction]);

  // 4. Auto-advance timer (pauses on hover, manual interaction, or reduced-motion)
  useEffect(() => {
    if (prefersReducedMotion || isHovered || isManuallyInteracting || heroProducts.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroProducts.length);
    }, HERO_ROTATION_INTERVAL);

    return () => clearInterval(timer);
  }, [prefersReducedMotion, isHovered, isManuallyInteracting, heroProducts.length]);

  // 5. Keyboard navigation (ArrowLeft & ArrowRight)
  const handleHeroKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // Sync category parameter from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('category');
    if (catParam && productCategorySubdivisions.some((c) => c.id === catParam)) {
      setActiveCategory(catParam);
    }
  }, []);

  const filteredProducts = activeCategory === 'all'
    ? productCategories
    : productCategories.filter((item) => item.category === activeCategory);

  const getCategoryCount = (catId) => {
    if (catId === 'all') return productCategories.length;
    return productCategories.filter((item) => item.category === catId).length;
  };

  const handleHeroFilter = (catId) => {
    setActiveCategory(catId);
    const filterEl = document.getElementById('products-filter-bar');
    if (filterEl) {
      filterEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <section id="products" className={`${styles.products} section`}>
      <div className={styles.container}>
        <div className="section-head center reveal">
          <h2>Our Products</h2>
          <p>We source directly from premium producers to ensure top-tier quality and consistent supply for every category.</p>
        </div>

        {/* Part 1: Rotating Hero Feature Area (5 Curated Products) */}
        {currentHero && (
          <div className={`${styles.heroFeature} reveal`}>
            <div 
              className={styles.heroCard}
              tabIndex={0}
              role="region"
              aria-roledescription="carousel"
              aria-label="Featured Produce Spotlight"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onFocus={() => setIsHovered(true)}
              onBlur={() => setIsHovered(false)}
              onKeyDown={handleHeroKeyDown}
            >
              {/* Stacked Images with cross-fade transition */}
              <div className={styles.heroImgWrap}>
                {heroProducts.map((prod, idx) => (
                  <img 
                    key={prod.slug}
                    src={`${PRODUCTS_BASE}/${prod.slug}/${prod.images[0]}`} 
                    alt={`${prod.label} fresh wholesale produce`} 
                    className={`${styles.heroImg} ${idx === heroIndex ? styles.heroImgActive : ''}`}
                    loading={idx === 0 ? 'eager' : 'lazy'} 
                  />
                ))}
                <div className={styles.heroImgOverlay} />
              </div>

              {/* Dynamic Content Panel synchronized with heroIndex */}
              <div className={styles.heroBody}>
                <div className={styles.heroMeta}>
                  <div className={styles.heroMetaLeft}>
                    <span className={styles.heroCategoryTag}>{getCategoryLabel(currentHero.category)}</span>
                    <span className={styles.heroSpotlight}>Spotlight Produce</span>
                  </div>
                  <span className={styles.heroCounter} aria-live="polite">
                    0{heroIndex + 1} / 0{heroProducts.length}
                  </span>
                </div>

                <h3 className={styles.heroTitle}>{currentHero.label}</h3>
                <p className={styles.heroDesc}>{currentHero.description}</p>

                {currentHero.tags && currentHero.tags.length > 0 && (
                  <div className={styles.heroTags}>
                    {currentHero.tags.map((tag) => (
                      <span key={tag} className={styles.heroTagPill}>{tag}</span>
                    ))}
                  </div>
                )}

                {/* Bottom Row: Actions + Manual Carousel Controls */}
                <div className={styles.heroBottomRow}>
                  <div className={styles.heroActionRow}>
                    <button
                      type="button"
                      className={styles.heroBtn}
                      onClick={() => handleHeroFilter(currentHero.category)}
                      aria-label={`Explore ${getCategoryLabel(currentHero.category)} in catalogue below`}
                    >
                      <span>Explore {getCategoryLabel(currentHero.category)}</span>
                      <span className={styles.arrow} aria-hidden="true">↓</span>
                    </button>

                    <button
                      type="button"
                      className={styles.heroLightboxBtn}
                      onClick={() => openLightbox(`${PRODUCTS_BASE}/${currentHero.slug}/${currentHero.images[0]}`, `${currentHero.label} — ${getCategoryLabel(currentHero.category)}`)}
                      aria-label={`View full-size photo of ${currentHero.label}`}
                    >
                      <span>View Full Size</span>
                    </button>
                  </div>

                  {/* Manual Controls: Prev, Dots, Next */}
                  <div className={styles.carouselNav} role="group" aria-label="Rotation controls">
                    <button
                      type="button"
                      className={styles.navArrowBtn}
                      onClick={handlePrev}
                      aria-label="Previous featured produce"
                      title="Previous"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>

                    <div className={styles.navDots} role="tablist" aria-label="Select featured produce">
                      {heroProducts.map((item, idx) => (
                        <button
                          key={item.slug}
                          type="button"
                          role="tab"
                          aria-selected={idx === heroIndex}
                          aria-label={`Slide ${idx + 1}: ${item.label} (${getCategoryLabel(item.category)})`}
                          className={`${styles.navDot} ${idx === heroIndex ? styles.navDotActive : ''}`}
                          onClick={() => handleDotClick(idx)}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      className={styles.navArrowBtn}
                      onClick={handleNext}
                      aria-label="Next featured produce"
                      title="Next"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Part 2: Category Filter Pills & Counter */}
        <div id="products-filter-bar" className={styles.filterSection}>
          <div className={styles.filterBar} role="tablist" aria-label="Produce Categories">
            {productCategorySubdivisions.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = getCategoryCount(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.filterPill} ${isActive ? styles.activePill : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span>{cat.label}</span>
                  <span className={styles.pillBadge}>{count}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.resultsCount} aria-live="polite">
            Showing <strong>{filteredProducts.length}</strong> of <strong>{productCategories.length}</strong> products
          </div>
        </div>

        {/* Products Grid */}
        <div className={styles.prodGrid}>
          {filteredProducts.map((category, index) => (
            <ProductCard key={category.slug} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
