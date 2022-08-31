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
import { ProductStatus } from '@common/api/course';
import { useContentList } from '@common/api/adm/content';
import { Spinner } from '@components/ui';
import { mutate } from 'swr';

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}[] = [
  { name: '번호', align: 'left' },
  { name: '콘텐츠명', align: 'center' },
  { name: '생성 날짜', align: 'center' },
  { name: '상태', align: 'center' },
];

export function ContentManagement() {
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const router = useRouter();
  const [page, setPage] = useState(0);
  const { data, error } = useContentList({ page });

  useEffect(() => {
    const { page } = router.query;
    setPage(!isNaN(Number(page)) ? Number(page) : 0);
  }, [router]);

  const onChangePage = async (page: number) => {
    await router.push({
      pathname: router.pathname,
      query: {
        page,
      },
    });
  };

  const onClickModifyContent = async (seq: number) => {
    router.push(`/admin-center/content/modify/${seq}`);
  };

  // const onRemoveCourse = async (contentSeq: number) => {
  //   try {
  //     const dialogConfirmed = await dialog({
  //       title: '콘텐츠 삭제하기',
  //       description: '정말로 삭제하시겠습니까?',
  //       confirmText: '삭제하기',
  //       cancelText: '취소',
  //     });
  //     if (dialogConfirmed) {
  //       // await removeCourse({ contentSeq });
  //       snackbar({ variant: 'success', message: '성공적으로 삭제되었습니다.' });
  //       // await mutate([ `/content/adm`, { params: { page } } ]);
  //     }
  //   } catch (e: any) {
  //     snackbar({ variant: 'error', message: e.data.message });
  //   }
  // };

  if (error) return <div>Error</div>;
  if (!data) return <Spinner />;
  return (
    <Container className={styles.globalContainer}>
      <Typography
        variant="h5"
        sx={{
          mb: '12px',
          fontWeight: 700,
        }}
      >
        콘텐츠 목록
      </Typography>
      <Table
        pagination={true}
        totalNum={data.totalElements}
        page={data.number}
        onChangePage={onChangePage}
        size="small"
      >
        <TableHead>
          <TableRow>
            {headRows.map(({ name, align }) => (
              <TableCell key={name} align={align}>
                {name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.content.map(content => (
            <TableRow
              sx={{ cursor: 'pointer' }}
              key={content.seq}
              hover
              onClick={() => onClickModifyContent(content.seq)}
            >
              <TableCell style={{ width: '10%' }} component="th" scope="row">
                {content.seq}
              </TableCell>
              <TableCell style={{ width: '50%' }} align="left">
                <Link
                  href={`/admin-center/content/modify/${content.seq}`}
                  underline="hover"
                  color={grey[900]}
                >
                  {content.contentName}
                </Link>
              </TableCell>
              <TableCell style={{ width: '39%' }} align="center">
                {dateFormat(content.createdDtime, 'isoDate')}
              </TableCell>
              <TableCell style={{ width: '10%' }} align="center">
                <Chip
                  variant="outlined"
                  size="small"
                  label={content.status === ProductStatus.APPROVE ? '정상' : '중지'}
                  color={
                    content.status === ProductStatus.APPROVE ? 'secondary' : 'default'
                  }
                />
              </TableCell>

              {/* <TableCell style={{ width: 120 }} align="right">
                <Link href={`/admin-center/content/modify/${content.seq}`}>
                  <Button variant="text" color="neutral" size="small">
                    상세
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
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
