import { Button, Container, Divider, Typography } from '@mui/material';
import styles from '@styles/common.module.scss';
import { useCourse } from '@common/api/course';
import styled from '@emotion/styled';
import Image from 'next/image';
import { headerHeight } from '@styles/variables';
import { TuiViewer } from '@components/common/TuiEditor';
import { useRouter } from 'next/router';
import { Spinner } from '@components/ui';
import { css, cx } from '@emotion/css';

export function Course() {
  const router = useRouter();
  const { courseId } = router.query;
  const { data, isError } = useCourse(Number(courseId));

  const onHandleSubmit = () => {
  };

  if (!data && isError) return (<div>NOT FOUND</div>);
  if (!data) return <Spinner />;
  return (
    <Container className={cx(styles.globalContainer, containerStyle)}>
      <MainSection>
        <ThumbnailImg>
          {data.courseFile ? <Image
            className="thumbnailImg"
            src={data.courseFile}
            layout="responsive"
            width="100%"
            height="56.25"
          /> : null}
        </ThumbnailImg>

        <TuiViewer initialValue={data.content1} />

        <CurriculumContainer>
          <Typography
            variant="h5"
            className={curriculumTitle}
          >
            커리큘럼
          </Typography>
          {/*<CurriculumAccordion curriculum={data.curriculum}/>*/}
        </CurriculumContainer>
      </MainSection>

      <StickySideBar>
        <TopSection>
          <Typography variant="subtitle2">
            {data.courseName}
          </Typography>
          <Typography
            variant="h6"
            className={fontWeightBold}
          >
            {data.courseSubName}
          </Typography>
          <Divider
            light
            className={dividerStyle}
          />
          <Button
            fullWidth
            variant="contained" color="primary"
            onClick={onHandleSubmit}
          >
            수강하기
          </Button>
        </TopSection>
        <div className="bottomSection"></div>
      </StickySideBar>
    </Container>
  );
}

const containerStyle = css`
  display: flex;
`;

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

const curriculumTitle = css`
  font-weight: 700;
  margin-bottom: 12px;
`;

const fontWeightBold = css`
  font-weight: 700;
`;

const dividerStyle = css`
  margin: 20px 0;
`;

const CurriculumContainer = styled.div`
  padding-top: 30px;
`;
