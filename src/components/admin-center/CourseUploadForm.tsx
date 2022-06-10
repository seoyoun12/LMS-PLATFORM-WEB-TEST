import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as EditorType } from '@toast-ui/react-editor';
import { BaseSyntheticEvent, ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button, Chip, FormControl,
  FormControlLabel,
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
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import { grey } from '@mui/material/colors';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ContentType } from '@common/api/content';
import * as React from 'react';
import { S3Files } from 'types/file';
import { css, cx } from '@emotion/css';

const defaultValues = {
  contentType: ContentType.CONTENT_MP4,
  status: ProductStatus.APPROVE,
  displayYn: YN.YES
};

interface Props {
  mode?: 'upload' | 'modify',
  course?: CourseRes,
  onHandleSubmit: ({ event, courseInput, courseId }: {
    event?: BaseSyntheticEvent,
    courseInput: FormData,
    courseId?: number
  }) => void,
}

export function CourseUploadForm({ mode = 'upload', course, onHandleSubmit }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<EditorType>(null);
  const [ thumbnails, setThumbnails ] = useState<S3Files | null>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<CourseRes>({ defaultValues });

  useEffect(() => {
    if (mode === 'modify' && !!course) {
      reset({ ...course });
      setThumbnails(
        course.s3Files.length
          ? [ { name: course.s3Files[0].name, path: course.s3Files[0].path } ]
          : []
      );
    }
  }, [ mode, course ]);

  const uploadFile = (e: ChangeEvent) => {
    e.preventDefault();

    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return null;
    setThumbnails([ { name: files[0].name, path: '' } ]);
  };

  const onSubmit: SubmitHandler<CourseRes> = async (course, event) => {
    if (!editorRef.current) return;

    const files = fileInputRef.current?.files;
    const thumbnail = !!files?.length ? files[0] : new Blob([]);
    const fileName = !!files?.length ? files[0].name : undefined;
    const markdownContent = editorRef.current.getInstance().getMarkdown();
    const courseData = {
      ...course,
      content1: markdownContent,
    };

    const formData = new FormData();
    formData.append('courseFileOriginal', thumbnail, fileName);
    formData.append('data', new Blob([ JSON.stringify(courseData) ], { type: 'application/json' }));
    onHandleSubmit({ event, courseInput: formData, courseId: course.seq });
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
          <TextField
            {...register('courseName', { required: '과정 명을 입력해주세요.' })}
            size="small"
            className={textField}
            label="과정명"
            variant="outlined"
          />
          <TextField
            {...register('courseSubName', { required: '과정 부제목을 입력해주세요.' })}
            size="small"
            className={textField}
            label="부제목"
            variant="outlined"
          />
          <div className="thumbnail-uploader">
            <Typography variant="subtitle2" className="subtitle">썸네일 이미지</Typography>
            <label htmlFor="input-file">
              <input
                style={{ display: 'none' }}
                id="input-file"
                type="file"
                multiple={true}
                ref={fileInputRef}
                onChange={uploadFile}
              />
              <Button
                color="neutral"
                variant="outlined"
                startIcon={<UploadOutlinedIcon htmlColor={grey[700]} />}
                onClick={() => fileInputRef.current!.click()}
              >
                파일 선택
              </Button>
            </label>

            {!!thumbnails?.length && <Chip
              className={chipStyles}
              icon={<ImageOutlinedIcon />}
              label={thumbnails[0].name}
              onDelete={() => setThumbnails([])}
            />}
          </div>
        </InputContainer>

        <TuiEditor
          initialValue={(course && course.content1) || ''}
          previewStyle="vertical"
          height="600px"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          ref={editorRef}
        />
        <TextField
          {...register('lessonTime', { required: '교육 시간을 입력해주세요.' })}
          size="small"
          className={cx(textField, lessonTime)}
          label="교육 시간"
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="end">시간</InputAdornment>,
          }}
        />

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
