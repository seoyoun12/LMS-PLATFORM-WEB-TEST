import { Button, Container, Divider, Typography } from '@mui/material';
import { useRef, useEffect, useState } from 'react';
import styles from '@styles/common.module.scss';
import { getCourse, Course } from '@common/api';
import styled from '@emotion/styled';
import Image from 'next/image';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Menubar } from '@components/ui';
import { headerHeight } from '@styles/variables';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';

export function Course() {
  const [ course, setCourse ] = useState<Course>();
  const [ loading, setLoading ] = useState(false);
  const editorRef = useRef();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getCourse({ courseId: 1 });
      setCourse(res);
      setLoading(false);
    })();

  }, []);

  const onHandleSubmit = () => {
  };

  if (!course) return null;
  return (
    loading ? <div>...loading</div> :
      <Container
        sx={{
          display: 'flex',
        }}
        className={styles.globalContainer}
      >
        <MainSection>
          <div>
            <Image
              src={course.courseThumblink}
              layout="responsive"
              width="100%"
              height="100%"
            />
          </div>

          <Menubar/>

          <Viewer
            initialValue="# hello react editor world!"
            previewStyle="vertical"
            height="600px"
            initialEditType="markdown"
            useCommandShortcut={true}
            ref={editorRef}
          />
        </MainSection>

        <StickySideBar>
          <TopSection>
            <Typography variant="subtitle2">
              {course.courseName}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700
              }}
            >
              {course.courseName}
            </Typography>
            <ContentSection>
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: '18px',
                  fontWeight: 700
                }}
              >
                {course.price} 원
              </Typography>
            </ContentSection>
            <Divider
              light
              sx={{ margin: '20px 0' }}
            />
            <ButtonSection>
              <div className="subButtons">
                <Button
                  startIcon={<FavoriteBorderIcon/>}
                  variant="contained" color="neutral"
                >
                  252
                </Button>
                <Button
                  variant="contained" color="neutral"
                  startIcon={<ShareIcon/>}
                >
                  공유하기
                </Button>
              </div>
              <Button
                fullWidth
                variant="contained" color="primary"
                onClick={onHandleSubmit}
              >
                구매하기
              </Button>
            </ButtonSection>
          </TopSection>
          <div className="bottomSection"></div>
        </StickySideBar>
      </Container>
  );
}

const MainSection = styled.div`
  flex: 1;
  height: 200vh;
`;

const StickySideBar = styled.div`
  position: sticky;
  top: ${headerHeight};
  margin-left: 40px;
  padding-top: 32px;
  height: 100%;
`;

const TopSection = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-shadow: 0 6px 16px 0 rgba(20, 20, 20, 0.08), 0 0 0 1px rgba(20, 20, 20, 0.06);
  background-color: #ffffff;
  border-radius: 16px;
`;

const ButtonSection = styled.div`
  .subButtons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 8px;

    > Button {
      width: 48%;
    }
  }
`;

const ContentSection = styled.div`
  padding: 8px 0 12px;
`;
