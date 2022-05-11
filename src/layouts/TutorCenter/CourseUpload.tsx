import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as EditorType } from '@toast-ui/react-editor';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import styles from '@styles/common.module.scss';
import { Box, Button, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import { TuiEditor } from '@components/common/TuiEditor';
import styled from '@emotion/styled';
import { CourseData, uploadCourse } from '@common/api/course';
import * as React from 'react';

export function CourseUpload() {
  const editorRef = useRef<EditorType>(null);
  const courseNameRef = useRef<HTMLInputElement>(null);
  const courseSubNameRef = useRef<HTMLInputElement>(null);
  const displayYnRef = useRef(false);
  const [ thumbnail, setThumbnail ] = useState<Blob | string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editorRef.current || !courseNameRef.current || !courseSubNameRef.current) {
      return;
    }

    try {
      const courseName = courseNameRef.current.value;
      const courseSubName = courseSubNameRef.current.value;
      const markdownContent = editorRef.current.getInstance().getMarkdown();

      const courseData: CourseData = {
        courseName,
        courseSubName,
        content1: markdownContent,
        displayYn: displayYnRef.current ? 'Y' : 'N',
      };

      const formData = new FormData();
      formData.append('courseFileOriginal', thumbnail);
      formData.append('data', new Blob([ JSON.stringify(courseData) ], { type: 'application/json' }));
      return uploadCourse(formData);
    } catch (e) {
      console.error(e);
    }
  };

  const uploadFile = (e: ChangeEvent) => {
    e.preventDefault();

    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return null;
    setThumbnail(files[0]);
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
            <input type="file" multiple name="thumbnailImg" onChange={uploadFile}/>
          </div>
        </InputContainer>

        <TuiEditor
          initialValue=""
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
          onChange={(e, checked) => {
            displayYnRef.current = checked;
          }}
          control={<Switch/>}
        />

        <Button
          variant="contained"
          type="submit"
          sx={{
            margin: '30px 30px 30px 0',
          }}
        >
          submit
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

