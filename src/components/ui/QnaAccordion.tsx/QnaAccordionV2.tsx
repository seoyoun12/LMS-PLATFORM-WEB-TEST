import * as React from 'react';
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import styled from '@emotion/styled';
import { AnsweredYn, Qna } from '@common/api/qna';
import dateFormat from 'dateformat';
import { TuiViewer } from '@components/common/TuiEditor';
import useResponsive from '@hooks/useResponsive';
import { downloadFile } from '@common/api/file';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface QnaBoardAccordionList {
  // date?: string | undefined;
  // answerType: string | undefined; // 질문 or 답변
  seq: number;
  title: string | undefined;
  date?: string | undefined;
  answeredYN: string;
  children: {
    firstContent?: string;
    secondContent?: string;
    thirdContent?: string;
    fourthContent?: string;
    fifthContent?: string;
    sixthContent?: string;
    isActive?: boolean;
  }[];
}

export function QnaAccordionV2({ loadedItem }: { loadedItem: Qna[] }) {
  const isTabled = !useResponsive();
  const [value, setValue] = React.useState<number>(null);
  console.log(loadedItem, 'sdsd');

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setValue(newExpanded ? panel : null);
    };
  return (
    <Wrap>
      <TableContainer sx={{ width: '100%' }}>
        {loadedItem.map(
          ({ seq, title, createdDtimeYmd, createdDtime, answeredYn, ...rest }, idx) => (
            <MuiAccordion
              key={title}
              disableGutters
              elevation={0}
              expanded={value === seq}
              onChange={handleChange(seq)}
              sx={{
                overflow: 'hidden', //scroll
                '&:before': {
                  display: 'none',
                },
              }}
            >
              <AccordionSummary
                className="Asdasd"
                expandIcon={
                  <ExpandMoreIcon sx={{ position: 'absolute', width: '50px' }} />
                }
                aria-controls="panel1a-content"
                sx={{
                  padding: 0,
                  '&:hover': {
                    backgroundColor: grey[50],
                  },
                }}
              >
                <TableBody sx={{ display: 'table', width: '100%' }}>
                  <BoardBox>
                    <SeqBox className="QnaBoardOne">{seq}</SeqBox>
                    {/* <Typography className="QnaBoardTwo" width="55%">
                    {title}
                  </Typography> */}
                    <TitleBox className="QnaBoardTwo">{title}</TitleBox>
                    <StatusBox className="QnaBoardThird">
                      <Chip
                        sx={{ width: '80px', marginLeft: '10px', marginBottom: '3px' }}
                        // variant="outlined"
                        size="small"
                        label={
                          answeredYn === AnsweredYn.ANSWEREDY ? '답변 완료' : '답변 대기'
                        }
                        color={
                          answeredYn === AnsweredYn.ANSWEREDY ? 'secondary' : 'warning'
                        }
                      />
                    </StatusBox>
                    <CreatedBox className="QnaBoardFour">
                      {isTabled ? '' : createdDtime.split(' ')[0]}
                    </CreatedBox>
                  </BoardBox>
                </TableBody>
              </AccordionSummary>
              <BoardAccordionDetails>
                <nav aria-label="secondary mailbox folders">
                  <List disablePadding={true}>
                    <ListItem
                      disablePadding
                      key={idx} // key props error
                      // sx={{
                      //   backgroundColor: `${isActive ? grey[50] : 'inherit'}`,
                      // }}
                    >
                      <TableBody sx={{ display: 'table', width: '100%' }}>
                        <TableRow>
                          <TableCellLeft
                            align="center"
                            sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                          >
                            질문
                          </TableCellLeft>
                          <TableCellRight>
                            <QuestionBoardBox
                            // display="flex" flexDirection={'column'} width="100%"
                            >
                              {/* <ListItemText primary={dateFormat(createdDtimeYmd, 'isoDate')} className="SecondContent" />
                            <ListItemText primary={rest.content} className="FirstContent" />
                            <ListItemText primary={rest.s3Files[0] ? rest.s3Files[0].name : '파일없음'} className="ThirdContent" /> */}
                              <QuestContentBoxWrap>
                                <QuestContentBox>
                                  <TuiViewer initialValue={rest.content} />
                                </QuestContentBox>
                                <Box>
                                  {rest.s3Files.length > 0 && (
                                    <Box display="flex" alignItems="center" mt={4}>
                                      {' '}
                                      <FileDownloadIcon />
                                      첨부파일
                                    </Box>
                                  )}
                                  {/* <FileDownloadIcon />
                                  첨부파일 */}
                                </Box>
                                <QuestFileBox
                                  sx={{
                                    cursor: 'pointer',
                                    color: '#236cef',
                                    display: 'inline-block',
                                  }}
                                  onClick={async () => {
                                    try {
                                      const blobData = await downloadFile(
                                        rest.s3Files[0].seq
                                      );
                                      const url = window.URL.createObjectURL(
                                        new Blob([blobData])
                                      );
                                      const a = document.createElement('a');
                                      a.href = url;
                                      a.download = `${rest.s3Files[0].name}`;
                                      a.click();
                                      a.remove();
                                    } catch (e: any) {
                                      console.log(e);
                                    }
                                  }}
                                  // primary={
                                  //   rest.s3Files[0] ? rest.s3Files[0].name : '파일없음'
                                  // }
                                  className="ThirdContent"
                                >
                                  {rest.s3Files[0]?.name}
                                </QuestFileBox>
                              </QuestContentBoxWrap>
                              <QuestCreatedBox
                                primary={dateFormat(createdDtimeYmd, 'isoDate')}
                                className="SecondContent"
                              />
                            </QuestionBoardBox>
                          </TableCellRight>
                        </TableRow>

                        {answeredYn === AnsweredYn.ANSWEREDY ? (
                          <TableRow sx={{ backgroundColor: 'white' }}>
                            <TableCellLeft
                              align="center"
                              sx={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                backgroundColor: 'white',
                              }}
                            >
                              답변
                            </TableCellLeft>
                            <TableCellRight>
                              <AnswerBoardBox
                              // display="flex" flexDirection={'column'} width="100%"
                              >
                                {/* <ListItemText primary={dateFormat(rest.qnaAnswer?.createdDtime, 'isoDate')} className="FourthContent" />
                              <ListItemText primary={rest.qnaAnswer?.content} className="FifthContent" />
                              <ListItemText
                                primary={rest.s3Files[0] ? rest.qnaAnswer?.s3Files[0].name : '파일없음'}
                                className="SixthContent"
                              /> */}
                                <AnswerContentBoxWrap>
                                  <AnswerContentBox>
                                    <TuiViewer initialValue={rest.qnaAnswer?.content} />
                                  </AnswerContentBox>
                                  <Box display="flex" alignItems="center" mt={4}>
                                    {' '}
                                    <FileDownloadIcon />
                                    첨부파일
                                  </Box>
                                  <AnswerFileBox
                                    onClick={async () => {
                                      try {
                                        const blobData = await downloadFile(
                                          rest.qnaAnswer?.s3Files[0].seq
                                        );

                                        const url = window.URL.createObjectURL(
                                          new Blob([blobData])
                                        );
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = `${rest.qnaAnswer?.s3Files[0].name}`;
                                        a.click();
                                        a.remove();
                                      } catch (e: any) {
                                        console.log(e);
                                      }
                                    }}
                                    primary={
                                      rest.s3Files[0]
                                        ? rest.qnaAnswer?.s3Files[0].name
                                        : '파일없음'
                                    }
                                    className="SixthContent"
                                  />
                                </AnswerContentBoxWrap>
                                <AnswerCreatedBox
                                  primary={rest.qnaAnswer?.createdDtime.split(' ')[0]}
                                  className="FourthContent"
                                />
                                {/* <AnswerContentBox primary={rest.qnaAnswer?.content} className="FifthContent" /> */}
                              </AnswerBoardBox>
                            </TableCellRight>
                          </TableRow>
                        ) : (
                          <div></div>
                        )}
                      </TableBody>
                    </ListItem>
                  </List>
                </nav>
              </BoardAccordionDetails>
            </MuiAccordion>
          )
        )}
      </TableContainer>
    </Wrap>
  );
}

