import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a href="#" className={styles.brand} onClick={closeMenu}>
          <div className={styles.brandBadge}>
            <div className={styles.pulsingRing}></div>
            <img src="/images/logo.jpg" alt="Taskin Thai Logo" />
          </div>
          <div className={styles.brandText}>
            <span>TASKIN THAI</span>
            <span>VEGETABLES & FRUITS SDN BHD</span>
          </div>
        </a>

        <button 
          className={`${styles.burger} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav>
          <ul className={`${styles.navlinks} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
            <li><a href="#about" onClick={closeMenu}>About Us</a></li>
            <li><a href="#welcome" onClick={closeMenu}>Welcome</a></li>
            <li><a href="#mv" onClick={closeMenu}>Mission/Vision</a></li>
            <li><a href="#company" onClick={closeMenu}>Company Info</a></li>
            <li><a href="#team" onClick={closeMenu}>Team</a></li>
            <li><a href="#facilities" onClick={closeMenu}>Facilities</a></li>
            <li><a href="#products" onClick={closeMenu}>Products</a></li>
            <li><a href="#services" onClick={closeMenu}>Services</a></li>
            <li><a href="#contact" className={styles.navcta} onClick={closeMenu}>Contact Us</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
