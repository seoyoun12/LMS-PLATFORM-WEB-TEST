import { pageRegType } from '@common/recoil/pageType/atom';
import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import Link from 'next/link';

export function Step3() {
  return (
    <Step3Wrap>
      <Typo>완료</Typo>
      <Box className="find-form" component="form">
        <Typo>비밀변호를 변경했습니다!</Typo>
        <Typo>변경된 비밀번호로 다시 로그인 해주세요!</Typo>
      </Box>
      <Box display="flex" mt={8} gap="1rem">
        <Link href="/traffic/sign-in">
          <Button variant="contained" color="neutral" fullWidth>
            로그인
          </Button>
        </Link>
        {/* <Link href={`/${userPageType === pageRegType.TYPE_TRANS_EDU ? 'sign-in' : 'traffic/sign-in'}`}>
          <Button variant="contained" fullWidth>
            로그인
          </Button>
        </Link> */}
      </Box>
    </Step3Wrap>
  );
}

const Step3Wrap = styled(Box)`
  max-width: 700px;
  margin: auto;
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

const HelperBox = styled(Box)`
  display: flex;
  align-items: center;
`;
