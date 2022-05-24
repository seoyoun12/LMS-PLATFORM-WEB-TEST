import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  Box, Chip,
  FormControl, FormControlLabel,
  FormHelperText,
  FormLabel,
  InputAdornment,
  MenuItem, Radio,
  RadioGroup,
  Select
} from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { ContentType } from '@common/api/content';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import { grey } from '@mui/material/colors';
import { CustomInputLabel } from '@components/ui/InputLabel';
import { Modal } from '@components/ui';
import { Lesson, modifyLesson } from '@common/api/lesson';
import TextField from '@mui/material/TextField';
import { PRODUCT_STATUS } from '@common/api/course';
import { useSnackbar } from '@hooks/useSnackbar';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import { S3Files } from 'types/file';

const contentTypeOptions = [
  { value: ContentType.CONTENT_HTML, name: '웹콘텐츠(HTML5)' },
  { value: ContentType.CONTENT_MP4, name: 'mp4' },
  { value: ContentType.CONTENT_EXTERNAL, name: '외부링크' }
];

type FormType = {
  min: number;
  sec: number;
} & Lesson

const defaultValues = {
  contentType: ContentType.CONTENT_MP4
};

export function LessonUploadModal({ open, handleClose, lesson, mode = 'upload', error }: {
  open: boolean;
  handleClose: () => void;
  lesson?: Lesson;
  mode?: 'modify' | 'upload';
  error?: any;
}) {
  const snackbar = useSnackbar();
  const [ s3Files, setS3Files ] = useState<S3Files | null>([]);
  const [ submitLoading, setSubmitLoading ] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<FormType>({ defaultValues });

  useEffect(() => {
    if (mode === 'modify' && !!lesson && open) {
      setS3Files(
        lesson.s3Files.length
          ? [ { name: lesson.s3Files[0].name, path: lesson.s3Files[0].path } ]
          : []
      );
      reset({ ...lesson });
    }
  }, [ mode, lesson, open ]);

  const uploadFile = (e: ChangeEvent) => {
    e.preventDefault();
    // const reader = new FileReader();
    // reader.readAsArrayBuffer(e.target.files[0]);
    // reader.onload = (e) => {
    //   console.log('e', e);
    // };
    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return null;
    setS3Files([ { name: files[0].name, path: '' } ]);
  };

  const onSubmit: SubmitHandler<FormType> = async (lesson) => {
    const files = fileInputRef.current?.files;
    const formData = new FormData();
    const videoFile = !!files?.length ? files[0] : new Blob([]);
    const fileName = !!files?.length ? files[0].name : undefined;

    formData.append('files', videoFile, fileName);
    formData.append('data', new Blob([
        JSON.stringify({
          ...lesson,
          s3Files: s3Files
        }) ],
      { type: 'application/json' })
    );

    try {
      setSubmitLoading(true);
      await modifyLesson({ lessonId: lesson.seq, formData });
      setSubmitLoading(false);
      snackbar({ variant: 'success', message: '업로드 되었습니다.' });
    } catch (e: any) {
      console.log(e);
      snackbar(e.data.message);
    }
    handleClose();
  };

  const removeFile = () => {
    fileInputRef.current!.value = '';
    setS3Files([]);
  };

  if (error) return <div>error</div>;
  if (open && !lesson) return <div>loading</div>;
  return (
    <Modal
      action="저장"
      title="강의 업로드"
      maxWidth="md"
      open={open}
      submitLoading={submitLoading}
      handleClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box component="form">
        <FormContainer>
          <FormControl className="form-control">
            <TextField
              {...register('lessonNm', { required: '강의명을 입력해주세요.' })}
              size="small"
              label="강의명"
              variant="outlined"
            />
            <ErrorMessage errors={errors} name="contentName" as={<FormHelperText error />} />
          </FormControl>

          <FormControl className="form-control">
            <CustomInputLabel size="small">콘텐츠 타입</CustomInputLabel>
            <Controller
              rules={{ required: '콘텐츠 유형을 선택해주세요.' }}
              control={control}
              name="contentType"
              render={({ field }) => (
                <Select
                  {...field}
                  size="small"
                  label="콘텐츠 타입"
                >
                  {contentTypeOptions.map(({ value, name }) =>
                    <MenuItem value={value} key={value}>{name}</MenuItem>
                  )}
                </Select>
              )}
            />
            <ErrorMessage errors={errors} name="contentType" as={<FormHelperText error />} />
          </FormControl>

          <FormControl className="form-control">
            <label htmlFor="input-file">
              <input
                style={{ display: 'none' }}
                accept="video/mp4,video/mkv, video/x-m4v,video/*"
                id="input-file"
                type="file"
                multiple={true}
                ref={fileInputRef}
                onChange={uploadFile}
              />
            </label>
            <Label variant="body2">영상 업로드</Label>
            <Button
              color="neutral"
              variant="outlined"
              startIcon={<UploadOutlinedIcon htmlColor={grey[700]} />}
              onClick={() => fileInputRef.current!.click()}
            >
              파일 선택
            </Button>
            {!!s3Files?.length && <Chip
              sx={{ mt: '8px' }}
              icon={<OndemandVideoOutlinedIcon />}
              label={s3Files[0].name}
              onDelete={removeFile}
            />}
          </FormControl>

          <FormControl className="form-control">
            <CompleteTimeControl>
              <Label variant="body2">학습시간</Label>
              <InputContainer>
                <TextField
                  {...register('min', { required: '강의 명을 입력해주세요.' })}
                  size="small"
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">분</InputAdornment>
                  }}
                />
                <TextField
                  {...register('sec', { required: '강의 명을 입력해주세요.' })}
                  size="small"
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">초</InputAdornment>
                  }}
                />
              </InputContainer>
            </CompleteTimeControl>
          </FormControl>

          <FormControl className="form-control">
            <FormLabel focused={false}>상태</FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              name="status"
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value={PRODUCT_STATUS.APPROVE}
                    control={<Radio />}
                    label="정상"
                  />
                  <FormControlLabel
                    value={PRODUCT_STATUS.REJECT}
                    control={<Radio />}
                    label="중지"
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
        </FormContainer>
      </Box>
    </Modal>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;

  .form-control {
    width: 100%;

    &:not(:last-child) {
      margin-bottom: 30px;
    }
  }
`;

const CompleteTimeControl = styled.div`
`;

const Label = styled(Typography)`
  padding-bottom: 8px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;

  > * {
    width: 40%;

    &:first-of-type {
      margin-right: 12px;
    }
  }
`;
