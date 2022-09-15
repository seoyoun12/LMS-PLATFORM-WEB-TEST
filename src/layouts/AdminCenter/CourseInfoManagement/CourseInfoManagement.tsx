import {
  Container,
  TableBody,
  TableHead,
  Typography,
  Button,
  Box,
  InputBase,
  IconButton,
  Radio,
} from '@mui/material';
import styles from '@styles/common.module.scss';
import { Table } from '@components/ui';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Spinner } from '@components/ui';
import dateFormat from 'dateformat';
import { UserModifyModal } from '@components/admin-center/UserModifyModal';
import { CompleteType, StatusType, useLearningInfo } from '@common/api/adm/learningInfo';
import { grey } from '@mui/material/colors';
import { CourseType } from '@common/api/adm/courseClass';
import { NotFound } from '@components/ui/NotFound';
import { ManagementHeadRows } from '@components/admin-center/CourseInfo/ManagementHeadRows';

const headRows = [
  { name: '번호' },
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

export function CourseInfoManagement() {
  const router = useRouter();
  const [notFound, setNotFound] = useState(false);
  const [page, setPage] = useState(0);
  const [nameOrUsername, setNameOrUsername] = useState<string>(''); //이름 혹은 아이디
  const [courseType, setCourseType] = useState<CourseType>(CourseType.TYPE_TRANS_WORKER); //과정타입
  const [completeType, setCompleteType] = useState<CompleteType | null>(null); //수료타입
  const [statusType, setStatusType] = useState<StatusType | null>(null); //상태타입
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const { data, error, mutate } = useLearningInfo({
    page,
    courseType,
    completeType,
    statusType,
    nameOrUsername,
  });

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

  //change question Type
  const onChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNotFound(false);
    if (value === CourseType.TYPE_TRANS_WORKER) return setCourseType(value);
    if (value === CourseType.TYPE_LOW_FLOOR_BUS) return setCourseType(value);
    if (value === CourseType.TYPE_PROVINCIAL) return setCourseType(value);
  };

  //change completeType(수료여부)
  const onChangeCompleteType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNotFound(false);
    if (!value) return setCompleteType(null);
    if (value === CompleteType.TYPE_COMPLETE) return setCompleteType(value);
    if (value === CompleteType.TYPE_INCOMPLETE) return setCompleteType(value);
  };

  //퇴교여부
  const onChangeStatusType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNotFound(false);
    if (!value) return setStatusType(null);
    if (value === StatusType.TYPE_NORMAL) return setStatusType(value);
    if (value === StatusType.TYPE_OUT) return setStatusType(value);
  };

  const handleSearch = async (e: FormEvent, isReload = false) => {
    e.preventDefault();
    setNotFound(false);
    if (isReload) {
      setPage(0);
      setCourseType(CourseType.TYPE_TRANS_WORKER);
      setCompleteType(null);
      setStatusType(StatusType.TYPE_NORMAL);
      return setNameOrUsername('');
    }
    if (searchInputRef.current) {
      setNameOrUsername(searchInputRef.current.value);
    }
  };

  // 수정페이지로
  const onClickmodifyCourseInfo = async (seq: number) => {
    router.push(`/admin-center/course-info/modify/${seq}`);
    mutate();
    //??
  };

  useEffect(() => {
    if (data) {
      data.content.length === 0 && setNotFound(true);
    }
  }, [data]);

  if (error) return <div>Error</div>;
  if (!data) return <Spinner />;
  // user/adm/course-info/detail/{courseUserSeq}
  return (
    <Box>
      <UserTypo variant="h5">전체 수강생 학습현황</UserTypo>
      <ManagementHeadRows
        ref={searchInputRef}
        search={nameOrUsername}
        courseType={courseType}
        completeType={completeType}
        statusType={statusType}
        onChangeType={onChangeType}
        handleSearch={handleSearch}
        onChangeCompleteType={onChangeCompleteType}
        onChangeStatusType={onChangeStatusType}
      />
      {notFound ? (
        <NotFound content="학습현황이 존재하지 않습니다!" />
      ) : (
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
              <TableRow
                sx={{ cursor: 'pointer' }}
                key={user.username}
                hover
                onClick={() => onClickmodifyCourseInfo(user.courseUserSeq)}
              >
                <UserTableCell>{user.courseUserSeq}</UserTableCell>
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
      )}
    </Box>
  );
}

const UserTypo = styled(Typography)`
  margin-bottom: 12px;
  font-weight: 700;
`;

const SearchContainer = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px 6px 0 6px;
  margin-bottom: 24px;
  border-radius: 4px;
  border: 1px solid ${grey[300]};
`;

const SearchInput = styled(InputBase)`
  width: 100%;
`;

const ReloadButton = styled(Button)`
  margin-left: auto;
`;
const ConnectButton = styled(Button)`
  margin-right: 12px;
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
