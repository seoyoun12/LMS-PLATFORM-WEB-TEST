import { CourseType } from '@common/api/adm/courseClass';
import { CompleteType,StatusType,useLearningInfoCourses,useLearningInfoStep } from '@common/api/adm/learningInfo';
import styled from '@emotion/styled';
import { locationList } from '@layouts/MeEdit/MeEdit';
import { userBusinessTypeOne } from '@layouts/MeEdit/TransWorker/TransWorker';
import { Box, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';
import { UseFormRegister } from 'react-hook-form';

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

interface Props {
  courseClassSeq: number | null;
  onChageCourseClassSeq: (courseClassSeq: number) => void;
  courseSeq: number | null;
  onChageCourseSeq: (courseSeq: number) => void;
  register: UseFormRegister<FormType>;
  businessType: string | null;
  onChangeBusinessType: (value: string) => void;
  carRegitRegion: string | null;
  onChangeCarRegitRegion: (value: string) => void;
}

export function HeadRowsLeft({
  courseSeq,
  onChageCourseSeq,
  courseClassSeq,
  onChageCourseClassSeq,
  register,
  businessType,
  onChangeBusinessType,
  carRegitRegion,
  onChangeCarRegitRegion,
}: Props) {
  const { courses } = useLearningInfoCourses();
  const { steps } = useLearningInfoStep(courseSeq);

  const onChangeSeletedSeq = (e: SelectChangeEvent) => {
    onChageCourseSeq(Number(e.target.value));
    onChageCourseClassSeq(null);
  };
  const onChangeSelectedClassSeq = (e: SelectChangeEvent) => {
    onChageCourseClassSeq(Number(e.target.value) || null);
  };

  const duplicateRemoveCourses = useMemo(() => {
    const temp = [];
      courses?.forEach(course => {
        if(!temp.find(item => item.courseSeq === course.courseSeq)){
          temp.push(course);
        }
      })
      return temp;
  },[courses]);

  // console.log(duplicateRemoveCourses);
  return (
    <HeadRowsLeftWrap>
      <BoxRow>
        <Box width="50%">
          <Typography>과정 선택</Typography>
          <Select onChange={onChangeSeletedSeq} value={String(courseSeq)} fullWidth>
            <MenuItem value={null}>전체</MenuItem>
            {
            // courses의 요소가 중복되어 들어오기에 중복제거를 위해 Set을 사용한다.
            // const uniqueCourses = [...new Set(courses?.map(item => item.courseSeq))];
            
            duplicateRemoveCourses?.map((item) => {
              // console.log(item);
              return (
              <MenuItem key={item.courseSeq} value={item.courseSeq}>
                {item.courseName}
              </MenuItem>
            )})}
          </Select>
        </Box>
        <Box width="50%">
          <Typography>과정기수 선택</Typography>
          <Select
            onChange={onChangeSelectedClassSeq}
            value={String(courseClassSeq)}
            fullWidth
          >
            <MenuItem value={null}>전체</MenuItem>
            {steps?.map((item, idx) => (
              <MenuItem key={idx} value={item.courseClassSeq}>
                {item.yearAndStep}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </BoxRow>
      {/* <Box>
        <Typography>교육연도</Typography>
        <TextField {...register('')} fullWidth />
      </Box> */}
      <Box>
        <Typography>학습기간</Typography>
        <Box display="flex" gap={2} alignItems="center">
          <TextField type="date" {...register('studyStartDate')} fullWidth /> ~
          <TextField type="date" {...register('studyEndDate')} fullWidth />
        </Box>
      </Box>
      <Box display="flex" gap={1}>
        <Box width="50%">
          <Box>업종</Box>
          <Select
            onChange={e => onChangeBusinessType(e.target.value)}
            value={String(businessType)}
            fullWidth
          >
            <MenuItem value={null}>-없음-</MenuItem>
            {userBusinessTypeOne.map(item => (
              <MenuItem key={item.enType} value={item.enType}>
                {item.type}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box width="50%">
          <Box>차량등록지</Box>
          <Select
            onChange={e => onChangeCarRegitRegion(e.target.value)}
            value={String(carRegitRegion)}
            fullWidth
          >
            <MenuItem value={null}>-없음-</MenuItem>
            {locationList.map(item => (
              <MenuItem key={item.en} value={item.en}>
                {item.ko}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </HeadRowsLeftWrap>
  );
}
const HeadRowsLeftWrap = styled(Box)`
  gap: 4px;
  width: 33.3%;
`;

const BoxRow = styled(Box)`
  display: flex;
  width: 100%;
  gap: 16px;
`;
