import { Button, Container, Divider, Typography } from '@mui/material';
import styles from '@styles/common.module.scss';
import { courseEnroll, useCourse } from '@common/api/course';
import styled from '@emotion/styled';
import Image from 'next/image';
import { headerHeight } from '@styles/variables';
import { useRouter } from 'next/router';
import { Spinner } from '@components/ui';
import { css, cx } from '@emotion/css';
import { useDialog } from '@hooks/useDialog';
import { useSnackbar } from '@hooks/useSnackbar';

export function Course() {
  const router = useRouter();
  const { courseSeq } = router.query;
  const { course, courseError } = useCourse(Number(courseSeq));
  const dialog = useDialog();
  const snackbar = useSnackbar();

  const onHandleSubmit = async () => {
    const dialogConfirmed = await dialog({
      title: '수강 신청',
      description: '해당 과정 수강을 신청하시겠습니까?',
      confirmText: '신청하기',
      cancelText: '취소하기',
    });

    if (dialogConfirmed) {
      await courseEnroll(Number(courseSeq));
      snackbar({ variant: 'success', message: '수강 신청이 완료되었습니다.' });
    }
  };

  if (courseError) return <div>NOT FOUND</div>;
  if (!course) return <Spinner />;
  return (
    <Container className={cx(styles.globalContainer, containerStyle)}>
      <MainSection>
        <ThumbnailImg>
          {course.s3Files && course.s3Files[0] && <Image
            className="thumbnailImg"
            src={course.s3Files[0].path} // course.courseFile
            layout="responsive"
            width="100%"
            height="56.25"
            alt="강좌 썸네일"
          />}
        </ThumbnailImg>

        {/* <TuiViewer initialValue={course.courseName} /> content1 */}

        <CurriculumContainer>
          <Typography variant="h5" className={curriculumTitle}>
            커리큘럼
          </Typography>
        </CurriculumContainer>
      </MainSection>

      <StickySideBar>
        <TopSection>
          <Typography variant="subtitle2">{course.courseName}</Typography>
          <Typography variant="h6" className={fontWeightBold}>
            {course.courseName} {/* subname */}
          </Typography>
          <Divider light className={dividerStyle} />
          <Button fullWidth variant="contained" color="primary" onClick={onHandleSubmit}>
            수강신청
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
