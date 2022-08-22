import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { logout } from '@common/api';
import { useSetRecoilState } from 'recoil';
import { isLoginState } from '@common/recoil';
import { Link } from '@components/common';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import RateReviewIcon from '@mui/icons-material/RateReview';
import FeedIcon from '@mui/icons-material/Feed';

export function AccountMenu() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const setIsLoginState = useSetRecoilState(isLoginState);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = async () => {
    await logout();
    setIsLoginState(false);
    router.push(`/`);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link href="/me" underline="none" color={grey[900]}>
          <MenuItem>
            {/* <Avatar />  */}
            <ListItemIcon>
              <FeedIcon fontSize="small" />
            </ListItemIcon>
            내 정보
          </MenuItem>
        </Link>
        {/* <MenuItem color={grey[900]}>
          <Avatar /> My account
        </MenuItem> */}
        {/* <Divider /> */}
        <Link href="/me/edit" underline="none" color={grey[900]}>
          <MenuItem color={grey[900]}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            내 정보수정
          </MenuItem>
        </Link>
        <Link href="/me/my-course" underline="none" color={grey[900]}>
          <MenuItem color={grey[900]}>
            <ListItemIcon>
              <RateReviewIcon fontSize="small" />
            </ListItemIcon>
            학습현황
          </MenuItem>
        </Link>
        <MenuItem color={grey[900]} onClick={logOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          로그아웃
        </MenuItem>
      </Menu>
    </>
  );
}
