import { HeaderBar } from '@components/common/GlobalNavigationBar/HeaderBar';
import { NavBar } from '@components/common/GlobalNavigationBar/NavBar';
import styled from '@emotion/styled';

export function GlobalNavigationBar() {
  return (
    <GlobalNavigationContainer>
      <HeaderBar/>
      <NavBar/>
    </GlobalNavigationContainer>
  );
}

const GlobalNavigationContainer = styled.div`
  border-radius: 0;
  width: 100%;
  height: auto;
  background-color: #FFFFFF;
  border-color: #E5E5E5;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 101;
  box-shadow: rgb(0 0 0 / 4%) 0 1px 0 0;
`;
