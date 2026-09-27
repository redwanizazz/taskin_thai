import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollManager handles two critical routing behaviors:
 * 1. Resets scroll to top (0, 0) immediately whenever navigating to a new route without a hash.
 * 2. When a hash is present (e.g. /#contact, /#about, /#products), smoothly scrolls to the target
 *    element once mounted in the DOM, and uses ResizeObserver on document.body to continuously
 *    re-align to the target as lazy-loaded Suspense chunks and images expand the page height.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace(/^#/, '');

      const scrollToTarget = () => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };

      // Attempt immediate scroll
      scrollToTarget();

      // As lazy components and images mount, document.body resizes.
      // Re-align to target on every layout expansion.
      let resizeTimer = null;
      let userInteracted = false;

      const handleUserScroll = () => {
        userInteracted = true;
      };

      window.addEventListener('wheel', handleUserScroll, { passive: true, once: true });
      window.addEventListener('touchmove', handleUserScroll, { passive: true, once: true });

      const ro = new ResizeObserver(() => {
        if (userInteracted) return;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (!userInteracted) {
            scrollToTarget();
          }
        }, 50);
      });

      ro.observe(document.body);

      // Also set fallback poll timers
      const t1 = setTimeout(scrollToTarget, 150);
      const t2 = setTimeout(scrollToTarget, 400);
      const t3 = setTimeout(scrollToTarget, 800);
      const t4 = setTimeout(scrollToTarget, 1500);

      // Stop tracking after 3 seconds
      const stopTimer = setTimeout(() => {
        ro.disconnect();
        window.removeEventListener('wheel', handleUserScroll);
        window.removeEventListener('touchmove', handleUserScroll);
      }, 3000);

      return () => {
        clearTimeout(resizeTimer);
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(stopTimer);
        ro.disconnect();
        window.removeEventListener('wheel', handleUserScroll);
        window.removeEventListener('touchmove', handleUserScroll);
      };
    } else {
      // Route change with no hash: scroll immediately to top
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname, hash]);

  return null;
}
