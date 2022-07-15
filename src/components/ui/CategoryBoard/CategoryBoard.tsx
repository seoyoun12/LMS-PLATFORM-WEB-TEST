import { Container } from "@mui/system";
import styled from '@emotion/styled';
import styles from '@styles/common.module.scss';
import { Box } from "@mui/material";
import MuiTab from '@mui/material/Tab';
import { useRouter } from "next/router";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { CategoryBoardNotice } from "@layouts/Category/CategoryBoardNotice";
import { CategoryBoardQna } from "@layouts/Category/CategoryBoardQna";
import { CategoryBoardQuestion } from "@layouts/Category/CategoryBoardQuestion";
import { CategoryBoardLook } from "@layouts/Category/CategoryBoardLook";
import { Tabs2 } from '@components/ui/Tabs2';

enum NoticeTab {
  CbNotice = 'cbNotice',
  CbQna = 'cbQna',
  CbQuestion = 'cbQuestion',
  CbLook = 'cbLook'
}

const tabsConfig = [
  { label: '공지사항', value: "cbNotice" },
  { label: '자주묻는질문', value: "cbQna" },
  { label: '교육문의', value: "cbQuestion"},
  { label: '문의내역조회', value: "cbLook"},
]
// const tabsConfig = [
//   { label: '공지사항', value: NoticeTab.CbNotice },
//   { label: '자주묻는질문', value: NoticeTab.CbQna },
//   { label: '교육문의', value: NoticeTab.CbQuestion },
//   { label: '문의내역조회', value: NoticeTab.CbLook },
// ]

export function CategoryBoard() {

  const router = useRouter();
  const { tab } = router.query;
  const { pathname, query } = router;
  const [value , setValue] = useState(tabsConfig[0].value)

  const onChange = (newValue:string) =>{
    setValue(newValue)
  }
  console.log(value)

  return (
    <NoticeContainer>
      <Box sx={{ mb: '30px' }}>
        <NoticeTabs
          tabsConfig={tabsConfig}
          variant={"fullWidth"}
          rendering={false}
          onChange={onChange}
          value={value}
          showBorderBottom={true}
        />
      </Box>
      <Box>
        {tabsConfig.map((item)=>{
          return <Box hidden={item.value !== value} >{item.label}</Box>
        })}
      </Box>
      {
        {
          [NoticeTab.CbNotice]: <CategoryBoardNotice />,
          [NoticeTab.CbQna]: <CategoryBoardQna />,
          [NoticeTab.CbQuestion]: <CategoryBoardQuestion />,
          [NoticeTab.CbLook]: <CategoryBoardLook />
        }[tab as string]
      }

    </NoticeContainer>
  )
}

const NoticeContainer = styled(Container)`
  width: 900px;
  height: 1000px;
`

const NoticeTabs = styled(Tabs2)`

  /* .Ntt {
    width: 25%;
  } */
`