import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from '@mui/material';
import { useRef, useState } from 'react';
import { Modal } from '@components/ui';
import TextField from '@mui/material/TextField';
import { modifyUser } from '@common/api/adm/user';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSnackbar } from '@hooks/useSnackbar';
import styled from '@emotion/styled';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect } from 'react';
import { UserInput } from '@common/api/user';
import dateFormat from 'dateformat';
import { Phone4Regex } from '@utils/inputRegexes';

const phoneList = ['010', '011'];

export function UserModifyModal({
  open,
  handleClose,
  userData,
  error,
}: {
  open: boolean;
  handleClose: (isSubmit: boolean) => void;
  userData: UserInput;
  error?: any;
}) {
  const [phone01, setPhone01] = useState('010');
  const [phone02, setPhone02] = useState('');
  const [phone03, setPhone03] = useState('');
  const phone2 = useRef<string>('');
  const phone3 = useRef<string>('');

  const onChangePhoneNum01 = (e: any) => {
    setPhone01(e.target.value);
  };
  const onChangePhoneNum02 = (value: string) => {
    setPhone02(value);
  };
  const onChangePhoneNum03 = (value: string) => {
    setPhone03(value);
  };

  const snackbar = useSnackbar();
  const [submitLoading, setSubmitLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<UserInput>();

  useEffect(() => {
    reset({ ...userData });
  }, [userData, open, reset]);

  const onSubmit: SubmitHandler<UserInput> = async userInput => {
    try {
      // console.log('userData : ', userData);
      // console.log('userInput : ', userInput);
      // const birth = dateFormat(userInput.birth, 'yyyy-mm-dd');
      setSubmitLoading(true);
      await modifyUser({ seq: userInput.seq, userInput });
      setSubmitLoading(false);
      snackbar({
        variant: 'success',
        message: `${userInput.name} 님이 수정 되었습니다.`,
      });
    } catch (e: any) {
      // snackbar(e.message || e.data?.message);
      snackbar({ variant: 'error', message: e.message });
      setSubmitLoading(false);
    }
    handleClose(true);
  };

  if (error) return <div>error</div>;

  return (
    <Modal
      action="수정"
      title="유저 수정"
      maxWidth="sm"
      fullWidth
      open={open}
      actionLoading={submitLoading}
      onSubmit={handleSubmit(onSubmit)}
      onCloseModal={() => handleClose(false)}
    >
      <Box component="form">
        <FormContainer>
          <FormControl className="form-control">
            <TextField
              value={userData?.seq}
              type="text"
              size="small"
              variant="outlined"
              label="회원번호"
            />
          </FormControl>
          <FormControl className="form-control">
            <TextField
              {...register('name')}
              type="text"
              size="small"
              variant="outlined"
              label="이름"
            />
            <ErrorMessage errors={errors} name="name" as={<FormHelperText error />} />
          </FormControl>

          <FormControl className="form-control">
            <TextField
              {...register('phone')}
              type="text"
              size="small"
              variant="outlined"
              label="핸드폰번호"
            />
            <ErrorMessage errors={errors} name="phone" as={<FormHelperText error />} />
          </FormControl>

          {/* <FormControl className="form-control">
            <Select
              sx={{ width: '30%' }}
              labelId="phone-type-label"
              id="phone-type"
              defaultValue={'010'}
              onChange={onChangePhoneNum01}
            >
              {phoneList.map(item => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
            -
            <TextField
              sx={{ width: '30%' }}
              value={phone02}
              onChange={e => {
                phone2.current = e.target.value;
                if (Phone4Regex.test(e.target.value)) {
                  return;
                }
                onChangePhoneNum02(e.target.value.replace(/[^0-9]/g, ''));
              }}
            />
            -
            <TextField
              sx={{ width: '30%' }}
              value={phone03}
              onChange={e => {
                phone3.current = e.target.value;
                console.log(Phone4Regex.test(e.target.value), e.target.value);
                if (Phone4Regex.test(e.target.value)) {
                  return;
                }
                onChangePhoneNum03(e.target.value.replace(/[^0-9]/g, ''));
              }}
            />
          </FormControl> */}

          <FormControl className="form-control">
            <TextField
              {...register('birth')}
              type="date"
              size="small"
              variant="outlined"
              label="생년월일"
            />
            <ErrorMessage errors={errors} name="birth" as={<FormHelperText error />} />
          </FormControl>
          {/* <FormControl className="form-control">
            <FormLabel focused={false}>성별</FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              name="gender"
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value={'남성'} control={<Radio />} label="남성" />
                  <FormControlLabel value={'여성'} control={<Radio />} label="여성" />
                </RadioGroup>
              )}
            />
            <ErrorMessage errors={errors} name="gender" as={<FormHelperText error />} />
          </FormControl> */}
          <FormControl className="form-control">
            <FormLabel focused={false}>문자수신</FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              name="smsYn"
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value={'Y'} control={<Radio />} label="동의" />
                  <FormControlLabel value={'N'} control={<Radio />} label="거부" />
                </RadioGroup>
              )}
            />
            <ErrorMessage errors={errors} name="smsYn" as={<FormHelperText error />} />
          </FormControl>
          <FormControl className="form-control">
            <FormLabel focused={false}>이메일수신</FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              name="emailYn"
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value={'Y'} control={<Radio />} label="동의" />
                  <FormControlLabel value={'N'} control={<Radio />} label="거부" />
                </RadioGroup>
              )}
            />
            <ErrorMessage errors={errors} name="emailYn" as={<FormHelperText error />} />
          </FormControl>
        </FormContainer>
      </Box>
    </Modal>
  );
}

const FormContainer = styled.div`
  display: block;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;

  .form-control {
    width: 49%;
    float: left;

    .typo {
      margin-bottom: 8px;
    }

    &:not(:last-child) {
      margin-bottom: 30px;
    }
  }

  .form-control:nth-of-type(even) {
    margin-left: 2%;
  }
`;
