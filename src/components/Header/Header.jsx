import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
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
  const [activeSection, setActiveSection] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

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

  // 2. Active section tracking on Home route (/)
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sectionIds = [
      'about', 'mv', 'directors', 
      'company', 'team', 'facilities', 'products', 
      'services', 'contact'
    ];

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-20% 0px -55% 0px',
      threshold: 0.05,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  // 3. Click outside handler to close open desktop dropdowns
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

  const handleNavAnchor = (e, hash) => {
    closeAll();
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', hash);
      }
    } else {
      navigate(`/${hash}`);
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

  // Active status checks
  const isAboutActive = location.pathname === '/' && [
    'about', 'mv', 'directors', 'company', 'team', 'facilities'
  ].includes(activeSection);

  const isProductsActive = location.pathname === '/' && activeSection === 'products';

  const isServicesActive = location.pathname === '/' && activeSection === 'services';
  const isWholesaleActive = location.pathname === '/wholesale';

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
            {/* 1. ABOUT DROPDOWN */}
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
                {ABOUT_ITEMS.map((item, idx) => (
                  <a
                    key={item.hash}
                    href={item.hash}
                    role="menuitem"
                    className={`${styles.dropdownItem} ${activeSection === item.hash.replace('#', '') ? styles.dropdownItemActive : ''}`}
                    onClick={(e) => handleNavAnchor(e, item.hash)}
                    onKeyDown={(e) => handleItemKeyDown(e, 'about', idx, ABOUT_ITEMS.length, aboutTriggerRef, aboutMenuRef)}
                  >
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </li>

            {/* 2. PRODUCTS DIRECT ANCHOR LINK */}
            <li>
              <a 
                href="#products" 
                className={`${styles.navItem} ${isProductsActive ? styles.activeLink : ''}`}
                onClick={(e) => handleNavAnchor(e, '#products')}
              >
                Products
              </a>
            </li>

            {/* 3. WHOLESALE DIRECT ROUTE LINK */}
            <li>
              <NavLink 
                to="/wholesale" 
                className={({ isActive }) => `${styles.navItem} ${isActive || isWholesaleActive ? styles.activeLink : ''}`}
                onClick={closeAll}
              >
                Wholesale
              </NavLink>
            </li>

            {/* 4. SERVICES DIRECT ANCHOR LINK */}
            <li>
              <a 
                href="#services" 
                className={`${styles.navItem} ${isServicesActive ? styles.activeLink : ''}`}
                onClick={(e) => handleNavAnchor(e, '#services')}
              >
                Services
              </a>
            </li>

            {/* 5. CONTACT US CTA BUTTON */}
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
