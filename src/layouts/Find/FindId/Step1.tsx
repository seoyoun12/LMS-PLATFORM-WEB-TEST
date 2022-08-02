import { findUserId } from '@common/api/user';
import styled from '@emotion/styled';
import { useSnackbar } from '@hooks/useSnackbar';
import { Box, Button, Container, FormControl, FormHelperText, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ChangeEvent, FormEvent, useState } from 'react';

const phoneRegex = /[0-9]$/;

interface Props {
  handleStepChange: () => void;
  handleIdsChange: (
    idArr: {
      username: string;
      createdDTime: string;
    }[]
  ) => void;
}

export function Step1({ handleStepChange, handleIdsChange }: Props) {
  const snackbar = useSnackbar();
  const [phone, setPhone] = useState<string>('');
  const [phoneErr, setPhoneErr] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phoneErr) return window.alert('올바르지 않은 휴대폰 번호 형식입니다.');
    try {
      const { data } = await findUserId(phone);
      console.log(data);
      handleIdsChange(data);
      handleStepChange();
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneErr(false);
    console.log(phoneRegex.test(e.target.value), e.target.value);
    if (e.target.value.length > 11) return;
    if (!phoneRegex.test(e.target.value) || e.target.value.length < 11) {
      // return setPhoneErr(true);
      setPhoneErr(true);
    }
    setPhone(e.target.value);
  };

  return (
    <Step1Wrap>
      <Typo>ID 찾기</Typo>
      <Typography fontWeight="bold">휴대폰 번호로 자신의 아이디를 찾을 수 있습니다.</Typography>
      <Box className="find-form" component="form" onSubmit={handleSubmit}>
        <FormControl>
          <TextField placeholder='"-"없이 휴대폰번호를 입력해 주세요' onChange={handleChange} error={phoneErr} value={phone} />
          <FormHelperText sx={{ color: 'red' }}>{phoneErr && `올바른 형식으로 입력해주세요`}</FormHelperText>
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
