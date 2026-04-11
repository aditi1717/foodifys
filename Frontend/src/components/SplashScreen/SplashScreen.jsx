import { useState, useEffect } from 'react';
import styles from './SplashScreen.module.css';

// Import full screen splash video
import splashVideo from '../../assets/Video Project 2.mp4';

/**
 * SplashScreen — App launch screen.
 * Displays a full screen video without any location icon overlay.
 *
 * @param {Function} onFinish      - Called when splash animation completes
 * @param {Function} onPinLaunched - Keep prop but left unused since we removed the flying icon
 */
function SplashScreen({ onFinish, onPinLaunched }) {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Show the splash video for 3.2 seconds
    const t1 = setTimeout(() => setIsFading(true), 3200);
    
    // Complete the splash phase after fade transition ends (0.5s later)
    const t2 = setTimeout(() => {
      onFinish?.();
    }, 3700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onFinish]);

  return (
    <div className={`${styles.splashRoot} ${isFading ? styles.fadeOut : ''}`}>
      <video
        className={styles.videoBg}
        src={splashVideo}
        autoPlay
        muted
        playsInline
      />
    </div>
  );
}

export default SplashScreen;
