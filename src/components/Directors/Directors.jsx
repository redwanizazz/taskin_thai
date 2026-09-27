import React from 'react';
import styles from './Directors.module.css';
import { directors } from '../../data/directors';

const Directors = () => {
  return (
    <section id="directors" className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.sectionHead} reveal`}>
          <h2 className={styles.h2}>Directors' Welcome Message</h2>
        </div>
        <div className={styles.directorsGrid}>
          {directors.map((director, index) => (
            <div key={index} className={`${styles.welcomeCard} reveal`}>
              <div className={styles.profile}>
                <div className={styles.imageWrapper}>
                  <img 
                    src={director.photo || director.image} 
                    alt={`${director.name}, ${director.role}`} 
                    className={styles.image} 
                  />
                </div>
                <h3 className={styles.name}>{director.name}</h3>
                <p className={styles.role}>{director.role}</p>
              </div>
              <div className={styles.welcomeCopy}>
                {director.messages.map((msg, idx) => (
                  <p key={idx} className={styles.message}>{msg}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Directors;
