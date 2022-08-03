import * as React from 'react';
import { Avatar, Box, Container, Grid, MenuItem, tabsClasses, Typography } from '@mui/material';
import { Link } from '@components/common';
import s from './Me.module.scss';
import { grey } from '@mui/material/colors';
import { ContentCard, Spinner, Tabs } from '@components/ui';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { useMyUser } from '@common/api/user';
import { useEffect } from 'react';
import dateFormat from 'dateformat';
import { useRouter } from 'next/router';

const myInfoList = [
  // { label: "내 강의", value: "myCourse" },
  // { label: "정보 수정", value: "editInfo" },
  // { label: "증명서 발급", value: "certificate" },

  { label: '정보수정', value: '/edit' },
  { label: '학습현황', value: '/my-course' },
  { label: '증명서발급', value: '/certificate' },
  { label: '온라인 교육 신청내역', value: '/enroll-history' },
];

export function Me() {
  const router = useRouter();
  const { user, error } = useMyUser();
  console.log(user);
  const [value, setValue] = React.useState(myInfoList[0].value);

  useEffect(() => {
    console.log(user);
  }, []);

  if (error) return <div>error</div>;
  if (!user) return <Spinner />;
  return (
    <Container className={containerStyle}>
      <UserInfoSection>
        <Link href={`/me/edit`} className={s.myInfo}>
          <UserProfile>M</UserProfile>
          <div>
            <Typography>{user.name}</Typography>
            <Typography>{user.username}</Typography>
          </div>
        </Link>
      </UserInfoSection>
      <ContentBody>
        <SideBar>
          <SideBarContent>
            <SideBarTitle variant="h6">내 정보</SideBarTitle>
            {myInfoList.map(item => (
              <Link color={grey[900]} href={`/me/${item.value}`}>
                <MenuItem sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {item.label}
                  <ArrowForwardIcon />
                </MenuItem>
              </Link>
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
          <Typography variant="h6" sx={{ marginBottom: '16px' }}>
            내 강의
          </Typography>
          <Grid container rowSpacing={4} columnSpacing={2} columns={{ xs: 1, sm: 1, md: 2, lg: 2 }}>
            {user.learningCourses ? (
              user.learningCourses.map(res => {
                return (
                  <Grid item xs={1} sm={1} md={1} lg={1} key={res.courseClassSeq}>
                    <Box
                      onClick={() => {
                          return window.alert('수업이 존재하지 않습니다. 관리자에게 문의해주세요.');
                      }}
                    >
                      <ContentCard
                        title={res.courseTitle}
                        content1={'버그수정정'}
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

const SideBarContent = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 48px;
`;

const SideBarTitle = styled(Typography)`
  margin-bottom: 16px;
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
