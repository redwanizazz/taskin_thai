import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleLogoClick = (e) => {
    closeMenu();
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavAnchor = (e, hash) => {
    closeMenu();
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', hash);
      }
    } else {
      // Navigate to Home with hash (e.g. /#contact)
      navigate(`/${hash}`);
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand} onClick={handleLogoClick}>
          <div className={styles.brandBadge}>
            <div className={styles.pulsingRing}></div>
            <img src="/images/logo.jpg" alt="Taskin Thai Logo" />
          </div>
          <div className={styles.brandText}>
            <span>TASKIN THAI</span>
            <span>VEGETABLES & FRUITS SDN BHD</span>
          </div>
        </Link>

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
            <li><a href="#about" onClick={(e) => handleNavAnchor(e, '#about')}>About Us</a></li>
            <li><a href="#welcome" onClick={(e) => handleNavAnchor(e, '#welcome')}>Showcase</a></li>
            <li><a href="#mv" onClick={(e) => handleNavAnchor(e, '#mv')}>Mission/Vision</a></li>
            <li><a href="#directors" onClick={(e) => handleNavAnchor(e, '#directors')}>Directors</a></li>
            <li><a href="#company" onClick={(e) => handleNavAnchor(e, '#company')}>Company Info</a></li>
            <li><a href="#team" onClick={(e) => handleNavAnchor(e, '#team')}>Team</a></li>
            <li><a href="#facilities" onClick={(e) => handleNavAnchor(e, '#facilities')}>Facilities</a></li>
            <li><a href="#products" onClick={(e) => handleNavAnchor(e, '#products')}>Products</a></li>
            <li>
              <NavLink 
                to="/wholesale" 
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.activeLink : ''}`}
                onClick={closeMenu}
              >
                Wholesale
              </NavLink>
            </li>
            <li><a href="#services" onClick={(e) => handleNavAnchor(e, '#services')}>Services</a></li>
            <li>
              <a 
                href="#contact" 
                className={styles.navcta} 
                onClick={(e) => handleNavAnchor(e, '#contact')}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