const Wrap = styled(Box)`
  .MuiAccordionSummary-expandIconWrapper {
    position: absolute;
    right: 0;
    width: 50px;
    height: 24px;
  }
`;

const BoardBox = styled(Box)`
  display: flex;
  width: 100%;
  align-items: center;
  /* .QnaBoardOne {
    color: #a59d9d;
    text-align: center;
    width: 10%;
  }
  .QnaBoardTwo {
    // font-weight: bold;
    // font-size: 1.3rem;
    text-align: center;
    width: 55%;
  }
  .QnaBoardThird {
    font-weight: bold;
    font-size: 1.3rem;
    width: 15%;
    text-align: center;
  }
  .QnaBoardFour {
    text-align: center;
    width: 20%;
  } */
`;

const QuestionBoardBox = styled(Box)`
  display: flex;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
  /* .QnaBoardOne {
    color: #a59d9d;
  }

  .QnaBoardTwo {
    // font-weight: bold;
    // font-size: 1.3rem;
    width: 100%;
  } */
`;

const AnswerBoardBox = styled(Box)`
  display: flex;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
  .QnaBoardTwo {
    // font-weight: bold;
    // font-size: 1.3rem;
    width: 100%;
  }
`;

const BoardAccordionDetails = styled(AccordionDetails)`
  background-color: #e0e0e0;
  padding: 0px;
  /* margin-bottom: 30px; */
`;

