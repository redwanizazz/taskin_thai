import React from 'react';
import styles from './Services.module.css';
import { services } from '../../data/services';

const Services = () => {
  const getBorderColorClass = (index) => {
    const classes = [styles.borderRust, styles.borderOlive, styles.borderMango, styles.borderOliveLight];
    return classes[index % classes.length];
  };

  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.sectionHead} reveal`}>
          <h2 className={styles.h2}>Our Service</h2>
        </div>
        <div className={styles.servGrid}>
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`${styles.serviceCard} ${styles.tiltHover} reveal ${getBorderColorClass(index)}`}
            >
              <span className={styles.num}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.h4}>{service.title}</h3>
              <p className={styles.desc}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.leafPattern}></div>
      <div className={styles.dotgrid}></div>
    </section>
  );
};

export default Services;
