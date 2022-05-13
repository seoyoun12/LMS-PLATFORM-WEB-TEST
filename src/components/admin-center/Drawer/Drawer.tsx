import * as React from 'react';
import Box from '@mui/material/Box';
import { Drawer as MuiDrawer } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import { ReactNode } from 'react';
import { Link } from '@components/common';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/router';
import { Accordion } from '@components/ui';

const drawerWidth = 240;

export function Drawer({ children }: { children: ReactNode }) {
  const router = useRouter();

  const accordionList = [
    {
      title: '과정관리',
      contents: [
        {
          name: '과정 리스트',
          href: '/admin-center/course',
          isActive: router.pathname === '/admin-center/course'
        },
        { name: 'child2', href: '/admin-center/course/child', isActive: router.pathname === '' },
      ],
      icon: <SchoolOutlinedIcon sx={{ mr: '32px', color: grey[700] }} />,
    },
    {
      title: '콘텐츠관리',
      contents: [
        { name: 'child1', href: '/admin-center/content', isActive: router.pathname === '' },
        { name: 'child2', href: '/admin-center/content', isActive: router.pathname === '' },
      ],
      icon: <SourceOutlinedIcon sx={{ mr: '32px', color: grey[700] }} />,
    },
    {
      title: '통계',
      contents: [
        { name: 'child1', href: '/admin-center/statics', isActive: router.pathname === '' },
        { name: 'child2', href: '/admin-center/statics', isActive: router.pathname === '' },
      ],
      icon: <AnalyticsOutlinedIcon sx={{ mr: '32px', color: grey[700] }} />,
    },
    {
      title: '설정',
      contents: [
        { name: 'child1', href: '/admin-center/setting', isActive: router.pathname === '' },
        { name: 'child2', href: '/admin-center/setting', isActive: router.pathname === '' },
      ],
      icon: <SettingsOutlinedIcon sx={{ mr: '32px', color: grey[700] }} />,
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <MuiDrawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid rgb(0 0 0 / 12%)'
          },
          position: 'relative',
        }}
      >
        <Box sx={{
          overflow: 'auto',
          position: 'relative',
          paddingTop: '78px'
        }}>
          <List>
            <Link
              href="/admin-center/dashboard"
              color={router.pathname === '/admin-center/dashboard' ? grey[900] : grey[800]}
            >
              <ListItem
                button
                sx={{
                  backgroundColor: `${
                    router.pathname === '/admin-center/dashboard'
                      ? grey[50]
                      : 'inherit'
                  }`
                }}
              >
                <ListItemIcon>
                  <DashboardOutlinedIcon sx={{ color: grey[700] }} />
                </ListItemIcon>
                <ListItemText primary="대시보드" />
              </ListItem>
            </Link>
            <Accordion accordionList={accordionList} />
          </List>
        </Box>
      </MuiDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}

