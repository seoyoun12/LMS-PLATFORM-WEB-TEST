import { useCourseList } from '@common/api/adm/course';
import { Modal, Spinner, Table } from '@components/ui';
import styled from '@emotion/styled';
import { ErrorMessage } from '@hookform/error-message';
import { CalendarEvent } from '@layouts/Calendar/Calendar';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputBase,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Checkbox,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CourseRegiModal } from './CourseRegiModal';
import {
  courseClassCreate,
  CourseClassCreate,
  getDetailCourseClass,
  modifyCourseClass,
} from '@common/api/adm/courseClass';
import { YN } from '@common/constant';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useSnackbar } from '@hooks/useSnackbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import dateFormat from 'dateformat';
import { useRouter } from 'next/router';
import { useDialog } from '@hooks/useDialog';

// interface CourseClassForm extends CourseClassCreate {
//   courseName: string;
// }
const defaultValues: Partial<CourseClassCreate> = {
  requestStartDate: dateFormat(new Date(), 'yyyy-mm-dd'),
  requestEndDate: dateFormat(new Date(), 'yyyy-mm-dd'),
  studyStartDate: dateFormat(new Date(), 'yyyy-mm-dd'),
  studyEndDate: dateFormat(new Date(), 'yyyy-mm-dd'),
};

interface FormType extends CourseClassCreate {
  courseClassSeq: number;
}

