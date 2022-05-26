import { Container, TableBody, TableHead, Typography } from '@mui/material';
import styles from '@styles/common.module.scss';
import { Table } from '@components/ui';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { userList } from '@common/api/user';
import { Spinner } from '@components/ui';

const headRows = [
  { name: 'seq'},
  { name: 'ID'},
  { name: '이름'},
  { name: '성별'},
  { name: '생년월일'},
  { name: '생성일'},
  { name: '휴대폰번호'},
  { name: 'SNS수신동의'},
  { name: 'E-mail수신동의'},
  { name: '로그인실패횟수'},
  { name: '로그인잠김여부'},
  { name: '유저수정일'},
  { name: '마지막비밀번호변경일자'},
  { name: '유저가입구분'}
];



export function UserList() {
  
  const router = useRouter();
  const [ page, setPage ] = useState(0);
  const { data, error } = userList({ page });

  useEffect(() => {
    const { page } = router.query;
    setPage(!isNaN(Number(page)) ? Number(page) : 0);
  }, [ router ]);

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
      >회원 목록</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{headRows[0].name}</TableCell>
            {headRows.slice(1).map(({ name }: { name: string }) =>
              <TableCell key={name} align="center">{name}</TableCell>
            )}            
          </TableRow> 
        </TableHead>

        <TableBody>
          {data.content.map((user) => (
            <TableRow key={user.seq}  hover>
              <TableCell>{user.seq}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.birth}</TableCell>
              <TableCell>{user.createdDtime}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.smsYn}</TableCell>
              <TableCell>{user.emailYn}</TableCell>
              <TableCell>{user.loginFailedCount}</TableCell>
              <TableCell>{user.failedYn}</TableCell>
              <TableCell>{user.modifiedDtime}</TableCell>
              <TableCell>{user.lastPwUpdDtime}</TableCell>
              <TableCell>{user.regCategory}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
