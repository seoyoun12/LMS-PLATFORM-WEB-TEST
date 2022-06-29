import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import { headerHeight } from '@styles/variables';

const pages = [ '강의소개', '커리큘럼' ];

export const Menubar = ({ className }: { className?: string }) => {
  const [ anchorElNav, setAnchorElNav ] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      className={className}
      position="sticky"
      sx={{
        top: `${headerHeight}`,
        boxShadow: 'none',
        background: '#ffffff'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                color="neutral"
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
      <Divider light/>
    </AppBar>
  );
};
