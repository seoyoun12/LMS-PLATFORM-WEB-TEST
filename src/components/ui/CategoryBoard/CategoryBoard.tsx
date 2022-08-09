import { Container } from "@mui/system";
import styled from '@emotion/styled';
import { Box } from "@mui/material";
import { useState } from "react";
import { CategoryBoardNotice } from "@layouts/Category/CategoryBoardNotice";
import { CategoryBoardFaq } from "@layouts/Category/CategoryBoardFaq";
import { CategoryBoardQuestion } from "@layouts/Category/CategoryBoardQuestion";
import { CategoryBoardLook } from "@layouts/Category/CategoryBoardLook";
import { Tabs2 } from '@components/ui/Tabs2';
import { useRouter } from "next/router";


const tabsConfig = [
  { label: '공지사항', value: "cbNotice", href: <CategoryBoardNotice />},
  { label: '자주묻는질문', value: "cbFaq", href: <CategoryBoardFaq />},
  { label: '교육문의', value: "cbQuestion", href: <CategoryBoardQuestion />},
  { label: '문의내역조회', value: "cbLook", href: <CategoryBoardLook />},
]

export function CategoryBoard() {

  const [value , setValue] = useState(tabsConfig[0].value)
  const router = useRouter()

  const onChange = (newValue:string) =>{
    setValue(newValue)
  }

  // useLayoutEffect(()=>{
  //   console.log(router.route.split('/traffic/')[1])
  //   setValue(router.route.split('/traffic/')[1])
  // },[])

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
            <Box hidden={item.value !== value} key={item.value}>
              {/* key props error */}
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