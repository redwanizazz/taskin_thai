import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavAnchor = (e, hash) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', hash);
      }
    } else {
      navigate(`/${hash}`);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footGrid}>
          <div className={styles.footBrand}>
            <Link to="/" className={styles.logoBadge} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Taskin Thai
            </Link>
            <p className={styles.tagline}>
              Taskin Thai Resources (Malaysia) Sdn. Bhd. Delivering top-quality fresh produce globally.
            </p>
          </div>
          <div className={styles.quickLinks}>
            <h4 className={styles.heading}>Quick Links</h4>
            <ul className={styles.linkList}>
              <li><a href="#about" onClick={(e) => handleNavAnchor(e, '#about')}>About Us</a></li>
              <li><Link to="/wholesale">Wholesale Supply</Link></li>
              <li><a href="#products" onClick={(e) => handleNavAnchor(e, '#products')}>Our Products</a></li>
              <li><a href="#team" onClick={(e) => handleNavAnchor(e, '#team')}>Our Team</a></li>
              <li><a href="#contact" onClick={(e) => handleNavAnchor(e, '#contact')}>Contact Us</a></li>
            </ul>
          </div>
          <div className={styles.contact}>
            <h4 className={styles.heading}>Contact</h4>
            <ul className={styles.contactList}>
              <li>03-6128 3831</li>
              <li>taskinthai503@gmail.com</li>
              <li>Batu Caves, Selangor, Malaysia</li>
            </ul>
          </div>
        </div>
        <div className={styles.footBottom}>
          <p>&copy; {currentYear} Taskin Thai Resources (Malaysia) Sdn. Bhd. All rights reserved.</p>
          <p>SSM Registration: 202201039476 (1485173-X)</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
