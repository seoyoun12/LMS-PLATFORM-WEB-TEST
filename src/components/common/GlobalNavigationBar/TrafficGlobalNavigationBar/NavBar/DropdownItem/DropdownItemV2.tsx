import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import styled from '@emotion/styled';

export function DropdownItemV2({ className }: { className?: string }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(Boolean(event.currentTarget));
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MenuWrap className={className}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        onMouseOver={handleClick}
        endIcon={<ArrowDropDownIcon />}
        style={{ fontWeight: 600 }}
      >
        전체 카테고리
      </Button>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        onMouseOver={handleClick}
        endIcon={<ArrowDropDownIcon />}
        style={{ fontWeight: 600 }}
      >
        전체 카테고리
      </Button>
      <Menu
        id="basic-menu"
        className={useStyles().margin}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          onMouseLeave: handleClose,
        }}
      >
        <Box display="flex" width="100%">
          <Box>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Box>
          <Box>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Box>
        </Box>
      </Menu>
    </MenuWrap>
  );
}

const MenuWrap = styled(Box)``;

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2),
  },
  boxShadows: {
    boxShadows: theme.spacing(0),
  },
}));
