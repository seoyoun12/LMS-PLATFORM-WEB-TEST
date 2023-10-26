import { TableBody,TableHead,Typography,Button,Box,Backdrop, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputLabel, Select, MenuItem } from '@mui/material';
import { Table } from '@components/ui';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { CSSProperties, FormEvent, useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Spinner } from '@components/ui';
import { CompleteType } from '@common/api/adm/learningInfo';

import { CourseInfoTrafficParams, useCourseInfoTraffic } from '@common/api/adm/courseInfoTraffic';
import { useSnackbar } from '@hooks/useSnackbar';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { saveAs } from 'file-saver';
import { format, getYear } from 'date-fns';
import SelectBox from '../CourseTrafficManagement/common/SelectBox';

import { ConvertEnum } from '@utils/convertEnumToHangle';
import { residenceList } from '@layouts/MeEdit/MeEdit';
import useSelect from '@hooks/useSelect';
import useDominCourse, { MainType, SubType } from '@hooks/useDominCourse';
import { useNewInput } from '@hooks/useNewInput';
import { RefreshOutlined } from '@material-ui/icons';


const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width: string;
}[] = [
  { name: 'No', align: 'center', width: '5%' },
  { name: '이름', align: 'center', width: '6%' },
  { name: '아이디', align: 'center', width: '7%' },
  // { name: '생년월일', align: 'center', width: '6%' },
  { name: '교육대상자', align: 'center', width: '6%' },
  { name: '교육대상자세부', align: 'center', width: '10%' },
  { name: '지역', align: 'center', width: '6%' },
  { name: '소속', align: 'center', width: '10%' },
  { name: '과정명', align: 'center', width: '10%' },
  { name: '교육시작희망일자', align: 'center', width: '6%' },
  { name: '만료기한', align: 'center', width: '8%' },
  { name: '진도율', align: 'center', width: '5%' },
  { name: '수료여부', align: 'center', width: '6%' },
  { name: '상태', align: 'center', width: '6%' },
];

const paramsDefaultValue: CourseInfoTrafficParams = {
  year : '',
  residence : '',
  provincialEduTargetMain : '',
  provincialEduTargetSub : '',
  expectedToStartDtime: '',
  expectedToEndDtime: '',
  organization: '',
  nameOrUsername: '',
  completeType: '',
  page: 0,
  elementCnt: 10,
  courseSeq: ''
}


