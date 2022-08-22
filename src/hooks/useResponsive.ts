import React, { useEffect, useState } from 'react';

export default function useResponsive(defaultValue = 768) {
  const [isDesktop, setDesktop] = useState(
    typeof window !== 'undefined' && window.innerWidth >= defaultValue ? true : false
  );
  const reloadWidthHandle = () => {
    if (window.innerWidth >= defaultValue) setDesktop(true);
    if (window.innerWidth < defaultValue) setDesktop(false);
  };
  useEffect(() => {
    window.addEventListener('resize', reloadWidthHandle);
    return () => {
      window.removeEventListener('resize', reloadWidthHandle);
    };
  }, []);
  return isDesktop;
}
