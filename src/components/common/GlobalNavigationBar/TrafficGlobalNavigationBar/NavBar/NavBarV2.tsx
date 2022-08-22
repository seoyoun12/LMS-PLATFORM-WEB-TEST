import styled from '@emotion/styled';
import styles from '@styles/common.module.scss';
import { grey } from '@mui/material/colors';
import { Box, MenuItem } from '@mui/material';
import { Link } from '@components/common';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

const showRemoteList = [
  // { href: '/traffic/course/[courseSeq]' },
  // { href: '/traffic/admin-center' },
  { href: '/traffic/category' },
];

export const ProvintialHeaderList = [
  {
    category: '교육이용안내',
    href: '',
    items: [
      {
        title: '회원가입 및 로그인',
        href: '/traffic/guide?tab=TYPE_GUIDE_AUTH',
      },
      { title: '교육신청방법', href: '/traffic/guide?tab=TYPE_GUIDE_EDU_REGI' },
      { title: '학습방법', href: '/traffic/guide?tab=TYPE_GUIDE_EDU_LEARNING' },
    ],
  },
  {
    category: '학습자료',
    href: '/traffic/learning-material/learning-guide',
    items: [
      {
        title: '연령별 학습지도안',
        href: '/traffic/learning-material/learning-guide',
      },
      { title: '교육자료', href: '/traffic/learning-material/education' },
      { title: '교육영상', href: '/traffic/learning-material/video' },
      { title: '타기관자료모음', href: '/traffic/learning-material/reference' },
    ],
  },
  {
    category: '온라인교육',
    href: '',
    items: [
      { title: '온라인교육 신청', href: '/traffic/stebMove/steb2' },
      { title: '온라인교육 수정', href: '/traffic/stebMove/steb2' }, // 미완
    ],
  },
  {
    category: '나의강의실',
    href: '/me',
    items: [
      { title: '정보보기', href: '/me' },
      { title: '정보수정', href: '/me/edit' },
      { title: '학습현황', href: '/me/my-course' },
    ],
  },
  {
    category: '고객센터',
    href: '',
    items: [
      { title: '공지사항', href: '/traffic/service?tab=Notice' },
      { title: '자주묻는질문', href: '/traffic/service?tab=Faq' },
      { title: '교육문의', href: '/traffic/service?tab=Question' },
      { title: '문의내역조회', href: '/traffic/service?tab=Look' },
    ],
  },
];

export function NavBarV2() {
  const router = useRouter();
  const [isShowRemote, setIsShowRemote] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const menuRef = useRef(anchorEl); // current에 안담겨
  // // let open = true;
  // let open = Boolean(anchorEl);
  const open = Boolean(anchorEl);

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
  };
  // const handleOut = (e: React.MouseEvent<HTMLDivElement>) => {
  const handleOut = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const show = showRemoteList.some(e => router.route.includes(e.href));
    // console.log(show);
    setIsShowRemote(show);
  }, [router]);

  return (
    <ContentContainer>
      <HeaderBackground
        className={`dropdown-back  ${open ? '' : 'hidden'}`}
        onMouseOver={handleHover}
        onMouseOut={handleOut}
      ></HeaderBackground>
      <NavContainer>
        <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
          {ProvintialHeaderList.map(item => (
            <HeaderItem
              key={item.category}
              onMouseOver={handleHover}
              onMouseOut={handleOut}
            >
              <Link href={item.href} color={grey[900]}>
                <Box className="header-title">{item.category}</Box>
              </Link>
              <Box className={`dropdown-box ${open ? '' : 'hidden'}`}>
                <Box className="link-wrap">
                  {item.items.map(menuItem => (
                    <Link href={menuItem.href} className="link-items">
                      <MenuItem key={menuItem.title} className="link-item">
                        {menuItem.title}
                      </MenuItem>
                    </Link>
                  ))}
                </Box>
              </Box>
            </HeaderItem>
          ))}
        </Box>
      </NavContainer>
      {/* 여기에 리모컨 */}
      {/* {isShowRemote && (
        <RemoteWrap>
          <Box className="remote-box" color="primary.main">
            <MenuItem>내 정보</MenuItem>
            <MenuItem>일정보기</MenuItem>
            <MenuItem>운수저상로그인</MenuItem>
          </Box>
          <Box className="remote-circle-box" color="primary.main">
            <MenuItem
              className="remote-circle"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  // behavior: 'smooth'
                })
              }
            >
              TOP
            </MenuItem>
          </Box>
        </RemoteWrap>
      )} */}
    </ContentContainer>
  );
}

const ContentContainer = styled.nav`
  display: flex;
  align-items: center;
  height: 100%;
  /* width: 100%; */
  flex-basis: 820px;
  color: black;
  /* padding-bottom: 12px; */
  padding: 0 20px;

  .bold-600 {
    font-weight: 600;
  }

  .dropdown-back {
    position: absolute;
    background: white;
    width: 100%;
    top: 78px;
    box-shadow: 2px 10px 12px 1px rgba(0, 0, 0, 0.1);
    left: 0;
    min-height: 250px;
    border-radius: 0 0 4px 4px;
    transition: min-height 0.2s ease-in-out;
  }
  .hidden {
    /* display: none; */
    min-height: 0;
  }
`;

const NavContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  .header-title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-grow: 1;
  }
  .link-wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* height: 200px; */
  }
  .link-items {
    display: flex;
    flex-grow: 1;
    align-items: center;
    color: black;
  }
  .link-item {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    @media (max-width: 1200px) {
      font-size: 14px;
    }
  }

  li {
    width: 100px;
  }
  a {
    &:first-of-type {
      margin-left: 0;
    }
  }
  .dropdown-box {
    position: relative;
    flex-grow: 1;
    height: 200px;
    transition: height 0.2s ease-in-out;
    overflow: hidden;
  }
  .hidden {
    height: 0;
  }
`;

const HeaderBackground = styled(Box)``;
const HeaderItem = styled(Box)`
  width: 100px;
  flex-grow: 1;
`;
const RemoteWrap = styled(Box)`
  position: absolute;
  right: 120px;
  width: 120px;
  top: 470px;
  /* box-shadow: 0 0 0.5rem 2px #999797; */

  .remote-box {
    border: 2px solid #999797;
    border-radius: 0.25rem;
  }
  .remote-circle-box {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
  }
  .remote-circle {
    display: flex;
    justify-content: center;
    width: 40px;
    height: 40px;
    overflow: hidden;
    padding: 0;
    border: 2px solid #999797;
    border-radius: 20px;
  }
`;
