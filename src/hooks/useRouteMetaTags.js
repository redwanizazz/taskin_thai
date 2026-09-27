import { useEffect } from 'react';

const PRODUCTION_DOMAIN = 'https://taskin-thai.vercel.app';
const DEFAULT_OG_IMAGE = `${PRODUCTION_DOMAIN}/images/hero-produce.jpg`;

/**
 * Sets per-route SEO meta tags on mount and restores previous values on unmount.
 * Replicates the pattern established in Wholesale.jsx but as a reusable hook.
 *
 * @param {{ title: string, description: string, path?: string, ogImage?: string }} opts
 */
export function useRouteMetaTags({ title, description, path = '', ogImage = DEFAULT_OG_IMAGE }) {
  useEffect(() => {
    // Save previous values
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

    // Set new values
    document.title = title;
    if (descMeta) descMeta.setAttribute('content', description);
    if (ogTitleMeta) ogTitleMeta.setAttribute('content', title);
    if (ogDescMeta) ogDescMeta.setAttribute('content', description);
    if (ogUrlMeta) ogUrlMeta.setAttribute('content', `${PRODUCTION_DOMAIN}${path}`);
    if (ogImageMeta) ogImageMeta.setAttribute('content', ogImage);

    // Restore on unmount
    return () => {
      document.title = prevTitle;
      if (descMeta && prevDesc) descMeta.setAttribute('content', prevDesc);
      if (ogTitleMeta && prevOgTitle) ogTitleMeta.setAttribute('content', prevOgTitle);
      if (ogDescMeta && prevOgDesc) ogDescMeta.setAttribute('content', prevOgDesc);
      if (ogUrlMeta && prevOgUrl) ogUrlMeta.setAttribute('content', prevOgUrl);
      if (ogImageMeta && prevOgImage) ogImageMeta.setAttribute('content', prevOgImage);
    };
  }, [title, description, path, ogImage]);
}
