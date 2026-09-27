import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import { useCountUp } from '../../hooks/useScrollReveal';

const SLIDES = [
  {
    id: 'slide-bawang',
    image: '/images/products/bawang_holland/product-1.jpg',
    alt: 'Fresh harvest Bawang Holland yellow onions',
    tag: 'Fresh Imports & Alliums',
    headlineLine1: 'Fresh from the source,',
    headlineLine2: 'Delivered across Malaysia.',
    description:
      'Premier commercial distribution of farm-fresh wholesale vegetables and premium imported onions, ensuring consistent supply and dependable quality for partners nationwide.',
  },
  {
    id: 'slide-chili',
    image: '/images/products/chili_merah_besar/product-1.jpg',
    alt: 'Bright red Chili Merah Besar peppers',
    tag: 'Commercial Fresh Chilies',
    headlineLine1: 'Vibrant Grade-A produce,',
    headlineLine2: 'Harvested for consistency.',
    description:
      'Direct sourcing of high-demand chilies and culinary staples for wholesale wet markets, commercial kitchens, and supermarket chains across Klang Valley and Selangor.',
  },
  {
    id: 'slide-brokoli',
    image: '/images/products/brokoli/product-1.jpeg',
    alt: 'Fresh green Brokoli heads in cold storage',
    tag: 'Field-Fresh Brassicas',
    headlineLine1: 'Superior quality greens,',
    headlineLine2: 'Uncompromised freshness.',
    description:
      'Rigorous quality grading and careful handling preserve natural texture, deep green color, and nutritional value from vetted growers to receiving docks.',
  },
  {
    id: 'slide-facility',
    image: '/images/facility-3.jpg',
    alt: 'Taskin Thai cold storage chillers and temperature-controlled shelving',
    tag: '24/7 Cold Storage Facilities',
    headlineLine1: 'Temperature-controlled chillers,',
    headlineLine2: 'Built for peak freshness.',
    description:
      'Round-the-clock cold storage infrastructure and managed warehousing in Batu Caves protect produce quality from arrival through scheduled commercial dispatch.',
  },
];

