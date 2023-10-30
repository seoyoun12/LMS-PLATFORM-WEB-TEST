import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import MeDrawer from '../drawer/MeDrawer'
import { Footer, GlobalNavigationBar } from '@components/common'
import { memo } from 'react'
import MeTopNavigation from './common/MeTopNavigation'

interface Props {
  children: React.ReactNode;
  title: string;
}

export const MeLayout = ({children,title}: Props) => {
  return (
    <>
      <MeTopNavigation />
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