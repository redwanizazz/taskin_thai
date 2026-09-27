import React from 'react';
import styles from './CompanyInfo.module.css';
import { useLightbox } from '../../hooks/useLightbox';
import { companyDetails } from '../../data/companyInfo';
import { documents } from '../../data/documents';

const CompanyInfo = () => {
  const { openLightbox } = useLightbox();

  return (
    <section id="company" className={`${styles.company} section`}>
      <div className={styles.container}>
        <div className="section-head center reveal">
          <span className="eyebrow">05 &mdash; Corporate details</span>
          <h2>Company Information</h2>
        </div>
        
        <div className={`${styles.infoPanel} reveal delay-1`}>
          <div className={styles.infoSide}>
            <h3>Registered & Trusted</h3>
            <p>Taskin Thai SDN. BHD. is a fully registered private limited company operating under the strict regulations and guidelines of the Companies Commission of Malaysia (SSM).</p>
            <p>Our commitment to transparency, legal compliance, and ethical business practices ensures a reliable and trustworthy partnership for our clients across the nation.</p>
            <div className={styles.certBadge}>
              &#10003; SSM Registered Private Limited Company
            </div>
          </div>
          <div className={styles.infoTable}>
            <dl>
              {companyDetails.map((detail, index) => (
                <div className={styles.infoRow} key={index}>
                  <dt>{detail.label}</dt>
                  <dd>{detail.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className={styles.documentsSection}>
          <div className={`${styles.docsHead} reveal delay-2`}>
            <h3>Official Documents & Licenses</h3>
            <p>Click any document to view it full size</p>
          </div>
          <div className={styles.docsGrid}>
            {documents.map((doc, index) => (
              <div 
                className={`${styles.docCard} reveal delay-${(index % 3) + 3}`} 
                key={index}
                role="button"
                tabIndex={0}
                aria-label={`View document: ${doc.label} issued by ${doc.issuer}`}
                onClick={() => openLightbox(doc.src, doc.caption)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(doc.src, doc.caption);
                  }
                }}
              >
                <div className={styles.docThumb}>
                  <img src={doc.src} alt={`${doc.label} issued by ${doc.issuer}`} loading="lazy" />
                </div>
                <div className={styles.docInfo}>
                  <h4>{doc.label}</h4>
                  <span>{doc.issuer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;
