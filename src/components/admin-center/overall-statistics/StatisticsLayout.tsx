import styled from '@emotion/styled'
import { ArrowLeft, ArrowRight } from '@material-ui/icons'

import { Box, Typography } from '@mui/material'
import { useState } from 'react'


export default function StatisticsLayout({children}) {
  const [isWide, setIsWide] = useState(false);

  console.log(isWide);
  return (
    <Wrapper iswide={isWide ? 'wide' : 'close'}>
      <LeftDrawer iswide={isWide ? "wide" : "close"}>
        <DrawerHeader>
          <DrawerTitle>
            {isWide && <Typography sx={{color:'#fff', fontSize:'24px', fontWeight:'bold'}}>충남교통연수원</Typography>  }
            {
              isWide
              ? <ArrowRight style={{fontSize: '36px'}} onClick={() => setIsWide(false)} />
              : <ArrowLeft style={{fontSize: '36px'}} onClick={() => setIsWide(true)} />
            }
          </DrawerTitle>
        </DrawerHeader>
        <DrawerItem iswide={isWide ? 'wide' : 'close'}>통합 (이수자 수 / 이수율)</DrawerItem>
        <DrawerItem iswide={isWide ? 'wide' : 'close'}>업종별 (이수자 수 / 이수율)</DrawerItem>
        <DrawerItem iswide={isWide ? 'wide' : 'close'}>차량등록지 전체 (이수자 수 / 이수율)</DrawerItem>
        <DrawerItem iswide={isWide ? 'wide' : 'close'}>기수별 증감</DrawerItem>
        <DrawerItem iswide={isWide ? 'wide' : 'close'}>업종별 증감</DrawerItem>
        <DrawerItem iswide={isWide ? 'wide' : 'close'}>연간 업종별 연령대 통계</DrawerItem>
        <DrawerItem iswide={isWide ? 'wide' : 'close'}>연도별 연령비교</DrawerItem>
        <DrawerFooter>
        </DrawerFooter>
      </LeftDrawer>
      
      {children}
    </Wrapper>
  )
}

const DrawerFooter = styled(Box)`
  flex: .2;
`

const DrawerTitle = styled(Box)`
  
  display:flex;
  align-items:center;
  justify-content:space-between;
  width: 100%;
  height: 72px;
  padding: 0 16px;
  border-bottom:1px solid #fff;
  box-sizing:border-box;
  cursor: pointer;
`


const DrawerHeader = styled(Box)`
  width: 100%;
  flex: .3;
`

const DrawerItem = styled(Box)<{iswide?:string}>`
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: ${props => props.iswide === "wide" ? "flex-start" : "center"};
  flex-direction: column;
  border-bottom: 1px solid #ddd;
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

const LeftDrawer = styled(Box)<{iswide:string}>`
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