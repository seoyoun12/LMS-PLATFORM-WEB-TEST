import styles from '@styles/common.module.scss';
import { Container, TableHead } from '@mui/material';
import { Table } from '@components/ui';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import * as React from 'react';
import { useRouter } from 'next/router';

const headRows = [
  { name: 'ID' },
  { name: '콘텐츠 유형' },
  { name: '강의명' },
  { name: '학습시간' },
  { name: '인정시간' },
  { name: '페이지' },
  { name: '페이지 정보' },
  { name: '상태' },
];

export function LessonList() {
  const router = useRouter();

  const onChangePage = async (page: number) => {
    await router.push({
      pathname: router.pathname,
      query: {
        page
      }
    });
  };

  return (
    <Container className={styles.globalContainer}>
      <Table
        pagination={true}
        totalNum={10}
        onChangePage={onChangePage}
        page={0}
        size="small"
      >
        <TableHead>
          <TableRow>
            <TableCell>{headRows[0].name}</TableCell>
            {headRows.slice(1).map(({ name }: { name: string }) =>
              <TableCell key={name} align="right">{name}</TableCell>
            )}
            <TableCell>{}</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </Container>
  );
}
