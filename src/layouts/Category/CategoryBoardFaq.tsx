import { Box, Container, Table, TableCell, TableHead, TableRow } from '@mui/material';
import { BoardAccordion, BoardAccordionV2 } from '@components/ui/BoardAccordion';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import styled from '@emotion/styled';
import { NotFound } from '@components/ui/NotFound';
import { S3Files } from 'types/file';

export function CategoryBoardFaq() {
  const [target, loadedItem, loading] = useInfiniteScroll(`/post`, 'TYPE_FAQ');
  const accordianInfo: {
    seq: number;
    date: string;
    name: string;
    children: {
      content: string;
      s3Files: S3Files;
    };
  }[] = loadedItem.map(item => {
    return {
      seq: item.seq,
      date: item.createdDtimeYmd.slice(0, -1),
      name: item.subject,
      children: { content: item.content, s3Files: item.s3Files },
    };
  });
  return (
    <Container>
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
                <TableHeaderCell align="center" width="10%">
                  번호
                </TableHeaderCell>
                <TableHeaderCell align="center" width="70%">
                  제목
                </TableHeaderCell>
                <TableHeaderCell align="center" width="20%">
                  등록일
                </TableHeaderCell>
              </TableRow>
            </TableHead>
          </Table>

          <BoardAccordionV2 accordianInfo={accordianInfo} />
          {/* {loadedItem &&
            loadedItem.map(content => {
              const accordionInfo = [
                {
                  seq: content.seq,
                  date: content.createdDtimeYmd.slice(0, -1),
                  name: content.subject,
                  children: [{ name: content.content }],
                },
              ];
              return (
                <BoardAccordion key={content.seq} boardAccordionList={accordionInfo} />
              );
            })} */}
        </>
      ) : (
        <NotFound content="자주묻는질문이 존재하지 않습니다!" />
      )}
      <Box ref={target} height="100px">
        {loading ? <div /> : ''}
      </Box>
    </Container>
  );
}

const TableHeaderCell = styled(TableCell)`
  font-size: 16px;
  font-weight: 400;
`;