const TableCellLeft = styled(TableCell)`
  width: 20%;
`;
const TableCellRight = styled(TableCell)`
  width: 80%;
  position: relative;

  /* .FirstContent {
    width: 100%;
    height: 100%;
    position: flex;
  }

  .SecondContent {
    color: #a59d9d;
    position: relative;
    width: 20%;
    float: right;
    text-align: center;
    margin-left: 80%;
    margin-top: -2%;
    margin-bottom: -0.5%;
  }

  .ThirdContent {
    color: #a59d9d;
    position: relative;
    float: right;
    text-align: center;
  }

  .FourthContent {
    color: #a59d9d;
    position: relative;
    width: 20%;
    float: right;
    text-align: center;
    margin-left: 80%;
    margin-top: -2%;
    margin-bottom: -0.5%;
  }

  .SixthContent {
    color: #a59d9d;
    position: relative;
    float: right;
    text-align: center;
  } */
`;

const SeqBox = styled(Box)`
  color: #a59d9d;
  text-align: center;
  width: 20%;
`;
const TitleBox = styled(Typography)`
  text-align: center;
  width: 35%;
`;
const StatusBox = styled(Box)`
  font-weight: bold;
  font-size: 1.3rem;
  text-align: center;
  width: 25%;

  @media (max-width: 768px) {
    width: 45%;
  }
`;
const CreatedBox = styled(Box)`
  text-align: center;
  width: 20%;

  @media (max-width: 768px) {
    width: 0;
  }
`;

const QuestContentBoxWrap = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 80%;
`;
const QuestContentBox = styled(ListItemText)``;
const QuestFileBox = styled(ListItemText)`
  width: fit-content;
`;
const QuestCreatedBox = styled(ListItemText)`
  color: #a59d9d;
  width: 20%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const AnswerContentBoxWrap = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 80%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const AnswerContentBox = styled(ListItemText)``;
const AnswerFileBox = styled(ListItemText)`
  width: fit-content;
`;
const AnswerCreatedBox = styled(ListItemText)`
  color: #a59d9d;
  width: 20%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
