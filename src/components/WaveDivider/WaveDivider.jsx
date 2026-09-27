import React from 'react';
import styles from './WaveDivider.module.css';

const WaveDivider = ({ fill = '#faf8f2', variant = 'down', bg }) => {
  const isUp = variant === 'up';
  
  return (
    <div 
      className={styles.waveDivider}
      style={bg ? { backgroundColor: bg } : undefined}
    >
      <svg 
        viewBox="0 0 1200 60" 
        preserveAspectRatio="none" 
        className={styles.waveSvg}
        aria-hidden="true"
      >
        <path 
          d={isUp 
            ? "M0,30 C300,0 900,60 1200,30 L1200,60 L0,60 Z" 
            : "M0,30 C300,60 900,0 1200,30 L1200,60 L0,60 Z"} 
          fill={fill} 
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
