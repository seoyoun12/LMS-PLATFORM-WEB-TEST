import { Container } from '@mui/material';
import { useEffect } from 'react';
import styles from '@styles/common.module.scss';
import styled from '@emotion/styled';
import { headerHeight } from '@styles/variables';

export function Content() {
  useEffect(() => {
    (async () => {
    })();

  }, []);

  return (
    <Container
      sx={{
        display: 'flex',
      }}
      className={styles.globalContainer}
    >
      <MainSection>
        main section
      </MainSection>

      <StickySideBar>
        side bar
      </StickySideBar>
    </Container>
  );
}

const MainSection = styled.div`
  flex: 1;
`;

const StickySideBar = styled.div`
  position: sticky;
  top: ${headerHeight};
  margin-left: 40px;
  padding-top: 32px;
  height: 100%;
`;

