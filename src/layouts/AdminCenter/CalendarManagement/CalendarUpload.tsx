import styled from '@emotion/styled';
import { ErrorMessage } from '@hookform/error-message';
import { CalendarEvent } from '@layouts/Calendar/Calendar';
import { Box, Button, Container, FormControl, FormHelperText, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

const defaultValues = {
  seq: 1,
  className: 'PASSENGER',
  title: `접수중`,
  eduTypeAndTime: '신규교육/24시간',
  description: '동영상(VOD)',
  year: 9929,
  jobType: '화물',
  eduLegend: '보수교육',
  currentJoin: 592,
  limit: 992,
  eduStart: '2022-07-20',
  eduEnd: '2022-07-26',
  start: '2022-07-12',
  end: '2022-07-15',
};

export function CalendarUpload() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    resetField,
    watch,
  } = useForm<CalendarEvent>({});

  const onSubmit: SubmitHandler<CalendarEvent> = () => {};

  console.log('ㅇㅇ', watch());
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
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate display="flex" flexDirection="column" gap="0.5rem">
        {/* <TextField label="seq" {...register('seq')} /> */}
        <Box display={'flex'} gap="1rem">
          <FormControl sx={{ flexGrow: 1 }}>
            <TextField label="접수여부" disabled defaultValue={'접수중'} {...register('title', { required: '접수여부를 입력해주세요.' })} />
            <ErrorMessage errors={errors} name="title" as={<FormHelperText error />} />
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <TextField label="교육타입/시간" {...register('eduTypeAndTime', { required: '교육타입/시간을 입력해주세요.' })} />
            <ErrorMessage errors={errors} name="eduTypeAndTime" as={<FormHelperText error />} />
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <TextField label="미디어타입" {...register('description', { required: '미디어타입을 입력해주세요.' })} />
            <ErrorMessage errors={errors} name="description" as={<FormHelperText error />} />
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <TextField label="기수" {...register('year', { required: '기수를 입력해주세요' })} />
            <ErrorMessage errors={errors} name="year" as={<FormHelperText error />} />
          </FormControl>
        </Box>
        <FormControl>
          <TextField label="운수타입" {...register('jobType', { required: '운수타입을 입력해주세요' })} />
          <ErrorMessage errors={errors} name="jobType" as={<FormHelperText error />} />
        </FormControl>
        <FormControl>
          <TextField label="교육타입" {...register('eduLegend', { required: '교육타입을 입력해주세요' })} />
          <ErrorMessage errors={errors} name="eduLegend" as={<FormHelperText error />} />
        </FormControl>
        <Box display={'flex'} gap="1rem">
          <FormControl sx={{ flexGrow: 1 }}>
            <TextField label="현재수강생" {...register('currentJoin', { required: '현재수강생을 입력해주세요' })} />
            <ErrorMessage errors={errors} name="currentJoin" as={<FormHelperText error />} />
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <TextField label="최대수강생" {...register('limit', { required: '최대수강생을 입력해주세요' })} />
            <ErrorMessage errors={errors} name="limit" as={<FormHelperText error />} />
          </FormControl>
        </Box>
        <Box display={'flex'} gap="1rem">
          <FormControl sx={{ flexGrow: 1 }}>
            <TextField label="교육시작일" {...register('eduStart', { required: '교육시작일을 입력해주세요' })} />
            <ErrorMessage errors={errors} name="eduStart" as={<FormHelperText error />} />
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <TextField label="교육종료일" {...register('eduEnd', { required: '교육종료일을 입력해주세요' })} />
            <ErrorMessage errors={errors} name="eduEnd" as={<FormHelperText error />} />
          </FormControl>
        </Box>
        <Box display={'flex'} gap="1rem">
          <FormControl sx={{ flexGrow: 1 }}>
            <TextField label="신청시작일" {...register('start', { required: '신청시작일을 입력해주세요' })} />
            <ErrorMessage errors={errors} name="start" as={<FormHelperText error />} />
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <TextField label="신청종료일" {...register('end', { required: '신청종료일을 입력해주세요' })} />
            <ErrorMessage errors={errors} name="end" as={<FormHelperText error />} />
          </FormControl>
        </Box>
        <Button type="submit" variant="contained">
          등록
        </Button>
      </Box>
    </CalendarUpdloadWrap>
  );
}

const CalendarUpdloadWrap = styled(Container)``;
