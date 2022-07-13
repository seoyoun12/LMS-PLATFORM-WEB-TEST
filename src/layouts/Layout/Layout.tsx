import cn from 'clsx';
import s from './Layout.module.css';
import { Footer, GlobalNavigationBar } from '@components/common';
import React from 'react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  // console.log("니 인마 어 내가 너거 서장이랑 밥도먹고 어?")
  return (
    <div className={cn(s.root)}>
      <GlobalNavigationBar />
      <main className="fit">{children}</main>
      <Footer />
    </div>
  );
};
