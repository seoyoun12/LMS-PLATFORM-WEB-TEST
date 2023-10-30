import { AccountMenu } from '@components/ui';
import styled from '@emotion/styled';
import { AppBar, Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function MeTopNavigation() {
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
      sx={{
        zIndex: theme => theme.zIndex.drawer + 1,
        backgroundColor: '#FFFFFF',
        boxShadow: isDropdownOpen ? 'rgb(0 0 0 / 12%) 0 0px 0 0' : 'rgb(0 0 0 / 12%) 0 1px 0 0',
      }}
      onMouseEnter={onMouseDropdown}
      onMouseLeave={onMouseLeaveDropdown}
      >
      <Wrapper >
        <LeftNavigationBar>
          <Link href="/" passHref>
            <Image src="/assets/images/ctsoecLogo.png" height={40} width={230} alt="ctti logo" />
          </Link>
        </LeftNavigationBar>
        
        <CenterNavigationBar>
        <DropdownLinkBox>
            <Link href="/traffic/learning-material/education" passHref>
              <CenterDropdownLink className='header-link'>학습자료</CenterDropdownLink>
            </Link>
          </DropdownLinkBox>
          <DropdownLinkBox>
            <Link href="/traffic/class-room" passHref>
              <CenterDropdownLink className='header-link'>온라인교육</CenterDropdownLink>
            </Link>
          </DropdownLinkBox>
          <DropdownLinkBox>
            <Link href="/traffic/me" passHref>
              <CenterDropdownLink className='header-link'>마이페이지</CenterDropdownLink>
            </Link>
          </DropdownLinkBox>
          <DropdownLinkBox>
            <Link href="/traffic/service?tab=Notice" passHref>
              <CenterDropdownLink className='header-link'>고객센터</CenterDropdownLink>
            </Link>
          </DropdownLinkBox>

          <DropdownLinkBox>
            <Link href="/traffic/service?tab=Notice" passHref>
              <CenterDropdownLink className='header-link'>메타버스</CenterDropdownLink>
            </Link>
          </DropdownLinkBox>
        </CenterNavigationBar>

        <RightNavigationBar>
          <AccountMenu />
        </RightNavigationBar>

      </Wrapper>

        {/* Dropdown */}
      {
        isDropdownOpen &&
          <DropdownWrapper sx={{color:'#121b2e'}}>
          <LeftNavigationBar />
          <CenterNavigationBar>
          <DropDownMenu>
              
              <DropDownItem>
                <Link href="//traffic/learning-material/education" passHref>
                  <DropDownText className='child-link'>영상자료</DropDownText>
                </Link>
              </DropDownItem>

              <DropDownItem>
                <Link href="/traffic/learning-material/learning-guide" passHref>
                  <DropDownText className='child-link'>연령별 학습지도안</DropDownText>
                </Link>
              </DropDownItem>

              <DropDownItem>
                <Link href="/traffic/learning-material/reference" passHref>
                  <DropDownText className='child-link'>타기관 자료모음</DropDownText>
                </Link>
              </DropDownItem>
                
            </DropDownMenu>




            <DropDownMenu>
              
              <DropDownItem>
                <Link href="/traffic/stebMove/steb1" passHref>
                  <DropDownText className='child-link'>신청하기</DropDownText>
                </Link>
              </DropDownItem>

              <DropDownItem>
                <Link href="/traffic/class-room" passHref>
                  <DropDownText className='child-link'>학습하기</DropDownText>
                </Link>
              </DropDownItem>
                
            </DropDownMenu>

            <DropDownMenu>
              <DropDownItem>
                <Link href="/traffic/me/learning-status" passHref>
                  <DropDownText className='child-link'>학습현황</DropDownText>
                </Link>
              </DropDownItem>
              <DropDownItem>
                <Link href="/traffic/me/cert" passHref>
                  <DropDownText className='child-link'>증명서발급</DropDownText>
                </Link>
              </DropDownItem>
              <DropDownItem>
                <Link href="/traffic/me/my-course" passHref>
                  <DropDownText className='child-link'>온라인 학습 신청내역</DropDownText>
                </Link>
              </DropDownItem>
            </DropDownMenu>

            <DropDownMenu>
            <DropDownItem>
                <Link href="/traffic/service?tab=Notice" passHref>
                  <DropDownText className='child-link'>공지사항</DropDownText>
                </Link>
              </DropDownItem>
              <DropDownItem>
                <Link href="/traffic/service?tab=Faq" passHref>
                  <DropDownText className='child-link'>자주묻는질문</DropDownText>
                </Link>
              </DropDownItem>
              <DropDownItem>
                <Link href="/traffic/service?tab=Question" passHref>
                  <DropDownText className='child-link'>교육문의</DropDownText>
                </Link>
              </DropDownItem>
            
              <DropDownItem>
                <Link href="/traffic/service?tab=Look" passHref>
                  <DropDownText className='child-link'>문의내역조회</DropDownText>
                </Link>
              </DropDownItem>
              
            </DropDownMenu>
            <DropDownMenu>
            <DropDownItem>
                <Link href="https://zep.us/@ctti" passHref>
                  <a target="_blank" rel="noopener norefferer">
                    <DropDownText className='child-link'>디지털 교통안전 교육</DropDownText>
                  </a>
                </Link>
              </DropDownItem>
            </DropDownMenu>
          </CenterNavigationBar>
          <RightNavigationBar />
        </DropdownWrapper>}
  </AppBar>
  )
}

const DropDownText = styled(Typography)`
  text-decoration: none;
  color: #161D2B;
  font-size: .95rem;
  
`

const DropDownItem = styled(Box)`
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

const DropDownMenu = styled(Box)`
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

const DropdownLinkBox = styled(Box)`
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

const CenterDropdownLink = styled(Typography)`
  text-decoration: none;
  color: #161D2B;
  font-size: 1.05rem;
  font-weight: 900;
`


const LeftNavigationBar = styled(Box)`
  flex: 0.25;
`

const RightNavigationBar = styled(Box)`
  flex: 0.1;
`

const CenterNavigationBar = styled(Box)`
  flex: 0.65;
  width: 100%;
  display: flex;
  padding: 0 2rem;
  
`

const Wrapper = styled(Box)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
`
const DropdownWrapper = styled(Wrapper)`
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