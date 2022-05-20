import { removeCourse, useCourseList } from '@common/api/course';
import { Table } from '@components/ui';
import { Button, Chip, TableBody, TableHead, Typography } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useEffect, useState } from 'react';
import { Link } from '@components/common';
import { grey } from '@mui/material/colors';
import { useSnackbar } from '@hooks/useSnackbar';
import { useDialog } from '@hooks/useDialog';
import * as React from 'react';
import { useRouter } from 'next/router';
import styles from '@styles/common.module.scss';
import { Container } from '@mui/material';
import dateFormat from 'dateformat';
import { YN } from '@common/constant';
import { mutate } from 'swr';

const headRows = [
  { name: 'seq' },
  { name: '과정명' },
  { name: '생성 날짜' },
  { name: '노출 여부' },
  { name: '상태' }
];

export function Course() {
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const router = useRouter();
  const [ page, setPage ] = useState(0);
  const { data, error } = useCourseList({ page });

  useEffect(() => {
    const { page } = router.query;
    setPage(!isNaN(Number(page)) ? Number(page) : 0);
  }, [ router ]);


  const onChangePage = async (page: number) => {
    await router.push({
      pathname: router.pathname,
      query: {
        page
      }
    });
  };

  const onRemoveCourse = async (courseId: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: '과정 삭제하기',
        description: '정말로 삭제하시겠습니까?',
        confirmText: '삭제하기',
        cancelText: '취소'
      });
      if (dialogConfirmed) {
        await removeCourse({ courseId });
        snackbar({ variant: 'success', message: '성공적으로 삭제되었습니다.' });
        await mutate([ `/course/adm`, { params: { page } } ]);
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  if (error) return <div>Error</div>;
  if (!data) return <div>Loading</div>;
  return (
    <Container className={styles.globalContainer}>
      <Typography
        variant="h5"
        sx={{
          mb: '12px',
          fontWeight: 700
        }}
      >과정 목록</Typography>
      <Table
        pagination={true}
        totalNum={data.totalElements}
        page={data.number}
        onChangePage={onChangePage}
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
        <TableBody>
          {data.content.map((content) => (
            <TableRow key={content.seq} hover>
              <TableCell style={{ width: 10 }} component="th" scope="row">
                {content.seq}
              </TableCell>
              <TableCell style={{ width: 200 }} align="right">
                <Link
                  href={`/course/${content.seq}`}
                  underline="hover"
                  color={grey[900]}
                >
                  {content.courseName}
                </Link>
              </TableCell>
              <TableCell style={{ width: 70 }} align="right">
                {dateFormat(content.createdDtime, 'isoDate')}
              </TableCell>
              <TableCell style={{ width: 10 }} align="right">
                <Chip
                  label={content.displayYn === YN.YES ? '보임' : '숨김'}
                  variant="outlined"
                  size="small"
                  color={content.displayYn === YN.YES ? 'secondary' : 'default'}
                />
              </TableCell>
              <TableCell style={{ width: 10 }} align="right">
                <Chip
                  label={content.status ? '정상' : '중지'}
                  variant="outlined"
                  size="small"
                  color={content.status ? 'secondary' : 'default'}
                />
              </TableCell>

              <TableCell style={{ width: 120 }} align="right">
                <Link href={`/admin-center/course/modify/${content.seq}`}>
                  <Button variant="text" color="neutral" size="small">
                    수정
                  </Button>
                </Link>
                <Button
                  variant="text"
                  color="warning"
                  onClick={() => onRemoveCourse(content.seq)}
                  size="small"
                >
                  삭제
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
