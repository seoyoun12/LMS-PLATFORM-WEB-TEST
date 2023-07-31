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
  Backdrop,
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
import {
  CompleteType,
  StatusType,
  useLearningInfo,
} from '@common/api/adm/learningInfo';
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
import { useCourseInfoTraffic } from '@common/api/adm/courseInfoTraffic';
import {
  CourseTrafficTargetType,
  locationList,
  residenceList,
  TargetSubTypeReg,
  UserRadioExcelConfig,
} from 'src/staticDataDescElements/staticType';
import { getExcelCourseTrafficLearning } from '@common/api/adm/excel';
import { useSnackbar } from '@hooks/useSnackbar';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width: string;
}[] = [
  { name: 'No', align: 'center', width: '5%' },
  { name: '이름', align: 'center', width: '6%' },
  { name: '아이디', align: 'center', width: '6%' },
  { name: '생년월일', align: 'center', width: '8%' },
  // { name: '휴대폰번호', align: 'center', width: '8%' },
  { name: '교육대상자', align: 'center', width: '10%' },
  { name: '교육대상자세부', align: 'center', width: '13%' },
  { name: '지역', align: 'center', width: '6%' },
  { name: '소속', align: 'center', width: '14%' },
  { name: '교육시작희망일자', align: 'center', width: '13%' },
  { name: '만료기한', align: 'center', width: '6%' },
  { name: '상태', align: 'center', width: '5%' },
];

