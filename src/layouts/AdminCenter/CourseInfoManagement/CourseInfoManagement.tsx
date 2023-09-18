import styled from '@emotion/styled';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ReplayIcon from '@mui/icons-material/Replay';
import CourseSelectBox from './common/CourseSelectBox';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CourseRadioBox from './common/CourseRadioBox';
import CourseTextInputBox from './common/CourseTextInputBox';
import { CourseType } from '@common/api/adm/courseClass';
import { NotFound } from '@components/ui/NotFound';
import { courseSubCategory } from '@layouts/Calendar/CalendarBody/CalendarBody';
import { convertBirth } from '@utils/convertBirth';
import { useForm } from 'react-hook-form';
import { locationList } from '@layouts/MeEdit/MeEdit';
import { userBusinessTypeTwo } from '@layouts/MeEdit/TransWorker/TransWorker';
import { saveAs } from 'file-saver';
import { grey } from '@mui/material/colors';
import { Table } from '@components/ui';
import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Spinner } from '@components/ui';
import { CompleteType,StatusType,useLearningInfo,useLearningInfoCourses,useLearningInfoStep } from '@common/api/adm/learningInfo';
import { TableBody,TableHead,Typography,Button,Box,InputBase,TextField,Backdrop,SelectChangeEvent } from '@mui/material';
import { getExcelCourseLearning } from '@common/api/adm/excel';
import { CourseLearningInfoCoursesResponseDto } from '@common/api/Api';
import { format, getYear } from 'date-fns';

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width: string;
}[] = [
  { name: 'No', align: 'center', width: '5%' },
  { name: '이름', align: 'center', width: '4%' },
  { name: '아이디', align: 'center', width: '4%' },
  { name: '생년월일', align: 'center', width: '6%' },
  { name: '휴대폰번호', align: 'center', width: '8%' },
  { name: '업종', align: 'center', width: '6%' },
  { name: '차량등록지', align: 'center', width: '7.5%' },
  { name: '회사명', align: 'center', width: '7.5%' },
  { name: '과정명', align: 'center', width: '22%' },
  { name: '기수', align: 'center', width: '10%' },
  { name: '학습기간', align: 'center', width: '7%' },
  { name: '진도율', align: 'center', width: '4%' },
  { name: '수료여부', align: 'center', width: '6%' },
  { name: '상태', align: 'center', width: '3%' },
];

export interface FormType {
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
  year?: number;
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
  year: 0,
};

const DUMMY_YEAR_ARRAY = Array.from({ length: getYear(new Date()) - 2022 + 1 }).map((_, i) => {
  return {year: i + 2022};
}).reverse();


