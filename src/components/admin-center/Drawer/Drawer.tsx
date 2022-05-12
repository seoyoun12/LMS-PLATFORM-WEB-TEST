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
import Accordion from '@components/ui/Accordion/Accordion';

const drawerWidth = 240;

const accordionList = [
  {
    title: '과정관리',
    contents: [
      { name: '과정 리스트', href: '/admin-center/course-list' },
      { name: 'child2', href: '' },
    ],
    icon: <SchoolOutlinedIcon sx={{ mr: '32px' }} />,
  },
  {
    title: '콘텐츠관리',
    contents: [
      { name: 'child1', href: '' },
      { name: 'child2', href: '' },
    ],
    icon: <SourceOutlinedIcon sx={{ mr: '32px' }} />,
  },
  {
    title: '통계',
    contents: [
      { name: 'child1', href: '' },
      { name: 'child2', href: '' },
    ],
    icon: <AnalyticsOutlinedIcon sx={{ mr: '32px' }} />,
  },
  {
    title: '설정',
    contents: [
      { name: 'child1', href: '' },
      { name: 'child2', href: '' },
    ],
    icon: <SettingsOutlinedIcon sx={{ mr: '32px' }} />,
  },
];

export function Drawer({ children }: { children: ReactNode }) {
  const router = useRouter();

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
                  <DashboardOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="dashboard" />
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

