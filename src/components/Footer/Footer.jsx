import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footGrid}>
          <div className={styles.footBrand}>
            <div className={styles.logoBadge}>Taskin Thai</div>
            <p className={styles.tagline}>
              Taskin Thai Resources (Malaysia) Sdn. Bhd. Delivering top-quality fresh produce globally.
            </p>
          </div>
          <div className={styles.quickLinks}>
            <h4 className={styles.heading}>Quick Links</h4>
            <ul className={styles.linkList}>
              <li><a href="#about">About Us</a></li>
              <li><a href="#team">Our Team</a></li>
              <li><a href="#products">Our Products</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
          <div className={styles.contact}>
            <h4 className={styles.heading}>Contact</h4>
            <ul className={styles.contactList}>
              <li>+60 12-345 6789</li>
              <li>info@taskinthai.com</li>
              <li>Kuala Lumpur, Malaysia</li>
            </ul>
          </div>
        </div>
        <div className={styles.footBottom}>
          <p>&copy; {currentYear} Taskin Thai Resources (Malaysia) Sdn. Bhd. All rights reserved.</p>
          <p>SSM Registration: 1322129-D</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
