import dynamic from 'next/dynamic';

export const MobileNav = dynamic(() => import(`./MobileNav`), { ssr: false });
