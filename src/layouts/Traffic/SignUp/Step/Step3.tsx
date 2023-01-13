import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import { StepHeader } from '../StepHeader';
import DoneIcon from '@mui/icons-material/Done';
import { useRouter } from 'next/router';

interface Props {
  handleStep: (moveNumber: number) => void;
  resName: string;
}

export function Step3({ handleStep, resName }: Props) {
  const router = useRouter();
  return (
    <Step3Wrap>
      <StepMain>
        <TitleTypo>가입완료</TitleTypo>
        <Box width="fit-content" margin={'auto'} mt={5}>
          <DoneIcon color="primary" sx={{ fontSize: '5rem' }} />
        </Box>
        <ContentBoxes>
          <Box mt={2}>
            <Typography component="span" fontSize="1.5rem">
              회원가입이{' '}
            </Typography>
            <Typography component="span" fontSize="1.5rem" fontWeight="bold">
              완료{' '}
            </Typography>
            <Typography component="span" fontSize="1.5rem">
              되었습니다.
            </Typography>
          </Box>
        </ContentBoxes>
        <Box mt={4} />
        <ContentBoxes>{String(resName)}님의 회원가입을 축하합니다.</ContentBoxes>
        <ContentBoxes>알차고 실속있는 서비스로 찾아뵙겠습니다.</ContentBoxes>
        <Box margin="auto" maxWidth="450px" mt={4} borderBottom="2px solid #888888" />
        <ContentBoxes borderBottom="2px solid #888888"></ContentBoxes>
        <Box display="flex" gap="1rem" maxWidth="400px" margin="auto" mt={2}>
          <Button
            fullWidth
            variant="contained"
            color="neutral"
            onClick={() => router.push(`/traffic/category`)}
          >
            홈으로
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => router.push(`/traffic/sign-in`)}
            sx={{ background: '#404040', color: 'white' }}
          >
            로그인
          </Button>
        </Box>
      </StepMain>
    </Step3Wrap>
  );
}

const Step3Wrap = styled(Box)`
  padding: 0 24px;
  button {
    padding: 0.75rem;
  }
`;

const StepMain = styled(Box)`
  max-width: 700px;
  margin: auto;
`;
const TitleTypo = styled(Typography)`
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #c3c3c3;
`;

const ContentBoxes = styled(Box)`
  width: fit-content;
  margin: auto;
`;
