import { useMyUser } from '@common/api/user';
import { mePageNavigationLinkProps } from '@common/constants/mePageNavigationLinkProps';
import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import Image from 'next/image';

import NavigationItem from './NavigationItem';


export default function MeDrawer() {
  const { user } = useMyUser();
  if(!user) return <div />
  return (
    <Drawer>
      <ProfileWrapper>
        {user?.s3Files[0]?.path
          ? <Image src={user.s3Files[0].path} width={360} height={360} alt="프로필 이미지" />
          : <DefaultImageBox>U</DefaultImageBox>
        }
        <Box>
          <Typography sx={{fontSize:'22px'}}>{user.name}</Typography>
          <Typography sx={{fontSize:'18px',color:'#a7a7a7'}}>{user.email}</Typography>
        </Box>
      </ProfileWrapper>
      <NavigationWrapper>
        <Typography className='title'>내 정보</Typography>
        {
          mePageNavigationLinkProps.map((item) => (
            <NavigationItem key={item.text} href={item.href} text={item.text} />
          ))
        }
      </NavigationWrapper>
    </Drawer>
  )
}

const NavigationWrapper = styled(Box)`
  width: 100%;
  display:flex;
  flex-direction: column;
  padding-top: .5rem;
  justify-content: center;
  align-items: center;
  .title{
    width: 100%;
    font-size: 24px;
    margin-top: 2rem;
    padding-bottom: .5rem;
    align-self: flex-start;
    border-bottom: 1px solid #e5e5e5;
  }
  a {
    width: 100%;
    height: 100%;
    font-size: 18px;
    font-weight: 500;
    color: #777;
    text-decoration: none;
    display:flex;
    align-items:center;
    justify-content: space-between;
    padding-left: .5rem; 
    &:hover {
      background-color: #f3f3f3;
    }
    
  }
`

const ProfileWrapper = styled(Box)`
  
  display:flex;
  padding-top: .5rem;
  justify-content: center;
  align-items: center;
  gap: 16px;
`

const DefaultImageBox = styled(Box)`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: #f3f3f3;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`

const Drawer = styled(Box)`
  
  width:360px;
  display:flex;
  flex-direction: column;
  padding: .5rem;
  justify-content: center;
  align-items: center;
  
`