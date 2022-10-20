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
import { HeadRowsCenter } from '@components/admin-center/CourseInfo/HeadRowsCenter';
import { courseSubCategory } from '@layouts/Calendar/CalendarBody/CalendarBody';
import { convertBirth } from '@utils/convertBirth';
import { HeadRowsLeft } from '@components/admin-center/CourseInfo/HeadRowsLeft';
import { utils, writeFile } from 'xlsx';
import { HeadRowsRight } from '@components/admin-center/CourseInfo/HeadRowsRight';
import { HeadRowsBottom } from '@components/admin-center/CourseInfo/HeadRowsBottom';
import { useForm } from 'react-hook-form';
import { HeadRowsTop } from '@components/admin-center/CourseInfo/HeadRowsTop';

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

interface FormType {
  page: number;
  nameOrUsername: string; //이름 혹은 아이디
  courseType: CourseType; //운수종사자 저상 도민 타입
  completeType: CompleteType | null; //수료타입
  statusType: StatusType | null; //퇴교여부 타입
  courseSeq: number | null; //과정 시퀀스
  courseClassSeq: number | null; //과정 클래스 시퀀스
  businessName: string; //업체명
  businessType: string | null; //업종 PASSENGER , FREIGHT
  carRegitRegion: string | null; //차량등록지
  carNumber: string | null; //차량번호
  studyStartDate: string; //학습시작일
  studyEndDate: string; //학습종료일
  phone: string | null; //전화번호
  identityNumber: string | null; //주민번호 (-포함)
}

const defaultValues: FormType = {
  page: 0,
  courseType: CourseType.TYPE_TRANS_WORKER,
  nameOrUsername: '',
  completeType: null,
  statusType: null,
  courseSeq: null,
  courseClassSeq: null,
  businessName: '',
  businessType: null,
  carRegitRegion: null,
  carNumber: null,
  studyStartDate: '',
  studyEndDate: '',
  phone: null,
  identityNumber: null,
};

export function CourseInfoManagement() {
  const router = useRouter();
  const [notFound, setNotFound] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const { watch, setValue, reset, register } = useForm<FormType>({ defaultValues });
  const { data, error, mutate } = useLearningInfo(watch());
  console.log(watch());

  // Pagination
  const onChangePage = (page: number) => {
    setValue('page', page);
  };

  const onChangeCourseType = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const value = e.target.value as CourseType;
    setValue('courseType', value);
  };

  //과정 선택
  const onChageCourseSeq = (courseSeq: number | null) => {
    setNotFound(false);
    if (!courseSeq) return setValue('courseSeq', null);
    setValue('courseSeq', courseSeq);
  };
  //기수 선택
  const onChageCourseClassSeq = (courseClassSeq: number | null) => {
    setNotFound(false);
    if (!watch().courseSeq) return setValue('courseClassSeq', null);
    setValue('courseClassSeq', courseClassSeq);
  };

  //업종구분
  const onChangeBusinessType = (value: string) => {
    setNotFound(false);
    setValue('businessType', value);
  };
  //차량등록지
  const onChangeCarRegitRegion = (value: string) => {
    setNotFound(false);
    setValue('carRegitRegion', value);
  };

  //change completeType(수료여부)
  const onChangeCompleteType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNotFound(false);
    if (!value) return setValue('completeType', null);
    if (value === CompleteType.TYPE_COMPLETE) return setValue('completeType', value);
    if (value === CompleteType.TYPE_INCOMPLETE) return setValue('completeType', value);
  };

  //퇴교여부
  const onChangeStatusType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNotFound(false);
    if (!value) return setValue('statusType', null);
    if (value === StatusType.TYPE_NORMAL) return setValue('statusType', value);
    if (value === StatusType.TYPE_OUT) return setValue('statusType', value);
  };

  // 검색
  const handleSearch = async (e: FormEvent, isReload = false) => {
    e.preventDefault();
    setNotFound(false);
    if (isReload) {
      return reset();
    }
    if (searchInputRef.current) {
      setValue('nameOrUsername', searchInputRef.current.value);
      // setNameOrUsername(searchInputRef.current.value);
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

  const onClickDown = () => {
    const Excel = utils.book_new();
    // const EXCEL_CONTENT = utils.json_to_sheet(
    //   [
    //     { No: '컬럼1', 이름: '컬럼2', 아이디: '컬럼3', 생년월일: '머임' },
    //     { No: '컬럼1s', 이름: '컬럼d2', 아이디: '컬럼3f', 생년월일: '머임' },
    //   ]
    //   // { header: ['컬럼1', '컬럼2', '어쩔컬럼3'], skipHeader: false }
    // );
    const EXCEL_CONTENT = utils.aoa_to_sheet([
      [
        'No',
        '이름',
        '아이디',
        '생년월일',
        '휴대폰번호',
        '업종',
        '과정명',
        '기수',
        '학습기간',
        '진도율',
        '수료여부',
        '상태',
      ],
      [
        232,
        '홍길동',
        '실명계정',
        '2022-02-22',
        '01012341234',
        '전세버스',
        '설문용과정',
        '2022/012',
        '2022-01-01 ~ 2022-06-06',
        '93.0%',
        '미수료',
        '정상',
      ],
      [
        222,
        '홍길동1',
        '실명계정',
        '2022-02-22',
        '01012341234',
        '버스',
        '설문용과정',
        '2022/012',
        '2022-01-01 ~ 2022-06-06',
        '93.0%',
        '미수료',
        '퇴교',
      ],
    ]);
    utils.book_append_sheet(Excel, EXCEL_CONTENT, '충남 학습현황 데이터');
    writeFile(Excel, '테스트.xlsx');
  };

  if (error) return <div>Error</div>;
  if (!data) return <Spinner />;
  // user/adm/course-info/detail/{courseUserSeq}
  return (
    <Box>
      {/* <Button variant="contained" onClick={onClickDown}>
        실험용 엑셀
      </Button> */}
      <CourseInfoTypography variant="h5">전체 수강생 학습현황</CourseInfoTypography>
      <HeadRowsTop
        courseType={watch().courseType}
        onChangeCourseType={onChangeCourseType}
      />
      <Box display="flex" gap={2}>
        <HeadRowsLeft
          courseSeq={watch().courseSeq}
          onChageCourseSeq={onChageCourseSeq}
          courseClassSeq={watch().courseClassSeq}
          onChageCourseClassSeq={onChageCourseClassSeq}
          register={register}
          businessType={watch().businessType}
          onChangeBusinessType={onChangeBusinessType}
          carRegitRegion={watch().carRegitRegion}
          onChangeCarRegitRegion={onChangeCarRegitRegion}
        />
        <HeadRowsRight />
        <HeadRowsCenter
          ref={searchInputRef}
          completeType={watch().completeType}
          statusType={watch().statusType}
          handleSearch={handleSearch}
          onChangeCompleteType={onChangeCompleteType}
          onChangeStatusType={onChangeStatusType}
        />
      </Box>
      <HeadRowsBottom search={watch().nameOrUsername} />
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
                <CourseInfoTableCell align="center">
                  <NameBox title={user.name}>{user.name}</NameBox>
                </CourseInfoTableCell>
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

  &:first-of-type {
    background: #f5f5f5;
  }
`;

// 회원 이름. ellipsis 적용.
const NameBox = styled(Box)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`;
