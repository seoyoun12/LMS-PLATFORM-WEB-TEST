import styled from '@emotion/styled';
import { AppBar, Box } from '@mui/material';
import styles from '@styles/common.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const moveLinkList = [
  { name: '운수종사자', href: '/category' },
  { name: '저상버스 운전자', href: '/category' },
  { name: '도민교통', href: '/traffic/category' },
];

const hideNavList = [
  // { href: '/course/[courseSeq]' },
  { href: '/admin-center' },
  // { href: '/'}
];

export function SiteMap() {
  const router = useRouter();
  const [isHideNavbar, setIsHideNavbar] = useState(false);

  useEffect(() => {
    if (router.route === '/') {
      setIsHideNavbar(true);
    } else {
      const hide = hideNavList.some(e => router.route.includes(e.href));
      setIsHideNavbar(hide);
    }
  }, [router]);

  if (isHideNavbar) return null; // 추가
  return (
    <SiteMapWrap>
      <Header className={styles.globalContainer}>
        {moveLinkList.map(item => (
          <Link key={item.name} href={item.href}>
            <HeaderItem>{item.name}</HeaderItem>
          </Link>
        ))}
      </Header>
    </SiteMapWrap>
  );
}
const SiteMapWrap = styled(Box)`
  background: #256aef;
`;
const Header = styled.header`
  width: 100%;
  height: 100%;
  color: black;
  display: flex;
`;

const HeaderItem = styled(Box)`
  max-width: 140px;
  background: #fff;
  padding: 0.25rem 1rem;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
`;
