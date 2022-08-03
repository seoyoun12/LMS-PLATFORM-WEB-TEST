import * as React from 'react';
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Chip, List, ListItem, ListItemButton, ListItemText, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Link } from '@components/common';
import { grey } from '@mui/material/colors';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import dateFormat from 'dateformat';
import styled from '@emotion/styled';
import { AnsweredYn } from '@common/api/qna';


interface QnaBoardAccordionList {
  // date?: string | undefined;
  // answerType: string | undefined; // 질문 or 답변
  title: string | undefined;
  answeredYN: string;
  children: {
    firstContent?: string;
    secondContent?: string;
    thirdContent?: string;
    fourthContent?: string;
    fifthContent?: string;
    isActive?: boolean;
  }[];
}


export function QnaAccordion({ qnaAccordionList } : { qnaAccordionList : QnaBoardAccordionList[] }) {

  return (

    <>
    <TableContainer sx={{ width: "100%" }}>
      
      {qnaAccordionList.map(({ title, answeredYN, children }, idx) => (
        <MuiAccordion
          key={title}
          disableGutters elevation={0}
          sx={{
            '&:before': {
              display: 'none',
          },
        }}
        >
          <AccordionSummary className='Asdasd'
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            sx={{
              '&:hover': {
                backgroundColor: grey[50]
              }
            }}
          >
            <TableBody sx={{ display: "table", width: "100%" }}>
              <BoardBox display="flex" flexDirection={"column"} width="100%" >
                <Typography className='QnaBoardTwo'>
                  {title}
                  <Chip
                    sx={{width: "100px", marginLeft: "10px", marginBottom: "3px"}}
                    // variant="outlined"
                    size="small"
                    label={answeredYN === AnsweredYn.ANSWEREDY ? '답변 완료' : '답변 대기'}
                    color={answeredYN === AnsweredYn.ANSWEREDY ? 'secondary' : 'warning'}
                  />
                </Typography>
                
              </BoardBox>
            </TableBody>

          </AccordionSummary>

          <BoardAccordionDetails>
            <nav aria-label="secondary mailbox folders">
              <List disablePadding={true}>
                {children.map(({ firstContent, secondContent, thirdContent, fourthContent, fifthContent, isActive }, ) => (
                  <ListItem
                    disablePadding
                    key={idx} // key props error
                    sx={{
                      backgroundColor: `${isActive ? grey[50] : 'inherit'}`,
                    }}
                  >
                    <TableBody sx={{ display: "table", width: "100%" }}>
                      <TableRow>
                        <TableCellLeft align="center" sx={{fontSize: "1.2rem", fontWeight: "bold"}}>질문</TableCellLeft>
                        <TableCellRight>
                          <QuestionBoardBox display="flex" flexDirection={"column"} width="100%" >
                            <ListItemText primary={secondContent} className="SecondContent"/>
                            <ListItemText primary={firstContent} className="FirstContent"/>
                            <ListItemText primary={thirdContent} className="ThirdContent"/>
                          </QuestionBoardBox>
                        </TableCellRight>
                      </TableRow>

                      <TableRow sx={{backgroundColor: "white"}}>
                        <TableCellLeft align="center" sx={{fontSize: "1.2rem", fontWeight: "bold", backgroundColor: "white"}}>답변</TableCellLeft>
                        <TableCellRight>
                          <AnswerBoardBox display="flex" flexDirection={"column"} width="100%" >
                            <ListItemText primary={fourthContent} className="FourthContent"/>
                            <ListItemText primary={fifthContent} className="FifthContent"/>
                          </AnswerBoardBox>
                        </TableCellRight>
                        </TableRow>
                    </TableBody>

                  </ListItem>
                ))}
              </List>
            </nav>
          </BoardAccordionDetails>

        </MuiAccordion>
      ))}

    </TableContainer>
    
    </>

  )

}

const BoardBox = styled(Box)`
.QnaBoardOne {
  color: #a59d9d;
}

.QnaBoardTwo {
  font-weight: bold;
  font-size: 1.3rem;
  width: 100%;
}
`


const QuestionBoardBox = styled(Box)`
  .QnaBoardOne {
    color: #a59d9d;
  }

  .QnaBoardTwo {
    font-weight: bold;
    font-size: 1.3rem;
    width: 100%;
  }
`

const AnswerBoardBox = styled(Box)`

  .QnaBoardTwo {
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

const TableCellLeft = styled(TableCell)`
  /* background: #e0e0e0; */
  /* border-top: 1px solid #b4b4b4;
  border-bottom: 1px solid #b4b4b4; */
  width: 20%;
  /* border-right: 1px solid #a59d9d; */
`
const TableCellRight = styled(TableCell)`
  /* border-top: 1px solid #b4b4b4;
  border-bottom: 1px solid #b4b4b4; */
  width: 80%;
  /* border: 1px solid black;
  box-sizing: border-box; */
  position: relative;
  /* margin: 0px;
  padding: 0px; */
  
  .FirstContent {
    /* border: 1px solid black;
    box-sizing: border-box; */
    width: 100%;
    height: 100%;
    float: left;
    position: flex;
  }

  .SecondContent {
    color: #a59d9d;
    /* border: 1px solid black;
    box-sizing: border-box; */
    position: relative;
    width: 20%;
    float: right;
    text-align: center;
    margin-left: 82%;
    margin-top: -2%;
    margin-bottom: -0.5%;
  }

  .ThirdContent {
    color: #a59d9d;
    /* border: 1px solid black;
    box-sizing: border-box; */
    position: relative;
    float: right;
    text-align: center;
    /* margin-top: 5%; */
  }

  .FourthContent {
    color: #a59d9d;
    /* border: 1px solid black;
    box-sizing: border-box; */
    position: relative;
    width: 20%;
    float: right;
    text-align: center;
    margin-left: 82%;
    margin-top: -2%;
    margin-bottom: -0.5%;
  }
`;