interface FormType {
  page: number;
  notFound: boolean;
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
  notFound: false,
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

export default function CourseInfoTrafficManagement() {
  const router = useRouter();
  // const [notFound, setNotFound] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [submitValue, setSubmitValue] = useState<FormType>(defaultValues);
  const { watch, setValue, reset, register } = useForm<FormType>({
    defaultValues,
  });
  const [page, setPage] = useState<number>(0);
  const { data, error, mutate } = useCourseInfoTraffic(10, page);
  const [loading, setLoading] = useState(false);
  const snackbar = useSnackbar();

  // // 엑셀 파일명
  // const koFileName = UserRadioExcelConfig.filter(
  //   (ur) => ur.value === typeValue
  // )[0]?.name;

  // 엑셀
  const onClickExcelDownload = async () => {
    const a = document.createElement('a');
    setLoading(true);
    try {
      const data = await getExcelCourseTrafficLearning();
      const excel = new Blob([data]);
      a.href = URL.createObjectURL(excel);
      // a.download = '충남_관리자_회원목록_리스트.xlsx';
      a.download = '충남_관리자_학습현황(도민)_데이터.xlsx';
      a.click();
      a.remove();
      URL.revokeObjectURL(a.href);
      snackbar({ variant: 'success', message: '다운로드 완료' });
      setLoading(false);
    } catch (e) {
      snackbar({ variant: 'error', message: '다운로드 실패' });
      setLoading(false);
    }
  };

  // Pagination
  const onChangePage = (page: number) => {
    setSubmitValue((prev) => {
      return { ...prev, page };
    });
    setPage(page);
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
    setValue('notFound', false);
    if (!courseSeq) return setValue('courseSeq', null);
    setValue('courseSeq', courseSeq);
  };
  //기수 선택
  const onChageCourseClassSeq = (courseClassSeq: number | null) => {
    setValue('notFound', false);
    if (!watch().courseSeq) return setValue('courseClassSeq', null);
    setValue('courseClassSeq', courseClassSeq);
  };

  //업종구분
  const onChangeBusinessType = (value: string) => {
    setValue('notFound', false);
    setValue('businessType', value);
  };
  //차량등록지
  const onChangeCarRegitRegion = (value: string) => {
    setValue('notFound', false);
    setValue('carRegitRegion', value);
  };

  const onChangeCompanyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('businessName', e.target.value);
  };
  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('phone', e.target.value);
  };
  const onChangeIdentify = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('identityNumber', e.target.value);
  };

  //change completeType(수료여부)
  const onChangeCompleteType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue('notFound', false);
    if (!value) return setValue('completeType', null);
    if (value === CompleteType.TYPE_COMPLETE)
      return setValue('completeType', value);
    if (value === CompleteType.TYPE_INCOMPLETE)
      return setValue('completeType', value);
  };

  //퇴교여부
  const onChangeStatusType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue('notFound', false);
    if (!value) return setValue('statusType', null);
    if (value === StatusType.TYPE_NORMAL) return setValue('statusType', value);
    if (value === StatusType.TYPE_OUT) return setValue('statusType', value);
  };

  const onChangeCarNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue('notFound', false);
    setValue('carNumber', value);
  };

  // 검색 (outdated , handlesumit을 이용해주세요.)
  const handleSearch = async (e: FormEvent, isReload = false) => {
    //FormEvent에 대해 araboza
    e.preventDefault();
    setValue('notFound', false);
    if (isReload) {
      reset();
      setSubmitValue(watch());
      return;
    }
    if (searchInputRef.current) {
      setValue('nameOrUsername', searchInputRef.current.value);
      // setNameOrUsername(searchInputRef.current.value);
    }
  };

  const handleSubmit = (isReload = false) => {
    setValue('notFound', false);
    if (isReload) {
      reset();
      setSubmitValue(watch());
      searchInputRef.current.value = '';
      return;
    }
    if (searchInputRef.current) {
      setValue('nameOrUsername', searchInputRef.current.value);
    }

    const { phone, identityNumber } = watch();
    if (phone === '' || phone?.replaceAll(' ', '') === '')
      setValue('phone', null);
    if (identityNumber === '' || identityNumber?.replaceAll(' ', '') === '')
      setValue('identityNumber', null);

    setSubmitValue(watch());
  };

  // 수정페이지로
  const onClickmodifyCourseInfo = async (seq: number) => {
    window.open(
      `/admin-center/course-info-traffic/modify/${seq}`,
      // '',
      '_blank'
    );
  };

  useEffect(() => {
    if (data) {
      data.content.length === 0 && setValue('notFound', true);
    }
  }, [data]);

  if (error) return <div>Error</div>;
  if (!data) return <Spinner />;
  // user/adm/course-info/detail/{courseUserSeq}
  return (
    <Box>
      <CourseInfoTypography variant='h5'>
        전체 수강생 학습현황(도민)
      </CourseInfoTypography>
      {/* <HeadRowsTop
        courseType={watch().courseType}
        onChangeCourseType={onChangeCourseType}
      /> */}
      {/* <Box display="flex" gap={2}>
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
        <HeadRowsRight
          register={register}
          onChangeCompanyName={onChangeCompanyName}
          onChangePhone={onChangePhone}
          onChangeIdentify={onChangeIdentify}
        />
        <HeadRowsCenter
          ref={searchInputRef}
          completeType={watch().completeType}
          statusType={watch().statusType}
          carNumber={watch().carNumber}
          handleSearch={handleSearch}
          onChangeCompleteType={onChangeCompleteType}
          onChangeStatusType={onChangeStatusType}
          onChangeCarNumber={onChangeCarNumber}
        />
      </Box> */}
      {/* <HeadRowsBottom search={watch().nameOrUsername} handleSubmit={handleSubmit} /> */}

      <Box display='flex' mb={2}>
        <Button
          variant='contained'
          color='success'
          sx={{ marginLeft: 'auto' }}
          // onClick={() => snackbar({ variant: 'info', message: '준비중입니다.' })}
          onClick={onClickExcelDownload}
        >
          {loading ? (
            <Spinner fit={true} />
          ) : (
            <>
              <FileCopyIcon sx={{ marginRight: '4px' }} />
              회원목록 엑셀다운로드
            </>
          )}
        </Button>
      </Box>

      <Backdrop open={loading}>
        <Box
          display='flex'
          flexDirection='column'
          sx={{ background: 'white', borderRadius: '4px', padding: '12px' }}
        >
          <Spinner fit={true} />
          <Box color='rgb(194,51,51)' fontWeight='bold'>
            다운로드가 오래걸릴수 있습니다 페이지를 이탈하지 마세요.
          </Box>
        </Box>
      </Backdrop>
      {watch().notFound ? (
        <NotFound content='학습현황이 존재하지 않습니다!' />
      ) : (
        <Table
          pagination={true}
          totalNum={data?.totalElements}
          page={data?.number}
          onChangePage={onChangePage}
          size='small'
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
                  <CourseInfoTitleTableCell
                    key={name}
                    align='center'
                    width={width}
                  >
                    {name}
                  </CourseInfoTitleTableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.content.map((user) => (
              <TableRow
                sx={{ cursor: 'pointer' }}
                key={user.seq}
                hover
                onClick={() => onClickmodifyCourseInfo(user.seq)}
              >
                <CourseInfoTableCell align='center'>
                  {user.seq}
                </CourseInfoTableCell>
                <CourseInfoTableCell align='center'>
                  {user.userInfo.name}
                </CourseInfoTableCell>
                <CourseInfoTableCell align='center'>
                  <NameBox title={user.userInfo.name}>
                    {user.userInfo.username}
                  </NameBox>
                </CourseInfoTableCell>
                <CourseInfoTableCell align='center'>
                  <SubjectBox>{convertBirth(user.userInfo.birth)}</SubjectBox>
                </CourseInfoTableCell>
                <CourseInfoTableCell align='center'>
                  <SubjectBox>
                    {
                      CourseTrafficTargetType.filter(
                        (f) => f.type === user.eduTargetMain
                      )[0].ko
                    }
                  </SubjectBox>
                </CourseInfoTableCell>
                {/* <CourseInfoTableCell align="center">
                  <SubjectBox>
                    {
                      courseSubCategory.filter(
                        filter => filter.type === user.userInfo.
                      )[0]?.ko
                    }
                  </SubjectBox>
                </CourseInfoTableCell> */}
                <CourseInfoTableCell align='center'>
                  <SubjectBox>
                    {
                      TargetSubTypeReg.filter(
                        (f) => f.type === user.eduTargetSub
                      )[0].ko
                    }
                  </SubjectBox>
                </CourseInfoTableCell>
                <CourseInfoTableCell align='center'>
                  <SubjectBox>
                    {locationList.filter((f) => f.en === user.region)[0].ko}
                  </SubjectBox>
                </CourseInfoTableCell>
                <CourseInfoTableCell align='center'>
                  {user.organization}
                </CourseInfoTableCell>
                <CourseInfoTableCell align='center'>
                  {user.expectedToStartDtime}
                </CourseInfoTableCell>
                <CourseInfoTableCell align='center'>
                  {user.expiredDtime}
                </CourseInfoTableCell>
                {/* <CourseInfoTableCell align="center">
                  {user.displayCompleteYn}
                </CourseInfoTableCell> */}
                <CourseInfoTableCell align='center'>
                  {user.status === 1 ? '정상' : '비활성'}
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
  height: 10px;

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
