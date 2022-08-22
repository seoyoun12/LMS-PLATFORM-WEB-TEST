import { QnaAccordion } from '@components/ui/QnaAccordion.tsx';
import { useInfiniteScrollQna } from '@hooks/useInfiniteScrollQna';
import { Box, Container, Table, TableCell, TableHead, TableRow } from '@mui/material';
import dateFormat from 'dateformat';
import styled from 'styled-components';

export function CategoryBoardLookList() {
  const [target, loadedItem, loading] = useInfiniteScrollQna(`/qna`);

  return (
    <LkContainer>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              background: '#fbfbfb',
              borderTop: '3px solid #333333',
              borderBottom: '1px solid #cdcdcd',
            }}
          >
            <TableHeaderCell align="center" width="10%">
              번호
            </TableHeaderCell>
            <TableHeaderCell align="center" width="55%">
              제목
            </TableHeaderCell>
            <TableHeaderCell align="center" width="15%">
              답변상태
            </TableHeaderCell>
            <TableHeaderCell align="center" width="20%">
              등록일
            </TableHeaderCell>
          </TableRow>
        </TableHead>
      </Table>
      {loadedItem &&
        loadedItem.map(data => {
          const accordionInfo = [
            {
              seq: data.seq,
              title: data.title,
              date: data.createdDtimeYmd.slice(0, -1),
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
        })}
      <Box ref={target} height="100px">
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
