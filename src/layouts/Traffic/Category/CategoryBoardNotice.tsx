import { Container, Box, Table, TableHead, TableRow, TableCell } from '@mui/material';
import { BoardAccordion } from '@components/ui/BoardAccordion';
import React from 'react';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import styled from '@emotion/styled';

export function CategoryBoardNotice() {
  const [target, loadedItem, loading] = useInfiniteScroll(`/post`, 'TYPE_NOTICE');

  return (
    <Container>
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
      {loadedItem &&
        loadedItem.map(content => {
          const accordionInfo = [
            {
              seq: content.seq,
              date: content.createdDtime,
              name: content.subject,
              children: [{ name: content.content }],
            },
          ];
          return <BoardAccordion boardAccordionList={accordionInfo} key={content.seq} />;
        })}
      <Box ref={target} height="100px">
        {loading ? <Container /> : ''}
      </Box>
    </Container>
  );
}

const TableHeaderCell = styled(TableCell)`
  font-size: 16px;
  font-weight: 400;
`;
