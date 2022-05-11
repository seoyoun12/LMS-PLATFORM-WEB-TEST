import * as React from 'react';
import Box from '@mui/material/Box';
import { Drawer as MuiDrawer } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { ReactNode } from 'react';
import { Link } from '@components/common';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/router';

const drawerWidth = 240;

const menuList = [
  {
    name: '강의 업로드',
    href: '/tutor-center/course-upload',
    activeIcon: <FileUploadIcon />,
    icon: <FileUploadOutlinedIcon />
  },
  {
    name: '게시판',
    href: '/tutor-center/dashboard',
    activeIcon: <DashboardIcon />,
    icon: <DashboardOutlinedIcon />
  },
  {
    name: '설문',
    href: '/tutor-center/form',
    activeIcon: <SummarizeIcon />,
    icon: <SummarizeOutlinedIcon />
  },
  {
    name: '통계',
    href: '/tutor-center/analytic',
    activeIcon: <AnalyticsIcon />,
    icon: <AnalyticsOutlinedIcon />
  },
  {
    name: '설정',
    href: '/tutor-center/setting',
    activeIcon: <SettingsIcon />,
    icon: <SettingsOutlinedIcon />
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
            {menuList.map(({ name, icon, href, activeIcon }, index) => (
              <Link
                href={href}
                color={router.pathname === href ? grey[900] : grey[800]}
              >
                <ListItem button key={name}>
                  <ListItemIcon>
                    {router.pathname === href ? activeIcon : icon}
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </MuiDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}

