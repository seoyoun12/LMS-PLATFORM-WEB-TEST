import { Container } from "@mui/material";
import styled from '@emotion/styled';
import { useIsLoginStatus } from "@hooks/useIsLoginStatus";
import { CategoryBoardLookLogin } from "./CategoryBoardLookLogin";
import { CategoryBoardLookList } from "./CategoryBoardLookList";

export function CategoryBoardLook() {

  const isLoginStatus = useIsLoginStatus();

  return (
    <LkContainer>
      {isLoginStatus ? (
        <CategoryBoardLookList />
      ) : (
        <CategoryBoardLookLogin />
      )}{" "}
    </LkContainer>
  );
}

const LkContainer = styled(Container)`
  width: 100%;
  height: 100%;
`