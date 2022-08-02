import { Container } from "@mui/system";
import styled from '@emotion/styled';
import styles from '@styles/common.module.scss';
import { Box, Tab, Tabs } from "@mui/material";
import MuiTab from '@mui/material/Tab';
import { useRouter } from "next/router";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { CategoryBoardNotice } from "@layouts/Category/CategoryBoardNotice";
import { CategoryBoardFaq } from "@layouts/Category/CategoryBoardFaq";
import { CategoryBoardQuestion } from "@layouts/Category/CategoryBoardQuestion";
import { CategoryBoardLook } from "@layouts/Category/CategoryBoardLook";
import { Tabs2 } from '@components/ui/Tabs2';
import { TabPanel } from "@mui/lab";

export function CategoryBoard() { 

  const [value, setValue] = useState(<CategoryBoardNotice />);

  return (
    <>
      <Container>
        <CategoryBoardTabs>
          <CategoryBoardTab label="공지사항" onClick={() => setValue(<CategoryBoardNotice />)}/>
          <CategoryBoardTab label="자주묻는질문" onClick={() => setValue(<CategoryBoardFaq />)}/>
          <CategoryBoardTab label="교육문의" onClick={() => setValue(<CategoryBoardQuestion />)}/>
          <CategoryBoardTab label="문의내역조회" onClick={() => setValue(<CategoryBoardLook />)}/>
        </CategoryBoardTabs>
      </Container>
      <main children={value} />
    </>
  );
}

const CategoryBoardTabs = styled(Tabs)`
  box-sizing: border-box;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
`

const CategoryBoardTab = styled(Tab)`
  width: 25%;
`

