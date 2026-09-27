import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import { useCountUp } from '../../hooks/useScrollReveal';

const Hero = () => {
  const yearCount = useCountUp(2022, 2000);
  const locationCount = useCountUp(3, 2000);
  const teamCount = useCountUp(21, 2000);

  return (
    <section className={styles.hero}>
      <div className={`${styles.container} reveal`}>
        
        <div className={styles.heroContent}>
          <div className={styles.dotgrid} aria-hidden="true"></div>
          
          <div className={styles.heroTag}>
            <span className={styles.pulsingDot}></span>
            SSM 202201039476 (1485173-X) · Batu Caves, Selangor
          </div>
          
          <h1 className={styles.heroTitle}>
            Fresh from the source, delivered <em className={styles.emStyled}>across Malaysia.</em>
          </h1>
          
          <p className={styles.heroLede}>
            Taskin Thai Vegetables & Fruits Sdn Bhd is a premier importer and distributor of premium fresh produce. With established logistics across Selangor and Kuala Lumpur, we connect quality farms directly to wholesale markets and retailers, ensuring freshness at every step.
          </p>
          
          <div className={styles.heroCtas}>
            <Link to="/contact" className={styles.btnPrimary}>Request a Quotation</Link>
            <Link to="/products" className={styles.btnOutline}>Browse Our Produce</Link>
          </div>
          
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <span className={styles.statNum} ref={yearCount}>0</span>
              <span className={styles.statLabel}>Incorporated</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNum} ref={locationCount}>0</span>
              <span className={styles.statLabel}>Selangor Locations</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNum} ref={teamCount}>0</span>
              <span className={styles.statLabel}>Team Members</span>
            </div>
          </div>
        </div>
        
        <div className={styles.heroVisual}>
          <div className={styles.blobDecoration1}></div>
          <div className={styles.blobDecoration2}></div>
          <div className={styles.visualDotgrid}></div>
          
          <div className={styles.produceEmojis}>
            <span className={styles.emoji} style={{ top: '10%', left: '15%', animationDelay: '0s' }}>🍅</span>
            <span className={styles.emoji} style={{ top: '25%', right: '10%', animationDelay: '1s' }}>🌶️</span>
            <span className={styles.emoji} style={{ bottom: '20%', left: '5%', animationDelay: '2s' }}>🥬</span>
            <span className={styles.emoji} style={{ bottom: '15%', right: '15%', animationDelay: '0.5s' }}>🍋</span>
          </div>
          
          <div className={styles.produceRing}>
            <img src="/images/hero-produce.jpg" alt="Fresh vegetables and fruits assortment" className={styles.heroImg} />
          </div>
        </div>
        
      </div>
      
      <div className={styles.scrollCue}>
        <span>Scroll to explore</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  );
};

export default Hero;
