import {
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { EduOverview } from '../Steb2/EduOverview';
import { UseFormSetValue, useForm } from 'react-hook-form';
import {
  CourseClassRes,
  UserTransSaveInputDataType,
  businessType,
  courseCategoryType,
  courseType,
  getCourseClassStep,
  getSingleCourseClass,
  userBusinessType,
} from '@common/api/courseClass';
import { YN } from '@common/constant';
import { ClickedPlanInfo } from '@layouts/Calendar/Calendar';
import FullCalendar from '@fullcalendar/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { courseClassEnrollInfo } from '@common/recoil';
import { useRouter } from 'next/router';
import { useSnackbar } from '@hooks/useSnackbar';

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  setModalInfo: React.Dispatch<
    React.SetStateAction<ClickedPlanInfo | undefined>
  >;
  modalInfo: ClickedPlanInfo | undefined;
  calendarRef: React.RefObject<FullCalendar>;
  // CalendarEvent: CalendarEvent[];
  filter: string;
  schedule?: CourseClassRes[];
  setValue: UseFormSetValue<UserTransSaveInputDataType>;
  setFixedBusinessType: React.Dispatch<React.SetStateAction<userBusinessType>>;
}

interface FormType {
  a: string;
  b: string;
  c: string;
  d: string;
}

export default function Steb2({
  setOpenModal,
  setModalInfo,
  setValue,
  setFixedBusinessType,
  openModal,
  modalInfo,
  calendarRef,
  filter,
  schedule,
}: Props) {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    // setValue,
    formState: { errors },
    control,
    reset,
    resetField,
    watch,
  } = useForm<FormType>();

  // EduOverview.tsx 에서 가져온 코드
  // const enrollInfo = useRecoilValue(courseClassEnrollInfo);
  const [courseCategoryType, setCourseCategoryType] =
    useState<courseCategoryType | null>(null); //교육과정
  const [courseBusinessType, setCourseBusinessType] =
    useState<businessType | null>(null); //업종구분
  const [stepSeq, setStepSeq] = useState<number | null>(null); //업종구분
  const [values, setValues] = useState<{
    step: number;
    studyStartDate: string;
    studyEndDate: string;
  }>();
  const [stepsRes, setStepsRes] = useState<
    {
      seq: number;
      step: number;
      studyStartDate: string;
      studyEndDate: string;
    }[]
  >([]); //기수 교육시작 교육끝
  const [enrollInfo, setEnrollInfo] = useRecoilState(courseClassEnrollInfo); //전역에 교육정보 저장
  const router = useRouter();
  const snackbar = useSnackbar();
  // const { data, error, mutate } = useSingleCourseClass(Number(enrollInfo && enrollInfo.seq));
  const getSingleCourse = async (courseClassSeq: number) => {
    try {
      const { data } = await getSingleCourseClass(courseClassSeq);
      console.log('교육신청 data', data);
      console.log('교육시작일자 : ', data?.cancelAvailStartDate);
      console.log('교육종료일자 : ', data?.cancelAvailEndDate);

      setCourseCategoryType(
        data.course.courseCategoryType as courseCategoryType
      );
      setCourseBusinessType(data.course.courseBusinessType as businessType); //임시타입
      setValue(
        'businessType',
        data.course.courseBusinessType?.split('_')[1] ===
          userBusinessType.PASSENGER
          ? userBusinessType.PASSENGER
          : userBusinessType.FREIGHT
      ); //
      setFixedBusinessType(
        data.course.courseBusinessType.split('_')[1] ===
          userBusinessType.PASSENGER
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
      // snackbar({ variant: 'error', message: e.data.message });
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

  //

  const handleStepIncrease = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleStepDecrease = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleStepBack = () => {
    router.push('/stebMove/steb1');
  };

  // console.log('modalInfo : ', modalInfo);
  // console.log('enrollInfo : ', enrollInfo);
  console.log('enrollInfo.seq : ', enrollInfo?.seq);
  // console.log('stepsRes : ', stepsRes);
  // console.log(
  //   'asd : ',
  //   stepsRes
  //     .filter((filter) => filter.seq === enrollInfo?.seq)
  //     .map(
  //       (item) =>
  //         `${item.step}기 / ${item.studyStartDate} ~ ${item.studyEndDate}`
  //     )
  // );

  console.log('리코일상태 : ', enrollInfo);
  console.log(
    'asdasd : ',
    stepsRes
      .filter((filter) => filter.seq === enrollInfo?.seq)
      .map((item) => item)
  );

  const renderComponent = () => {
    switch (step) {
      case 1:
        return (
          <FormControl fullWidth>
            <StebOneBox>
              <Typography>운수종사자 온라인 보수교육</Typography>
              <Typography>교육 예약을 시작하도록 하겠습니다.</Typography>
              <TextField
                variant='outlined'
                value={stepsRes
                  .filter((filter) => filter.seq === enrollInfo?.seq)
                  .map(
                    (item) =>
                      `${item.step}기 / ${item.studyStartDate} ~ ${item.studyEndDate}`
                  )}
                sx={{
                  width: '400px',
                }}
              ></TextField>
              <Typography sx={{ color: 'red' }}>
                ※선택하신 교육과 일정을 확인해주세요.
              </Typography>
              <StebOneButtonBox>
                <Button variant='outlined' onClick={handleStepBack}>
                  취소하기
                </Button>
                <Button variant='contained' onClick={handleStepIncrease}>
                  시작하기
                </Button>
              </StebOneButtonBox>
            </StebOneBox>
          </FormControl>
        );
      case 2:
        return (
          <FormControl fullWidth>
            <StebTwoBox>
              <Typography>운수 업종을 선택해주세요.</Typography>
            </StebTwoBox>
          </FormControl>
        );
      case 3:
        return <StebThreeBox>여긴스탭2-3이야</StebThreeBox>;
      default:
        return null;
    }
  };
  return (
    <Steb2Wrap>
      <Steb2ButtonWrap>
        <Button variant='outlined' onClick={handleStepDecrease}>
          ←
        </Button>
        <Button variant='contained' onClick={handleStepIncrease}>
          →
        </Button>
      </Steb2ButtonWrap>
      <Steb2BodyContainer>{renderComponent()}</Steb2BodyContainer>
    </Steb2Wrap>
  );
}

const Steb2Wrap = styled(Box)``;

const Steb2BodyContainer = styled(Container)`
  /* padding: 0 1rem; */
  margin-top: 6rem;
  margin-bottom: 4rem;
  display: flex;
  width: 100%;
  height: 500px;

  .MuiTextField-root {
    background: #eeefff;
  }
  .MuiSelect-select {
    background: #eeefff;
  }
`;

const Steb2ButtonWrap = styled(Box)`
  border: 1px solid blue;
  display: flex;
  vertical-align: center;
  align-items: center;
`;

// Steb 1
const StebOneBox = styled(Box)`
  /* background-color: red; */
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StebOneButtonBox = styled(Box)`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  gap: 10px;
`;

// Steb 2
const StebTwoBox = styled(Box)`
  /* background-color: green; */
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

// Steb 3
const StebThreeBox = styled(Box)`
  /* background-color: blue; */
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
