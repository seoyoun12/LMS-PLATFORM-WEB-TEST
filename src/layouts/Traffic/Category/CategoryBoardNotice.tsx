import { Container, Box, Table, TableHead, TableRow, TableCell } from '@mui/material';
import { BoardAccordion, BoardAccordionV2 } from '@components/ui/BoardAccordion';
import React from 'react';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import styled from '@emotion/styled';
import { NotFound } from '@components/ui/NotFound';
import { Spinner } from '@components/ui';
import { S3Files } from 'types/file';

export function CategoryBoardNotice() {
  const [target, loadedItem, loading] = useInfiniteScroll(`/post`, 'TYPE_NOTICE');
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
                <TableSeqCell align="center">번호 </TableSeqCell>
                <TableTitleCell align="center">제목 </TableTitleCell>
                <TableCreatedCell align="center">등록일 </TableCreatedCell>
              </TableRow>
            </TableHead>
          </Table>
          <BoardAccordionV2 accordianInfo={accordianInfo} />
        </>
      ) : (
        <NotFound content="공지사항게시글이 존재하지 않습니다!" />
      )}
      <Box ref={target} height="50px">
        {loading ? <Spinner fit={true} /> : ''}
      </Box>
    </Container>
    // <Container>
    //   <Table>
    //     <TableHead>
    //       <TableRow
    //         sx={{
    //           background: '#fbfbfb',
    //           borderTop: '3px solid #333333',
    //           borderBottom: '1px solid #cdcdcd',
    //         }}
    //       >
    //         <TableHeaderCell align="center" width="10%">
    //           번호{' '}
    //         </TableHeaderCell>
    //         <TableHeaderCell align="center" width="70%">
    //           제목{' '}
    //         </TableHeaderCell>
    //         <TableHeaderCell align="center" width="20%">
    //           등록일{' '}
    //         </TableHeaderCell>
    //       </TableRow>
    //     </TableHead>
    //   </Table>
    //   {loadedItem &&
    //     loadedItem.map(content => {
    //       const accordionInfo = [
    //         {
    //           seq: content.seq,
    //           date: content.createdDtimeYmd.slice(0, -1),
    //           name: content.subject,
    //           children: [{ name: content.content }],
    //         },
    //       ];
    //       return <BoardAccordion boardAccordionList={accordionInfo} key={content.seq} />;
    //     })}
    //   <Box ref={target} height="100px">
    //     {loading ? <Container /> : ''}
    //   </Box>
    // </Container>
  );
}

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
  }
`;
const TableTitleCell = styled(TableCell)`
  font-size: 16px;
  font-weight: 400;
  width: 50%;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
const TableCreatedCell = styled(TableCell)`
  font-size: 16px;
  font-weight: 400;
  width: 30%;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
