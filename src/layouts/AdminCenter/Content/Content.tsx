import { Button, Chip, Container, TableBody, TableHead, Typography } from '@mui/material';
import styles from '@styles/common.module.scss';
import { Table } from '@components/ui';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Link } from '@components/common';
import { grey } from '@mui/material/colors';
import dateFormat from 'dateformat';
import * as React from 'react';
import { useSnackbar } from '@hooks/useSnackbar';
import { useDialog } from '@hooks/useDialog';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import { removeContent, useContentList } from '@common/api/content';
import { mutate } from 'swr';
import { ProductStatus } from '@common/api/course';
import { useContentList } from '@common/api/content';
import { Spinner } from '@components/ui';

const headRows = [
  { name: 'seq' },
  { name: '콘텐츠명' },
  { name: '생성 날짜' },
  { name: '상태' }
];

export function Content() {
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const router = useRouter();
  const [ page, setPage ] = useState(0);
  const { data, error } = useContentList({ page });

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

  const onRemoveCourse = async (contentId: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: '콘텐츠 삭제하기',
        description: '정말로 삭제하시겠습니까?',
        confirmText: '삭제하기',
        cancelText: '취소'
      });
      if (dialogConfirmed) {
        // await removeCourse({ contentId });
        snackbar({ variant: 'success', message: '성공적으로 삭제되었습니다.' });
        // await mutate([ `/content/adm`, { params: { page } } ]);
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  if (error) return <div>Error</div>;
  if (!data) return <Spinner />;
  return (
    <Container className={styles.globalContainer}>
      <Typography
        variant="h5"
        sx={{
          mb: '12px',
          fontWeight: 700
        }}
      >콘텐츠 목록</Typography>
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
                  href={`/content/${content.seq}`}
                  underline="hover"
                  color={grey[900]}
                >
                  {content.contentName}
                </Link>
              </TableCell>
              <TableCell style={{ width: 70 }} align="right">
                {dateFormat(content.createdDtime, 'isoDate')}
              </TableCell>
              <TableCell style={{ width: 10 }} align="right">
                <Chip
                  variant="outlined"
                  size="small"
                  label={content.status === ProductStatus.APPROVE ? '정상' : '중지'}
                  color={content.status === ProductStatus.APPROVE ? 'secondary' : 'default'}
                />
              </TableCell>

              <TableCell style={{ width: 120 }} align="right">
                <Link href={`/admin-center/content/modify/${content.seq}`}>
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
