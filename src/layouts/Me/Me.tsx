import * as React from 'react';
import { Container } from '@mui/material';
import { Spinner } from '@components/ui';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { useMyUser } from '@common/api/user';
import useResponsive from '@hooks/useResponsive';
import { MeDesktop } from './MeDesktop';
import { MeMobile } from './MeMobile';

export default function Me() {
  
  const isTablet = !useResponsive();
  const { user, error } = useMyUser();
  

  if (error) return <div>error</div>;
  if (!user) return <Spinner />;
  return (
    <MeContainer className={containerStyle}>
      {isTablet ? <MeMobile /> : <MeDesktop />}
    </MeContainer>
  );
}

const MeContainer = styled(Container)``;


const containerStyle = css`
  margin-bottom: 32px;
  padding: 48px 16px 48px 16px;
`;
