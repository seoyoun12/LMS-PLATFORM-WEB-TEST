import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as EditorType } from '@toast-ui/react-editor';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
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
import { PRODUCT_STATUS, CourseData } from '@common/api/course';
import { YN } from '@common/constant';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import { grey } from '@mui/material/colors';

export function CourseUploadForm(
  {
    mode = 'upload',
    course,
    onHandleSubmit,
  }: {
    mode?: 'upload' | 'modify',
    course?: CourseData,
    onHandleSubmit: ({ event, courseInput, courseId }: {
      event: FormEvent<HTMLFormElement>,
      courseInput: FormData,
      courseId?: number
    }) => void,
  }
) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<EditorType>(null);
  const courseNameRef = useRef<HTMLInputElement>(null);
  const courseSubNameRef = useRef<HTMLInputElement>(null);
  const lessonTime = useRef<HTMLInputElement>(null);
  const [ thumbnail, setThumbnail ] = useState<Blob | string>('');
  const [ courseId, setCourseId ] = useState<number | undefined>();
  const [ displayYn, setIsDisplay ] = useState<YN>(YN.YES);
  const [ status, setStatus ] = useState<PRODUCT_STATUS>(PRODUCT_STATUS.APPROVE);

  useEffect(() => {
    if (mode === 'modify' && !!course) {
      courseNameRef.current!.value = course.courseName;
      courseSubNameRef.current!.value = course.courseSubName;
      lessonTime.current!.value = String(course.lessonTime);
      setIsDisplay(course.displayYn);
      setStatus(course.status);
      setThumbnail(course.courseFile);
      setCourseId(course.seq);
    }
  }, [ mode, course ]);

  const uploadFile = (e: ChangeEvent) => {
    e.preventDefault();

    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return null;
    setThumbnail(files[0]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editorRef.current || !courseNameRef.current || !courseSubNameRef.current) {
      return;
    }

    const courseName = courseNameRef.current.value;
    const courseSubName = courseSubNameRef.current.value;
    const markdownContent = editorRef.current.getInstance().getMarkdown();

    const courseData: Partial<CourseData> = {
      courseName,
      courseSubName,
      status,
      displayYn,
      content1: markdownContent,
    };

    const formData = new FormData();
    formData.append('courseFileOriginal', thumbnail);
    formData.append('data', new Blob([ JSON.stringify(courseData) ], { type: 'application/json' }));
    onHandleSubmit({ event, courseInput: formData, courseId });
  };

  return (
    <Container>
      <Box
        component="form"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: 1
        }}
      >
        <InputContainer>
          <TextField
            size="small"
            className="text-field"
            label="과정명"
            variant="outlined"
            name="courseName"
            inputRef={courseNameRef}
          />
          <TextField
            size="small"
            className="text-field"
            label="부제목"
            variant="outlined"
            name="courseSubName"
            inputRef={courseSubNameRef}
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

            {thumbnail && <Chip
              sx={{ mt: '8px' }}
              icon={<ImageOutlinedIcon />}
              label={'썸네일 이미지'}
              onDelete={() => setThumbnail('')}
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
          sx={{
            width: '30%',
            mt: '20px'
          }}
          size="small"
          className="text-field"
          label="교육 시간"
          variant="outlined"
          name="lessonTime"
          InputProps={{
            endAdornment: <InputAdornment position="end">시간</InputAdornment>,
          }}
          inputRef={lessonTime}
        />

        <FormControl sx={{ pt: '20px' }}>
          <FormLabel focused={false}>상태</FormLabel>
          <RadioGroup
            row
            aria-labelledby="group-label"
            name="row-radio-buttons-group"
            value={status}
            onChange={(e, value: unknown) => {
              const status = value as PRODUCT_STATUS;
              setStatus(status);
            }}
          >
            <FormControlLabel value={PRODUCT_STATUS.APPROVE} control={<Radio />} label="정상" />
            <FormControlLabel value={PRODUCT_STATUS.REJECT} control={<Radio />} label="중지" />
          </RadioGroup>
        </FormControl>

        <FormControl sx={{ pt: '20px' }}>
          <FormLabel focused={false}>과정 보이기</FormLabel>
          <RadioGroup
            row
            aria-labelledby="group-label"
            name="row-radio-buttons-group"
            value={displayYn}
            onChange={(e, value) => {
              const displayYn = value as YN;
              setIsDisplay(displayYn);
            }}
          >
            <FormControlLabel value={YN.YES} control={<Radio />} label="보이기" />
            <FormControlLabel value={YN.NO} control={<Radio />} label="숨김" />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          sx={{
            margin: '30px 30px 30px 0',
          }}
        >
          {mode === 'upload' ? '업로드하기' : '수정하기'}
        </Button>
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

  > .text-field {
    margin-bottom: 20px;
  }

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

