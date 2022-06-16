import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useState } from 'react';
import { Modal } from '@components/ui';
import TextField from '@mui/material/TextField';
import { modifyUser } from '@common/api/user';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSnackbar } from '@hooks/useSnackbar';
import styled from '@emotion/styled';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect } from 'react';
import { UserInput } from '@common/api/user';
import dateFormat from 'dateformat';

export function UserModifyModal({ open, handleClose, userData, error }: {
  open: boolean;
  handleClose: (isSubmit: boolean) => void;
  userData: UserInput;
  error?: any;
}) {
  const snackbar = useSnackbar();
  const [submitLoading, setSubmitLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<UserInput>();

  useEffect(() => {
    reset({ ...userData })
  }, [userData, open])

  const onSubmit: SubmitHandler<UserInput> = async (userInput) => {

    try {
      const birth = dateFormat(userInput.birth, 'yyyy-mm-dd');
      setSubmitLoading(true);
      await modifyUser({ ...userInput, birth });
      setSubmitLoading(false);
      snackbar({ variant: 'success', message: `${userInput.name} 님이 수정 되었습니다.` });
    } catch (e: any) {
      snackbar(e.message || e.data?.message);
      setSubmitLoading(false);
    }
    handleClose(true);
  }

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
              value={(userData?.seq)}
              type='text'
              size="small"
              variant='outlined'
              label="회원번호"
            />

          </FormControl>
          <FormControl className="form-control">
            <TextField
              {...register("name")}
              type='text'
              size="small"
              variant='outlined'
              label="이름"
            />
            <ErrorMessage errors={errors} name="name" as={<FormHelperText error />} />
          </FormControl>
          <FormControl className="form-control">
            <TextField
              {...register("phone")}
              type='text'
              size="small"
              variant='outlined'
              label="핸드폰번호"
            />
            <ErrorMessage errors={errors} name="phone" as={<FormHelperText error />} />
          </FormControl>
          <FormControl className="form-control">
            <TextField
              {...register("birth")}
              type='date'
              size="small"
              variant='outlined'
              label="생년월일"
            />
            <ErrorMessage errors={errors} name="birth" as={<FormHelperText error />} />
          </FormControl>
          <FormControl className="form-control">
            <FormLabel focused={false}>성별</FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              name="gender"
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value={"남성"}
                    control={<Radio />}
                    label="남성"
                  />
                  <FormControlLabel
                    value={"여성"}
                    control={<Radio />}
                    label="여성"
                  />
                </RadioGroup>
              )}
            />
            <ErrorMessage errors={errors} name="gender" as={<FormHelperText error />} />
          </FormControl>
          <FormControl className="form-control">
            <FormLabel focused={false}>문자수신</FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              name="smsYn"
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value={"Y"}
                    control={<Radio />}
                    label="동의"
                  />
                  <FormControlLabel
                    value={"N"}
                    control={<Radio />}
                    label="거부"
                  />
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
                  <FormControlLabel
                    value={"Y"}
                    control={<Radio />}
                    label="동의"
                  />
                  <FormControlLabel
                    value={"N"}
                    control={<Radio />}
                    label="거부"
                  />
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


