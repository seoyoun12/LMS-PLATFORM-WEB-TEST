import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import MeDrawer from '../drawer/MeDrawer'
import { Footer } from '@components/common'
import { memo } from 'react'
import TopNavigation from './common/navigation/TopNavigation'
import { TrafficGlobalNavigationBar } from '@components/common/GlobalNavigationBar/TrafficGlobalNavigationBar'
interface Props {
  children: React.ReactNode;
  title: string;
}

export const MeLayout = ({children,title}: Props) => {
  return (
    <>
      <TrafficGlobalNavigationBar />
      {/* <TopNavigation /> */}
        <Wrapper>
          <Title>{title ?? '타이틀을 입력해주세요'}</Title>
          <MeDrawer />
          <Box sx={{ flex:1,position:'relative' }}>
            {children}
          </Box>
        </Wrapper>
      <Footer />
    </>
  )
}


export default  memo(MeLayout);

const Wrapper = styled(Box)`
  position: relative;
  width:100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8rem 0;
`

const Title = styled(Typography)`
  position: absolute;
  top: 5%;
  left: 50%;
  font-size: 1.35rem;
  font-weight: 500;
  margin-top: .25rem;
  margin-bottom: 1rem;
  
  padding-bottom: .25rem;
  border-bottom: 1px solid rgba(151,49,51,0.78);
  text-align: center;
`;


const Header = styled.header`
  width: 100%;
  height: 100%;
`;

// const TitleTypography = styled(Typography)`
//   /* box-sizing: border-box;
//   border: 1px solid black; */
//   color: black;
//   width: 150px;
//   font-weight: bold;
//   font-size: 1.3rem;
//   white-space: nowrap;
//   margin-left: 50px;
// `;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  @media screen and (min-width: 640px) {
    height: 56px;
  }

  @media screen and (min-width: 1024px) {
    height: 78px;
  }
`;
const SignBoxes = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

// const NavContainer = styled.div`
//   display: flex;
//   align-content: center;
//   margin-left: 20px;

//   a:not(:first-of-type) {
//     margin-left: 16px;
//   }

//   .bold-600 {
//     font-weight: 600;
//   }
// `;

// const SearchbarContainer = styled.div`
//   padding: 0 0 0 36px;
// `;

const RightSection = styled.div`
  flex-basis: 200px;
`;
