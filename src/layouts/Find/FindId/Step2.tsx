import { pageType } from '@common/recoil';
import { pageRegType } from '@common/recoil/pageType/atom';
import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useRecoilState } from 'recoil';

interface Props {
  idArr:
    | {
        username: string;
        createdDTime: string;
      }[]
    | undefined;
}

export function Step2({ idArr }: Props) {
  const [userPageType, setUserPageType] = useRecoilState(pageType);
  return (
    <Step2Wrap>
      <Typo>ID 찾기</Typo>
      <Typography fontWeight="bold">해당 휴대폰 번호로 등록된 ID들 입니다.</Typography>
      <Typography>운수종사자 , 저상버스 , 도민 아이디여부는 표시되지 않습니다.</Typography>
      <Box className="find-form" component="form">
        {idArr &&
          idArr.map(item => (
            <Box padding="0.5rem" bgcolor="primary.main" color="white" display="flex">
              <Box>
                <Box paddingBottom="0.5rem">아이디</Box>
                <Box>가입일</Box>
              </Box>
              <Box ml={1} paddingLeft="0.5rem" borderLeft="2px solid #fff">
                <Box paddingBottom="0.5rem">{item.username}</Box>
                <Box>{item.createdDTime}</Box>
              </Box>
            </Box>
          ))}
      </Box>
      <Box display="flex" mt={8} gap="1rem">
        <Link href="/find/pw">
          <Button variant="contained" color="neutral" fullWidth>
            비밀번호 찾기
          </Button>
        </Link>
        {/* <Link href={`/${userPageType === pageRegType.TYPE_TRANS_EDU ? 'sign-in' : 'traffic/sign-in'}`}> */}
        <Link href={`/traffic/sign-in`}>
          <Button variant="contained" fullWidth>
            로그인
          </Button>
        </Link>
      </Box>
    </Step2Wrap>
  );
}

const Step2Wrap = styled(Box)`
  max-width: 700px;
  margin: auto;
  padding:0 12px;
  margin-bottom:120px;
  .find-form {
    max-width: 450px;
    margin: auto;
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
const Typo = styled(Box)`
  font-weight: bold;
  font-size: 1.25rem;
  margin-top: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #888888;
`;
