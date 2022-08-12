import styled from '@emotion/styled';
import styles from '@styles/common.module.scss';
import { grey } from '@mui/material/colors';
import { Box, MenuItem } from '@mui/material';
import { Link } from '@components/common';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const showRemoteList = [
  // { href: '/course/[courseSeq]' },
  // { href: '/admin-center' },
  { href: '/category' },
];

export function NavBarV2() {
  const router = useRouter();
  const [isShowRemote, setIsShowRemote] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const menuRef = useRef(anchorEl); // current에 안담겨
  // // let open = true;
  const open = Boolean(anchorEl); // let -> const

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
    <nav className={styles.globalContainer}>
      <ContentContainer>
        <HeaderBackground
          className={`dropdown-back  ${open ? '' : 'hidden'}`}
          onMouseOver={handleHover}
          onMouseOut={handleOut}
        ></HeaderBackground>
        <NavContainer>
          <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
            {HeaderList.map(item => (
              <HeaderItem key={item.category} onMouseOver={handleHover} onMouseOut={handleOut}>
                <Link href={item.href} color={grey[900]}>
                  <Box className="header-title">{item.category}</Box>
                </Link>
                <Box className={`dropdown-box ${open ? '' : 'hidden'}`}>
                  <Box className="link-wrap">
                    {item.items.map(menuItem => (
                      <MenuItem key={menuItem.title} className="link-item">
                        <Link href={menuItem.href}>{menuItem.title}</Link>
                      </MenuItem>
                    ))}
                  </Box>
                </Box>
              </HeaderItem>
            ))}
          </Box>
        </NavContainer>
        {/* 여기에 리모컨 */}
      </ContentContainer>
      {isShowRemote && (
        <RemoteWrap>
          <Box className="remote-box" color="primary.main">
            <MenuItem>내 정보</MenuItem>
            <MenuItem>일정보기</MenuItem>
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
      )}
    </nav>
  );
}

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  color: black;
  /* padding-bottom: 12px; */

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
    min-height: 300px;
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
  }
  .link-wrap {
  }
  .link-item {
    display: flex;
    width: 100%;
    justify-content: center;
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
    height: 300px;
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

const HeaderList = [
  {
    category: '온라인교육',
    href: '/stebMove/steb1',
    items: [
      { title: '교육일정', href: '/stebMove/steb1' },
      { title: '교육예약', href: '/stebMove/steb1' },
    ],
  },
  {
    category: '마이페이지',
    href: '/me',
    items: [
      { title: '학습현황', href: '/me/my-course' },
      { title: '정보수정', href: '/me/edit' },
      { title: '문의하기', href: '/' },
    ],
  },
  {
    category: '고객센터',
    href: '/service',
    items: [
      { title: '공지사항', href: '/service?tab=Notice' },
      { title: '자주묻는질문', href: '/service?tab=Faq' },
      { title: '교육문의', href: '/service?tab=Question' },
      { title: '문의내역조회', href: '/service?tab=Look' },
    ],
  },
];
