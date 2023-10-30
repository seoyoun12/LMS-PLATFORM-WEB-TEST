import styled from '@emotion/styled';
import { AppBar, Box, Typography } from '@mui/material';
import { useState } from 'react';
import Dropdown from './dropdown/Dropdown';
import Header from './Header';

export default function TopNavigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onMouseDropdown = () => {
    setIsDropdownOpen(true);
  }

  const onMouseLeaveDropdown = () => {
    setIsDropdownOpen(false);
  }

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: '#fff', boxShadow: isDropdownOpen ? 'rgb(0 0 0 / 12%) 0 0px 0 0' : 'rgb(0 0 0 / 12%) 0 1px 0 0',}}
      onMouseEnter={onMouseDropdown}
      onMouseLeave={onMouseLeaveDropdown}
      >
      <Header />
      { isDropdownOpen && <Dropdown /> }
  </AppBar>
  )
}


export const DropDownText = styled(Typography)`
  text-decoration: none;
  color: #161D2B;
  font-size: .95rem;
`

export const DropDownItem = styled(Box)`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  border-bottom: 2px solid transparent;
  &:hover {
    text-decoration: underline;
    text-underline-offset: 8px; 
    text-decoration-color: rgba(191,49,51,0.78);
    font-weight: bold;
    box-sizing: border-box;
    
    .child-link {
      font-weight: bold;
      text-decoration: underline;
      text-underline-offset: 8px; 
      text-decoration-color: rgba(191,49,51,0.78);
      font-weight: bold;
      box-sizing: border-box;
    }
  }
`;

export const DropDownMenu = styled(Box)`
  flex:1;
  width:100%;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items:center;
  gap: 1rem;
  border-right: 1px solid #e7e7e7e7;
  &:first-child {
    border-left: 1px solid #e7e7e7e7;
  }
  padding-bottom: 3rem;
`

export const DropdownLinkBox = styled(Box)`
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  border-bottom: 4px solid transparent;
  &:hover {
    border-bottom: 4px solid rgba(191,49,51,0.78);
    font-weight: bold;
    box-sizing: border-box;
    .header-link{
      color: rgba(191,49,51,0.78);
      font-weight: bold; 
    }
  }
`

export const CenterDropdownLink = styled(Typography)`
  text-decoration: none;
  color: #161D2B;
  font-size: 1.05rem;
  font-weight: 900;
`


export const LeftNavigationBar = styled(Box)`
  flex: 0.25;
  cursor:pointer;
`

export const RightNavigationBar = styled(Box)`
  flex: 0.1;
`

export const CenterNavigationBar = styled(Box)`
  flex: 0.65;
  width: 100%;
  display: flex;
  padding: 0 2rem;
  
`

export const Wrapper = styled(Box)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
`
export const DropdownWrapper = styled(Wrapper)`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width:100%;
  background-color: #fff;
  // after fullscreen border-bottom
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width:100%;
    height: 1px;
    background-color: rgba(191,49,51,0.78);
    
  }
  
  // slide down
  animation: slideDown .3s ease;
  @keyframes slideDown {
    0% {
      transform: translate(-50%,-5%);
    }
    100% {
      transform: translate(-50%,0%);
    }
  }
`