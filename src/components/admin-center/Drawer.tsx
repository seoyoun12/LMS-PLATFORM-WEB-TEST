import Box from '@mui/material/Box';
import { Button,Divider,Drawer as MuiDrawer,Tab,Tabs,Typography } from '@mui/material';
import List from '@mui/material/List';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ViewCarouselOutlinedIcon from '@mui/icons-material/ViewCarouselOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ViewComfyAltOutlinedIcon from '@mui/icons-material/ViewComfyAltOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { ReactNode, SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Accordion } from '@components/ui';
import { logout } from '@common/api';
import Image from 'next/image';
import a11yProps from '@utils/a11yProps';
import CustomTabPanel from './drawer/CustomTabPanel';

export type TabType = 'normal' | 'traffic';

const drawerWidth = 290;

export function Drawer({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);

 // searchParams에 등록
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    sessionStorage.setItem('tabIndex', (newValue + 1).toString());
  };
  
  const onClickToMain = () => {
    router.push('/');
  };
  const onClickLogout = async () => {
    await logout();
    router.push('/admin-center/signin');
  };
  

  // [도민]
  const accordionList2 = [
    {
      name: '게시판관리',
      children: [
        {
          name: '게시판 목록',
          href: '/admin-center/category-traffic',
          isActive: router.pathname === '/admin-center/category-traffic',
        },
        {
          name: '게시판 등록',
          href: '/admin-center/category-traffic/upload',
          isActive: router.pathname === '/admin-center/category-traffic/upload',
        },
      ],
      icon: <ListAltIcon sx={{ mr: '32px', color: tabIndex === 0 ? 'rgb(191,49,51)' : '#2d63e2' }} />,
    },
    {
      name: '과정관리',
      children: [
        {
          name: '과정 목록',
          href: '/admin-center/course-traffic',
          isActive: router.pathname === '/admin-center/course-traffic',
        },
        {
          name: '과정 등록',
          href: '/admin-center/course-traffic/upload',
          isActive: router.pathname === '/admin-center/course-traffic/upload',
        },
      ],
      icon: <SchoolOutlinedIcon sx={{ mr: '32px', color: tabIndex === 0 ? 'rgb(191,49,51)' : '#2d63e2' }} />,
    },
    {
      name: '학습현황',
      children: [
        {
          name: '전체 수강생 학습현황',
          href: '/admin-center/course-info-traffic',
          isActive: router.pathname === '/admin-center/course-info-traffic',
        },
      ],
      icon: <MenuBookIcon sx={{ mr: '32px', color: tabIndex === 0 ? 'rgb(191,49,51)' : '#2d63e2' }} />,
    },
    {
      name: '회원관리',
      children: [
        {
          name: '회원목록',
          href: '/admin-center/user',
          isActive: router.pathname === '/admin-center/user',
        },
      ],
      icon: <PeopleOutlineIcon sx={{ mr: '32px', color: tabIndex === 0 ? 'rgb(191,49,51)' : '#2d63e2' }} />,
    },
    {
      name: '1대1문의관리',
      children: [
        {
          name: '1대1문의 목록',
          href: '/admin-center/qna',
          isActive: router.pathname === '/admin-center/qna',
        },
      ],
      icon: (
        <QuestionAnswerOutlinedIcon sx={{ mr: '32px', color: tabIndex === 0 ? 'rgb(191,49,51)' : '#2d63e2' }} />
      ),
    },
    {
      name: '학습자료관리',
      children: [
        {
          name: '학습자료 목록',
          href: '/admin-center/learning-material',
          isActive: router.pathname === '/admin-center/learning-material',
        },
        {
          name: '학습자료 등록',
          href: '/admin-center/learning-material/upload',
          isActive: router.pathname === '/admin-center/learning-material/upload',
        },
      ],
      icon: (
        <ChromeReaderModeOutlinedIcon sx={{ mr: '32px', color: tabIndex === 0 ? 'rgb(191,49,51)' : '#2d63e2' }} />
      ),
    },
    
    {
      name: '콘텐츠관리',
      children: [
        {
          name: '콘텐츠 목록',
          href: '/admin-center/content',
          isActive: router.pathname === '/admin-center/content',
        },
        {
          name: '콘텐츠 등록',
          href: '/admin-center/content/upload',
          isActive: router.pathname === '/admin-center/content/upload',
        },
      ],
      icon: <SourceOutlinedIcon sx={{ mr: '32px', color: tabIndex === 0 ? 'rgb(191,49,51)' : '#2d63e2' }} />,
    },
    {
      name: '배너관리',
      children: [
        {
          name: '배너 목록',
          href: '/admin-center/banner',
          isActive: router.pathname === '/admin-center/banner',
        },
        {
          name: '배너 등록',
          href: '/admin-center/banner/upload',
          isActive: router.pathname === '/admin-center/banner/upload',
        },
      ],
      icon: <ViewCarouselOutlinedIcon sx={{ mr: '32px', color: tabIndex === 0 ? 'rgb(191,49,51)' : '#2d63e2' }} />,
    },
    
    {
      name: '설문관리',
      children: [
        {
          name: '설문 목록',
          href: '/admin-center/survey',
          isActive: router.pathname === '/admin-center/survey',
        },
        {
          name: '설문 등록',
          href: '/admin-center/survey/upload',
          isActive: router.pathname === '/admin-center/survey/upload',
        },
      ],
      icon: <SourceOutlinedIcon sx={{ mr: '32px', color: tabIndex === 0 ? 'rgb(191,49,51)' : '#2d63e2' }} />,
    },
    {
      name: '사이트 관리',
      children: [
        {
          name: '사이트 관리 목록',
          href: '/admin-center/main-display',
          isActive: router.pathname === '/admin-center/main-display',
        },
      ],
      icon: <ViewComfyAltOutlinedIcon sx={{ mr: '32px', color: tabIndex === 0 ? 'rgb(191,49,51)' : '#2d63e2' }} />,
    },
  ]
  // [저상버스, 운수종사자]
  const accordionList = [
    
    {
      name: '게시판관리',
      children: [
        {
          name: '게시판 목록',
          href: '/admin-center/category',
          isActive: router.pathname === '/admin-center/category',
        },
        {
          name: '게시판 등록',
          href: '/admin-center/category/upload',
          isActive: router.pathname === '/admin-center/category/upload',
        },
      ],
      icon: <ListAltIcon sx={{ mr: '32px', color: tabIndex === 0 ? 'rgb(191,49,51)' : '#2d63e2' }} />,
    },
    {
      name: '과정관리',
      children: [
        {
          name: '과정 목록',
          href: '/admin-center/course',
          isActive: router.pathname === '/admin-center/course',
        },
        {
          name: '과정 등록',
          href: '/admin-center/course/upload',
          isActive: router.pathname === '/admin-center/course/upload',
        },
      ],
      icon: <SchoolOutlinedIcon sx={{ mr: '32px', color: tabIndex === 0 ? 'rgb(191,49,51)' : '#2d63e2' }} />,
    },
    {
      name: '학습현황',
      children: [
        {
          name: '전체 수강생 학습현황',
          href: '/admin-center/course-info',
          isActive: router.pathname === '/admin-center/course-info',
        },
      ],
      icon: <MenuBookIcon sx={{ mr: '32px', color: tabIndex === 0 ? 'rgb(191,49,51)' : '#2d63e2' }} />,
    },
    {
      name: '회원관리',
      children: [
        {
          name: '회원목록',
          href: '/admin-center/user',
          isActive: router.pathname === '/admin-center/user',
        },
      ],
      icon: <PeopleOutlineIcon sx={{ mr: '32px', color: tabIndex === 0 ? 'rgb(191,49,51)' : '#2d63e2' }} />,
    },
    {
      name: '1대1문의관리',
      children: [
        {
          name: '1대1문의 목록',
          href: '/admin-center/qna',
          isActive: router.pathname === '/admin-center/qna',
        },
      ],
      icon: (
        <QuestionAnswerOutlinedIcon sx={{ mr: '32px', color: tabIndex === 0 ? 'rgb(191,49,51)' : '#2d63e2' }} />
      ),
    },
    {
      name: '콘텐츠관리',
      children: [
        {
          name: '콘텐츠 목록',
          href: '/admin-center/content',
          isActive: router.pathname === '/admin-center/content',
        },
        {
          name: '콘텐츠 등록',
          href: '/admin-center/content/upload',
          isActive: router.pathname === '/admin-center/content/upload',
        },
      ],
      icon: <SourceOutlinedIcon sx={{ mr: '32px', color: tabIndex === 0 ? 'rgb(191,49,51)' : '#2d63e2' }} />,
    },
    {
      name: '일정관리',
      children: [
        {
          name: '일정 목록',
          href: '/admin-center/calendar',
          isActive: router.pathname === '/admin-center/calendar',
        },
        {
          name: '일정 등록',
          href: '/admin-center/calendar/upload',
          isActive: router.pathname === '/admin-center/calendar/upload',
        },
      ],
      icon: <CalendarMonthIcon sx={{ mr: '32px', color: tabIndex === 0 ? 'rgb(191,49,51)' : '#2d63e2' }} />,
    },

    {
      name: '배너관리',
      children: [
        {
          name: '배너 목록',
          href: '/admin-center/banner',
          isActive: router.pathname === '/admin-center/banner',
        },
        {
          name: '배너 등록',
          href: '/admin-center/banner/upload',
          isActive: router.pathname === '/admin-center/banner/upload',
        },
      ],
      icon: <ViewCarouselOutlinedIcon sx={{ mr: '32px', color: tabIndex === 0 ? 'rgb(191,49,51)' : '#2d63e2' }} />,
    },
    {
      name: '설문관리',
      children: [
        {
          name: '설문 목록',
          href: '/admin-center/survey',
          isActive: router.pathname === '/admin-center/survey',
        },
        {
          name: '설문 등록',
          href: '/admin-center/survey/upload',
          isActive: router.pathname === '/admin-center/survey/upload',
        },
      ],
      icon: <SourceOutlinedIcon sx={{ mr: '32px', color: tabIndex === 0 ? 'rgb(191,49,51)' : '#2d63e2' }} />,
    },
    {
      name: '통계',
      children: [
        {
          name: '설문통계',
          href: '/admin-center/statistics/survey',
          isActive: router.pathname === '',
        },
        {
          name: '전체통계',
          href: '/admin-center/statistics/overall',
          isActive: router.pathname === '',
        },
      ],
      icon: <AnalyticsOutlinedIcon sx={{ mr: '32px', color: tabIndex === 0 ? 'rgb(191,49,51)' : '#2d63e2' }} />,
    },
  ];

  useEffect(() => {
    const tabIndex = Number(sessionStorage.getItem('tabIndex'));
    if (tabIndex) setTabIndex(tabIndex - 1);
  },[])

  return (
    <Box sx={{ display: 'flex' }}>
      <MuiDrawer
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid rgb(0 0 0 / 12%)',
          },
          position: 'relative',
        }}
      >
        <Box
          sx={{
            overflow: 'auto',
            position: 'relative',
            // paddingTop: '28px',
          }}
        >
          <List>
            <Box display='flex' gap='8px' flexDirection='column' padding='1rem'>
              {/* <Logo /> */}
              <Image
                src='/assets/images/ctsoecLogo.png'
                height={40}
                width={230}
                alt='logo'
              />
              <Typography fontWeight='bold' fontSize='18px' textAlign='center'>
                학습관리센터
              </Typography>
              <Divider sx={{ marginTop: '12px', marginBottom: '12px' }} />
              <Button variant='contained' onClick={onClickToMain}>
                메인사이트로
              </Button>
              <Button variant='contained' onClick={onClickLogout}>
                로그아웃
              </Button>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example" sx={{padding:'0 1rem'}}>
                <Tab label="운수종사자" {...a11yProps(0)} sx={{flex:1}} />
                <Tab label="도민교육" {...a11yProps(1)} sx={{flex:1}} />
              </Tabs>
              <CustomTabPanel value={tabIndex} index={0}>
                <Accordion accordionList={accordionList} activeIndex={0} />
              </CustomTabPanel>
              <CustomTabPanel value={tabIndex} index={1}>
                <Accordion accordionList={accordionList2} activeIndex={1} />
              </CustomTabPanel>
            </Box>
          </List>
        </Box>
      </MuiDrawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
