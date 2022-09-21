import {
  Box,
  Button,
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
import { modifyUser, removeUser } from '@common/api/adm/user';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSnackbar } from '@hooks/useSnackbar';
import styled from '@emotion/styled';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect } from 'react';
import { UserInput } from '@common/api/user';
import dateFormat from 'dateformat';
import { Phone4Regex } from '@utils/inputRegexes';
import { useDialog } from '@hooks/useDialog';

const phoneList = ['010', '011'];
const date = new Date();
const year = date.getFullYear();

// interface FormType extends UserInput {
//   printBirth: string;
// }

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
  const dialog = useDialog();
  const snackbar = useSnackbar();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [birth, setBirth] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    // setValue,
    // watch,
    // } = useForm<FormType>();
  } = useForm<UserInput>();

  // console.log('유저번호는 :', userData?.seq);

  useEffect(() => {
    reset({ ...userData });
  }, [userData, open, reset]);

  // useEffect(() => {
  //   setValue(
  //     'birth',
  //     Number(userData?.birth.split('-', 1)) < 1000
  //       ? Number(userData?.birth?.slice(0, 2)) + Number(2000) > year
  //         ? 19 + userData?.birth
  //         : 20 + userData?.birth
  //       : userData?.birth
  //   );
  // }, []);

  // console.log('스플릿 :', userData?.birth.split('-', 1));
  // console.log('누구세요? : ', userData);
  // console.log('1생일이 언제에요? : ', userData?.birth);
  // console.log(
  //   '2생일이 언제에요? : ',
  //   Number(userData?.birth.split('-', 1)) < 1000
  //     ? Number(userData?.birth?.slice(0, 2)) + Number(2000) > year
  //       ? 19 + userData?.birth
  //       : 20 + userData?.birth
  //     : userData?.birth
  // );

  // const printBirth =
  //   Number(userData?.birth.split('-', 1)) < 1000
  //     ? Number(userData?.birth?.slice(0, 2)) + Number(2000) > year
  //       ? 19 + userData?.birth
  //       : 20 + userData?.birth
  //     : userData?.birth;

  // console.log('printBirth : ', printBirth);

  // if (userData?.birth.length < 9) {
  //   if (userData?.identityNumberFirst == 1 || userData?.identityNumberFirst == 2) {
  //     19 + userData?.birth;
  //     console.log('최종생일 : ', 19 + userData?.birth);
  //   } else if (userData?.identityNumberFirst == 3 || userData?.identityNumberFirst == 4) {
  //     20 + userData?.birth;
  //     console.log('최종생일 : ', 20 + userData?.birth);
  //   }
  // }

  const onClickRemoveUser = async (userSeq: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: '유저 삭제하기',
        description: (
          <div>
            <div>삭제시 회원의 모든 정보가 영구적으로 삭제됩니다.</div>
            <div>정말로 삭제하시겠습니까?</div>
            <div style={{ color: 'red', fontSize: '14px' }}>*복구가 불가능합니다.*</div>
          </div>
        ),
        confirmText: '삭제하기',
        cancelText: '취소',
      });
      if (dialogConfirmed) {
        await removeUser(userData?.seq);
        snackbar({ variant: 'success', message: '성공적으로 삭제되었습니다.' });
        // await mutate();
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
    handleClose(true);
  };

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
      action={
        <>
          <DeleteBtn
            variant="contained"
            color="warning"
            onClick={() => onClickRemoveUser(userData.seq)}
            size="small"
          >
            삭제
          </DeleteBtn>
          <SubmitBtn
            variant="contained"
            color="secondary"
            onClick={handleSubmit(onSubmit)}
            size="small"
          >
            저장
          </SubmitBtn>
        </>
      }
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
              disabled
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
              disabled
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
              // {...register('printBirth')}
              // {...register('birth')}
              // value={printBirth}
              // value={
              //   userData?.birth
              //     ? Number(userData?.birth.split('-', 1)) < 1000
              //       ? userData?.identityNumberFirst == 1 ||
              //         userData?.identityNumberFirst == 2
              //         ? 19 + userData?.birth
              //         : 20 + userData?.birth
              //       : userData?.birth
              //     : ''
              // }
              value={
                userData?.birth
                  ? Number(userData?.birth.split('-', 1)) < 1000
                    ? userData?.identityNumberFirst == 1 ||
                      userData?.identityNumberFirst == 2 ||
                      userData?.identityNumberFirst == 5 ||
                      userData?.identityNumberFirst == 6
                      ? 19 + userData?.birth
                      : 20 + userData?.birth
                    : userData?.birth
                  : ''
              }
              disabled
              // value={watch().printBirth}
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
const SubmitBtn = styled(Button)`
  /* margin: 30px 30px 30px 0; */
  margin-top: 10px;
  margin-bottom: 10px;
`;

const DeleteBtn = styled(Button)``;
