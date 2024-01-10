'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggleButton({ className }) {
  const { theme, setTheme } = useTheme();

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
