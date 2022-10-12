import styled from '@emotion/styled';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  MenuItem,
} from '@mui/material';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  businessType,
  courseCategoryType,
  courseSubCategoryType,
  courseType,
  getCourseClassStep,
  getSingleCourseClass,
  userBusinessType,
  UserTransSaveInputDataType,
  useSingleCourseClass,
} from '@common/api/courseClass';
import { Spinner } from '@components/ui';
import {
  courseCategory,
  courseSubCategory,
} from '@layouts/Calendar/CalendarBody/CalendarBody';
import { FieldValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { courseBusinessTypeList, FilterType } from '@layouts/Calendar/Calendar';
import { courseClassEnrollInfo } from '@common/recoil';
import { useRecoilState } from 'recoil';
import { useSnackbar } from '@hooks/useSnackbar';

export function EduOverview({
  setValue,
  setFixedBusinessType,
  watch,
}: {
  setValue: UseFormSetValue<UserTransSaveInputDataType>;
  watch: UseFormWatch<UserTransSaveInputDataType>;
  setFixedBusinessType: React.Dispatch<React.SetStateAction<userBusinessType>>;
}) {
  const [courseCategoryType, setCourseCategoryType] = useState<courseCategoryType | null>(
    null
  ); //교육과정
  const [courseBusinessType, setCourseBusinessType] = useState<businessType | null>(null); //업종구분
  const [stepSeq, setStepSeq] = useState<number | null>(null); //업종구분
  const [values, setValues] = useState<{
    step: number;
    studyStartDate: string;
    studyEndDate: string;
  }>();
  const [stepsRes, setStepsRes] = useState<
    { seq: number; step: number; studyStartDate: string; studyEndDate: string }[]
  >([]); //기수 교육시작 교육끝
  const [enrollInfo, setEnrollInfo] = useRecoilState(courseClassEnrollInfo); //전역에 교육정보 저장
  const router = useRouter();
  const snackbar = useSnackbar();
  // const { data, error, mutate } = useSingleCourseClass(Number(enrollInfo && enrollInfo.seq));

  const getSingleCourse = async (courseClassSeq: number) => {
    try {
      const { data } = await getSingleCourseClass(courseClassSeq);
      console.log('data', data);

      setCourseCategoryType(data.course.courseCategoryType as courseCategoryType);
      setCourseBusinessType(data.course.courseBusinessType as businessType); //임시타입
      setValue(
        'businessType',
        data.course.courseBusinessType?.split('_')[1] === userBusinessType.PASSENGER
          ? userBusinessType.PASSENGER
          : userBusinessType.FREIGHT
      ); //
      setFixedBusinessType(
        data.course.courseBusinessType.split('_')[1] === userBusinessType.PASSENGER
          ? userBusinessType.PASSENGER
          : userBusinessType.FREIGHT
      ); //업체정보 운수구분 고정용(ALL안씀)
      setStepSeq(data.seq);
      setValues({
        step: data.step,
        studyStartDate: data.studyStartDate,
        studyEndDate: data.studyEndDate,
      }); //작동안하는듯한 코드확인필요
      // setValue('businessType', data.course.courseCategoryType);
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  useEffect(() => {
    if (enrollInfo) getSingleCourse(enrollInfo.seq);
  }, [enrollInfo]);

  // useEffect(() => {
  //   if (data) {
  //     setCourseCategoryType(data.course.courseCategoryType);
  //     setCourseBusinessType(data.course.courseBusinessType); //임시타입
  //     setStepSeq(data.seq);
  //     setValues({ step: data.step, studyStartDate: data.studyStartDate, studyEndDate: data.studyEndDate });
  //   }
  // }, [data, stepSeq, stepsRes]);

  const getSteps = async () => {
    if (!courseCategoryType || !courseBusinessType)
      return window.alert('기수 가져오기 실패');
    const { data } = await getCourseClassStep(
      localStorage.getItem('site_course_type') as courseType,
      courseCategoryType,
      courseBusinessType
    );
    setStepsRes([...data]);
  };

  useEffect(() => {
    if (courseCategoryType && courseBusinessType) {
      getSteps();
    }
  }, [courseCategoryType, courseBusinessType]);

  // if (enrollInfo.seq && !data) return <Spinner />;
  return (
    <EduOverviewWrap>
      <Box>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center">
          {/* <HorizontalRuleRoundedIcon sx={{ transform: 'scale(1,2)', color: '#3498db' }} /> */}
          <span>교육개요</span>
        </Typography>
        <TableContainer>
          <Table sx={{ borderTop: '3px solid #000' }}>
            <TableCustomRow>
              <TableLeftCell>온라인과정</TableLeftCell>
              <TableRightCell>
                {/* <FormControl fullWidth>
                  <Select
                    labelId="student"
                    id="student"
                    value={courseCategory[0].type}
                    onChange={e => {
                      setCourseCategoryType(
                        courseCategory.filter(cate => cate.type === e.target.value)[0]
                          .type
                      );
                      // setEnrollInfo(prev => {
                      // return { ...prev, courseCategoryType: courseCategory.filter(cate => cate.type === e.target.value)[0].type };
                      // });
                    }}
                    label="student"
                    disabled
                  >
                    <MenuItem value={courseCategory[0].type}>보수일반</MenuItem>
                    {courseCategory.map(item => (
                      <MenuItem key={item.type} value={item.type}>
                        {item.ko}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
                {localStorage.getItem('site_course_type') === 'TYPE_LOW_FLOOR_BUS'
                  ? '저상버스 운전자교육'
                  : '보수일반'}
              </TableRightCell>
            </TableCustomRow>
            {!(localStorage.getItem('site_course_type') === 'TYPE_LOW_FLOOR_BUS') && (
              <TableCustomRow>
                <TableLeftCell>운수구분</TableLeftCell>
                <TableRightCell>
                  {/* <FormControl fullWidth>
                  <Select
                    labelId="courseBusinessType"
                    id="courseBusinessType"
                    value={courseBusinessType}
                    onChange={e => {
                      setCourseBusinessType(
                        courseBusinessTypeList.filter(
                          filter => filter.enType === e.target.value
                        )[0].enType
                      );
                      // setEnrollInfo(prev => {
                      // return {
                      // ...prev,
                      // courseCategorySubType: courseBusinessTypeList.filter(filter => filter.enType === e.target.value)[0].enType,
                      // };
                      // });
                    }}
                    disabled
                  >
                    {courseBusinessTypeList.map(item => {
                      if (item.enType === businessType.TYPE_ALL) return;
                      return (
                        <MenuItem key={item.enType} value={item.enType}>
                          {item.type}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl> */}
                  {(watch('businessType') === userBusinessType.PASSENGER && '여객') ||
                    (watch('businessType') === userBusinessType.FREIGHT && '화물')}
                </TableRightCell>
              </TableCustomRow>
            )}
            <TableCustomRow>
              <TableLeftCell>기수 / 교육일자</TableLeftCell>
              <TableRightCell>
                {/* <FormControl fullWidth>
                  <Select
                    labelId="student"
                    id="student"
                    value={stepSeq}
                    onChange={e => {
                      setStepSeq(Number(e.target.value));
                      setValue('courseClassSeq', Number(e.target.value));
                      setEnrollInfo({ seq: Number(e.target.value) });
                      // setEnrollInfo(prev => {
                      // return {
                      // ...prev,
                      // step: Number(e.target.value),
                      // };
                      // });
                    }}
                    disabled
                  >
                    {stepsRes.map(item => {
                      return (
                        <MenuItem key={item.step} value={item.seq}>
                          {item.step}기 / {item.studyStartDate} ~ {item.studyEndDate}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl> */}
                {stepsRes
                  .filter(filter => filter.seq === stepSeq)
                  .map(
                    item =>
                      `${item.step}기 / ${item.studyStartDate} ~ ${item.studyEndDate}`
                  )}
              </TableRightCell>
            </TableCustomRow>
          </Table>
        </TableContainer>
      </Box>
    </EduOverviewWrap>
  );
}

const EduOverviewWrap = styled(Box)``;
const TableCustomRow = styled(TableRow)`
  border-bottom: 1px solid #d2d2d2;

  width: 100%;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const TableLeftCell = styled(TableCell)`
  /* background: #e1e1e1; */
  font-size: 20px;
  text-align: center;
  font-weight: 700;
  width: 20%;
  display: flex;
  align-items: center;
  /* background: #dce1ff; */

  @media (max-width: 768px) {
    border-bottom: none;
    width: 100%;
    text-align: start;
    padding: 12px 0;
    margin-top: 2px;
    /* padding-bottom: 2px; */
  }
`;
const TableRightCell = styled(TableCell)`
  flex-grow: 1;
  display: flex;
  align-items: center;
  border-left: 1px solid #d2d2d2;
  @media (max-width: 768px) {
    border-left: none;
    padding: 12px 0;
    padding-top: 2px;
  }
`;
