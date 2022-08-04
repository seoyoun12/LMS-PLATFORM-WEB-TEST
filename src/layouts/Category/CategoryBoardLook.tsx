import { Box, Container } from "@mui/material";
import styles from '@styles/common.module.scss';
import styled from '@emotion/styled';
import { AnsweredYn, qnaList } from "@common/api/qna";
import { BoardAccordion } from "@components/ui";
import { useState } from "react";
import { QnaAccordion } from "@components/ui/QnaAccordion.tsx";
import dateFormat from "dateformat";
import { useInfiniteScrollQna } from "@hooks/useInfiniteScrollQna";

export function CategoryBoardLook() {

  const [target , loadedItem , loading] = useInfiniteScrollQna(`/qna`)

  return (

    <Container>
      {loadedItem && loadedItem.map((data) => {
        console.log("2. data.content : ", data.content)
        console.log("2. data: ", data)
        const accordionInfo = [{ 
          // date: data.createdDtime, 
          title: data.title, 
          answeredYN: data.answeredYn,
          children: [{ 
            firstContent: data.content, 
            secondContent: dateFormat(data.createdDtime, 'isoDate'),
            thirdContent: data.s3Files[0] ? data.s3Files[0].name : "파일없음",
            fourthContent: dateFormat(data.qnaAnswer?.createdDtime, 'isoDate'),
            fifthContent : data.qnaAnswer?.content
          }]
        }]
        return <QnaAccordion qnaAccordionList={accordionInfo}/>
      })}
      <Box ref={target} height='100px' >{loading ? <div /> : ""}</Box>
    </Container>

  )

}

const NtContainer = styled(Container)`
  /* box-sizing: border-box;
  border: 1px solid black; */
  width: 100%;
  height: 100%;
`