import { Button, Container, Divider, Typography } from '@mui/material';
import { useRef, useEffect, useState } from 'react';
import styles from '@styles/common.module.scss';
import { getCourse, CourseData } from '@common/api';
import styled from '@emotion/styled';
import Image from 'next/image';
import { headerHeight } from '@styles/variables';
import { TuiViewer } from '@components/common/TuiEditor';
import { useRouter } from 'next/router';
import { STATUS_CODE } from '@common/constant';

export function Course() {
  const router = useRouter();
  const { courseId } = router.query;
  const [ course, setCourse ] = useState<CourseData>();
  const [ error, setError ] = useState(false);

  useEffect(() => {
    setError(false);

    (async () => {
      try {
        const res = await getCourse({ courseId: Number(courseId) });
        setCourse(res);
      } catch (err: any) {
        if (err.status === STATUS_CODE.NOT_FOUND) {
          setError(true);
        }
      }
    })();
  }, [ courseId ]);

  const onHandleSubmit = () => {
  };

  if (!course && error) return (<div>NOT FOUND</div>);
  if (!course) return (<div>...loading</div>);
  return (
    <Container
      sx={{
        display: 'flex',
      }}
      className={styles.globalContainer}
    >
      <MainSection>
        <ThumbnailImg>
          <Image
            className="thumbnailImg"
            src={course.courseFile}
            layout="responsive"
            width="100%"
            height="56.25"
          />
        </ThumbnailImg>

        {(course && !error) && <TuiViewer initialValue={course.content1} />}

        <CurriculumContainer>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              marginBottom: '12px'
            }}
          >
            커리큘럼
          </Typography>
          {/*<CurriculumAccordion curriculum={course.curriculum}/>*/}
        </CurriculumContainer>
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
            {course.courseSubName}
          </Typography>
          <Divider
            light
            sx={{ margin: '20px 0' }}
          />
          <ButtonSection>
            <Button
              fullWidth
              variant="contained" color="primary"
              onClick={onHandleSubmit}
            >
              수강하기
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
`;

const ThumbnailImg = styled.div`
  padding-bottom: 30px;
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

`;

const CurriculumContainer = styled.div`
  padding-top: 30px;
`;