export default function CourseInfoTrafficManagement() {
  const { value: year, onChange: onChangeYear } = useSelect({defaultValue: ''})
  const { value: residence, onChange: onChangeResidence } = useSelect({defaultValue: ''})
  const { value: provincialEduTargetMain, onChange: onChangeProvincialEduTargetMain } = useSelect<MainType | ''>({defaultValue: ''})
  const { value: provincialEduTargetSub, onChange: onChangeProvincialEduTargetSub } = useSelect<SubType | ''>({defaultValue: ''})
  const { value: courseSeq,setValue:setCourseSeq } = useSelect({defaultValue: ''});
  const { value: expectedToStartDtime, onReset:onResetStartTime,onChange: onChangeExpectedToStartDtime } = useNewInput({initialValue: '',type:'date'})
  const { value: expectedToEndDtime, onReset:onResetEndTime,onChange: onChangeExptectedToEndDtime } = useNewInput({initialValue: '',type:'date'})
  const { value: organization,setValue:setOrganization, onReset:onResetOrganization,onChange: onChangeOrganization} = useNewInput({initialValue: '',type:'string'})
  const { value: nameOrUsername, onReset:onResetNameOrUsername,onChange: onChangeNameOrUsername} = useNewInput({initialValue: '',type:'string'})
  const { value: completeType, onChange: onChangeCompleteType} = useSelect<CompleteType | ''>({defaultValue: ''})
  
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState(paramsDefaultValue);
  const { data, error, mutate } = useCourseInfoTraffic(params);
  const { courseApplication, getCourseForUser } = useDominCourse();
  
  const snackbar = useSnackbar();

  
  
  const onClickExcelDownload = async () => {
    setLoading(true);
    // try {
    //   const data = await getExcelCourseTrafficLearning(watch());
    //   const blob = new Blob([data.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    //   setLoading(false);
    //   return saveAs(blob, format(new Date(), 'yyyy-MM-dd') + ' 학습현황.xlsx');
      
    // } catch (e) {
    //   snackbar({ variant: 'error', message: '다운로드 실패' });
    //   setLoading(false);
    // }
  };

  const onChangePage = (page: number) => {
    setPage(page);
  }
  
  const onSubmitSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setParams({
      year,
      residence,
      provincialEduTargetMain,
      provincialEduTargetSub,
      expectedToStartDtime,
      expectedToEndDtime,
      organization,
      nameOrUsername,
      completeType,
      page,
      courseSeq,
      elementCnt: 10
    })
    await mutate()
  }
  
  // 수정페이지로 이동
  const onClickmodifyCourseInfo = async (seq: number) => {
    window.open(`/admin-center/course-info-traffic/modify/${seq}`,'_blank');
  };

  const onClickResetQuery = useCallback(() => {
    setParams(paramsDefaultValue)
    onChangeYear('')
    onChangeResidence('')
    onChangeProvincialEduTargetMain('')
    onChangeProvincialEduTargetSub('')
    setPage(0);
    onResetStartTime()
    onResetEndTime()
    onResetOrganization()
    onResetNameOrUsername()
    onChangeCompleteType('')
    setOrganization('')
    setCourseSeq('')
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    if(!provincialEduTargetSub) return;
    getCourseForUser(provincialEduTargetSub)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[provincialEduTargetSub])
  if (error) return <div>Error</div>;
  if (!data) return <Spinner />;

  

  return (
    <Box>
      <Title variant='h5'> 전체 수강생 학습현황(도민) </Title>

      <SearchForm onSubmit={onSubmitSearch}>

        <Container>
          {/* 서치폼 왼쪽 */}
          <SearchFormLeft sx={{flex:1}}>

            {/* 교육시작년도 - 지역 */}
            <InputBox>
              <SelectBox
                id="year"
                label="교육시작년도"
                options={Array.from({length:getYear(new Date()) - 2022 + 1 }, (_, i) => i + 2022)}
                onChange={onChangeYear}
                value={year}
                name='year'
              />
              <SelectBox
                id="residence"
                label="지역"
                options={residenceList.map((residence) => residence.en)}
                onChange={onChangeResidence}
                value={residence}
                name='residence'
              />
            </InputBox>




            {/* 교육대상자 / 교육대상자 세부 */}
            <InputBox>
              <SelectBox
                id="provincialEduTargetMain"
                label="교육대상자"
                options={Object.keys(MainType)}
                onChange={onChangeProvincialEduTargetMain}
                value={provincialEduTargetMain}
                name='provincialEduTargetMain'
              />
              <SelectBox
                id="provincialEduTargetSub"
                label="교육대상자세부"
                options={Object.keys(SubType)}
                onChange={onChangeProvincialEduTargetSub}
                value={provincialEduTargetSub}
                name='provincialEduTargetSub'
              />
            </InputBox>




            {/* 과정명 */}
            <InputBox>
              <FormControl fullWidth>
                <InputLabel id="courseSeq">과정명</InputLabel>
                <SelectContainer
                  name='courseSeq'
                  label='과정명'
                  labelId='courseSeq'
                  value={courseSeq}
                  onChange={(e) => setCourseSeq(e.target.value as string)}
                  sx={{width:'100%',marginBottom:'1rem'}}
                  disabled={!provincialEduTargetSub}
                  >
                  {
                  courseApplication?.map(course =>(
                    <MenuItem key={course.seq} value={course.seq}>{course.courseName}</MenuItem>
                    ))
                  }
                </SelectContainer>
              </FormControl>
            </InputBox>



              {/* 학습기간 */}
              <Box sx={{display:'flex', flexDirection:'column', width:'100%'}}>
                <Typography>학습기간</Typography>
                <Box sx={{display:'flex', gap:'1rem'}}>
                  <TextField
                    name="expectedToStartDtime"
                    type="date"
                    fullWidth
                    value={expectedToStartDtime}
                    onChange={onChangeExpectedToStartDtime}
                    />
                  <TextField
                    name="expectedToEndDtime"
                    type="date"
                    fullWidth
                    value={expectedToEndDtime}
                    onChange={onChangeExptectedToEndDtime}
                    />
                  </Box>
              </Box>
            </SearchFormLeft>



          {/* 서치폼 오른쪽 */}
          <SearchFormRight sx={{flex: 1}}>
            <TextField
              label='소속'
              placeholder='소속명'
              fullWidth
              value={organization}
              onChange={onChangeOrganization}
              />
          </SearchFormRight>
        </Container>

         {/* 과정타입선택,수료여부 */}
         <DevideBox>
          <RadioFormContainer>
            <FormControl>
              <FormLabel id="completed-check">수료여부</FormLabel>
                <RadioGroup defaultValue='' onChange={onChangeCompleteType} sx={{display:'flex', flexDirection:'row'}}>
                  <FormControlLabel value={''} control={<Radio />} label="전체" />
                  <FormControlLabel value={CompleteType.TYPE_COMPLETE} control={<Radio />} label="수료" />
                  <FormControlLabel value={CompleteType.TYPE_INCOMPLETE} control={<Radio />} label="미수료" />
                </RadioGroup>
              </FormControl>
            </RadioFormContainer>
          </DevideBox>


          {/* 사용자,닉네임 검색 인풋 */}
          <TextField
            label='사용자 검색'
            placeholder='이름 혹은 아이디 입력'
            fullWidth
            value={nameOrUsername}
            onChange={onChangeNameOrUsername}
            />


        <ButtonGroup>
          <Button type="submit" variant='contained' color='primary' sx={{flex:1}}>검색하기</Button>
          <Button onClick={onClickResetQuery} variant='outlined' color='primary' sx={{flex:1,gap:'1rem'}}>
            <RefreshOutlined />
            <Typography>검색 조건 초기화</Typography>
          </Button>
        </ButtonGroup>


      </SearchForm>

      <Box display='flex' mb={2}>
        <Button
          variant='contained'
          color='success'
          sx={{ marginLeft: 'auto' }}
          onClick={onClickExcelDownload}
        >
          {loading ? <Spinner fit={true} /> : <><FileCopyIcon sx={{ marginRight: '4px' }} /> 회원목록 엑셀다운로드</>}
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
            다운로드가 오래걸릴수 있습니다. 잠시만 기다려주세요.
          </Box>
        </Box>
      </Backdrop>
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
              headRows.map(({ name,width }) => (
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
            {data.content.map((applicant) => (
              <TableRow
                sx={{ cursor: 'pointer' }}
                key={applicant.courseUserSeq}
                hover
                onClick={() => onClickmodifyCourseInfo(applicant.courseUserSeq)}
              >
                <CourseInfoTableCell align='center'>
                  {applicant.courseUserSeq}
                </CourseInfoTableCell>

                <CourseInfoTableCell align='center'>
                  { applicant.name }
                </CourseInfoTableCell>

                <CourseInfoTableCell align='center'>
                  <NameBox title={applicant.name}>
                    {applicant.username}
                  </NameBox>
                </CourseInfoTableCell>

                {/* <CourseInfoTableCell align='center'>
                  <SubjectBox>{convertBirth(applicant.userInfo.birth)}</SubjectBox>
                </CourseInfoTableCell> */}
                <CourseInfoTableCell align='center'>
                  <SubjectBox>
                    {ConvertEnum(applicant.provincialEduTargetMain)}
                  </SubjectBox>
                </CourseInfoTableCell>
                <CourseInfoTableCell align='center'>
                  <SubjectBox>
                    {ConvertEnum(applicant.provincialEduTargetSub)}
                  </SubjectBox>
                </CourseInfoTableCell>

                <CourseInfoTableCell align='center'>
                  <SubjectBox>
                    {ConvertEnum(applicant.residence)}
                  </SubjectBox>
                </CourseInfoTableCell>
                <CourseInfoTableCell align='center'>
                  {applicant.organization}
                </CourseInfoTableCell>

                <CourseInfoTableCell align='center'>
                  {applicant.courseName}
                </CourseInfoTableCell>

                <CourseInfoTableCell align='center'>
                  {/* yyyy-mm-ddT00:00 형식에서 yyyy-mm-dd만 추출 */}
                  {applicant.studyDate.split(' ')[0].substring(0,10)}
                </CourseInfoTableCell>

                <CourseInfoTableCell align='center'>
                  {/* yyyy-mm-ddT00:00 형식에서 yyyy-mm-dd만 추출 */}
                  {applicant.studyDate.split(' ')[2].substring(0,10)}
                </CourseInfoTableCell>

                <CourseInfoTableCell align='center'>
                  {applicant.displayTotalProgress}
                </CourseInfoTableCell>
                <CourseInfoTableCell align='center'>
                  {applicant.displayCompleteYn}
                </CourseInfoTableCell>
                <CourseInfoTableCell align='center'>
                  {applicant.displayLearningStatus}
                </CourseInfoTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </Box>
  );
}


const ButtonGroup = styled(Box)`
  display: flex;
  gap: 1rem;
  margin: 1rem 0rem;
`;


const InputBox = styled(Box)`
  display: flex;
  gap: 1rem;
`;

const Container = styled(Box)`
  display: flex;
  gap: 2rem;
`

const DevideBox = styled(Box)`
  position:relative;
  height: 100px;
  width: 100%;
  display: flex;
  justify-content:center;
  align-items: center;
  padding: 1rem;
  margin: 1rem auto;

  &:after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  position: absolute;
  top:0;
  left:0;
  background-color: #c7c7c7c7;
  }

  &:before {
    content: '';
  display: block;
  width: 100%;
  height: 1px;
  position: absolute;
  bottom:0;
  left:0;
  background-color: #c7c7c7c7;
  }
`

const RadioFormContainer = styled(Container)`
  position: relative;
  margin: 1.25rem auto;
`;

const SearchFormLeft = styled(Box)`
  flex:1;
`

const SearchFormRight = styled(Box)`
  flex:1;
`

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;



const Title = styled(Typography)`
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
  background: #fcf9f9;
  
  border-top: 1px solid #f0f0f0;

  &:last-child {
    border-right: 1px solid #f0f0f0;
  }
`;

// 학습현황 테이블의 본문
const CourseInfoTableCell = styled(TableCell)`
  margin: 0;
  
  padding: 16px;
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

const SelectContainer = styled(Select)<{sx:CSSProperties}>`
  width: ${({sx}) => sx.width || '100%'};
  margin-bottom: ${({sx}) => sx.marginBottom || '1rem'};
`;
