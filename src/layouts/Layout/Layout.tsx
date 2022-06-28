import cn from 'clsx';
import s from './Layout.module.css';
import { Footer, GlobalNavigationBar } from '@components/common';
import React from 'react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn(s.root)}>
      <GlobalNavigationBar />
      <main className="fit">{children}</main>
      <Footer />
    </div>
  );
};
