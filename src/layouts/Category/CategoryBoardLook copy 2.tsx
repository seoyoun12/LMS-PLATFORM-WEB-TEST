import { Container } from "@mui/material";
import styles from '@styles/common.module.scss';
import styled from '@emotion/styled';
import { qnaList } from "@common/api/qna";
import { BoardAccordion } from "@components/ui";
import { useState } from "react";
import * as React from 'react';
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from '@components/common';
import { grey } from '@mui/material/colors';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import dateFormat from 'dateformat';



interface QnaBoardAccordionList {
  date?: string | undefined;
  // answerType: string | undefined; // 질문 or 답변
  title: string | undefined;
  children: {
    firstContent: string;
    secondContent: string;
    isActive: boolean;
  }[];
}


export function CategoryBoardLook({ qnaBoardAccordionList } : { qnaBoardAccordionList : QnaBoardAccordionList[] }) {

  const [ page, setPage ] = useState(0);
  const { data, error, mutate } = qnaList({ page });

  return (

    <Container>
      {data && data?.map((data) => {
        const accordionInfo = [{ 
          date: data.createdDtime, 
          title: data.title, 
          children: [{ firstContent: data.content}] 
        }]



        {qnaBoardAccordionList.map(({ date, title, children }, idx) => (
          <MuiAccordion
            key={title}
            disableGutters elevation={0}
            sx={{
              '&:before': {
                display: 'none',
              },
            }}
          >
            {/*  */}
            <AccordionSummary className='Asdasd'
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              sx={{
                '&:hover': {
                  backgroundColor: grey[50]
                }
              }}
            >
            {/*  */}

              <BoardBox display="flex" flexDirection={"column"} width="100%" >
                <Typography className='CategoryBoardOne'>{dateFormat(date, 'isoDate')}</Typography>
                <Typography className='CategoryBoardTwo'>{title}</Typography>
              </BoardBox>
            </AccordionSummary>
            <BoardAccordionDetails>
              <nav aria-label="secondary mailbox folders">
                <List disablePadding={true}>
                  {children.map(({ firstContent, isActive }, idx) => (
                    <ListItem
                      disablePadding
                      sx={{
                        backgroundColor: `${isActive ? grey[50] : 'inherit'}`,
                      }}
                    >
                      <ListItemButton>
                        <ListItemText primary={title} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </nav>
            </BoardAccordionDetails>
          </MuiAccordion>
        ))}



        
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


const BoardBox = styled(Box)`
  .CategoryBoardOne {
    color: #a59d9d;
  }

  .CategoryBoardTwo {
    font-weight: bold;
    font-size: 1.3rem;
    width: 100%;
  }
`

const BoardAccordionDetails = styled(AccordionDetails)`
  background-color: #e0e0e0;
  padding: 0px;
  margin-bottom: 30px;
`