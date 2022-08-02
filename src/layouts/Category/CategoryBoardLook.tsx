import { Container } from "@mui/material";
import styles from '@styles/common.module.scss';
import styled from '@emotion/styled';
import { AnsweredYn, qnaList } from "@common/api/qna";
import { BoardAccordion } from "@components/ui";
import { useState } from "react";
import { QnaAccordion } from "@components/ui/QnaAccordion.tsx";
import dateFormat from "dateformat";

export function CategoryBoardLook() {

  const [ page, setPage ] = useState(0);
  const { data, error, mutate } = qnaList({ page });
  
  return (

    <Container>
      {data && data?.map((data) => {
        console.log("카테고리 1대1문의 data", data);
        console.log("답변을 보자 : ", data?.qnaAnswer?.content);

        const accordionInfo = [{ 
          // date: data.createdDtime, 
          title: data.title, 
          answeredYN: data.answeredYn,
          children: [{ 
            firstContent: data.content, 
            secondContent: dateFormat(data.date, 'isoDate'),
            thirdContent: data.s3Files[0] ? data.s3Files[0].name : "파일없음",
            fourthContent: dateFormat(data.qnaAnswer?.createdDtime, 'isoDate'),
            fifthContent : data.qnaAnswer?.content
          }]
        }]
        return <QnaAccordion qnaAccordionList={accordionInfo}/>
      })}
    </Container>

  )

}

const NtContainer = styled(Container)`
  /* box-sizing: border-box;
  border: 1px solid black; */
  width: 100%;
  height: 100%;
`