const AUTO_ADVANCE_MS = 5500;
const INACTIVITY_RESUME_MS = 8000;

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const heroRef = useRef(null);
  const inactivityTimerRef = useRef(null);

  const yearCount = useCountUp(2022, 2000);
  const locationCount = useCountUp(3, 2000);
  const teamCount = useCountUp(21, 2000);

  // 1. Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // 2. Next / Prev navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const handleSelectSlide = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  // 3. User interaction pausing & inactivity resumption
  const handleManualAction = useCallback((indexOrFn) => {
    if (typeof indexOrFn === 'function') {
      setActiveIndex(indexOrFn);
    } else if (typeof indexOrFn === 'number') {
      setActiveIndex(indexOrFn);
    }
    setIsPaused(true);
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, INACTIVITY_RESUME_MS);
  }, []);

  // 4. Auto-advance interval
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const timer = setInterval(() => {
      handleNext();
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(timer);
  }, [isPaused, prefersReducedMotion, handleNext]);

  // Clean up inactivity timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // 5. Keyboard arrow navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleManualAction((prev) => (prev + 1) % SLIDES.length);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleManualAction((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    }
  };

  const currentSlide = SLIDES[activeIndex];

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
        setIsPaused(false);
      }}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Taskin Thai Produce & Logistics Highlights"
    >
      {/* Background Slides with Ken Burns Effect */}
      <div className={styles.slidesBgWrapper} aria-hidden="true">
        {SLIDES.map((slide, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={slide.id}
              className={`${styles.slideBg} ${isActive ? styles.slideBgActive : ''}`}
            >
              <img
                src={slide.image}
                alt=""
                className={`${styles.bgImage} ${isActive && !prefersReducedMotion ? styles.kenBurns : ''}`}
              />
            </div>
          );
        })}
      </div>

      {/* Full-Bleed Dark Gradient Overlay */}
      <div className={styles.gradientOverlay} aria-hidden="true" />

      {/* Main Hero Container */}
      <div className={styles.container}>
        <div className={styles.contentGrid}>
          {/* Left-Aligned Animated Content Panel */}
          <div className={styles.contentPanel}>
            {/* Animated Slide Content (remounts on slide change for smooth entrance) */}
            <div
              key={currentSlide.id}
              className={styles.fadeInUp}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${activeIndex + 1} of ${SLIDES.length}: ${currentSlide.tag}`}
            >
              {/* Pill Tag */}
              <div className={styles.heroTag}>
                <span className={styles.pulsingDot} aria-hidden="true" />
                <span className={styles.tagText}>{currentSlide.tag}</span>
                <span className={styles.tagDivider} aria-hidden="true">·</span>
                <span className={styles.tagSubtext}>Batu Caves, Selangor</span>
              </div>

              {/* Bold Two-Line Headline */}
              <h1 className={styles.heroTitle}>
                <span className={styles.titleLine1}>{currentSlide.headlineLine1}</span>
                <span className={styles.accentLine}>{currentSlide.headlineLine2}</span>
              </h1>

              {/* Supporting Paragraph */}
              <p className={styles.heroLede}>{currentSlide.description}</p>

              {/* CTA Buttons */}
              <div className={styles.heroCtas}>
                <Link to="/contact" className={styles.btnPrimary}>
                  Request a Quotation
                </Link>
                <Link to="/products" className={styles.btnOutline}>
                  Browse Our Produce
                </Link>
              </div>
            </div>

            {/* Persistent Glassmorphic Stats Ribbon — Stays mounted so count-up animation never resets to 0 */}
            <div className={styles.statsRibbon}>
              <div className={styles.statItem}>
                <span className={styles.statNum} ref={yearCount}>
                  0
                </span>
                <span className={styles.statLabel}>Incorporated</span>
              </div>
              <div className={styles.statDivider} aria-hidden="true" />
              <div className={styles.statItem}>
                <span className={styles.statNum} ref={locationCount}>
                  0
                </span>
                <span className={styles.statLabel}>Selangor Locations</span>
              </div>
              <div className={styles.statDivider} aria-hidden="true" />
              <div className={styles.statItem}>
                <span className={styles.statNum} ref={teamCount}>
                  0
                </span>
                <span className={styles.statLabel}>Team Members</span>
              </div>
            </div>
          </div>

          {/* Grounded Bottom-Right Carousel Controls Dock */}
          <div className={styles.controlsSide}>
            {/* Slide Index Counter */}
            <div className={styles.counter} aria-live="polite">
              <span className={styles.counterActive}>0{activeIndex + 1}</span>
              <span className={styles.counterDivider}>/</span>
              <span className={styles.counterTotal}>0{SLIDES.length}</span>
            </div>

            <div className={styles.controlsDivider} aria-hidden="true" />

            {/* Pagination Lines/Dots */}
            <div className={styles.paginationList} role="tablist" aria-label="Slide Selection">
              {SLIDES.map((slide, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={slide.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Slide ${idx + 1}: ${slide.tag}`}
                    className={`${styles.navDot} ${isActive ? styles.navDotActive : ''}`}
                    onClick={() => handleManualAction(idx)}
                  >
                    <span className={styles.dotProgressBar} />
                  </button>
                );
              })}
            </div>

            <div className={styles.controlsDivider} aria-hidden="true" />

            {/* Prev / Next Circular Arrow Controls */}
            <div className={styles.arrowControls}>
              <button
                type="button"
                className={styles.arrowBtn}
                onClick={() => handleManualAction((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
                aria-label="Previous slide"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                className={styles.arrowBtn}
                onClick={() => handleManualAction((prev) => (prev + 1) % SLIDES.length)}
                aria-label="Next slide"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
