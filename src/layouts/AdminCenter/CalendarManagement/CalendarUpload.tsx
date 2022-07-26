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
import { FormEvent, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CourseRegiModal } from './CourseRegiModal';
import { courseClassCreate, CourseClassCreate } from '@common/api/adm/courseClass';
import { YN } from '@common/constant';
import { useSnackbar } from '@hooks/useSnackbar';

// const defaultValues = {
//   seq: 1,
//   className: 'PASSENGER',
//   title: `접수중`,
//   eduTypeAndTime: '신규교육/24시간',
//   description: '동영상(VOD)',
//   year: 9929,
//   jobType: '화물',
//   eduLegend: '보수교육',
//   currentJoin: 592,
//   limit: 992,
//   eduStart: '2022-07-20',
//   eduEnd: '2022-07-26',
//   start: '2022-07-12',
//   end: '2022-07-15',
// };

// interface CourseClassForm extends CourseClassCreate {
//   courseName: string;
// }

export function CalendarUpload() {
  const snackbar = useSnackbar();
  const [openModal, setOpenModal] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [limitPeopleCheck, setLimitPeopleCheck] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    resetField,
    watch,
    setValue,
  } = useForm<CourseClassCreate>({});
  const onSubmit: SubmitHandler<CourseClassCreate> = async e => {
    console.log('dsdasda', e, limitPeopleCheck);
    const { step, year, limitPeople, courseSeq } = e;

    if (!courseSeq) return window.alert('과정을 등록해야합니다!');
    try {
      await courseClassCreate({
        ...watch(),
        step: Number(step),
        year: Number(year),
        limitPeople: Number(limitPeople),
        courseSeq: Number(courseSeq),
      });
      window.alert('완료 되었습니다.');
    } catch (e: any) {
      // snackbar({ variant: 'error', message: e });
      console.log(e);
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
      <CourseConnectButton variant="contained" color="secondary" onClick={() => setOpenModal(true)}>
        과정 선택
      </CourseConnectButton>
      <Box>
        <Typography color={'red'}>과정에 콘텐츠를 연결해 주셔야 오류가 나지않습니다! </Typography>
        <Typography component="span">선택됨: </Typography>
        {watch().courseSeq && (
          <Typography component="span">
            {watch().courseSeq} - {courseName}
          </Typography>
        )}
      </Box>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate display="flex" flexDirection="column" gap="0.5rem" mt={2}>
        {/* <TextField label="seq" {...register('seq')} /> */}
        <Box display={'flex'} gap="1rem">
          <FormControl sx={{ flexGrow: 1 }}>
            <TextField label="기수" {...register('step', { required: '기수를 입력해주세요' })} />
            <ErrorMessage errors={errors} name="year" as={<FormHelperText error />} />
          </FormControl>
        </Box>
        <FormControl>
          <TextField label="연도" {...register('year', { required: '연도를 입력해주세요' })} />
          <ErrorMessage errors={errors} name="year" as={<FormHelperText error />} />
        </FormControl>
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
            <ErrorMessage errors={errors} name="limitPeople" as={<FormHelperText error />} />
          </FormControl>
        </Box>
        <Box display={'flex'} gap="1rem">
          <FormControl sx={{ flexGrow: 1 }}>
            <TextField label="교육시작일" {...register('studyStartDate', { required: '교육시작일을 입력해주세요' })} />
            <ErrorMessage errors={errors} name="studyStartDate" as={<FormHelperText error />} />
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <TextField label="교육종료일" {...register('studyEndDate', { required: '교육종료일을 입력해주세요' })} />
            <ErrorMessage errors={errors} name="studyEndDate" as={<FormHelperText error />} />
          </FormControl>
        </Box>
        <Box display={'flex'} gap="1rem">
          <FormControl sx={{ flexGrow: 1 }}>
            <TextField label="신청시작일" {...register('requestStartDate', { required: '신청시작일을 입력해주세요' })} />
            <ErrorMessage errors={errors} name="requestStartDate" as={<FormHelperText error />} />
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <TextField label="신청종료일" {...register('requestEndDate', { required: '신청종료일을 입력해주세요' })} />
            <ErrorMessage errors={errors} name="requestEndDate" as={<FormHelperText error />} />
          </FormControl>
        </Box>
        <Button type="submit" variant="contained">
          등록
        </Button>
        <Typography>날짜 입력 방식은 YYYY-MM-DD로 해야합니다. ex{')'} 2022-07-22</Typography>
      </Box>
      <CourseRegiModal open={openModal} handleClose={handleCloseModal} handleGetCourseSeq={handleGetCourseSeq} />
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
