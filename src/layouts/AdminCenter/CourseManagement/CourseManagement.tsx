import { removeCourse, useCourseList } from '@common/api/adm/course';
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
import { Spinner } from '@components/ui';
import { css } from '@emotion/css';
import { courseAdmList, courseList, courseRemove } from '@common/api/course';

const headRows: { name: string; align: 'inherit' | 'left' | 'center' | 'right' | 'justify'; }[] = [
  { name: 'seq', align: 'left' },
  { name: '과정명', align: 'right' },
  { name: '생성 날짜', align: 'right' },
  { name: '노출 여부', align: 'right' },
  { name: '상태', align: 'right' },
  { name: '수강생', align: 'right' },
  { name: '수료생', align: 'right' },
];

export function CourseManagement() {
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const router = useRouter();
  const [ page, setPage ] = useState(0);
  const [ seq, setSeq ] = useState<number | null>(null);

  const { data, error, mutate } = courseAdmList({ page });
  // const { data, error, mutate } = courseList({ page });


  console.log("CourseManagement data : ", data);


  // pagination
  useEffect(() => {
    console.log('useEffect Triggered');
    const { page } = router.query;
    setPage(!isNaN(Number(page)) ? Number(page) : 0);
  }, [ router.query ]);

  const onChangePage = async (page: number) => {
    await router.push({
      pathname: router.pathname,
      query: {
        page
      }
    });
  };




  // 수정
  const onClickModifyCourse = async (seq : number) => {
    setSeq(seq);
    console.log("modifyseq(CourseManageMent) : ", seq)
    console.log("modify(CourseManageMent) : ", data)
    router.push(`/admin-center/course/modify/${seq}`);
    mutate();
  }



  // 삭제
  const onClickRemoveCourse = async (seq: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: '과정 삭제하기',
        description: '정말로 삭제하시겠습니까?',
        confirmText: '삭제하기',
        cancelText: '취소'
      });
      if (dialogConfirmed) {
        await courseRemove(seq);
        snackbar({ variant: 'success', message: '성공적으로 삭제되었습니다.' });
        await mutate();
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
            {headRows.map(({ name, align }) =>
              <TableCell className={spaceNoWrap} key={name} align={align}>{name}</TableCell>
            )}
            <TableCell>{}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.content.map((course) => (
            <TableRow key={course.seq} hover>
              <TableCell>
                {course.seq}
              </TableCell>
              <TableCell align="right">
                <Link
                  href={`/course/${course.seq}`}
                  underline="hover"
                  color={grey[900]}
                >
                  {course.courseName}
                </Link>
              </TableCell>
              <TableCell align="right" className={spaceNoWrap}>
                {dateFormat(course.createdDtime, 'isoDate')}
              </TableCell>
              <TableCell align="right">
                <Chip
                  label={course.displayYn === YN.YES ? '보임' : '숨김'}
                  variant="outlined"
                  size="small"
                  color={course.displayYn === YN.YES ? 'secondary' : 'default'}
                />
              </TableCell>
              <TableCell align="right">
                <Chip
                  label={course.status ? '정상' : '중지'}
                  variant="outlined"
                  size="small"
                  color={course.status ? 'secondary' : 'default'}
                />
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>

              <TableCell align="right" className={spaceNoWrap}>
                {/* <Link href={`/admin-center/course/modify/${course.seq}`}> */}
                <Button
                  variant="text" 
                  color="neutral" 
                  size="small"
                  onClick={() => onClickModifyCourse(course.seq)}
                >
                  상세
                </Button>
                {/* </Link> */}
                <Button
                  variant="text"
                  color="warning"
                  onClick={() => onClickRemoveCourse(course.seq)}
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

const spaceNoWrap = css`
  white-space: nowrap;
`;

