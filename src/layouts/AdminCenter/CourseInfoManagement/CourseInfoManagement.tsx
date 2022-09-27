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
import { courseSubCategory } from '@layouts/Calendar/CalendarBody/CalendarBody';
import { convertBirth } from '@utils/convertBirth';
import { SelectClassAndStep } from '@components/admin-center/CourseInfo/SelectClassAndStep';

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width: string;
}[] = [
  { name: 'No', align: 'center', width: '5%' },
  { name: '이름', align: 'center', width: '6%' },
  { name: '아이디', align: 'center', width: '6%' },
  { name: '생년월일', align: 'center', width: '8%' },
  { name: '휴대폰번호', align: 'center', width: '8%' },
  { name: '업종', align: 'center', width: '6%' },
  { name: '과정명', align: 'center', width: '28%' },
  { name: '기수', align: 'center', width: '10%' },
  { name: '학습기간', align: 'center', width: '7%' },
  { name: '진도율', align: 'center', width: '5%' },
  { name: '수료여부', align: 'center', width: '6%' },
  { name: '상태', align: 'center', width: '5%' },
];

export function CourseInfoManagement() {
  const router = useRouter();
  const [notFound, setNotFound] = useState(false);
  const [page, setPage] = useState(0);
  const [nameOrUsername, setNameOrUsername] = useState<string>(''); //이름 혹은 아이디
  const [completeType, setCompleteType] = useState<CompleteType | null>(null); //수료타입
  const [statusType, setStatusType] = useState<StatusType | null>(null); //상태타입
  const [courseSeq, setCourseSeq] = useState<number | null>(null);
  const [courseClassSeq, setCourseClassSeq] = useState<number | null>(null); // 과정클래스
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const { data, error, mutate } = useLearningInfo({
    page,
    // courseType,
    completeType,
    statusType,
    nameOrUsername,
    courseSeq,
    courseClassSeq,
  });

  // Pagination
  const onChangePage = (page: number) => {
    setPage(page);
  };

  //과정 선택
  const onChageCourseSeq = (courseSeq: number | null) => {
    setNotFound(false);
    if (!courseSeq) return setCourseSeq(null);
    setCourseSeq(courseSeq);
  };
  //기수 선택
  const onChageCourseClassSeq = (courseClassSeq: number | null) => {
    setNotFound(false);
    if (!courseSeq) return setCourseClassSeq(null);
    setCourseClassSeq(courseClassSeq);
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
      setCourseClassSeq(null);
      setCourseSeq(null);
      setCompleteType(null);
      setStatusType(null);
      return setNameOrUsername('');
    }
    if (searchInputRef.current) {
      setNameOrUsername(searchInputRef.current.value);
    }
  };

  // 수정페이지로
  const onClickmodifyCourseInfo = async (seq: number) => {
    // router.push(`/admin-center/course-info/modify/${seq}`);
    window.open(
      `/admin-center/course-info/modify/${seq}`,
      // '',
      '_blank'
    );
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
      <CourseInfoTypography variant="h5">전체 수강생 학습현황</CourseInfoTypography>
      <SelectClassAndStep
        courseSeq={courseSeq}
        onChageCourseSeq={onChageCourseSeq}
        courseClassSeq={courseClassSeq}
        onChageCourseClassSeq={onChageCourseClassSeq}
      />
      <ManagementHeadRows
        ref={searchInputRef}
        search={nameOrUsername}
        completeType={completeType}
        statusType={statusType}
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
          sx={{ tableLayout: 'fixed' }}
        >
          <TableHead>
            <TableRow>
              {headRows.map(
                ({
                  name,
                  align,
                  width,
                }: {
                  name: string;
                  align: string;
                  width: string;
                }) => (
                  <CourseInfoTitleTableCell key={name} align="center" width={width}>
                    {name}
                  </CourseInfoTitleTableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.content.map(user => (
              <TableRow
                sx={{ cursor: 'pointer' }}
                key={user.username}
                hover
                onClick={() => onClickmodifyCourseInfo(user.courseUserSeq)}
              >
                <CourseInfoTableCell align="center">
                  {user.courseUserSeq}
                </CourseInfoTableCell>
                <CourseInfoTableCell align="center">{user.name}</CourseInfoTableCell>
                <CourseInfoTableCell align="center">
                  {user.username || '실명계정'}
                </CourseInfoTableCell>
                <CourseInfoTableCell align="center">
                  <SubjectBox>{convertBirth(user.birth)}</SubjectBox>
                </CourseInfoTableCell>
                <CourseInfoTableCell align="center">
                  <SubjectBox>{user.phone}</SubjectBox>
                </CourseInfoTableCell>
                <CourseInfoTableCell align="center">
                  <SubjectBox>
                    {
                      courseSubCategory.filter(
                        filter => filter.type === user.businessSubType
                      )[0]?.ko
                    }
                  </SubjectBox>
                </CourseInfoTableCell>
                <CourseInfoTableCell align="center">
                  <SubjectBox>{user.courseName}</SubjectBox>
                </CourseInfoTableCell>
                <CourseInfoTableCell align="center">
                  {user.yearAndStep}
                </CourseInfoTableCell>
                <CourseInfoTableCell align="center">{user.studyDate}</CourseInfoTableCell>
                <CourseInfoTableCell align="center">
                  {user.displayTotalProgress}
                </CourseInfoTableCell>
                <CourseInfoTableCell align="center">
                  {user.displayCompleteYn}
                </CourseInfoTableCell>
                <CourseInfoTableCell align="center">
                  {user.displayClassLearningStatus}
                </CourseInfoTableCell>
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

///////////////

// 학습현황 글자
const CourseInfoTypography = styled(Typography)`
  margin-bottom: 30px;
  font-weight: 700;
`;

// 학습현황 제목. ellipsis 적용.
const SubjectBox = styled(Box)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`;

// 학습현황 테이블의 title부분
const CourseInfoTitleTableCell = styled(TableCell)`
  font-weight: bold;
  background: #f5f5f5;
  border-right: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;

  &:last-child {
    border-right: 1px solid #f0f0f0;
  }
`;

// 학습현황 테이블의 본문
const CourseInfoTableCell = styled(TableCell)`
  margin: 0;
  border-right: 1px solid #f0f0f0;
  padding: 4px 4px;

  &:first-child {
    background: #f5f5f5;
  }
`;
