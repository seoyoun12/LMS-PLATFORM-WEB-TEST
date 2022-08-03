import { existsUserId } from '@common/api/user';
import styled from '@emotion/styled';
import { useSnackbar } from '@hooks/useSnackbar';
import { Box, Button, Container, FormControl, FormHelperText, TextField, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
  handleStepChange: (stepNumber: number) => void;
  handleUsernameChange: (username: string) => void;
}

export function Step1({ handleStepChange, handleUsernameChange }: Props) {
  const snackbar = useSnackbar();
  const [username, setUsername] = useState<string>('');
  const [usernameErr, setUsernameErr] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (usernameErr) return window.alert('올바른 아이디를 입력해 주세요!');
    try {
      const { data }: { data: { name: string; phone: string; username: string } } = await existsUserId(username);
      console.log(data);
      handleUsernameChange(data.username);
      handleStepChange(2);
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameErr(false);
    setUsername(e.target.value);
    if (e.target.value === '') return setUsernameErr(true);
  };

  return (
    <Step1Wrap>
      <Typo>ID 입력</Typo>
      <Typography fontWeight="bold">아이디의 존재여부를 확인합니다</Typography>
      <Box className="find-form" component="form" onSubmit={handleSubmit}>
        <FormControl>
          <TextField placeholder="아이디를 입력해 주세요" onChange={handleChange} error={usernameErr} value={username} />
          <FormHelperText sx={{ color: 'red' }}>{usernameErr && `올바른 형식으로 입력해주세요`}</FormHelperText>
        </FormControl>
        <Button variant="contained" type="submit">
          찾기
        </Button>
      </Box>
    </Step1Wrap>
  );
}

const Step1Wrap = styled(Box)`
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
// const FindForm = styled(Box)`
// `;
