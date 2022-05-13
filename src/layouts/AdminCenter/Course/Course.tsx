import { removeCourse, useCourseList } from '@common/api/course';
import { Table } from '@components/ui';
import { Button, TableBody, TableHead, Typography } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import * as React from 'react';
import { useState } from 'react';
import { Link } from '@components/common';
import { grey } from '@mui/material/colors';
import { useSnackbar } from '@hooks/useSnackbar';
import { useDialog } from '@hooks/useDialog';

const headRows = [
  { name: 'seq' },
  { name: '강의명' },
  { name: '생성 날짜' }
];

export function Course() {
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const [ page, setPage ] = useState(0);
  const { data, error } = useCourseList({ page });

  const onChangePage = async (page: number) => {
    const isConfirm = await dialog({
      variant: 'confirm',
      title: 'hello',
      description: 'test'
    });

    console.log(isConfirm);

    setPage(page);
  };

  const onRemoveCourse = (courseId: number) => {
    try {
      return removeCourse({ courseId });
    } catch (e: any) {
      snackbar({ type: 'error', text: e.message });
    }
  };

  if (error) return <div>Error</div>;
  if (!data) return <div>Loading</div>;
  return (
    <>
      <Typography
        variant="h5"
        sx={{
          mb: '12px',
          fontWeight: 700
        }}
      >과정 목록</Typography>
      <Table
        totalNum={data.totalElements}
        onChangePage={onChangePage}
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
          {data.content.map(({ seq, courseName, createdDtime }) => (
            <TableRow key={seq} hover>
              <TableCell style={{ width: 50 }} component="th" scope="row">
                {seq}
              </TableCell>
              <TableCell style={{ width: 300 }} align="right">
                <Link
                  href={`/course/${seq}`}
                  underline="hover"
                  color={grey[900]}
                >
                  {courseName}
                </Link>
              </TableCell>
              <TableCell style={{ width: 250 }} align="right">
                {createdDtime}
              </TableCell>
              <TableCell style={{ width: 115 }} align="right">
                <Link href={`/admin-center/course/modify/${seq}`}>
                  <Button variant="text" color="neutral">
                    수정
                  </Button>
                </Link>
                <Button
                  variant="text"
                  color="warning"
                  onClick={() => onRemoveCourse(seq)}
                >
                  삭제
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
