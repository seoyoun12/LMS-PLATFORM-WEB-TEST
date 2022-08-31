import { NotFound } from '@components/ui/NotFound';
import { QnaAccordion, QnaAccordionV2 } from '@components/ui/QnaAccordion.tsx';
import { useInfiniteScrollQna } from '@hooks/useInfiniteScrollQna';
import useResponsive from '@hooks/useResponsive';
import { Box, Container, Table, TableCell, TableHead, TableRow } from '@mui/material';
import dateFormat from 'dateformat';
import styled from 'styled-components';

export function CategoryBoardLookList() {
  const [target, loadedItem, loading] = useInfiniteScrollQna(`/qna`);
  const isTablet = !useResponsive();

  console.log(loadedItem, 'ㅋㅋ', isTablet);
  return (
    <LkContainer>
      {loadedItem && loadedItem.length > 0 ? (
        <>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background: '#fbfbfb',
                  borderTop: '3px solid #333333',
                  borderBottom: '1px solid #cdcdcd',
                }}
              >
                <TableSeqCell align="center">번호 </TableSeqCell>
                <TableTitleCell align="center">제목</TableTitleCell>
                <TableStatusCell align="center">답변상태 </TableStatusCell>
                <TableCreatedCell align="center">
                  {isTablet ? '' : '등록일'}{' '}
                </TableCreatedCell>
              </TableRow>
            </TableHead>
          </Table>
          <QnaAccordionV2 loadedItem={loadedItem} />
          {/* {loadedItem &&
            loadedItem.map(data => {
              const accordionInfo = [
                {
                  seq: data.seq,
                  title: data.title,
                  date: data.createdDtimeYmd?.slice(0, -1),
                  answeredYN: data.answeredYn,
                  children: [
                    {
                      firstContent: data.content,
                      secondContent: dateFormat(data.createdDtime, 'isoDate'),
                      thirdContent: data.s3Files[0] ? data.s3Files[0].name : '파일없음',
                      fourthContent: dateFormat(data.qnaAnswer?.createdDtime, 'isoDate'),
                      fifthContent: data.qnaAnswer?.content,
                      sixthContent: data.qnaAnswer?.s3Files[0]
                        ? data.qnaAnswer?.s3Files[0].name
                        : '파일없음',
                    },
                  ],
                },
              ];
              return <QnaAccordion qnaAccordionList={accordionInfo} key={data.seq} />;
            })} */}
        </>
      ) : (
        <NotFound content="내 질문내역이 존재하지 않습니다" />
      )}
      <Box ref={target} height="50px">
        {loading ? <Container /> : ''}
      </Box>
    </LkContainer>
  );
}

const LkContainer = styled(Container)`
  width: 100%;
  height: 100%;
`;

const TableHeaderCell = styled(TableCell)`
  font-size: 16px;
  font-weight: 400;
`;

const TableSeqCell = styled(TableCell)`
  font-size: 16px;
  font-weight: 400;
  width: 20%;
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 16px 0;
  }
`;
const TableTitleCell = styled(TableCell)`
  font-size: 16px;
  font-weight: 400;
  width: 35%;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 16px 0;
  }
`;
const TableStatusCell = styled(TableCell)`
  font-size: 16px;
  font-weight: 400;
  width: 25%;
  @media (max-width: 768px) {
    width: 45%;
    font-size: 14px;
    padding: 16px 0;
  }
`;
const TableCreatedCell = styled(TableCell)`
  font-size: 16px;
  font-weight: 400;
  width: 20%;
  @media (max-width: 768px) {
    width: 0;
    font-size: 14px;
    padding: 16px 0;
  }
`;
