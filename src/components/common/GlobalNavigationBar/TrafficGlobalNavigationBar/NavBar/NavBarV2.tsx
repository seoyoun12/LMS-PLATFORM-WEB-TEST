// 실제 작동하는 Navigation
import styled from '@emotion/styled';
import { grey } from '@mui/material/colors';
import { Box, MenuItem } from '@mui/material';
import { Link } from '@components/common';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { isLoginState } from '@common/recoil';

const showRemoteList = [  
  { href: '/traffic/category' },
];

const IndicatorBox = ({ index, value }: { index: number; value: number }) => {
  return (
    <Box
      sx={{
        opacity: index !== value && 0,
        height: '4px',
        width: '100%',
        background: 'rgb(194,51,51)',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0px',
          height: '0px',
          borderTop: '16px solid rgb(194,51,51)',
          borderLeft: '14px solid transparent',
          borderRight: '14px solid transparent',
        }}
      ></Box>
    </Box>
  );
};

export function NavBarV2() {
  const router = useRouter();
  const [isShowRemote, setIsShowRemote] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showIndicatorValue, setShowIndicatorValue] = useState(null);
  
  const open = Boolean(anchorEl);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState); //과정게시판 교육영상 가리기용

  const handleHover = (e: React.MouseEvent<HTMLDivElement>, showValue: number) => {
    setAnchorEl(e.currentTarget);
    setShowIndicatorValue(showValue);
  };
  
  const handleOut = () => {
    setAnchorEl(null);
    setShowIndicatorValue(null);
  };

  useEffect(() => {
    const show = showRemoteList.some(e => router.route.includes(e.href));
    setIsShowRemote(show);
  }, [router]);

  return (
    <ContentContainer>
      <HeaderBackground className={`dropdown-back  ${open ? '' : 'hidden'}`}/>
      <NavContainer>
        <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
          {ProvintialHeaderList.map((item, index) => (
            <HeaderItem
              key={item.category}
              className={'dropdown-box-wrap'}
              onMouseOver={e => handleHover(e, index)}
              onMouseOut={handleOut}
            >
              <Link href={item.href} color={grey[900]}>
                <Box className="header-title">{item.category}</Box>
              </Link>
              <IndicatorBox index={index} value={showIndicatorValue} />
              <Box className={`dropdown-box ${open ? '' : 'hidden'}`}>
                <Box className="link-wrap">
                  {item.items.map(menuItem => {
                    if (menuItem.href === '/me') return;
                    if (!isLogin && menuItem.href === '/traffic/learning-material/media')
                      return;
                    return (
                      <Link
                        className="link-items"
                        href={menuItem.href}
                        key={menuItem.title}
                        target={menuItem.href === 'https://zep.us/@ctti' ? `_blank noreferrer` : `_self`}
                        >
                        <MenuItem className="link-item">{menuItem.title}</MenuItem>
                      </Link>
                    );
                  })}
                </Box>
              </Box>
            </HeaderItem>
          ))}
        </Box>
      </NavContainer>
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
  padding: 0 10px;

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
    min-height: 240px;
    border-radius: 0 0 4px 4px;
    transition: min-height 0.2s ease-in-out;
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid rgb(52, 152, 219);
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
    font-weight: bold;
    height: 100%;
    /* flex-grow: 1; */
  }
  .link-wrap {
    display: flex;
    flex-direction: column;
    gap: 4px;
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

  .dropdown-box-wrap {
    position: relative;

    .dropdown-box {
      border-left: 1px solid #e1e1e1;
    }
    :last-child {
      .dropdown-box {
        border-right: 1px solid #e1e1e1;
      }
    }
  }
  .dropdown-box {
    position: relative;
    margin-top: 16px;
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

export const ProvintialHeaderList = [
  
  {
    category: '학습자료',
    href: '/traffic/learning-material/learning-guide',
    items: [
      { title: '영상자료', href: '/traffic/learning-material/education' },
      {
        title: '연령별 학습지도안',
        href: '/traffic/learning-material/learning-guide',
      },
      { title: '타기관자료모음', href: '/traffic/learning-material/reference' },
    ],
  },
  {
    category: '온라인교육',
    href: '/traffic/stebMove/steb1',
    items: [
      { title: '신청하기', href: '/traffic/stebMove/steb1' },
      { title: '학습하기', href: '/traffic/class-room' },
    ],
  },
  {
    category: '마이페이지',
    href: '/traffic/me/my-course',
    items: [
      { title: '교육 신청내역', href: '/traffic/me/my-course' },
      { title: '학습현황', href: '/traffic/me/learning-status' },
      { title: '증명서 발급', href: '/traffic/me/cert' },
   ],
  },
  {
    category: '고객센터',
    href: '/traffic/service?tab=Notice',
    items: [
      { title: '공지사항', href: '/traffic/service?tab=Notice' },
      { title: '자주묻는질문', href: '/traffic/service?tab=Faq' },
      { title: '교육문의', href: '/traffic/service?tab=Question' },
      { title: '문의내역조회', href: '/traffic/service?tab=Look' },
    ],
  },
  {
    category: '메타버스',
    href: 'https://zep.us/@ctti',
    items: [{ title: '디지털 교통안전 교육', href: 'https://zep.us/@ctti' }],
  },
];
