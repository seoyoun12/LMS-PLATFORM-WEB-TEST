import styled from '@emotion/styled';
import styles from '@styles/common.module.scss';
import { DropdownItem } from '@components/common/GlobalNavigationBar/NavBar/DropdownItem/DropdownItem';
import { DropdownItemV2 } from '@components/common/GlobalNavigationBar/NavBar/DropdownItem/DropdownItemV2';
import { grey } from '@mui/material/colors';
import { Box, Button, MenuItem, Typography } from '@mui/material';
import { Link } from '@components/common';
import React, { useRef } from 'react';

export function NavBarV2() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuRef = useRef(anchorEl); // current에 안담겨
  // // let open = true;
  let open = Boolean(anchorEl);

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
    console.log(e.currentTarget, anchorEl, '있냐?');
  };
  const handleOut = (e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(null);
    console.log(e.currentTarget, anchorEl, '있냐1?');
  };

  return (
    <nav className={styles.globalContainer}>
      <ContentContainer>
        <NavContainer>
          <HeaderBackground
            className={`dropdown-back  ${open ? '' : 'hidden'}`}
            onMouseOver={handleHover}
            onMouseOut={handleOut}
          ></HeaderBackground>
          <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
            {HeaderList.map((item) => (
              <HeaderItem key={item.category} onMouseOver={handleHover} onMouseOut={handleOut}>
                <Box className="header-title">{item.category}</Box>
                <Box className={`dropdown-box ${open ? '' : 'hidden'}`}>
                  <Box className="link-wrap">
                    {item.items.map((menuItem) => (
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
  .hidden {
    display: none;
  }

  .dropdown-back {
    position: absolute;
    background: white;
    width: 100%;
    top: 78px;
    min-height: 300px;
    border-radius: 0 0 4px 4px;
  }
  .dropdown-box {
    position: relative;
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
    category: '교육이용안내',
    items: [
      { title: '회원가입 및 로그인', href: '/sign-in' },
      { title: '교육신청방법', href: '/sign-in' },
      { title: '학습방법', href: '/sign-in' },
    ],
  },
  {
    category: '학습자료',
    items: [
      { title: '연령별 교수학습지도안', href: '/sign-in' },
      { title: '교육자료 및 영상', href: '/sign-in' },
      { title: '타기관자료 모음', href: '/sign-in' },
    ],
  },
  {
    category: '온라인교육',
    items: [
      { title: '온라인교육 신청', href: '/sign-in' },
      { title: '온라인교육 수정/취소', href: '/sign-in' },
    ],
  },
  {
    category: '나의강의실',
    items: [
      { title: '학습현황', href: '/me' },
      { title: '정보수정', href: '/me/edit' },
      { title: '문의하기', href: '/sign-in' },
    ],
  },
  {
    category: '고객센터',
    items: [
      { title: '공지사항', href: '/sign-in' },
      { title: '자주묻는질문', href: '/sign-in' },
      { title: '교육문의', href: '/sign-in' },
      { title: '문의내역조회', href: '/sign-in' },
    ],
  },
];
