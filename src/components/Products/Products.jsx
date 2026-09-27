import React, { useState, useEffect } from 'react';
import styles from './Products.module.css';
import { useLightbox } from '../../hooks/useLightbox';
import { 
  productCategories, 
  productCategorySubdivisions, 
  PRODUCTS_BASE, 
  PRODUCT_SLIDE_INTERVAL
} from '../../data/products';

const HERO_FEATURE_SLUG = 'bawang_holland';

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
  const { openLightbox } = useLightbox();

  useEffect(() => {
    // 1. Check URL parameters on mount
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

  const heroProduct = productCategories.find((p) => p.slug === HERO_FEATURE_SLUG);

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

        {/* Part 1: Hero Feature Area (Large photo-forward card style; placeholder for rotation) */}
        {heroProduct && (
          <div className={`${styles.heroFeature} reveal`}>
            <div className={styles.heroCard}>
              <div className={styles.heroImgWrap}>
                <img 
                  src={`${PRODUCTS_BASE}/${heroProduct.slug}/${heroProduct.images[0]}`} 
                  alt={`${heroProduct.label} fresh wholesale produce`} 
                  loading="lazy" 
                />
                <div className={styles.heroImgOverlay} />
              </div>

              <div className={styles.heroBody}>
                <div className={styles.heroMeta}>
                  <span className={styles.heroCategoryTag}>{getCategoryLabel(heroProduct.category)}</span>
                  <span className={styles.heroSpotlight}>Spotlight Produce</span>
                </div>

                <h3 className={styles.heroTitle}>{heroProduct.label}</h3>
                <p className={styles.heroDesc}>{heroProduct.description}</p>

                {heroProduct.tags && heroProduct.tags.length > 0 && (
                  <div className={styles.heroTags}>
                    {heroProduct.tags.map((tag) => (
                      <span key={tag} className={styles.heroTagPill}>{tag}</span>
                    ))}
                  </div>
                )}

                <div className={styles.heroActionRow}>
                  <button
                    type="button"
                    className={styles.heroBtn}
                    onClick={() => handleHeroFilter(heroProduct.category)}
                    aria-label={`Explore ${getCategoryLabel(heroProduct.category)} in catalogue below`}
                  >
                    <span>Explore {getCategoryLabel(heroProduct.category)}</span>
                    <span className={styles.arrow} aria-hidden="true">↓</span>
                  </button>

                  <button
                    type="button"
                    className={styles.heroLightboxBtn}
                    onClick={() => openLightbox(`${PRODUCTS_BASE}/${heroProduct.slug}/${heroProduct.images[0]}`, `${heroProduct.label} — ${getCategoryLabel(heroProduct.category)}`)}
                    aria-label={`View full-size photo of ${heroProduct.label}`}
                  >
                    <span>View Full Size</span>
                  </button>
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
