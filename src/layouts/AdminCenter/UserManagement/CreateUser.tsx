import { SignupAdm } from '@common/api/adm/auth/signUp';
import { SignupParams } from '@common/api/auth/signUp';
import { regCategoryType } from '@common/api/user';
import { YN } from '@common/constant';
import styled from '@emotion/styled';
import { ErrorMessage } from '@hookform/error-message';
import { useSnackbar } from '@hooks/useSnackbar';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { emailRegex, passwordRegex, phoneRegex } from '@utils/inputRegexes';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

const regCategoryList = [
  { enType: regCategoryType.TYPE_TRANS_EDU, ko: '운수 저상' },
  { enType: regCategoryType.TYPE_TRAFFIC_SAFETY_EDU, ko: '도민' },
];

const defaultValues = {
  smsYn: YN.NO,
  emailYn: YN.NO,
  regCategory: regCategoryType.TYPE_TRANS_EDU,
};

export function CreateUser() {
  const snackbar = useSnackbar();
  const router = useRouter();
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupParams>({ defaultValues });

  const createSubmit: SubmitHandler<SignupParams> = async ({ ...rest }) => {
    for (const [key, value] of Object.entries(rest)) {
      if (value === '') return window.alert('모두 입력해주세요!');
    }
    try {
      await SignupAdm(rest);
      snackbar({ variant: 'success', message: '계정을 성공적으로 생성했습니다.' });
      router.push('/admin-center/user');
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  return (
    <CreateUserwrap>
      <Container>
        <Box component="form" onSubmit={handleSubmit(createSubmit)}>
          <UserTypo variant="h5">관리자 계정 생성</UserTypo>
          <Typography sx={{ color: 'red' }}>
            운수,저상으로 생성하는 경우 아이디, 패스워드는 주민등록번호로 해야합니다!
          </Typography>
          <FormControl fullWidth>
            <Typography>유저타입</Typography>
            <Select {...register('regCategory')} value={watch().regCategory || ''}>
              {regCategoryList.map(reg => (
                <MenuItem key={reg.enType} value={reg.enType}>
                  {reg.ko}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography>이름</Typography>
          <TextField {...register('name')} fullWidth />
          <Typography>아이디</Typography>
          <TextField
            type={
              watch().regCategory === regCategoryType.TYPE_TRANS_EDU ? 'password' : 'text'
            }
            {...register('username')}
            fullWidth
          />
          <Typography>패스워드(8자리 이상 , 영문 ,숫자 , 특수문자 포함)</Typography>
          <TextField
            type="password"
            {...register('password', {
              pattern: { value: passwordRegex, message: 'Invailed password' },
            })}
            fullWidth
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <Box color="red">{message}</Box>}
          />
          <Typography>핸드폰('-' 없이 작성)</Typography>
          <TextField
            {...register('phone', {
              pattern: { value: phoneRegex, message: 'Invailed Phone' },
            })}
            fullWidth
          />
          <ErrorMessage
            errors={errors}
            name="phone"
            render={({ message }) => <Box color="red">{message}</Box>}
          />
          <Typography>smsYn</Typography>
          <Checkbox
            onChange={(e, checked) =>
              checked ? setValue('smsYn', YN.YES) : setValue('smsYn', YN.YES)
            }
          />{' '}
          <span>SMS동의</span>
          <Typography>email</Typography>
          <TextField
            {...register('email', {
              pattern: { value: emailRegex, message: 'Invailed Email' },
            })}
            fullWidth
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <Box color="red">{message}</Box>}
          />
          <Typography>emailYn</Typography>
          <Checkbox
            onChange={(e, checked) =>
              checked ? setValue('emailYn', YN.YES) : setValue('emailYn', YN.NO)
            }
          />{' '}
          <span>이메일동의</span>
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </Box>
      </Container>
    </CreateUserwrap>
  );
}

const CreateUserwrap = styled(Box)``;

const UserTypo = styled(Typography)`
  margin-bottom: 12px;
  font-weight: 700;
`;
