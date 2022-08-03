import styled from '@emotion/styled';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { PasswordChangeModal } from '../PasswordChangeModal/PasswordChangeModal';
import Paper from '@mui/material/Paper';
import { modifyProvincialTrafficSafety, useMyUser, userRegistrationType } from '@common/api/user';
import { useDialog } from '@hooks/useDialog';
import { YN } from '@common/constant';
import { useRouter } from 'next/router';
import { useInput } from '@hooks/useInput';
import Link from 'next/link';

// const studentList = [
//   {
//     type: '어린이',
//     enType: 'CHILDREN',
//     category: [
//       {
//         type: '유치원',
//         enType: 'KINDER',
//         ageList: [
//           { age: '만3세', enAge: 'fifthYearOldChild' },
//           { age: '만4세', enAge: 'fourthYearOldChild' },
//           { age: '만5세', enAge: 'thirdYearOldChild' },
//         ],
//       },
//     ],
//   },
//   {
//     type: '청소년',
//     enType: 'TEENAGER',
//     category: [
//       {
//         type: '초등학교',
//         enType: 'ELEMENTARY_SCHOOL',
//         ageList: [
//           { age: '1학년', enAge: 'firstGrade' },
//           { age: '2학년', enAge: 'secondGrade' },
//           { age: '3학년', enAge: 'thirdGrade' },
//           { age: '4학년', enAge: 'fourthGrade' },
//           { age: '5학년', enAge: 'fifthGrade' },
//           { age: '6학년', enAge: 'sixthGrade' },
//         ],
//       },
//       {
//         type: '중학교',
//         enType: 'MIDDLE_SCHOOL',
//         ageList: [
//           { age: '1학년', enAge: 'firstGrade' },
//           { age: '2학년', enAge: 'secondGrade' },
//           { age: '3학년', enAge: 'thirdGrade' },
//         ],
//       },
//       {
//         type: '고등학교',
//         enType: 'HIGH_SCHOOL',
//         ageList: [
//           { age: '1학년', enAge: 'firstGrade' },
//           { age: '2학년', enAge: 'secondGrade' },
//           { age: '3학년', enAge: 'thirdGrade' },
//         ],
//       },
//     ],
//   },
//   {
//     type: '자가운전자',
//     enType: 'SELF_DRIVER',
//     category: [{ type: '자가운전자', enType: 'SELF_DRIVER', ageList: [{ age: '자가운전자', enAge: 'selfDriver' }] }],
//   },
//   {
//     type: '어르신',
//     enType: 'OLD_MAN',
//     category: [{ type: '어르신', enType: 'OLD_MAN', ageList: [{ age: '어르신', enAge: 'oldMan' }] }],
//   },
// ];

