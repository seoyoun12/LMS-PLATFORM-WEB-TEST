import * as React from 'react';
import { Avatar, Box, Container, Grid, Typography } from '@mui/material';
import { Link } from '@components/common';
import s from './Me.module.scss';
import { grey } from '@mui/material/colors';
import { ContentCard } from '@components/ui';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export function Me() {
  const myInfoList = [
    { name: '정보 수정', href: '/me/edit' },
    { name: '주문 내역', href: '' },
    { name: '내 쿠폰', href: '' },
    { name: '내 후기', href: '' },
    { name: '증명서 발급', href: '' },
  ];

  return (
    <Container
      sx={{
        marginBottom: 8,
        padding: '72px 0px 48px',
      }}
    >
      <Box
        sx={{
          marginBottom: '60px',
        }}
      >
        <div className={s.myInfo}>
          <Avatar sx={{ width: 60, height: 60, marginRight: '36px' }}>M</Avatar>
          <div>
            <Typography>USER NAME</Typography>
            <Typography>EMAIL@YOURMAIL.COM</Typography>
          </div>
        </div>
      </Box>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box
          component="aside"
          sx={{
            minWidth: '320px',
            marginRight: '78px',
          }}
        >
          <Box
            component="section"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '48px'
            }}
          >
            <Typography
              variant="h5"
              sx={{
                marginBottom: '16px'
              }}
            >
              내 정보
            </Typography>
            {myInfoList.map(({ href, name }) => (
              <Link
                className={s.link}
                underline="hover"
                color={grey[900]}
                href={href}
              >
                <Typography variant="body2">{name}</Typography>
                <ArrowForwardIosIcon
                  sx={{
                    width: '15px',
                    height: '15px',
                    color: grey[500]
                  }}
                />
              </Link>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: '16px' }}>
            내 강의
          </Typography>
          <Grid
            container
            rowSpacing={4}
            columnSpacing={2}
            columns={{ xs: 1, sm: 2, md: 3 }}>
            {Array.from(Array(10)).map((v, idx) => (
              <Grid item xs={1} sm={1} md={1}>
                <Link href="/course/1/content/1">
                  <ContentCard maxWidth={250} key={idx}/>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}


