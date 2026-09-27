import React from 'react';
import styles from './MissionVision.module.css';

const MissionVision = () => {
  return (
    <section id="mv" className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.sectionHead} reveal`}>
          <span className={styles.eyebrow}>03 / 04 — What drives us</span>
          <h2 className={styles.h2}>Mission & Vision</h2>
          <p className={styles.mutedP}>Guiding principles for a sustainable future in agriculture.</p>
        </div>
        <div className={styles.mvGrid}>
          <div className={`${styles.card} reveal`}>
            <span className={styles.cardEyebrow}>Our mission</span>
            <h3 className={styles.h3}>Purpose</h3>
            <p className={styles.paragraph}>
              To consistently provide superior quality fruits, vegetables, and food products globally. We prioritize customer satisfaction through meticulous sourcing, rigorous quality control, and efficient distribution channels. Committed to promoting healthy lifestyles, we offer diverse, nutritious, and delicious products while adopting eco-friendly practices. Upholding integrity and ethical business standards, we build enduring relationships with customers, suppliers, and communities. Driven by excellence and innovation, we adapt to market trends, delivering value to stakeholders and making a positive societal and environmental impact.
            </p>
          </div>
          <div className={`${styles.card} reveal`}>
            <span className={styles.cardEyebrow}>Our vision</span>
            <h3 className={styles.h3}>Direction</h3>
            <ol className={styles.list}>
              <li>To become the premier global provider of high-quality fruits, vegetables, and food products.</li>
              <li>Set industry standards for excellence in sourcing, exporting, and importing practices.</li>
              <li>Ensure customer satisfaction by delivering fresh, flavorful, and nutritious products.</li>
              <li>Embrace innovation and technology to enhance product quality and efficiency.</li>
              <li>Promote sustainability throughout our supply chain, fostering environmental stewardship.</li>
            </ol>
          </div>
        </div>
      </div>
      <div className={styles.dotgrid}></div>
    </section>
  );
};

export default MissionVision;