export default function CourseInfoManagement() {

  // const [notFound, setNotFound] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [submitValue, setSubmitValue] = useState<FormType>(defaultValues);
  const { watch, setValue, reset, register } = useForm<FormType>({ defaultValues });
  const { data, error } = useLearningInfo(submitValue);
  const [loading, setLoading] = useState(false);
  const [currentYear, setCurrentYear] = useState(0);
  const { courses } = useLearningInfoCourses(currentYear);
  const { steps } = useLearningInfoStep(watch().courseSeq);
  const [fileLoading, setFileLoading] = useState(false);

  const onChangeSeletedSeq = (e: SelectChangeEvent) => {
    onChageCourseSeq(Number(e.target.value));
    onChageCourseClassSeq(null);
  };
  const onChangeSelectedClassSeq = (e: SelectChangeEvent) => {
    onChageCourseClassSeq(Number(e.target.value) || null);
  };
  const onChangePage = (page: number) => {
    setSubmitValue(prev => {
      return { ...prev, page };
    });
  };

  const onChangeYear = (e: SelectChangeEvent) => {
    const { value } = e.target;
    if( value === '전체') return setCurrentYear(getYear(new Date()));

    setCurrentYear(+value);
    setValue('year', +value);
  }

  const onChangeCourseType = (e: ChangeEvent<HTMLInputElement>) => {
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
  const onChangeBusinessType = (e: SelectChangeEvent ) => {
    const value = e.target.value
    setValue('notFound', false);
    setValue('businessType', value);
  };
  //차량등록지
  const onChangeCarRegitRegion = (e: SelectChangeEvent) => {
    const value = e.target.value;
    setValue('notFound', false);
    setValue('carRegitRegion', value);
  };

  const onChangeCompanyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('businessName', e.target.value);
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

  const handleSubmit = (e:FormEvent,isReload = false) => {
    e.preventDefault();
    
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
    if (!phone || phone.trim() === '') setValue('phone', null);
    if (!identityNumber || identityNumber.trim() === '') setValue('identityNumber', null);
    setSubmitValue(watch());
  };

  // 수정페이지로
  const onClickmodifyCourseInfo = async (seq: number) => {
    window.open(
      `/admin-center/course-info/modify/${seq}`,
      // '',
      '_blank'
    );
  };


  const duplicateRemoveCourses: CourseLearningInfoCoursesResponseDto[] = useMemo(() => {
    const temp = [];
      courses?.forEach(course => {
        if(!temp.find(item => item.courseSeq === course.courseSeq)){
          temp.push(course);
        }
      })
      return temp;
  },[courses]);

  

  const onClickExcelDownload = async () => {
    setFileLoading(true);
    
    try {
      const data  = await getExcelCourseLearning(watch());
      const blob = new Blob([data.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      setFileLoading(false);
      return saveAs(blob, format(new Date(), 'yyyy-MM-dd') + ' 학습현황.xlsx');

    } catch (e) {
      // snackbar({ variant: 'error', message: e });
      console.error(e);
      setFileLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      data.content.length === 0 && setValue('notFound', true);
    }
  }, [data]);

  
  if (error) return <div>Error</div>;
  if (!data) return <Spinner />;
  
  return (
    <form onSubmit={(e) => handleSubmit(e,false)}>
      <Title variant="h1">전체 수강생 학습현황</Title>
      <ContainerWrapper>
        <LeftContainer>
          <CourseSelectBox
            label="교육년도 선택"
            firstOptionLabel="전체"
            menuItem={DUMMY_YEAR_ARRAY}
            onChange={onChangeYear}
            value={watch().year + ''}
            itemKey="year"
            itemValue="year"
            itemName="year"
          />
        <DoubleInputBox>
          <CourseSelectBox
            label="과정 선택"
            firstOptionLabel="전체"
            menuItem={duplicateRemoveCourses ?? []}
            onChange={onChangeSeletedSeq}
            value={watch().courseSeq + ''}
            itemKey="courseSeq"
            itemValue="courseSeq"
            itemName="courseName"
          />
          <CourseSelectBox
            label="과정기수 선택"
            firstOptionLabel="전체"
            menuItem={steps ?? []}
            onChange={onChangeSelectedClassSeq}
            value={watch().courseClassSeq + ''}
            itemKey="courseClassSeq"
            itemValue="courseClassSeq"
            itemName="yearAndStep"
          />
        </DoubleInputBox>
        <DoubleInputBox>
          <CourseSelectBox
            label="업종"
            firstOptionLabel="-없음-"
            menuItem={userBusinessTypeTwo}
            onChange={onChangeBusinessType}
            value={watch().businessType + ''}
            itemKey="enType"
            itemValue="enType"
            itemName="type"
          />
          <CourseSelectBox
            label="차량등록지"
            firstOptionLabel="-없음-"
            menuItem={[...locationList,{ ko: '충남 전체 (세종 제외)', en: 'EXCEPTSEJONG'}]}
            onChange={onChangeCarRegitRegion}
            value={watch().carRegitRegion + ''}
            itemKey="en"
            itemValue="en"
            itemName="ko"
          />
        </DoubleInputBox>
      <Box>
        <Typography>학습기간</Typography>
        <Box display="flex" gap={2} alignItems="center">
          <TextField type="date" {...register('studyStartDate')} fullWidth /> ~
          <TextField type="date" {...register('studyEndDate')} fullWidth />
        </Box>
      </Box>
    </LeftContainer>

    <CenterContainer>
      <CourseTextInputBox
        onChange={onChangeCompanyName}
        placeholder="업체명"
        fullWidth
        register={register}
        registerName="businessName"
        title="업체명"
        />
      <CourseTextInputBox
        placeholder='"-" 없이 입력'
        fullWidth
        register={register}
        registerName="phone"
        title="핸드폰번호"
      />
      <CourseTextInputBox
        placeholder='"-" 없이 입력'
        fullWidth
        register={register}
        registerName="identityNumber"
        title="주민등록번호"
      />
      <CourseTextInputBox
        placeholder="차량번호"
        fullWidth
        register={register}
        registerName="carNumber"
        title="차량번호"
      />
    </CenterContainer>

      <Backdrop open={loading}>
        <Box
          display="flex"
          flexDirection="column"
          sx={{ background: 'white', borderRadius: '4px', padding: '12px' }}
        >
          <Spinner fit={true} />
          <Box color="rgb(194,51,51)" fontWeight="bold">
            다운로드가 오래걸릴수 있습니다 페이지를 이탈하지 마세요.
          </Box>
        </Box>
      </Backdrop>
    </ContainerWrapper>

    <RadioGroupContainer>  
      <CourseRadioBox
        title="과정타입선택"
        checked1={CourseType.TYPE_TRANS_WORKER === watch().courseType}
        checked2={CourseType.TYPE_LOW_FLOOR_BUS === watch().courseType}
        checked3={CourseType.TYPE_PROVINCIAL === watch().courseType}
        onChange={onChangeCourseType}
        label1='운수종사자'
        label2='저상버스'
        label3='도민교통'
        value1={CourseType.TYPE_TRANS_WORKER}
        value2={CourseType.TYPE_LOW_FLOOR_BUS}
        value3={CourseType.TYPE_PROVINCIAL}
      />

      <CourseRadioBox
        title="수료여부"
        checked1={watch().completeType === null}
        checked2={watch().completeType === CompleteType.TYPE_COMPLETE}
        checked3={watch().completeType === CompleteType.TYPE_INCOMPLETE}
        onChange={onChangeCompleteType}
        value1={null}
        value2={CompleteType.TYPE_COMPLETE}
        value3={CompleteType.TYPE_INCOMPLETE}
        label1="전체"
        label2="수료"
        label3="미수료"
      />
          
      <CourseRadioBox
        title="퇴교여부(상태)"
        checked1={watch().statusType === null}
        checked2={watch().statusType === StatusType.TYPE_NORMAL}
        checked3={watch().statusType === StatusType.TYPE_OUT}
        onChange={onChangeStatusType}
        value1={null}
        value2={StatusType.TYPE_NORMAL}
        value3={StatusType.TYPE_OUT}
        label1="전체"
        label2="정상"
        label3="퇴교"
      />
    </RadioGroupContainer>
  <SearchContainer>

    <Box sx={{ display:'flex',flexDirection:'column' }}>
      <Typography sx={{display:'flex',justifyContent:'space-between'}}>
        사용자 검색
        <Typography component='span' sx={{color:'#a7a7a7c7'}}>
            {watch().nameOrUsername !== '' && `최근 검색어: ${watch().nameOrUsername}`}
          </Typography>
      </Typography>
      <SearchInput
        {...register('nameOrUsername')}
        inputRef={searchInputRef}
        placeholder="이름 혹은 아이디 입력"
        fullWidth
        />
    </Box>

    <BoxRow sx={{ flexDirection: 'row',marginTop: '.25rem',marginBottom:'2rem' }}>
      <Button type="submit" variant='contained' onClick={(e) => handleSubmit(e,false)} fullWidth>
        검색하기
      </Button>
      <ReloadButton
        type='submit'
        size='small'
        color='neutral'
        variant='text'
        endIcon={<ReplayIcon htmlColor={grey[700]} />}
        sx={{ marginLeft: '12px',border:'1px solid #c7c7c744' }}
        onClick={(e) => handleSubmit(e,true)}
        fullWidth
      >
        전체 다시 불러오기
      </ReloadButton>
    </BoxRow>

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
  </SearchContainer>
      
  <BoxRow sx={{ flexDirection: 'row-reverse',paddingTop:'1rem',borderTop:'1px solid #c7c7c7' }}>
    <Button
      variant='contained'
      color='success'
      disabled={fileLoading}
      onClick={onClickExcelDownload}
    >
      {fileLoading ? (
        <Spinner fit={true} />
      ) : (
        <Box sx={{display:'flex',alignItems:'center'}}>
          <FileCopyIcon sx={{ marginRight: '4px' }} />
          학습현황 엑셀다운로드
        </Box>
      )}
    </Button>
  </BoxRow>

    <ResultContainer>
      {watch().notFound ? (
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
              {
              headRows.map(
                ({
                  name,
                  width,
                }) => (
                  <CourseInfoTitleTableCell
                    key={name}
                    align="center"
                    width={width}
                    >
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
                
                  <SubjectBox>
                    {/* find로 긁어와도 될듯하지만~?  */}
                  {user.carRegisteredRegion === 'CHEONAN' && '천안'}
                  {user.carRegisteredRegion === 'PRINCESS' && '공주'}
                  {user.carRegisteredRegion === 'BORYEONG' && '보령'}
                  {user.carRegisteredRegion === 'ASAN' && '아산'}
                  {user.carRegisteredRegion === 'SEOSAN' && '서산'}
                  {user.carRegisteredRegion === 'NONSAN' && '논산'}
                  {user.carRegisteredRegion === 'GYERYONG' && '계룡'}
                  {user.carRegisteredRegion === 'DANGJIN' && '당진'}
                  {user.carRegisteredRegion === 'GEUMSAN' && '금산'}
                  {user.carRegisteredRegion === 'GRANT' && '부여'}
                  {user.carRegisteredRegion === 'SEOCHEON' && '서천'}
                  {user.carRegisteredRegion === 'CHEONGYANG' && '청양'}
                  {user.carRegisteredRegion === 'HONGSEONG' && '홍성'}
                  {user.carRegisteredRegion === 'BUDGET' && '예산'}
                  {user.carRegisteredRegion === 'TAEAN' && '태안'}
                  {user.carRegisteredRegion === 'CHUNGNAM' && '충남'}
                  {user.carRegisteredRegion === 'SEJONG' && '세종'}
                  {user.carRegisteredRegion === 'SEOUL' && '서울'}
                  {user.carRegisteredRegion === 'BUSAN' && '부산'}
                  {user.carRegisteredRegion === 'DAEGU' && '대구'}
                  {user.carRegisteredRegion === 'INCHEON' && '인천'}
                  {user.carRegisteredRegion === 'GWANGJU' && '광주'}
                  {user.carRegisteredRegion === 'DAEJEON' && '대전'}
                  {user.carRegisteredRegion === 'ULSAN' && '울산'}
                  {user.carRegisteredRegion === 'GAME' && '경기'}
                  {user.carRegisteredRegion === 'GANGWON' && '강원'}
                  {user.carRegisteredRegion === 'CHUNGBUK' && '충북'}
                  {user.carRegisteredRegion === 'JEONBUK' && '전북'}
                  {user.carRegisteredRegion === 'JEONNAM' && '전남'}
                  {user.carRegisteredRegion === 'GYEONGBUK' && '경북'}
                  {user.carRegisteredRegion === 'GYEONGNAM' && '경남'}
                  {user.carRegisteredRegion === 'JEJU' && '제주'}
                </SubjectBox>
                </CourseInfoTableCell>
                <CourseInfoTableCell align="center">
                  <SubjectBox>{user.businessName}</SubjectBox>
                </CourseInfoTableCell>
                <CourseInfoTableCell align="center">
                  <SubjectBox>{user.courseName}</SubjectBox>
                </CourseInfoTableCell>
                <CourseInfoTableCell align="center">
                  {user.yearAndStep}
                </CourseInfoTableCell>
                <CourseInfoTableCell align="center">
                  {user.studyDate}
                </CourseInfoTableCell>
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
    </ResultContainer>
  </form>
  );
}


// 학습현황 글자
const Title = styled(Typography)`
  margin-bottom: 30px;
  font-weight: 700;
  font-size: 32px;
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


const SearchInput = styled(InputBase)`
  
  height: 56px;
  border-radius: 4px;
  border: 1px solid #c7c7c7;
  padding: 0 12px;
`;

const ContainerWrapper = styled(Box)`
  display: flex;
  align-items:flex-start;
  justify-content:space-between;
  gap: 2rem;
`

const Container = styled(Box)`
  flex:1;
  display:flex;
  flex-direction:column;
  gap: .25rem; 
`

const RadioGroupContainer = styled(Box)`

  border-top: 1px solid #c7c7c7;
  border-bottom: 1px solid #c7c7c7;
  padding: .25rem 2rem;
  margin: 1rem 0;
  display:flex;
  align-items:center;
  justify-content:center;
  gap: 1rem;
`

const CenterContainer = styled(Container)``;
const LeftContainer = styled(Container)``;


const DoubleInputBox = styled(Box)`
display:flex;
align-items:center;
gap: 1rem;
  
`


const BoxRow = styled(Box)`
  display: flex;
  width: 100%;
  gap: 16px;
`;

const SearchContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
`;

const ResultContainer = styled(Box)`
  

`



const ReloadButton = styled(Button)``;