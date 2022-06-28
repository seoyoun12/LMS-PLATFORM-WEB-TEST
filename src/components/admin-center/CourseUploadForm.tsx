import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as EditorType } from '@toast-ui/react-editor';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button, Chip, FormControl,
  FormControlLabel, FormHelperText,
  FormLabel, InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';
import { TuiEditor } from '@components/common/TuiEditor';
import styled from '@emotion/styled';
import { ProductStatus, CourseRes } from '@common/api/course';
import { YN } from '@common/constant';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ContentType } from '@common/api/content';
import * as React from 'react';
import { css, cx } from '@emotion/css';
import { ErrorMessage } from '@hookform/error-message';
import { FileUploader } from '@components/ui/FileUploader';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';

interface Props {
  mode?: 'upload' | 'modify',
  course?: CourseRes,
  onHandleSubmit: ({ courseInput, files, courseId }: {
    courseInput: CourseRes;
    files: File[];
    isFileDelete: boolean;
    courseId?: number
  }) => void
}

interface FormType extends CourseRes {
  files: File[];
}

const defaultValues = {
  contentType: ContentType.CONTENT_MP4,
  status: ProductStatus.APPROVE,
  displayYn: YN.YES,
  files: []
};

export function CourseUploadForm({ mode = 'upload', course, onHandleSubmit }: Props) {
  const editorRef = useRef<EditorType>(null);
  const [ isFileDelete, setIsFileDelete ] = useState(false);
  const [ fileName, setFileName ] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    resetField
  } = useForm<FormType>({ defaultValues });

  useEffect(() => {
    if (mode === 'modify' && !!course) {
      reset({ ...course });
      setFileName(course.s3Files[0]?.name || null);
    }
  }, [ mode, course ]);

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

  const onSubmit: SubmitHandler<FormType> = async ({ files, ...course }, event) => {
    event?.preventDefault();
    if (!editorRef.current) return;

    const markdownContent = editorRef.current.getInstance().getMarkdown();
    const courseInput = {
      ...course,
      content1: markdownContent,
    };

    onHandleSubmit({ courseInput, courseId: course.seq, files, isFileDelete });
  };

  return (
    <Container>
      <Box
        component="form"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={boxStyles}
      >
        <InputContainer>
          <FormControl className={textField}>
            <TextField
              {...register('courseName', { required: '과정 명을 입력해주세요.' })}
              size="small"
              label="과정명"
              variant="outlined"
            />
            <ErrorMessage errors={errors} name="courseName" as={<FormHelperText error />} />
          </FormControl>

          <FormControl className={textField}>
            <TextField
              {...register('courseSubName', { required: '과정 부제목을 입력해주세요.' })}
              size="small"
              label="부제목"
              variant="outlined"
            />
            <ErrorMessage errors={errors} name="courseSubName" as={<FormHelperText error />} />
          </FormControl>
          <div className="thumbnail-uploader">
            <FileUploader
              register={register}
              regName="files"
              onFileChange={handleFileChange}
            >
              <FileUploader.Label>썸네일 이미지</FileUploader.Label>
            </FileUploader>

            <Typography variant="subtitle2" className="subtitle">썸네일 이미지</Typography>
            {fileName
              ? <Chip
                sx={{ mt: '8px' }}
                icon={<OndemandVideoOutlinedIcon />}
                label={fileName}
                onDelete={handleDeleteFile} />
              : null
            }
          </div>
        </InputContainer>

        <TuiEditor
          initialValue={(course && course.content1) || ' '}
          previewStyle="vertical"
          height="600px"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          ref={editorRef}
        />

        <FormControl className={cx(textField, lessonTime)}>
          <TextField
            {...register('lessonTime', { required: '교육 시간을 입력해주세요.' })}
            size="small"
            label="교육 시간"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">시간</InputAdornment>,
            }}
          />
          <ErrorMessage errors={errors} name="lessonTime" as={<FormHelperText error />} />
        </FormControl>

        <FormControl className={pt20}>
          <FormLabel focused={false}>상태</FormLabel>
          <Controller
            rules={{ required: true }}
            control={control}
            name="status"
            render={({ field }) => (
              <RadioGroup row {...field}>
                <FormControlLabel value={ProductStatus.APPROVE} control={<Radio />} label="정상" />
                <FormControlLabel value={ProductStatus.REJECT} control={<Radio />} label="중지" /> </RadioGroup>
            )}
          />
        </FormControl>

        <FormControl className={pt20}>
          <FormLabel focused={false}>과정 보이기</FormLabel>
          <Controller
            rules={{ required: true }}
            control={control}
            name="displayYn"
            render={({ field }) => (
              <RadioGroup row {...field}>
                <FormControlLabel value={YN.YES} control={<Radio />} label="보이기" />
                <FormControlLabel value={YN.NO} control={<Radio />} label="숨김" />
              </RadioGroup>
            )}
          />
        </FormControl>

        <SubmitBtn variant="contained" type="submit">
          {mode === 'upload' ? '업로드하기' : '수정하기'}
        </SubmitBtn>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 8px;

  .form-control {
    margin: 12px auto 12px 0;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  .thumbnail-uploader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 36px;

    .subtitle {
      margin-bottom: 8px;
    }
  }
`;

const SubmitBtn = styled(Button)`
  margin: 30px 30px 30px 0;
`;

const textField = css`
  margin-bottom: 20px;
`;

const boxStyles = css`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;

const chipStyles = css`
  margin-top: 8px;
`;

const pt20 = css`
  padding-top: 20px;
`;

const lessonTime = css`
  width: 30%;
  margin-top: 20px;
`;
