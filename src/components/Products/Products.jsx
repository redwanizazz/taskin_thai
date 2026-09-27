import React, { useState, useEffect } from 'react';
import styles from './Products.module.css';
import { useLightbox } from '../../hooks/useLightbox';
import { 
  productCategories, 
  productCategorySubdivisions, 
  PRODUCTS_BASE, 
  PRODUCT_SLIDE_INTERVAL
} from '../../data/products';

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
    openLightbox(images[activeIndex], `${category.label} — Reference Price: ${category.price} (Sample pricing · Confirm at enquiry)`);
  };

  return (
    <div 
      className={`${styles.prodCard} reveal delay-${(index % 5) + 1}`} 
      role="button"
      tabIndex={0}
      aria-label={`View ${category.label} in lightbox. Reference price: ${category.price} (Sample placeholder pricing)`}
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
            alt={`${category.label} - produce photo ${i + 1}`} 
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
        <div className={styles.prodTitleRow}>
          <h3>{category.label}</h3>
        </div>

        {/* Reference Price Badge Unit */}
        <div className={styles.pricePill}>
          <div className={styles.priceHeaderRow}>
            <div className={styles.disclaimerGroup}>
              <span className={styles.priceDisclaimerDot} aria-hidden="true" />
              <span className={styles.priceDisclaimerText}>Reference Unit Price</span>
            </div>
            <span className={styles.sampleBadge}>Sample</span>
          </div>

          <div className={styles.priceValueRow}>
            <span className={styles.priceValue}>{category.price}</span>
          </div>

          <div className={styles.priceFooterRow}>
            <span className={styles.priceDisclaimerSub}>Confirm real-time rate at enquiry</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all'
    ? productCategories
    : productCategories.filter((item) => item.category === activeCategory);

  const getCategoryCount = (catId) => {
    if (catId === 'all') return productCategories.length;
    return productCategories.filter((item) => item.category === catId).length;
  };

  return (
    <section id="products" className={`${styles.products} section`}>
      <div className={styles.container}>
        <div className="section-head center reveal">
          <h2>Our Products</h2>
          <p>We source directly from premium producers to ensure top-tier quality and consistent supply for every category.</p>
        </div>

        {/* Category Filter Pills & Counter */}
        <div className={styles.filterSection}>
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