const passwordRegex = /[a-zA-z0-9\[\]\{\}\/,.<>;:\'\"`~!@#$%^&*\(\)-_=+\\]/;
const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const phoneRegex = /[0-9]$/;

interface Props {
  locationList: { ko: string; en: string }[];
}

interface detailCounts {
  [prop: string]: any;
}

export function Educator({ locationList }: Props) {
  const [openPromptDialog, setOpenPromptDialog] = useState(false);
  const { user, error } = useMyUser();
  const [phone, setPhone, onChangePhone] = useInput('');
  const [email, setEmail] = useState<string>();
  const [location, setLocation] = useState<userRegistrationType>();
  const [company, setCompany] = useState<string>();
  const [smsChecked, setSmsChecked] = useState(false);

  const [emailErr, setEmailErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [companyErr, setCompanyErr] = useState(false);

  const dialog = useDialog();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailErr || phoneErr || companyErr) return;

    const dialogConfirmed = await dialog({
      title: '회원 정보 수정',
      description: '회원 정보를 수정하시겠습니까?',
      confirmText: '수정하기',
      cancelText: '취소하기',
    });
    await handleOnCloseConfirm(dialogConfirmed);
  };

  const handleOnCloseConfirm = async (isConfirm: boolean) => {
    if (isConfirm) {
      const smsYn = smsChecked ? YN.YES : YN.NO;
      if (!user || !location || !email || !company) return window.alert('수정 실패하였습니다.');
      const data = {
        company: company,
        email: email,
        name: user.name,
        phone: phone,
        smsYn,
        userRegistrationType: location,
        username: user.username,
      };

      await modifyProvincialTrafficSafety(data);
      return router.push('/me');
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneErr(false);
    if (e.target.value.length > 11) return;
    if (!phoneRegex.test(e.target.value) || e.target.value.length < 11) {
      setPhoneErr(true);
    }
    setPhone(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailErr(false);
    if (!emailRegex.test(e.target.value)) setEmailErr(true);
    setEmail(e.target.value);
  };

  const handleCompanyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCompanyErr(false);
    if (e.target.value === '') setCompanyErr(true);
    setCompany(e.target.value);
  };

  return (
    <EducatorContainer
      sx={{
        marginBottom: 8,
        padding: '72px 30px 48px',
      }}
      maxWidth="sm"
    >
      <Box
        component={'form'}
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          mt: 1,
        }}
      >
        <Box sx={{ padding: '2rem 0', margin: 'auto' }}>
          <UserProfile />
        </Box>
        <TextField required fullWidth id="name" label="이름" name="name" value={user?.name} disabled />
        <TextField required fullWidth id="id" label="아이디" name="id" value={user?.username} disabled />
        {/* <Button
          type="button"
          fullWidth
          variant="outlined"
          color="neutral"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => setOpenPromptDialog(true)}
        >
          비밀번호 변경
        </Button> */}
        <Link href="/find/pw">
          <Button type="button" fullWidth variant="outlined" color="neutral" sx={{ mt: 3, mb: 2 }}>
            비밀번호 변경
          </Button>
        </Link>
        <PhoneBox>
          <TextField
            label="휴대전화"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="'-'를 제외한 숫자만 입력해주세요."
            error={phoneErr}
            fullWidth
          />
          <FormHelperText sx={{ color: 'red' }}>{phoneErr && '유효한 휴대폰 형식이 아닙니다.'}</FormHelperText>
        </PhoneBox>
        <EmailBox>
          <TextField
            label="이메일"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일을 입력해주세요."
            error={emailErr}
            fullWidth
          />
          <FormHelperText sx={{ color: 'red' }}>{emailErr && '유효한 이메일 형식이 아닙니다.'}</FormHelperText>
        </EmailBox>

        <LocationBox>
          <FormControl fullWidth>
            <InputLabel id="location">지역</InputLabel>
            <Select
              labelId="location"
              id="location"
              value={location}
              onChange={e => setLocation(e.target.value as userRegistrationType)}
              label="location"
            >
              {locationList.map(item => (
                <MenuItem key={item.en} value={item.en}>
                  {item.ko}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </LocationBox>
        <DivisionBox>
          <TextField
            label="소속(학교,기관,단체)"
            placeholder="예) oo유치원 / oo고등학교 / 대한노인회 공주지회"
            onChange={handleCompanyChange}
            value={company}
            error={companyErr}
            fullWidth
          />
          <FormHelperText sx={{ color: 'red' }}>{companyErr && '올바른 입력형식이 아닙니다'}</FormHelperText>
        </DivisionBox>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: '8px',
          }}
        >
          <Checkbox
            name="smsYn"
            checked={smsChecked}
            onChange={(e, checked) => {
              setSmsChecked(checked);
            }}
          />
          <Typography variant="body2">SMS 수신 여부</Typography>
        </Box>

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          수정하기
        </Button>

        <PasswordChangeModal open={openPromptDialog} onClose={() => setOpenPromptDialog(false)} />
      </Box>
    </EducatorContainer>
  );
}

const EducatorContainer = styled(Container)``;
const BoxForm = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UserProfile = styled(Avatar)`
  width: 100px;
  height: 100px;
`;

const PhoneBox = styled(Box)``;

const EmailBox = styled(FormControl)``;

const LocationBox = styled(Box)``;
const DivisionBox = styled(Box)``;
const StudentTypeBox = styled(Box)``;
const StudentCategory = styled(Box)``;
