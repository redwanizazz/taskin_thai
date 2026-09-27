import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Services.module.css';
import { services } from '../../data/services';

const Services = ({ isTeaser = false }) => {
  // If teaser, show the 2 commercial engines (Import & Export, Wholesale Distribution)
  const displayedServices = isTeaser
    ? services.filter((s) => s.isTeaserFeatured)
    : services;

  const getBorderColorClass = (accent) => {
    switch (accent) {
      case 'rust':
        return styles.borderRust;
      case 'olive':
        return styles.borderOlive;
      case 'mango':
        return styles.borderMango;
      case 'oliveLight':
      default:
        return styles.borderOliveLight;
    }
  };

  const getStripColorClass = (accent) => {
    switch (accent) {
      case 'rust':
        return styles.stripRust;
      case 'olive':
        return styles.stripOlive;
      case 'mango':
        return styles.stripMango;
      case 'oliveLight':
      default:
        return styles.stripOliveLight;
    }
  };

  return (
    <section id="services" className={`${styles.section} ${isTeaser ? styles.teaserSection : ''}`}>
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={`${styles.sectionHead} reveal`}>
          <span className={styles.eyebrow}>
            {isTeaser ? 'Core Capabilities' : 'Operational Pillars'}
          </span>
          <h2 className={styles.h2}>
            {isTeaser ? 'Wholesale Supply & Global Logistics' : 'Our Services'}
          </h2>
          <p className={styles.sectionSubtitle}>
            {isTeaser
              ? 'Dependable bulk produce distribution, direct international sourcing, and cold-chain infrastructure for businesses across Malaysia.'
              : 'End-to-end commercial operations from direct farm sourcing and temperature-controlled storage to scheduled nationwide wholesale fulfillment.'}
          </p>
        </div>

        {/* Services Grid (2 cols on teaser, 4 cols on full page) */}
        <div className={`${isTeaser ? styles.teaserGrid : styles.servGrid} reveal`}>
          {displayedServices.map((service, index) => {
            const hasPhoto = Boolean(service.image);
            const borderClass = getBorderColorClass(service.accent);
            const stripClass = getStripColorClass(service.accent);

            return (
              <div
                key={service.num}
                className={`${styles.serviceCard} ${borderClass} ${isTeaser ? styles.teaserCard : ''}`}
              >
                {/* Card Header: Real Photo OR Clean Solid Accent Block */}
                <div className={styles.cardHeader}>
                  {hasPhoto ? (
                    <img
                      src={service.image}
                      alt={service.alt || service.title}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.solidAccentHeader} aria-hidden="true">
                      <div className={styles.solidAccentPattern} />
                      <svg
                        className={styles.shieldIcon}
                        width="46"
                        height="46"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                      <span className={styles.solidAccentBadge}>Standard Quality Verified</span>
                    </div>
                  )}

                  {/* Number Badge floating in header */}
                  <span className={styles.numBadge}>{service.num}</span>
                </div>

                {/* Accent line between header and card body */}
                <div className={`${styles.accentStrip} ${stripClass}`} />

                {/* Card Body */}
                <div className={styles.cardBody}>
                  <span className={styles.tag}>{service.tag}</span>
                  <h3 className={styles.h4}>{service.title}</h3>
                  <p className={styles.desc}>{service.description}</p>

                  {/* Capability Highlights */}
                  {service.highlights && service.highlights.length > 0 && (
                    <ul className={styles.highlightsList}>
                      {service.highlights.map((h, i) => (
                        <li key={i} className={styles.highlightItem}>
                          <svg
                            className={styles.checkIcon}
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Teaser CTA Button (Visible only on Homepage) */}
        {isTeaser && (
          <div className={`${styles.teaserFooter} reveal`}>
            <Link to="/services" className={styles.viewAllBtn}>
              <span>View All 4 Services & Quality Standards</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        )}

        {/* Full Page Bottom CTA (Visible only on /services) */}
        {!isTeaser && (
          <div className={`${styles.fullPageCta} reveal`}>
            <div className={styles.fullPageCtaText}>
              <h3 className={styles.fullPageCtaHeading}>Looking for a dependable fresh produce partner?</h3>
              <p className={styles.fullPageCtaDesc}>
                We supply supermarkets, wholesale wet markets, hotels, and restaurants with flexible delivery schedules.
              </p>
            </div>
            <Link to="/contact" className={styles.fullPageCtaBtn}>
              <span>Request a Quotation</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        )}
      </div>

      {/* Clean geometric dotgrid decoration (removed disconnected faint blob) */}
      <div className={styles.dotgrid} aria-hidden="true" />
    </section>
  );
};

export default Services;
