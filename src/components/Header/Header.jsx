import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const ABOUT_ITEMS = [
  { label: 'About Us', hash: '#about' },
  { label: 'Mission & Vision', hash: '#mv' },
  { label: 'Directors', hash: '#directors' },
  { label: 'Company Info', hash: '#company' },
  { label: 'Our Team', hash: '#team' },
  { label: 'Facilities', hash: '#facilities' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'about' | null
  const location = useLocation();

  const aboutTriggerRef = useRef(null);
  const aboutMenuRef = useRef(null);
  const headerRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  // 1. Scroll listener for sticky header background styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Click outside handler to close open desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Menu and dropdown controllers
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeAll = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const handleDropdownToggle = (key) => {
    setOpenDropdown(prev => (prev === key ? null : key));
  };

  const handleMouseEnter = (key) => {
    if (window.innerWidth > 1080) {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      setOpenDropdown(key);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 1080) {
      hoverTimeoutRef.current = setTimeout(() => {
        setOpenDropdown(null);
      }, 150);
    }
  };

  const handleLogoClick = (e) => {
    closeAll();
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAboutItemClick = (hash) => {
    closeAll();
    if (location.pathname === '/about') {
      const targetId = hash.replace(/^#/, '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Keyboard navigation helpers
  const handleTriggerKeyDown = (e, key, menuRef) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpenDropdown(key);
      setTimeout(() => {
        const firstLink = menuRef.current?.querySelector('a');
        if (firstLink) firstLink.focus();
      }, 50);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpenDropdown(null);
    }
  };

  const handleItemKeyDown = (e, key, index, totalItems, triggerRef, menuRef) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % totalItems;
      const links = menuRef.current?.querySelectorAll('a');
      if (links && links[nextIndex]) links[nextIndex].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + totalItems) % totalItems;
      const links = menuRef.current?.querySelectorAll('a');
      if (links && links[prevIndex]) links[prevIndex].focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpenDropdown(null);
      triggerRef.current?.focus();
    } else if (e.key === 'Tab') {
      if (!e.shiftKey && index === totalItems - 1) {
        setOpenDropdown(null);
      } else if (e.shiftKey && index === 0) {
        setOpenDropdown(null);
      }
    }
  };

  // Active status checks based on current route pathname
  const isAboutActive = location.pathname === '/about';

  return (
    <header ref={headerRef} className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
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
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav>
          <ul className={`${styles.navlinks} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
            {/* 1. ABOUT DROPDOWN (Deep links into /about) */}
            <li 
              className={`${styles.dropdownParent} ${openDropdown === 'about' ? styles.dropdownOpen : ''}`}
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                ref={aboutTriggerRef}
                className={`${styles.navTrigger} ${isAboutActive ? styles.activeLink : ''}`}
                onClick={() => handleDropdownToggle('about')}
                onKeyDown={(e) => handleTriggerKeyDown(e, 'about', aboutMenuRef)}
                aria-haspopup="true"
                aria-expanded={openDropdown === 'about'}
              >
                <span>About</span>
                <svg className={`${styles.chevron} ${openDropdown === 'about' ? styles.chevronUp : ''}`} width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div 
                ref={aboutMenuRef} 
                className={`${styles.dropdownMenu} ${openDropdown === 'about' ? styles.mobileDropdownOpen : ''}`}
                role="menu"
              >
                {ABOUT_ITEMS.map((item, idx) => {
                  const isItemActive = isAboutActive && location.hash === item.hash;
                  return (
                    <Link
                      key={item.hash}
                      to={`/about${item.hash}`}
                      role="menuitem"
                      className={`${styles.dropdownItem} ${isItemActive ? styles.dropdownItemActive : ''}`}
                      onClick={() => handleAboutItemClick(item.hash)}
                      onKeyDown={(e) => handleItemKeyDown(e, 'about', idx, ABOUT_ITEMS.length, aboutTriggerRef, aboutMenuRef)}
                    >
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </li>

            {/* 2. PRODUCTS DIRECT ROUTE LINK */}
            <li>
              <NavLink 
                to="/products" 
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.activeLink : ''}`}
                onClick={closeAll}
              >
                Products
              </NavLink>
            </li>

            {/* 3. WHOLESALE DIRECT ROUTE LINK */}
            <li>
              <NavLink 
                to="/wholesale" 
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.activeLink : ''}`}
                onClick={closeAll}
              >
                Wholesale
              </NavLink>
            </li>

            {/* 4. SERVICES DIRECT ROUTE LINK */}
            <li>
              <NavLink 
                to="/services" 
                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.activeLink : ''}`}
                onClick={closeAll}
              >
                Services
              </NavLink>
            </li>

            {/* 5. CONTACT US CTA BUTTON */}
            <li>
              <NavLink 
                to="/contact" 
                className={styles.navcta} 
                onClick={closeAll}
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
