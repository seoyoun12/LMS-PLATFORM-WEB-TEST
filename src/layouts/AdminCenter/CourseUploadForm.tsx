import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as EditorType } from '@toast-ui/react-editor';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import styles from '@styles/common.module.scss';
import { Box, Button, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import { TuiEditor } from '@components/common/TuiEditor';
import styled from '@emotion/styled';
import { CourseData } from '@common/api/course';

export function CourseUploadForm(
  {
    mode = 'upload',
    course,
    onHandleSubmit,
  }: {
    mode?: 'upload' | 'modify',
    course?: any,
    onHandleSubmit: (event: FormEvent<HTMLFormElement>, formData: FormData) => void,
  }
) {
  const editorRef = useRef<EditorType>(null);
  const courseNameRef = useRef<HTMLInputElement>(null);
  const courseSubNameRef = useRef<HTMLInputElement>(null);
  const [ isDisplay, setIsDisplay ] = useState(false);
  const [ thumbnail, setThumbnail ] = useState<Blob | string>('');

  useEffect(() => {
    if (mode === 'modify') {
      const { courseName, courseSubName, courseFile, displayYn } = course;
      if (!!courseNameRef.current && !!courseSubNameRef.current) {
        courseNameRef.current.value = courseName;
        courseSubNameRef.current.value = courseSubName;
        setIsDisplay(displayYn === 'Y');
        setThumbnail(courseFile);
        console.log('isDisplay', isDisplay, thumbnail);
      }
    }
  }, [ mode, course ]);

  const uploadFile = (e: ChangeEvent) => {
    e.preventDefault();

    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return null;
    setThumbnail(files[0]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editorRef.current || !courseNameRef.current || !courseSubNameRef.current) {
      return;
    }

    const courseName = courseNameRef.current.value;
    const courseSubName = courseSubNameRef.current.value;
    const markdownContent = editorRef.current.getInstance().getMarkdown();

    const courseData: CourseData = {
      courseName,
      courseSubName,
      content1: markdownContent,
      displayYn: isDisplay ? 'Y' : 'N',
    };

    const formData = new FormData();
    formData.append('courseFileOriginal', thumbnail);
    formData.append('data', new Blob([ JSON.stringify(courseData) ], { type: 'application/json' }));
    onHandleSubmit(e, formData);
  };

  return (
    <Container className={styles.globalContainer}>
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
            className="text-field"
            label="courseName"
            variant="outlined"
            name="courseName"
            inputRef={courseNameRef}
          />
          <TextField
            className="text-field"
            label="courseSubName"
            variant="outlined"
            name="courseSubName"
            inputRef={courseSubNameRef}
          />
          <div className="thumbnail-uploader">
            <Typography variant="subtitle1" className="subtitle">썸네일</Typography>
            <input type="file" multiple name="thumbnailImg" onChange={uploadFile} />
          </div>
        </InputContainer>

        <TuiEditor
          initialValue={mode === 'modify' ? course.content1 : ''}
          previewStyle="vertical"
          height="600px"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          ref={editorRef}
        />

        <FormControlLabel
          className="form-control"
          label="과정 보이기"
          name="displayYn"
          sx={{ ml: 'auto' }}
          checked={isDisplay}
          onChange={(e, checked) => {
            setIsDisplay(checked);
          }}
          control={<Switch />}
        />

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
    margin-bottom: 16px;
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

