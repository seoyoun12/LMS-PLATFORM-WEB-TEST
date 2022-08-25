import { Container, Box, TableCell, Table, TableHead, TableRow } from '@mui/material';
import { BoardAccordion, BoardAccordionV2 } from '@components/ui/BoardAccordion';
import React from 'react';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import { Spinner } from '@components/ui';
import styled from '@emotion/styled';
import { NotFound } from '@components/ui/NotFound';

export function CategoryBoardNotice() {
  const [target, loadedItem, loading] = useInfiniteScroll(`/post`, 'TYPE_NOTICE');

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
                  번호{' '}
                </TableHeaderCell>
                <TableHeaderCell align="center" width="70%">
                  제목{' '}
                </TableHeaderCell>
                <TableHeaderCell align="center" width="20%">
                  등록일{' '}
                </TableHeaderCell>
              </TableRow>
            </TableHead>
          </Table>
          <BoardAccordionV2 loadedItem={loadedItem} />
          {/* {loadedItem.map(content => {
            const accordionInfo = [
              {
                seq: content.seq,
                date: content.createdDtimeYmd.slice(0, -1),
                name: content.subject,
                children: [{ name: content.content }],
              },
            ];
            return <BoardAccordion key={content.seq}  boardAccordionList={accordionInfo} />;
          })} */}
        </>
      ) : (
        <NotFound content="공지사항게시글이 존재하지 않습니다!" />
      )}
      <Box ref={target} height="100px">
        {loading ? <Spinner /> : ''}
      </Box>
    </Container>
  );
}
const TableHeaderCell = styled(TableCell)`
  font-size: 16px;
  font-weight: 400;
`;
