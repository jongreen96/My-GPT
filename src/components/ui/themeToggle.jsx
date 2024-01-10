'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggleButton({ className }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When the component is mounted, we'll set the mounted state to true
  useEffect(() => setMounted(true), []);

  // If the component is not mounted, don't render anything
  if (!mounted) {
    return null;
  }

  return (
    <Button
      size='icon'
      variant='shadow'
      onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
      className={className}
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
      <span className='sr-only'>Toggle Theme</span>
    </Button>
  );
}
