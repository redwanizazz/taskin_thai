import React from 'react';
import styles from './FeaturedProducts.module.css';
import { productCategories, productCategorySubdivisions } from '../../data/products';

// 5 representative produce categories for the bento grid
const FEATURED_HERO_SLUG = 'bawang_holland';
const FEATURED_ITEMS_SLUGS = [
  'chili_merah_besar',
  'brokoli',
  'carrot',
  'nippis',
];

const getCategoryLabel = (catId) => {
  const match = productCategorySubdivisions.find((c) => c.id === catId);
  return match ? match.label : catId;
};

const FeaturedProducts = () => {
  const handleViewProduct = (categoryId) => {
    // 1. Dispatch custom event to notify Products component to pre-select this category
    window.dispatchEvent(
      new CustomEvent('filter-product-category', { detail: categoryId })
    );

    // 2. Smoothly scroll to the Products catalogue section
    const productsEl = document.getElementById('products');
    if (productsEl) {
      productsEl.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `/#products?category=${categoryId}`);
    }
  };

  // Pull hero item directly from productCategories
  const heroProduct = productCategories.find((p) => p.slug === FEATURED_HERO_SLUG);
  const hero = heroProduct
    ? {
        id: heroProduct.slug,
        name: heroProduct.label,
        category: heroProduct.category,
        categoryLabel: getCategoryLabel(heroProduct.category),
        img: `/images/products/${heroProduct.slug}/${heroProduct.images[0]}`,
        alt: `${heroProduct.label} fresh produce`,
        desc: heroProduct.description,
        price: heroProduct.price,
      }
    : null;

  // Pull subgrid items directly from productCategories
  const items = FEATURED_ITEMS_SLUGS.map((slug) => {
    const prod = productCategories.find((p) => p.slug === slug);
    if (!prod) return null;
    return {
      id: prod.slug,
      name: prod.label,
      category: prod.category,
      categoryLabel: getCategoryLabel(prod.category),
      img: `/images/products/${prod.slug}/${prod.images[0]}`,
      alt: `${prod.label} fresh produce`,
      desc: prod.description,
      price: prod.price,
    };
  }).filter(Boolean);

  if (!hero) return null;

  return (
    <section id="featured-products" className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.sectionHead} reveal`}>
          <h2 className={styles.title}>Featured Products</h2>
          <p className={styles.subtitle}>
            A curated showcase of our core high-volume agricultural staples, direct Thai imports, and cold-chain produce supplied daily to commercial partners across Malaysia.
          </p>
        </div>

        <div className={styles.bentoGrid}>
          {/* Large Left Featured Card (Dark Background) */}
          <div className={`${styles.heroCard} reveal`}>
            <div className={styles.heroImgWrap}>
              <img src={hero.img} alt={hero.alt} loading="lazy" />
              <div className={styles.heroImgOverlay} />
            </div>

            <div className={styles.heroBody}>
              <div className={styles.heroMeta}>
                <span className={styles.heroCategoryTag}>{hero.categoryLabel}</span>
              </div>

              <h3 className={styles.heroTitle}>{hero.name}</h3>
              <p className={styles.heroDesc}>{hero.desc}</p>

              {/* Reference Price Badge Unit with [SAMPLE] badge & disclaimer */}
              <div className={styles.heroPricePill}>
                <div className={styles.priceHeaderRow}>
                  <div className={styles.disclaimerGroup}>
                    <span className={styles.heroDisclaimerDot} aria-hidden="true" />
                    <span className={styles.heroDisclaimerText}>Reference Unit Price</span>
                  </div>
                  <span className={styles.heroSampleBadge}>Sample</span>
                </div>
                <div className={styles.priceValueRow}>
                  <span className={styles.heroPriceValue}>{hero.price}</span>
                </div>
                <div className={styles.priceFooterRow}>
                  <span className={styles.heroDisclaimerSub}>Confirm real-time rate at enquiry</span>
                </div>
              </div>

              <div className={styles.heroFooter}>
                <button
                  type="button"
                  className={styles.heroBtn}
                  onClick={() => handleViewProduct(hero.category)}
                  aria-label={`View ${hero.name} in Products catalogue (${hero.categoryLabel} category)`}
                >
                  <span>View Product</span>
                  <span className={styles.arrow} aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4 Smaller Cards in 2x2 Grid (Right Side) */}
          <div className={styles.subGrid}>
            {items.map((item) => (
              <div key={item.id} className={`${styles.itemCard} reveal`}>
                <div className={styles.itemImgWrap}>
                  <img src={item.img} alt={item.alt} loading="lazy" />
                  <span className={styles.itemCategoryTag}>{item.categoryLabel}</span>
                </div>

                <div className={styles.itemBody}>
                  <div className={styles.itemTopRow}>
                    <h4 className={styles.itemTitle}>{item.name}</h4>
                  </div>

                  <p className={styles.itemDesc}>{item.desc}</p>

                  {/* Reference Price Badge Unit with [SAMPLE] badge & disclaimer */}
                  <div className={styles.pricePill}>
                    <div className={styles.priceHeaderRow}>
                      <div className={styles.disclaimerGroup}>
                        <span className={styles.priceDisclaimerDot} aria-hidden="true" />
                        <span className={styles.priceDisclaimerText}>Reference Unit Price</span>
                      </div>
                      <span className={styles.sampleBadge}>Sample</span>
                    </div>
                    <div className={styles.priceValueRow}>
                      <span className={styles.priceValue}>{item.price}</span>
                    </div>
                    <div className={styles.priceFooterRow}>
                      <span className={styles.priceDisclaimerSub}>Confirm real-time rate at enquiry</span>
                    </div>
                  </div>

                  <div className={styles.itemFooter}>
                    <button
                      type="button"
                      className={styles.itemBtn}
                      onClick={() => handleViewProduct(item.category)}
                      aria-label={`View ${item.name} in Products catalogue (${item.categoryLabel} category)`}
                    >
                      <span>View Product</span>
                      <span className={styles.itemArrow} aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
