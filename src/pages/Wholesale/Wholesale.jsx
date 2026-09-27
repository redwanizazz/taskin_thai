import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Wholesale.module.css';
import WaveDivider from '../../components/WaveDivider/WaveDivider.jsx';

const Wholesale = () => {
  useEffect(() => {
    const prevTitle = document.title;
    const descMeta = document.querySelector('meta[name="description"]');
    const prevDesc = descMeta?.getAttribute('content') || '';
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    const prevOgTitle = ogTitleMeta?.getAttribute('content') || '';
    const ogDescMeta = document.querySelector('meta[property="og:description"]');
    const prevOgDesc = ogDescMeta?.getAttribute('content') || '';
    const ogUrlMeta = document.querySelector('meta[property="og:url"]');
    const prevOgUrl = ogUrlMeta?.getAttribute('content') || '';
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    const prevOgImage = ogImageMeta?.getAttribute('content') || '';

    document.title = 'Wholesale Produce Supply & Commercial Distribution | Taskin Thai Malaysia';
    if (descMeta) {
      descMeta.setAttribute(
        'content',
        'B2B fresh produce and commercial wholesale supply by Taskin Thai Vegetables & Fruits Sdn Bhd, based in Batu Caves, Selangor. Supplying fresh vegetables and fruits to commercial and retail partners across Malaysia.'
      );
    }
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute(
        'content',
        'Wholesale Produce Supply & Commercial Distribution | Taskin Thai Malaysia'
      );
    }
    if (ogDescMeta) {
      ogDescMeta.setAttribute(
        'content',
        'B2B fresh produce and commercial wholesale supply by Taskin Thai Vegetables & Fruits Sdn Bhd, based in Batu Caves, Selangor. Supplying fresh vegetables and fruits to commercial and retail partners across Malaysia.'
      );
    }
    if (ogUrlMeta) {
      ogUrlMeta.setAttribute('content', 'https://taskin-thai.vercel.app/wholesale');
    }
    if (ogImageMeta) {
      ogImageMeta.setAttribute('content', 'https://taskin-thai.vercel.app/images/hero-produce.jpg');
    }

    return () => {
      document.title = prevTitle;
      if (descMeta && prevDesc) descMeta.setAttribute('content', prevDesc);
      if (ogTitleMeta && prevOgTitle) ogTitleMeta.setAttribute('content', prevOgTitle);
      if (ogDescMeta && prevOgDesc) ogDescMeta.setAttribute('content', prevOgDesc);
      if (ogUrlMeta && prevOgUrl) ogUrlMeta.setAttribute('content', prevOgUrl);
      if (ogImageMeta && prevOgImage) ogImageMeta.setAttribute('content', prevOgImage);
    };
  }, []);

  // Real factual stats from Taskin Thai's company and facility data
  const wholesaleStats = [
    { value: '26+', label: 'Produce Categories' },
    { value: '10+', label: 'Refrigerated Lorries & Fleet' },
    { value: '3', label: 'Selangor Hubs & Facilities' },
    { value: '2022', label: 'SSM Registered Company' },
  ];

  // 4 Wholesale Feature Cards grounded in Taskin Thai's real operations
  const featureCards = [
    {
      img: '/images/facility-18.jpg',
      alt: 'Taskin Thai bulk vegetable and produce storage at warehouse',
      tag: 'Direct Farm Sourcing',
      heading: 'Thai Import & Local Produce Sourcing',
      desc: 'Consistent wholesale supply of Thai and domestic vegetables, chilis, leafy greens, and root crops sourced directly from vetted agricultural growers.',
      linkText: 'Explore 26+ Produce Categories →',
      linkTo: '/products',
    },
    {
      img: '/images/facility-5.jpg',
      alt: 'Taskin Thai warehouse pallets and commercial produce packaging',
      tag: 'Flexible Packaging',
      heading: 'Guni Bags, Crates & Custom Bulk Packs',
      desc: 'Tailored commercial packaging options from traditional 10kg/20kg guni sacks to heavy-duty ventilated crates and bulk cartons configured to your operations.',
      linkText: 'Inquire About Packaging →',
      linkTo: '/contact',
    },
    {
      img: '/images/facility-3.jpg',
      alt: 'Taskin Thai cold storage chillers and temperature-controlled shelving',
      tag: 'Cold Chain Assurance',
      heading: '24/7 Cold Storage & SSM Compliance',
      desc: 'Round-the-clock temperature-regulated chiller rooms at our Selayang Indah HQ, backed by SSM incorporation (1485173-X) and MPS municipal licensing.',
      linkText: 'View Corporate Credentials →',
      linkTo: '/about#company',
    },
    {
      img: '/images/facility-6.jpg',
      alt: 'Taskin Thai refrigerated delivery container fleet and transport lorries',
      tag: 'Logistics & Transport',
      heading: 'Daily Deliveries via Dedicated Lorry Fleet',
      desc: 'Scheduled daily morning deliveries across Klang Valley, Selangor commercial hubs, and inter-state distribution corridors operated by our dedicated transport drivers.',
      linkText: 'Arrange Delivery Schedule →',
      linkTo: '/contact',
    },
  ];

  // 4-step procurement process adapted to Taskin Thai's wholesale workflow
  const processSteps = [
    {
      num: '01',
      title: 'Share Your Requirements',
      desc: 'Specify your requested produce varieties, volume estimates, preferred packaging (guni/crates), and recurring delivery cadence via our online form or direct phone line.',
    },
    {
      num: '02',
      title: 'Daily Market-Grounded Quote',
      desc: 'Our wholesale desk reviews current farm gate market prices and cold-room inventory to provide a competitive, transparent, itemized quotation within 24 hours.',
    },
    {
      num: '03',
      title: 'Cold-Room Sorting & Inspection',
      desc: 'Upon order confirmation, your produce is thoroughly graded for freshness, securely packed, and staged in our chillers ready for temperature-controlled transport.',
    },
    {
      num: '04',
      title: 'Scheduled Dispatch & Delivery',
      desc: 'Our dedicated refrigerated lorry fleet delivers directly to your loading dock, store, or warehouse with verified consignment notes and full quality sign-off.',
    },
  ];

  return (
    <div className={styles.wholesalePage}>
      {/* 1. HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.dotgrid} aria-hidden="true"></div>
        <div className={styles.container}>
          <div className={`${styles.heroContent} reveal`}>
            <span className={styles.eyebrow}>Wholesale & Commercial Supply</span>
            <h1 className={styles.heroTitle}>
              Direct Farm Fresh Produce for Commercial Supply <em className={styles.emStyled}>Across Malaysia.</em>
            </h1>
            <p className={styles.heroLede}>
              Taskin Thai Vegetables & Fruits Sdn. Bhd. partners with supermarket chains, wholesale wet markets, commercial kitchens, and catering providers. We deliver harvest-fresh Thai imports and local vegetables in high volumes with verified cold-chain integrity and daily scheduled dispatch.
            </p>
            <div className={styles.heroCtas}>
              <Link to="/contact" className={styles.btnPrimary}>
                Start an Enquiry
              </Link>
              <Link to="/products" className={styles.btnOutline}>
                Review Our Range
              </Link>
            </div>
          </div>

          {/* 4-Stat Row Beneath */}
          <div className={`${styles.statsRow} reveal`}>
            {wholesaleStats.map((st, idx) => (
              <div key={idx} className={styles.statCard}>
                <span className={styles.statVal}>{st.value}</span>
                <span className={styles.statLabel}>{st.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#ffffff" bg="#FAF8F2" />

      {/* 2. 4-CARD FEATURE GRID */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={`${styles.sectionHead} reveal`}>
            <span className={styles.eyebrow}>Wholesale Capabilities</span>
            <h2>Engineered For Commercial Supply</h2>
            <p>
              From farm gate to your loading bay, our infrastructure is built to support high-volume commercial produce requirements with zero compromises on freshness.
            </p>
          </div>

          <div className={styles.featureGrid}>
            {featureCards.map((card, idx) => (
              <div key={idx} className={`${styles.featureCard} reveal`}>
                <div className={styles.cardImgWrap}>
                  <img src={card.img} alt={card.alt} loading="lazy" />
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.cardTag}>{card.tag}</span>
                  <h3 className={styles.cardHeading}>{card.heading}</h3>
                  <p className={card.desc ? styles.cardDesc : ''}>{card.desc}</p>
                  <Link to={card.linkTo} className={styles.cardLink}>
                    {card.linkText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#EFEADB" variant="up" bg="#ffffff" />

      {/* 3. 4-STEP "HOW IT WORKS" PROCESS SECTION */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={`${styles.sectionHead} reveal`}>
            <span className={styles.eyebrow}>Procurement Workflow</span>
            <h2>How Wholesale Ordering Works</h2>
            <p>
              A straightforward, transparent 4-step workflow designed to get fresh commercial produce into your operations quickly and reliably.
            </p>
          </div>

          <div className={styles.processGrid}>
            {processSteps.map((step, idx) => (
              <div key={idx} className={`${styles.processCard} reveal`}>
                <div className={styles.stepNum}>{step.num}</div>
                <h3 className={styles.stepHeading}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#3F4B27" bg="#EFEADB" />

      {/* 4. CLOSING CTA BLOCK */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={`${styles.ctaCard} reveal`}>
            <span className={styles.ctaEyebrow}>Direct Contact & Custom Supply</span>
            <h2 className={styles.ctaTitle}>Ready to Discuss Wholesale Supply?</h2>
            <p className={styles.ctaDesc}>
              Partner with Taskin Thai for dependable wholesale volume, competitive rates, and farm-fresh consistency delivered straight to your door. Get in touch with our commercial sales desk today.
            </p>

            <div className={styles.directContacts}>
              <a href="tel:0361283831" className={styles.contactBox}>
                <div className={styles.contactIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <span className={styles.contactLabel}>Call Our Wholesale Desk</span>
                <span className={styles.contactVal}>03-6128 3831</span>
              </a>

              <a href="mailto:taskinthai503@gmail.com" className={styles.contactBox}>
                <div className={styles.contactIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <span className={styles.contactLabel}>Email Us Directly</span>
                <span className={styles.contactVal}>taskinthai503@gmail.com</span>
              </a>

              <div className={styles.contactBox}>
                <div className={styles.contactIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <span className={styles.contactLabel}>HQ Warehouse</span>
                <span className={styles.contactVal}>Taman Perindustrian Selayang Indah, Batu Caves</span>
              </div>
            </div>

            <div className={styles.ctaActions}>
              <Link to="/contact" className={styles.ctaSubmitBtn}>
                Submit Wholesale Enquiry
              </Link>
              <a href="tel:0361283831" className={styles.ctaCallBtn}>
                Call 03-6128 3831
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WaveDivider transitioning smoothly into the #2C3419 Footer */}
      <WaveDivider fill="#2C3419" variant="up" bg="#3F4B27" />
    </div>
  );
};

export default Wholesale;
