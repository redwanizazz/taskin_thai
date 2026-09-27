import React from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.css';

const About = () => {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.sectionHead} reveal`}>
          <h2 className={styles.h2}>About Us</h2>
        </div>
        <div className={styles.aboutGrid}>
          <div className={`${styles.aboutCopy} reveal`}>
            <p className={styles.paragraph}>
              Taskin Thai Resources (Malaysia) Sdn. Bhd. (1322129-D) was established in 2019 to cater to the growing demand for top-quality fresh produce globally.
            </p>
            <p className={styles.paragraph}>
              We specialize in wholesaling, distributing, exporting, and importing a wide range of fruits, vegetables, and other food products. By focusing on excellence, consistency, and a passion for healthy living, we have quickly become a trusted name in the industry.
            </p>
            <Link to="/contact" className={styles.button}>Partner With Us</Link>
          </div>
          <div className={`${styles.aboutCard} reveal`}>
            <div className={styles.capabilityItem}>
              <div className={styles.iconCircle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className={styles.capabilityText}>
                <h3 className={styles.capabilityTitle}>Wholesale & Distribution</h3>
                <p className={styles.capabilityDesc}>Delivering fresh produce to local and international markets efficiently.</p>
              </div>
            </div>
            <div className={styles.capabilityItem}>
              <div className={styles.iconCircle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className={styles.capabilityText}>
                <h3 className={styles.capabilityTitle}>Import & Export</h3>
                <p className={styles.capabilityDesc}>Connecting global growers with consumers worldwide.</p>
              </div>
            </div>
            <div className={styles.capabilityItem}>
              <div className={styles.iconCircle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className={styles.capabilityText}>
                <h3 className={styles.capabilityTitle}>Cold Chain Logistics</h3>
                <p className={styles.capabilityDesc}>Maintaining freshness through temperature-controlled transport.</p>
              </div>
            </div>
            <div className={styles.capabilityItem}>
              <div className={styles.iconCircle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className={styles.capabilityText}>
                <h3 className={styles.capabilityTitle}>Trusted & Registered</h3>
                <p className={styles.capabilityDesc}>Fully compliant with SSM (1322129-D) and international trade standards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.leafPattern}></div>
      <div className={styles.dotgrid}></div>
    </section>
  );
};

export default About;
