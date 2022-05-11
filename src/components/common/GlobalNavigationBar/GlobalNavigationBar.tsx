import { HeaderBar } from '@components/common/GlobalNavigationBar/HeaderBar';
import { NavBar } from '@components/common/GlobalNavigationBar/NavBar';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const hideNavList = [
  { href: '/course/[courseId]' },
  { href: '/tutor-center' }
];

export function GlobalNavigationBar() {
  const router = useRouter();
  const [ isHideNavbar, setIsHideNavbar ] = useState(false);

  useEffect(
    () => {
      const hide = hideNavList.some(e => router.route.includes(e.href));
      setIsHideNavbar(hide);
    },
    [ router ]
  );

  return (
    <GlobalNavigationContainer>
      <HeaderBar />
      {isHideNavbar || <NavBar />}
    </GlobalNavigationContainer>
  );
}

const GlobalNavigationContainer = styled.div`
  border-radius: 0;
  width: 100%;
  height: auto;
  background-color: #FFFFFF;
  border-color: #E5E5E5;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 9999;
  box-shadow: rgb(0 0 0 / 12%) 0 1px 0 0;
`;
