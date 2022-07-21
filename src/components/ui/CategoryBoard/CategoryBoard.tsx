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
import { useSnackbar } from "@hooks/useSnackbar";
import { useDialog } from "@hooks/useDialog";
import { useCategoryBoard } from '@common/api/categoryBoard';


const tabsConfig = [
  { label: '공지사항', value: "cbNotice", href: <CategoryBoardNotice />},
  { label: '자주묻는질문', value: "cbQna", href: <CategoryBoardQna />},
  { label: '교육문의', value: "cbQuestion", href: <CategoryBoardQuestion />},
  { label: '문의내역조회', value: "cbLook", href: <CategoryBoardLook />},
]

export function CategoryBoard() {

  // const router = useRouter();
  const [value , setValue] = useState(tabsConfig[0].value)

  const onChange = (newValue:string) =>{
    setValue(newValue)
  }
  // console.log(value)


  // const { categorySeq } = router.query;
  //const { data, error } = useCategoryBoard(Number(categorySeq)); ////
  // const dialog = useDialog();
  // const snackbar = useSnackbar();

  return (
    <NoticeContainer>
      <Box sx={{ mb: '30px' }}>
        <Tabs2
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
          return (
            <Box hidden={item.value !== value} >
              {item.href}
            </Box>
          )
        })}
      </Box>
  
    </NoticeContainer>
  )
}

const NoticeContainer = styled(Container)`
  width: 900px;
`