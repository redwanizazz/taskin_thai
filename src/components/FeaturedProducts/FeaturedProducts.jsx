import React from 'react';
import styles from './FeaturedProducts.module.css';

const featuredData = {
  hero: {
    id: 'bawang_holland',
    name: 'Bawang Holland',
    category: 'alliums',
    categoryLabel: 'Alliums',
    img: '/images/products/bawang_holland/product-1.jpg',
    alt: 'Bawang Holland yellow onions in wholesale mesh sacks',
    packSize: '10 kg & 20 kg Mesh Sacks',
    highlightBadge: '★ Commercial Anchor Item',
    desc: 'High-grade imported yellow onions selected for uniform bulb density, golden skin, and prolonged warehouse shelf life. The foundational high-volume produce staple for hypermarkets, restaurant chains, and food distributors across Malaysia.',
    priceRef: 'RM 3.20 / kg',
  },
  items: [
    {
      id: 'chili_merah_besar',
      name: 'Chili Merah Besar',
      category: 'chilies',
      categoryLabel: 'Chilies',
      img: '/images/products/chili_merah_besar/product-1.jpg',
      alt: 'Fresh glossy red large chilies',
      packSize: '5 kg & 10 kg Ventilated Box',
      desc: 'Vibrant, hand-selected crimson red chilies delivering dependable sharpness for commercial food service.',
      priceRef: 'RM 9.00 / kg',
    },
    {
      id: 'brokoli',
      name: 'Brokoli',
      category: 'greens',
      categoryLabel: 'Leafy Greens & Brassicas',
      img: '/images/products/brokoli/product-1.jpeg',
      alt: 'Fresh green Broccoli florets',
      packSize: '8 kg – 10 kg Chilled Crate',
      desc: 'Tightly beaded, dense green florets protected under unbroken cold-chain transport to ensure crisp texture.',
      priceRef: 'RM 9.50 / kg',
    },
    {
      id: 'carrot',
      name: 'Carrot',
      category: 'roots',
      categoryLabel: 'Root Vegetables',
      img: '/images/products/carrot/product-1.jpg',
      alt: 'Clean graded carrots packed in export carton',
      packSize: '10 kg Heavy-Duty Box',
      desc: 'Evenly graded, sweet orange carrots thoroughly washed and boxed ready for kitchen prep and supermarket shelves.',
      priceRef: 'RM 3.60 / kg',
    },
    {
      id: 'nippis',
      name: 'Nippis (Limau Nipis)',
      category: 'fruits',
      categoryLabel: 'Fruits',
      img: '/images/products/nippis/product-1.jpeg',
      alt: 'Fresh key limes in plastic crate',
      packSize: '12 kg Ventilated Crate',
      desc: 'Aromatic Southeast Asian key limes bursting with natural citrus oils and rich juice content.',
      priceRef: 'RM 6.50 / kg',
    },
  ],
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

  const { hero, items } = featuredData;

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
              <span className={styles.heroBadge}>{hero.highlightBadge}</span>
            </div>

            <div className={styles.heroBody}>
              <div className={styles.heroMeta}>
                <span className={styles.heroCategoryTag}>{hero.categoryLabel}</span>
                <span className={styles.heroPrice}>{hero.priceRef}</span>
              </div>

              <h3 className={styles.heroTitle}>{hero.name}</h3>
              <p className={styles.heroDesc}>{hero.desc}</p>

              <div className={styles.heroFooter}>
                <div className={styles.packInfo}>
                  <span className={styles.packLabel}>Pack / Case Size</span>
                  <span className={styles.heroPackValue}>{hero.packSize}</span>
                </div>

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
                    <span className={styles.itemPrice}>{item.priceRef}</span>
                  </div>

                  <p className={styles.itemDesc}>{item.desc}</p>

                  <div className={styles.itemFooter}>
                    <div className={styles.itemPack}>
                      <span className={styles.packLabel}>Pack Size:</span>
                      <span className={styles.itemPackValue}>{item.packSize}</span>
                    </div>

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
