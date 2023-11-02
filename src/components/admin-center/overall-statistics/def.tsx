import styled from '@emotion/styled'
import useToggle from '@hooks/useToggle';
import { ArrowLeft, ArrowRight } from '@material-ui/icons'
import { Home } from '@mui/icons-material';
import { Box, Typography } from '@mui/material'
import Link from 'next/link';

export default function StatisticsLayout({children}) {
  const {toggle: isWide, onToggle } = useToggle();
  
  return (
    <Wrapper iswide={isWide ? 'wide' : 'close'}>
      <StyledNavigation iswide={isWide ? "wide" : "close"}>
        <DrawerHeader>
          <DrawerTitle>
            {isWide && <Typography sx={{color:'#fff', fontSize:'24px', fontWeight:'bold'}}>충남교통연수원</Typography>  }
            {
              isWide
              ? <ArrowRight style={{fontSize: '36px'}} onClick={onToggle} />
              : <ArrowLeft style={{fontSize: '36px'}} onClick={onToggle} />
            }
          </DrawerTitle>
        </DrawerHeader>
        <DrawerBody iswide={isWide ? 'wide' : 'close'}>
          
            <Link href="/admin-center/statistics/overall?type=completion-whole" passHref>
              <DrawerItem iswide={isWide ? 'wide' : 'close'}>
                전체 통계
              </DrawerItem>
            </Link>
            <Link href="/admin-center/statistics/overall?type=completion-business" passHref>
              <DrawerItem iswide={isWide ? 'wide' : 'close'}>
                업종별
              </DrawerItem>
              </Link>
            <Link href="/admin-center/statistics/overall?type=completion-registration_address" passHref>
              <DrawerItem iswide={isWide ? 'wide' : 'close'}>
                차량등록지 전체
              </DrawerItem>
            </Link>
            <Link href="/admin-center/statistics/overall?type=move-period" passHref>
              <DrawerItem iswide={isWide ? 'wide' : 'close'}>
                기수별 증감
              </DrawerItem>
            </Link>
            <Link href="/admin-center/statistics/overall?type=moved-business" passHref>
              <DrawerItem iswide={isWide ? 'wide' : 'close'}>
                업종별 증감
              </DrawerItem>
            </Link>
            <Link href="/admin-center/statistics/overall?type=yearly_age" passHref>
              <DrawerItem iswide={isWide ? 'wide' : 'close'}>
                연도별 연령비교
              </DrawerItem>
            </Link>
            <Link href="/admin-center/statistics/overall?type=yearly_age=business" passHref>
              <DrawerItem iswide={isWide ? 'wide' : 'close'}>
                연간 업종별 연령대 통계
              </DrawerItem>
            </Link>
        </DrawerBody>
        <DrawerFooter>
          <Link href="/admin-center" passHref>
            <LinkInner>
              <Home />
              {isWide && <Typography sx={{color:'#fff', fontSize:'18px', fontWeight:'bold'}}>홈으로</Typography>}
            </LinkInner>
          </Link>
        </DrawerFooter>
      </StyledNavigation>
      <ChildrenWrapper>
        {children}
      </ChildrenWrapper>
    </Wrapper>
  )
}

const ChildrenWrapper = styled(Box)`
  // 스크롤시 네비게이션은 고정되어 있고 해당 Box만 스크롤 되도록 스타일링
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LinkInner = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  padding: 0 .25rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }

`

const DrawerFooter = styled(Box)`
  flex: .1;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DrawerTitle = styled(Box)`
  display:flex;
  align-items:center;
  justify-content:space-between;
  width: 100%;
  height: 72px;
  padding: 0 16px;
  box-sizing:border-box;
  cursor: pointer;
`

const DrawerBody = styled(Box)<{iswide: string}>`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: ${props => props.iswide === "wide" ? "column" : "row"};
  justify-content: center;
  align-items: center;
`


const DrawerHeader = styled(Box)`
  width: 100%;
  flex: .1;
`

const DrawerItem = styled(Box)<{iswide?:string}>`
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: ${props => props.iswide === "wide" ? "flex-start" : "center"};
  flex-direction: column;
  
  box-sizing:border-box;
  font-size: ${props => props.iswide === "wide" ? "18px" : "14px"};
  padding-left: 8px;
  font-weight: 700;
  
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #161D2B; // 남색
    transition: all .3s ease;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`

const StyledNavigation = styled(Box)<{iswide:string}>`
  
  display: flex;
  align-self: ${props => props.iswide === "wide" ? "flex-start" : "flex-start"};
  justify-content: ${ props => props.iswide === "wide" ? "flex-start" : "center"};
  align-items: ${ props => props.iswide === "wide" ? "flex-start" : "center"};
  flex-direction: ${props => props.iswide === "wide" ? "column" : "row"};
  width: ${props => props.iswide === "wide" ? "360px" : "100%"};
  min-height: ${props => props.iswide === "wide" ? "100vh" : "72px"};
  background-color: #161D2B;
  color: #fff;
  transition: all .3s ease;
`


const Wrapper = styled(Box)<{iswide:string}>`
  width: 100%;
  min-height:100vh;
  display: flex;
  justify-content: flex-start; 
  align-items: center;
  flex-direction: ${(props) => props.iswide === "wide" ? "row" : "column"};
`