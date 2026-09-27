import React, { useState } from 'react';
import styles from './Team.module.css';
import { teamPhotos } from '../../data/team';
import { useLightbox } from '../../hooks/useLightbox';
import OrgChart from '../OrgChart/OrgChart';

const Team = () => {
  const { openLightbox } = useLightbox();

  return (
    <section id="team" className={styles.teamSection}>
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <h2 className={styles.title}>Our Team</h2>
        </div>

        <div className={styles.teamPhotos}>
          {teamPhotos.map((photo, index) => (
            <div 
              key={index} 
              className={styles.teamPhoto}
              role="button"
              tabIndex={0}
              aria-label={`View photo: ${photo.caption}`}
              onClick={() => openLightbox(photo.src, photo.caption)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(photo.src, photo.caption);
                }
              }}
            >
              <img src={photo.src} alt={photo.caption || `Taskin Thai team photo ${index + 1}`} />
            </div>
          ))}
        </div>

        <OrgChart />
      </div>
    </section>
  );
};

export default Team;
