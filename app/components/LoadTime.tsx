'use client';

import React, { useEffect, useState } from 'react';

export default function LoadTimeTracker() {
  const [loadTime, setLoadTime] = useState<number | null>(null);

  useEffect(() => {
    const handleLoad = () => {
      if (performance.getEntriesByType) {
        const [navigationEntry] = performance.getEntriesByType('navigation');

        if (navigationEntry) {
          const loadDuration = performance.now() - navigationEntry.startTime;
          setLoadTime(loadDuration);
        }
      }
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    loadTime !== null && (
      <div className="fixed bottom-4 right-4 text-xl text-red-800 dark:text-red-400">
        Page load time: {(loadTime / 1000).toFixed(3)} s
      </div>
    )
  );
}
