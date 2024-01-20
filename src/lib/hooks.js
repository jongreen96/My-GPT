import { useEffect, useState } from 'react';

export function IsDesktop() {
  const [isDesktop, setIsDesktop] = useState(null);

  useEffect(() => {
    setIsDesktop(
      typeof window !== 'undefined'
        ? window.matchMedia('(min-width: 640px)').matches
        : null,
    );

    if (typeof window !== 'undefined') {
      const handleResize = (e) => {
        setIsDesktop(e.matches);
      };

      const mediaQuery = window.matchMedia('(min-width: 640px)');
      mediaQuery.addEventListener('change', handleResize);

      return () => {
        mediaQuery.removeEventListener('change', handleResize);
      };
    }
  }, []);

  return isDesktop;
}
