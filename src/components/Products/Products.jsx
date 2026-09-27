import React, { useState, useEffect } from 'react';
import styles from './Products.module.css';
import { useLightbox } from '../../hooks/useLightbox';
import { productCategories, PRODUCTS_BASE, PRODUCT_SLIDE_INTERVAL } from '../../data/products';

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
    openLightbox(images[activeIndex], category.label);
  };

  return (
    <div 
      className={`${styles.prodCard} reveal delay-${(index % 5) + 1}`} 
      role="button"
      tabIndex={0}
      aria-label={`View ${category.label} in lightbox`}
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
        <h3>{category.label}</h3>
      </div>
    </div>
  );
}

const Products = () => {
  return (
    <section id="products" className={`${styles.products} section`}>
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow">08 &mdash; Farm to warehouse</span>
          <h2>Our Products</h2>
          <p>We source directly from premium producers to ensure top-tier quality and consistent supply for every category.</p>
        </div>

        <div className={styles.prodGrid}>
          {productCategories.map((category, index) => (
            <ProductCard key={category.slug || index} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
