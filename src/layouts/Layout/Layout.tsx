import cn from 'clsx';
import s from './Layout.module.css';
import { Footer, GlobalNavigationBar } from '@components/common';

export const Layout: React.FC = ({ children }) => {
  return (
    <div className={cn(s.root)}>
      <GlobalNavigationBar/>
      <main className="fit">{children}</main>
      <Footer/>
    </div>
  );
};
