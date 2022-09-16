import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  Backdrop,
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { ContentType } from '@common/api/content';
import { ChangeEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { CustomInputLabel } from '@components/ui/InputLabel';
import { Modal, Spinner } from '@components/ui';
import { Lesson } from '@common/api/lesson';
import { modifyLesson, removeLesson, useLessonList } from '@common/api/adm/lesson';
import TextField from '@mui/material/TextField';
import { ProductStatus } from '@common/api/course';
import { useSnackbar } from '@hooks/useSnackbar';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import { useFileUpload } from '@hooks/useChunkFileUpload';
import { FileType } from '@common/api/file';
import { FileUploader } from '@components/ui/FileUploader';
import { BbsType, deleteFile } from '@common/api/adm/file';
import { useDialog } from '@hooks/useDialog';
import router from 'next/router';

interface Props {
  open: boolean;
  handleClose: (isSubmit: boolean) => void;
  lesson?: Lesson;
  error?: any;
}

interface FormType extends Lesson {
  files: File[];
}

const contentTypeOptions = [
  // { value: ContentType.CONTENT_HTML, name: '웹콘텐츠(HTML5)' },
  { value: ContentType.CONTENT_MP4, name: 'mp4' },
  // { value: ContentType.CONTENT_EXTERNAL, name: '외부링크' },
];

const defaultValues = {
  contentType: ContentType.CONTENT_MP4,
  status: ProductStatus.APPROVE,
  files: [],
};

export function LessonEditModal({ open, handleClose, lesson, error }: Props) {
  const snackbar = useSnackbar();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isFileDelete, setIsFileDelete] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const { handleUpload , handleProgressStatus } = useFileUpload();
  const { contentSeq } = router.query;
  const { lessonList, lessonListError, mutate } = useLessonList(Number(contentSeq));
  const dialog = useDialog();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    resetField,
  } = useForm<FormType>({ defaultValues });

  useEffect(() => {
    if (!!lesson && open) {
      reset({ ...lesson });
      setFileName(lesson?.s3Files[0]?.name || null);
    }
  }, [lesson, open, reset]);

  const fileHandler = async (files: File[], lesson: Lesson) => {
    const isFileUpload = files.length > 0;
    if (isFileUpload) {
      const file = files[0];
      const fileName = files[0].name;
      await handleUpload({
        dataId: lesson.seq,
        file,
        fileName,
        fileUploadType: FileType.LESSON_FILE,
      });
    } else {
      if (isFileDelete) {
        await deleteFile({
          fileTypeId: lesson.seq,
          fileType: BbsType.TYPE_LESSON,
          fileSeqList: lesson.s3Files.map(v => v.seq),
        });
      }
    }
  };

  // 삭제
  const onRemoveLesson = async (lessonId: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: '레슨 삭제하기',
        description: '정말로 삭제하시겠습니까?',
        confirmText: '삭제하기',
        cancelText: '취소',
      });
      if (dialogConfirmed) {
        await removeLesson(lessonId);
        snackbar({ variant: 'success', message: '성공적으로 삭제되었습니다.' });
        handleClose(true);
        await mutate();
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  const onSubmit: SubmitHandler<FormType> = async ({ files, ...lessonWatch }) => {
    setSubmitLoading(true);
    const lesson = {
      ...lessonWatch,
      completeTime: Number(lessonWatch.min) * 60 + Number(lessonWatch.sec),
      totalTime: Number(lessonWatch.min) * 60 + Number(lessonWatch.sec),
    };

    try {
      await modifyLesson({ lessonSeq: lesson.seq, lesson });
      await fileHandler(files, lesson);
      const isTrue = await handleProgressStatus()
      if(isTrue) return snackbar({variant:'error',message:'업로드실패'})
      setSubmitLoading(false);
      snackbar({ variant: 'success', message: '업로드 완료되었습니다.' });
    handleClose(true);
    } catch (e: any) {
      snackbar(e.message || e.data?.message);
      setSubmitLoading(false);
    }
  };
  

  const handleFileChange = (e: ChangeEvent) => {
    e.preventDefault();

    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return null;
    setFileName(files[0].name);
    setIsFileDelete(false);
  };

  const handleDeleteFile = () => {
    resetField('files');
    setFileName(null);
    setIsFileDelete(true);
  };

  if (error) return <div>error</div>;
  return (
    <Modal
      // action="저장"
      action={
        <>
          <DeleteBtn
            variant="contained"
            color="warning"
            onClick={() => onRemoveLesson(lesson.seq)}
            size="small"
          >
            삭제
          </DeleteBtn>
          <SubmitBtn
            variant="contained"
            color="secondary"
            onClick={handleSubmit(onSubmit)}
            size="small"
          >
            저장
          </SubmitBtn>
        </>
      }
      title="강의 업로드"
      maxWidth="sm"
      fullWidth
      loading={!lesson}
      open={open}
      actionLoading={submitLoading}
      onCloseModal={() => handleClose(false)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box component="form">
        <FormContainer>
          <FormControl className="form-control">
            <TextField
              {...register('chapter', { required: '차시를 입력해주세요.' })}
              size="small"
              label="차시"
              variant="outlined"
            />
            <ErrorMessage errors={errors} name="chapter" as={<FormHelperText error />} />
          </FormControl>

          <FormControl className="form-control">
            <TextField
              {...register('lessonNm', { required: '강의명을 입력해주세요.' })}
              size="small"
              label="강의명"
              variant="outlined"
            />
            <ErrorMessage
              errors={errors}
              name="contentName"
              as={<FormHelperText error />}
            />
          </FormControl>

          <FormControl className="form-control" sx={{ display: 'none' }}>
            <CustomInputLabel size="small">콘텐츠 타입</CustomInputLabel>
            <Controller
              rules={{ required: '콘텐츠 유형을 선택해주세요.' }}
              control={control}
              name="contentType"
              render={({ field }) => (
                <Select {...field} size="small" label="콘텐츠 타입">
                  {contentTypeOptions.map(({ value, name }) => (
                    <MenuItem value={value} key={value}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <ErrorMessage
              errors={errors}
              name="contentType"
              as={<FormHelperText error />}
            />
          </FormControl>

          <FormControl className="form-control">
            <FileUploader
              register={register}
              regName="files"
              accept="video/mp4,video/mkv, video/x-m4v,video/*"
              onFileChange={handleFileChange}
            >
              <FileUploader.Label>파일 업로드</FileUploader.Label>
            </FileUploader>
            {fileName ? (
              <Chip
                sx={{ mt: '8px' }}
                icon={<OndemandVideoOutlinedIcon />}
                label={fileName}
                onDelete={handleDeleteFile}
              />
            ) : null}
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
                    endAdornment: <InputAdornment position="end">분</InputAdornment>,
                  }}
                />
                <TextField
                  {...register('sec', { required: '강의 명을 입력해주세요.' })}
                  size="small"
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">초</InputAdornment>,
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
                    value={ProductStatus.APPROVE}
                    control={<Radio />}
                    label="정상"
                  />
                  <FormControlLabel
                    value={ProductStatus.REJECT}
                    control={<Radio />}
                    label="중지"
                  />
                </RadioGroup>
              )}
            />
          </FormControl>

          {/* <DeleteBtn
            variant="contained"
            color="warning"
            onClick={() => onRemoveLesson(lesson.seq)}
            size="small"
          >
            삭제
          </DeleteBtn> */}
        </FormContainer>
      </Box>
      <Backdrop open={submitLoading} sx={{zIndex:9999}} >
        <Spinner />
      </Backdrop>
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

const CompleteTimeControl = styled.div``;

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

const SubmitBtn = styled(Button)`
  /* margin: 30px 30px 30px 0; */
  margin-top: 10px;
  margin-bottom: 10px;
`;

const DeleteBtn = styled(Button)``;
