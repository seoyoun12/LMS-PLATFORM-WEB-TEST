import styled from '@emotion/styled';
import { AppBar, Box } from '@mui/material';
import styles from '@styles/common.module.scss';

export function SiteMap() {
  return (
    <SiteMapWrap>
      <Header className={styles.globalContainer}>앱바dasdasd</Header>
    </SiteMapWrap>
  );
}
const SiteMapWrap = styled(Box)`
  background: #256aef;
`;
const Header = styled.header`
  width: 100%;
  height: 100%;
  color: black;
`;
