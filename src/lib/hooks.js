import { useEffect, useState } from 'react';

export function IsDesktop() {
  'use client';

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = (e) => {
      setIsDesktop(e.matches);
    };

    const mediaQuery = window.matchMedia('(min-width: 768px)');
    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return isDesktop;
}
