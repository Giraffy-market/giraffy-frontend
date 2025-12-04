'use client';

import { useEffect, useState } from 'react';

import { DesktopPopover } from './components/DesktopPopover/DesktopPopover';
import { MobilePopover } from './components/MobilePopover/MobilePopover';

import { Loader } from '@/ui/loader/Loader';

const DESKTOP_BREAKPOINT = 1280;

export const FiltersLayout = () => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (windowWidth === null) {
    return <Loader />;
  }

  if (windowWidth < DESKTOP_BREAKPOINT) {
    return <MobilePopover />;
  }

  return <DesktopPopover />;
};
