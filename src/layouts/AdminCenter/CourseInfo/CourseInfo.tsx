import { Container, TableBody, TableHead, Typography, Button, Box } from '@mui/material';
import styles from '@styles/common.module.scss';
import { Table } from '@components/ui';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { userList, removeUser } from '@common/api/adm/user';
import styled from '@emotion/styled';
import { Spinner } from '@components/ui';
import dateFormat from 'dateformat';
import { UserModifyModal } from '@components/admin-center/UserModifyModal';
import { useSnackbar } from '@hooks/useSnackbar';
import { useDialog } from '@hooks/useDialog';
import { regCategoryType } from '@common/api/user';
import { useLearningInfo } from '@common/api/adm/learningInfo';

const headRows = [
  { name: '이름' },
  { name: '아이디' },
  { name: '과정명' },
  { name: '기수' },
  { name: '학습기간' },
  { name: '진도율' },
  { name: '수료여부' },
  { name: '상태' },
  //   { name: '수료처리' },
];

export function CourseInfo() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const { data, error, mutate } = useLearningInfo({ page });

  // Pagination
  useEffect(() => {
    const { page } = router.query;
    setPage(!isNaN(Number(page)) ? Number(page) : 0);
  }, [router.query]);

  const onChangePage = async (page: number) => {
    await router.push({
      pathname: router.pathname,
      query: {
        page,
      },
    });
  };

  if (error) return <div>Error</div>;
  if (!data) return <Spinner />;

  return (
    <Box>
      <UserTypo variant="h5">전체 수강생 학습현황</UserTypo>
      <Table
        pagination={true}
        totalNum={data?.totalElements}
        page={data?.number}
        onChangePage={onChangePage}
        size="small"
      >
        <TableHead>
          <UserTableRow>
            {headRows.map(({ name }: { name: string }) => (
              <UserTitleTableCell key={name} align="center">
                {name}
              </UserTitleTableCell>
            ))}
          </UserTableRow>
        </TableHead>

        <TableBody>
          {data.content.map(user => (
            <TableRow key={user.username} hover>
              <UserTableCell>{user.name}</UserTableCell>
              <UserTableCell>{user.username || '실명계정'}</UserTableCell>
              <UserTableCell>{user.courseName}</UserTableCell>
              <UserTableCell>{user.yearAndStep}</UserTableCell>
              <UserTableCell>{user.studyDate}</UserTableCell>
              <UserTableCell>{user.displayTotalProgress}</UserTableCell>
              <UserTableCell>{user.displayCompleteYn}</UserTableCell>
              <UserTableCell>{user.displayClassLearningStatus}</UserTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

const UserTypo = styled(Typography)`
  margin-bottom: 12px;
  font-weight: 700;
`;

const UserTableRow = styled(TableRow)`
  white-space: nowrap;
`;

const UserTitleTableCell = styled(TableCell)`
  height: 1px;
  position: relative;
  font-weight: bold;
`;

const UserTableCell = styled(TableCell)`
  white-space: nowrap;
  text-align: center;
  padding-top: 10px;
  margin: 0;
`;
