import * as React from 'react';
import {
  Avatar,
  Box,
  Container,
  Grid,
  MenuItem,
  tabsClasses,
  Typography,
} from '@mui/material';
import { Link } from '@components/common';
import s from '../Me.module.scss';
import { grey } from '@mui/material/colors';
import { Spinner, Tabs } from '@components/ui';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import {
  MyInfoCourseRes,
  ProgressStatus,
  useLearningStatus,
  useMyUser,
} from '@common/api/user';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ContentCardV2 } from '@components/ui/ContentCard';
import Image from 'next/image';

const myInfoList = [
  // { label: "내 강의", value: "myCourse" },
  // { label: "정보 수정", value: "editInfo" },
  // { label: "증명서 발급", value: "certificate" },

  { label: '정보수정', value: '/edit' },
  { label: '학습현황', value: '/my-course' },
  { label: '증명서발급', value: '/certificate' },
  { label: '온라인 교육 신청내역', value: '/enroll-history' },
];

export function MeDesktop() {
  const router = useRouter();
  const { user, error } = useMyUser();
  const { data, error: leErr, mutate: leMu } = useLearningStatus();
  const [value, setValue] = React.useState(myInfoList[0].value);

  const onClickEnterCourseLesson = (res: MyInfoCourseRes) => {
    // console.log(res);
    const isStartStudy =
      new Date(res.studyStartDate.replaceAll('-', '/').split(' ')[0]).getTime() <
      new Date().getTime(); //현재시간이 크면 true 아니면 false
    const isEndedStudy =
      new Date(res.studyEndDate.replaceAll('-', '/').split(' ')[0]).getTime() <
      new Date().getTime(); //현재시간이 크면 true 아니면 false
    // console.log('isStart', isStartStudy);
    if (res.progressStatus === ProgressStatus.TYPE_BEFORE || !isStartStudy)
      return window.alert('아직 학습이 시작되지 않았습니다!');
    // if (res.progressStatus === ProgressStatus.TYPE_ENDED || isEndedStudy)
    //   return window.alert('종료된 학습입니다!');

    // if (res.progressStatus === ProgressStatus.TYPE_PROGRESSING) {
    // router.push(
    //   `/course/${res.courseUserSeq}/lesson/${
    //     !res.recentLessonSeq ? 1 : res.recentLessonSeq
    //   }`
    // );
    window.open(
      `/course/${res.courseUserSeq}/lesson/${
        !res.recentLessonSeq ? 1 : res.recentLessonSeq
      }`,
      // '',
      '_blank'
    );
    // }
  };

  if (error) return <div>error</div>;
  if (!user) return <Spinner />;
  return (
    <Container className={containerStyle}>
      <UserInfoSection>
        <Link href={`/me/edit`} className={s.myInfo}>
          <UserProfile>
            {user && user.s3Files.length > 0 ? (
              <Image src={user.s3Files[0].path} layout="fill" />
            ) : (
              'M'
            )}
          </UserProfile>
          <div>
            <Typography fontSize={22}>{user.name}</Typography>
            <Typography>
              {user.email ? user.email : <Box color={grey[400]}>이메일이 없습니다.</Box>}
            </Typography>
          </div>
        </Link>
      </UserInfoSection>
      <ContentBody>
        <SideBar>
          <SideBarTitle variant="h6">내 정보</SideBarTitle>
          <SideBarContent>
            {myInfoList.map(item => (
              <SideBarInfoLink
                color={grey[900]}
                href={`/me${item.value}`}
                key={item.value}
              >
                <SideBarInfoItem>
                  {item.label}
                  <ArrowForwardIcon />
                </SideBarInfoItem>
              </SideBarInfoLink>
            ))}
            {/* {myInfoList.map(({ href, name }) => (
              <Link
                key={name}
                className={s.link}
                underline="hover"
                color={grey[900]}
                href={href}
              >
                <Typography variant="body2">{name}</Typography>
                <ArrowForwardIcon />
              </Link>
            ))} */}
          </SideBarContent>
        </SideBar>
        <LessonListContainer>
          <Typography
            variant="h6"
            fontSize={22}
            fontWeight={700}
            sx={{ marginBottom: '16px' }}
          >
            내 강의
          </Typography>
          <Grid
            container
            rowSpacing={4}
            columnSpacing={2}
            columns={{ xs: 1, sm: 1, md: 2, lg: 2 }}
          >
            {data ? (
              data
                .filter(
                  fil =>
                    fil.progressStatus === ProgressStatus.TYPE_PROGRESSING ||
                    fil.progressStatus === ProgressStatus.TYPE_BEFORE
                )
                .map(res => {
                  return (
                    <Grid item xs={1} sm={1} md={1} lg={1} key={res.courseClassSeq}>
                      <Box onClick={() => onClickEnterCourseLesson(res)}>
                        <ContentCardV2
                          image={res.thumbnailImage}
                          title={res.courseTitle}
                          content1={'지금 바로 수강하기!'}
                          content2={`${res.leftDays}일 남음`}
                          // content2={`현재 진도율 ${res.progress}%`}
                        />
                      </Box>
                    </Grid>
                  );
                })
            ) : (
              <div>dd</div>
            )}
          </Grid>
        </LessonListContainer>
      </ContentBody>
    </Container>
  );
}

const UserProfile = styled(Avatar)`
  width: 60px;
  height: 60px;
  margin-right: 36px;
`;

const UserInfoSection = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 320px;
  margin-bottom: 30px;
`;

const ContentBody = styled(Box)`
  display: flex;
`;

const SideBar = styled.aside`
  min-width: 320px;
  margin-right: 78px;
  .MuiTabs-indicator {
    display: none;
  }
`;

const SideBarTitle = styled(Typography)`
  margin-bottom: 16px;
  font-weight: 700;
  /* padding-bottom: 0.5rem; */
  font-size: 22px;
  /* border-bottom: 1px solid #e5e5e5; */
`;

const SideBarContent = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 48px;
`;

const SideBarInfoLink = styled(Link)`
  :first-child {
    border-top: 1px solid #e5e5e5;
  }
`;

const SideBarInfoItem = styled(MenuItem)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px;
  border-bottom: 1px solid #e5e5e5;
  font-size: 18px;
  font-weight: 500;
`;

const ArrowForwardIcon = styled(ArrowForwardIosIcon)`
  width: 15px;
  height: 15px;
  color: ${grey[500]};
`;

const LessonListContainer = styled(Box)`
  width: 100%;
`;

const containerStyle = css`
  margin-bottom: 32px;
  padding: 72px 0 48px;
`;
