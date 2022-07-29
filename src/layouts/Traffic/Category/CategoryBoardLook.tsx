import { Container } from "@mui/material";
import styles from '@styles/common.module.scss';
import styled from '@emotion/styled';

export function CategoryBoardLook() {

  return (

    <NtContainer className={styles.globalContainer}>CategoryBoardLook</NtContainer>

  )

}

const NtContainer = styled(Container)`
  /* box-sizing: border-box;
  border: 1px solid black; */
  width: 100%;
  height: 100%;
`