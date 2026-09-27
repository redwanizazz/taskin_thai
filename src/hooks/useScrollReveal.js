import { useEffect, useRef } from 'react';

/**
 * Global scroll-reveal hook.
 * Sets up an IntersectionObserver that observes all elements with the "reveal" class,
 * automatically picking up lazy-loaded sections via MutationObserver.
 * Matches the original prototype's document.querySelectorAll('.reveal') pattern.
 */
export function useScrollReveal(options = {}) {
  useEffect(() => {
    const threshold = options.threshold ?? 0.12;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    const observeReveals = () => {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
        observer.observe(el);
      });
    };

    // Observe currently mounted reveal elements
    observeReveals();

    // Automatically observe newly mounted reveal elements as lazy sections load
    const mutationObserver = new MutationObserver(() => {
      observeReveals();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [options.threshold]);
}

/**
 * Custom hook for animated count-up on scroll.
 */
export function useCountUp(targetValue, options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = parseInt(targetValue, 10);
            let cur = target > 100 ? target - 40 : 0;
            const step = Math.max(1, Math.ceil((target - cur) / 40));

            const tick = () => {
              cur += step;
              if (cur >= target) {
                el.textContent = target;
                return;
              }
              el.textContent = cur;
              requestAnimationFrame(tick);
            };
            tick();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: options.threshold ?? 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetValue, options.threshold]);

  return ref;
}