export function CalendarModify() {
  const router = useRouter();
  const { courseClassSeq } = router.query;
  const dialog = useDialog();
  const [openModal, setOpenModal] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [limitPeopleCheck, setLimitPeopleCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    resetField,
    watch,
    setValue,
  } = useForm<FormType>({ defaultValues });

  useEffect(() => {
    (async function () {
      try {
        console.log('successGet data', courseClassSeq);
        const { data } = await getDetailCourseClass(Number(courseClassSeq));
        console.log('successGet data', data);
        setValue('year', data.year);
        setValue('step', data.step);
        setValue('limitPeopleYn', data.limitPeopleYn);
        setLimitPeopleCheck(data.limitPeopleYn === YN.YES ? true : false);
        setValue('limitPeople', data.limitPeople);
        setValue('requestStartDate', dateFormat(data.requestStartDate, 'yyyy-mm-dd'));
        setValue('requestEndDate', dateFormat(data.requestEndDate, 'yyyy-mm-dd'));
        setValue('studyStartDate', dateFormat(data.studyStartDate, 'yyyy-mm-dd'));
        setValue('studyEndDate', dateFormat(data.studyEndDate, 'yyyy-mm-dd'));
        setValue('courseClassSeq', data.seq);
        setCourseName(data.course.courseName);
      } catch (e: any) {
        window.alert(
          `데이터를 불러오는데 실패했습니다.(seq: ${courseClassSeq}) ` + e.data.message
        );
      }
    })();
  }, []);

  const onSubmit: SubmitHandler<FormType> = async e => {
    console.log('dsdasda', e, limitPeopleCheck);
    const { step, year, limitPeople, courseClassSeq, ...rest } = e;

    // if (!courseSeq) return window.alert('과정을 등록해야합니다!');
    try {
      setLoading(true);
      const dialogConfirmed = await dialog({
        title: '일정 수정하기',
        description: '정말로 일정을 수정하시겠습니까?',
        confirmText: '확인',
        cancelText: '취소',
      });

      if (!dialogConfirmed) return setLoading(false);
      await modifyCourseClass({
        // ...watch(),
        ...rest,
        step: Number(step),
        year: Number(year),
        limitPeople: Number(limitPeople),
        courseClassSeq: Number(courseClassSeq),
      });
      window.alert('완료 되었습니다.');
      router.push('/admin-center/calendar');
    } catch (e: any) {
      // snackbar({ variant: 'error', message: e });
      console.log(e);
      window.alert(e.data.message);
      setLoading(false);
    }
  };

  const handleCloseModal = async () => {
    setOpenModal(false);
  };

  const handleGetCourseSeq = (courseSeq: number, courseName: string) => {
    setValue('courseSeq', courseSeq);
    setCourseName(courseName);
    setOpenModal(false);
  };

  return (
    <CalendarUpdloadWrap>
      <Typography
        variant="h5"
        sx={{
          mb: '12px',
          fontWeight: 700,
        }}
      >
        일정 등록
      </Typography>
      {/* <CourseConnectButton
        variant="contained"
        color="secondary"
        onClick={() => setOpenModal(true)}
        disabled
      >
        과정 선택
      </CourseConnectButton> */}
      <Box>
        <Typography component="span">과정: </Typography>
        {watch().courseSeq && (
          <Typography component="span">
            {watch().courseSeq} - {courseName}
          </Typography>
        )}
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        display="flex"
        flexDirection="column"
        gap="0.5rem"
        mt={2}
      >
        {/* <TextField label="seq" {...register('seq')} /> */}
        <FormControl>
          <Typography>연도</Typography>
          <TextField {...register('year', { required: '연도를 입력해주세요' })} />
          <ErrorMessage errors={errors} name="year" as={<FormHelperText error />} />
        </FormControl>
        <Box display={'flex'} gap="1rem">
          <FormControl sx={{ flexGrow: 1 }}>
            <Typography>기수</Typography>
            <TextField {...register('step', { required: '기수를 입력해주세요' })} />
            <ErrorMessage errors={errors} name="year" as={<FormHelperText error />} />
          </FormControl>
        </Box>
        <Box display={'flex'} gap="1rem">
          <FormControl sx={{ flexGrow: 1 }}>
            <Checkbox
              checked={limitPeopleCheck}
              onChange={(e, checked) => {
                if (checked) {
                  setValue('limitPeopleYn', YN.YES);
                  setLimitPeopleCheck(checked);
                  setValue('limitPeople', '');
                }
                if (!checked) {
                  setValue('limitPeopleYn', YN.NO);
                  setLimitPeopleCheck(checked);
                  setValue('limitPeople', 0);
                }
              }}
            />{' '}
            <Typography textAlign={'center'}>수강인원 제한여부</Typography>
            {/* <TextField label="수강인원제한여부" {...register('', { required: '현재수강생을 입력해주세요' })} />
            <ErrorMessage errors={errors} name="currentJoin" as={<FormHelperText error />} /> */}
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <TextField
              disabled={!limitPeopleCheck}
              label="최대수강생"
              {...register('limitPeople', { required: '최대수강생을 입력해주세요' })}
            />
            <ErrorMessage
              errors={errors}
              name="limitPeople"
              as={<FormHelperText error />}
            />
          </FormControl>
        </Box>
        <Box display={'flex'} gap="1rem">
          <FormControl sx={{ flexGrow: 1 }}>
            <Typography>신청시작일</Typography>
            <DatePicker
              locale={ko}
              dateFormat="yyyy-MM-dd"
              showPopperArrow={false}
              minDate={new Date()}
              customInput={
                <TextField InputProps={{ endAdornment: <CalendarMonthIcon /> }} />
              }
              selected={new Date(watch().requestStartDate)}
              onChange={date =>
                setValue(
                  'requestStartDate',
                  date
                    ? dateFormat(date, 'yyyy-mm-dd')
                    : dateFormat(new Date(), 'yyyy-mm-dd')
                )
              }
            />
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <Typography>신청종료일</Typography>
            <DatePicker
              locale={ko}
              dateFormat="yyyy-MM-dd"
              showPopperArrow={false}
              minDate={new Date()}
              customInput={
                <TextField InputProps={{ endAdornment: <CalendarMonthIcon /> }} />
              }
              selected={new Date(watch().requestEndDate)}
              onChange={date =>
                setValue(
                  'requestEndDate',
                  date
                    ? dateFormat(date, 'yyyy-mm-dd')
                    : dateFormat(new Date(), 'yyyy-mm-dd')
                )
              }
            />
          </FormControl>
        </Box>
        <Box display={'flex'} gap="1rem">
          <FormControl sx={{ flexGrow: 1 }}>
            <Typography>교육시작일</Typography>
            <DatePicker
              locale={ko}
              dateFormat="yyyy-MM-dd"
              showPopperArrow={false}
              minDate={new Date()}
              customInput={
                <TextField InputProps={{ endAdornment: <CalendarMonthIcon /> }} />
              }
              selected={new Date(watch().studyStartDate)}
              onChange={date =>
                setValue(
                  'studyStartDate',
                  date
                    ? dateFormat(date, 'yyyy-mm-dd')
                    : dateFormat(new Date(), 'yyyy-mm-dd')
                )
              }
            />
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <Typography>교육종료일</Typography>
            <DatePicker
              locale={ko}
              dateFormat="yyyy-MM-dd"
              showPopperArrow={false}
              minDate={new Date()}
              customInput={
                <TextField InputProps={{ endAdornment: <CalendarMonthIcon /> }} />
              }
              selected={new Date(watch().studyEndDate)}
              onChange={date =>
                setValue(
                  'studyEndDate',
                  date
                    ? dateFormat(date, 'yyyy-mm-dd')
                    : dateFormat(new Date(), 'yyyy-mm-dd')
                )
              }
            />
          </FormControl>
        </Box>

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <Spinner fit={true} /> : '수정'}
        </Button>
        <Typography>
          날짜 입력 방식은 YYYY-MM-DD로 해야합니다. ex{')'} 2022-07-22
        </Typography>
      </Box>
      <CourseRegiModal
        open={openModal}
        handleClose={handleCloseModal}
        handleGetCourseSeq={handleGetCourseSeq}
      />
    </CalendarUpdloadWrap>
  );
}

const CalendarUpdloadWrap = styled(Container)``;

const CourseConnectButton = styled(Button)``;
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
const ConnectButton = styled(Button)`
  margin-right: 12px;
`;
