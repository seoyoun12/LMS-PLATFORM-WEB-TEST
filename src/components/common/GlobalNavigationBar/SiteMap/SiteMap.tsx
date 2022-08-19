import { logout } from '@common/api';
import { courseType } from '@common/api/courseClass';
import { regCategoryType, UserRole } from '@common/api/user';
import { userInfo } from '@common/recoil';
import styled from '@emotion/styled';
import { useIsLoginStatus } from '@hooks/useIsLoginStatus';
import { AppBar, Box } from '@mui/material';
import styles from '@styles/common.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const moveLinkList = [
  {
    name: '운수종사자',
    href: '/category',
    type: courseType.TYPE_TRANS_WORKER,
    regCategory: regCategoryType.TYPE_TRANS_EDU,
  },
  {
    name: '저상버스 운전자',
    href: '/category',
    type: courseType.TYPE_LOW_FLOOR_BUS,
    regCategory: regCategoryType.TYPE_TRANS_EDU,
  },
  {
    name: '도민교통',
    href: '/traffic/category',
    type: courseType.TYPE_PROVINCIAL,
    regCategory: regCategoryType.TYPE_TRAFFIC_SAFETY_EDU,
  },
];

const hideNavList = [
  // { href: '/course/[courseSeq]' },
  { href: '/admin-center' },
  // { href: '/'}
];

export function SiteMap() {
  const router = useRouter();
  const isLogin = useIsLoginStatus();
  const [isHideNavbar, setIsHideNavbar] = useState(false);
  const [userInfoData, setUserInfoData] = useRecoilState(userInfo);

  useEffect(() => {
    if (router.route === '/') {
      setIsHideNavbar(true);
    } else {
      const hide = hideNavList.some(e => router.route.includes(e.href));
      setIsHideNavbar(hide);
    }
  }, [router]);

  const onClickMoveSite = async (item: { name: string; href: string; type: courseType; regCategory: regCategoryType }) => {
    const isEqual = userInfoData.regCategory.includes(item.regCategory);

    if (userInfoData.role.includes(UserRole.ROLE_ADMIN)) return router.push(item.href);

    if (isLogin && !isEqual) {
      console.log('이퀄', isEqual, userInfoData.regCategory, item.regCategory);

      const isConfirm = window.confirm('정말로 이동하시겠습니까? 로그아웃됩니다.');
      try {
        if (!isConfirm) return;
        await logout();
        router.push(item.href);
        localStorage.setItem('site_course_type', item.type);
        return;
      } catch (e: any) {
        window.alert(e.data.message);
      }
    }
    router.push(item.href);
    localStorage.setItem('site_course_type', item.type);
  };

  if (isHideNavbar) return null; // 추가
  return (
    <SiteMapWrap>
      <Header className={styles.globalContainer}>
        {moveLinkList.map(item => (
          <HeaderItem
            key={item.name}
            onClick={() => {
              onClickMoveSite(item);
            }}
          >
            {item.name}
          </HeaderItem>
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
