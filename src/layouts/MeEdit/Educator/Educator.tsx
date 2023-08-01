import styled from '@emotion/styled';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { PasswordChangeModal } from '../PasswordChangeModal/PasswordChangeModal';
import Paper from '@mui/material/Paper';
import {
  getProvincial,
  modifyProvincialTrafficSafety,
  useMyUser,
  userRegistrationType,
} from '@common/api/user';
import { useDialog } from '@hooks/useDialog';
import { YN } from '@common/constant';
import { useRouter } from 'next/router';
import { useInput } from '@hooks/useInput';
import Link from 'next/link';
import { useSnackbar } from '@hooks/useSnackbar';
import { logout } from '@common/api';
import { useForm } from 'react-hook-form';
import BackgroundImage from 'public/assets/svgs/service_background.svg';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import { FileUploaderTrans } from '@components/ui/FileUploader';
import { UserProvincialUpdateResponseDto } from '@common/api/Api';
import { BbsType, deleteFile, uploadFile } from '@common/api/adm/file';
import { Spinner } from '@components/ui';

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
const emailRegex =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const phoneRegex = /[0-9]$/;

interface Props {
  locationList: { ko: string; en: string }[];
}

interface detailCounts {
  [prop: string]: any;
}

interface FormType {
  files: File[];
  fileSeq: number;
  filePath: string;
  urlImage: string;
}
const defaultValues = {
  files: [],
};

export function Educator({ locationList }: Props) {
  
  const { user, error } = useMyUser();
  const [phone, setPhone, onChangePhone] = useInput('');



  const [openPromptDialog, setOpenPromptDialog] = useState(false);
  const [email, setEmail] = useState<string>();
  const [location, setLocation] = useState<userRegistrationType>();
  const [company, setCompany] = useState<string>();
  const [smsChecked, setSmsChecked] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const { register, reset, resetField, setValue, watch } = useForm<FormType>({
    defaultValues,
  });

  const [backdropLoading, setBackdropLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [emailErr, setEmailErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [companyErr, setCompanyErr] = useState(false);

  const dialog = useDialog();
  const snackbar = useSnackbar();
  const router = useRouter();

  useEffect(() => {
    (async function () {
      try {
        const { data } = await getProvincial();

        if(data){
          setCompany(data.company);
          // setPhone(data.phone.slice(0, 3));
          // setPhone2(data.phone.slice(3, 7));
          // setPhone3(data.phone.slice(7, 11));
          setEmail(data.email);
          setLocation(data.userRegistrationType);
          setSmsChecked(data.smsYn === YN.YES ? true : false);
          setEmailChecked(data.emailYn === YN.YES ? true : false);
          setPhone(data.phone);
        }
        
      } catch (error) {
        console.error(error);
      }
      
    })();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailErr || phoneErr)
      return snackbar({
        variant: 'error',
        message: '올바르지 않은 형식의 이메일 , 휴대전화번호 입니다.',
      });
    if (!phone)
      return snackbar({
        variant: 'error',
        message: '휴대전화번호를 입력해주세요.',
      });

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
      const emailYn = emailChecked ? YN.YES : YN.NO;
      // console.log(user, email);
      if (!user || !email) return window.alert('수정 실패하였습니다.');
      const data = {
        userSeq: user.seq,
        company: company,
        email: email,
        name: user.name,
        phone: phone,
        smsYn,
        emailYn,
        userRegistrationType: location,
        username: user.username,
      };

      try {
        const { data: ProvincialData }: { data: UserProvincialUpdateResponseDto } =
          await modifyProvincialTrafficSafety(data);
        // console.log(ProvincialData);
        if (watch().files.length > 0) {
          if (watch().fileSeq) {
            await deleteFile({
              fileType: BbsType.TYPE_USER_PROFILE,
              fileTypeId: data.userSeq,
              fileSeqList: [watch().fileSeq],
            });
          }
          await fileHandler(watch().files, data.userSeq);
        }
      } catch (e: any) {
        window.alert(e.data.message);
      }

      return router.push('/me');
    }
  };

  const fileHandler = async (files: File[], userSeq: number) => {
    const isFileUpload = files.length > 0;
    if (isFileUpload) {
      await uploadFile({
        fileTypeId: userSeq,
        fileType: BbsType.TYPE_USER_PROFILE,
        files,
      });
    }
  };

  const handleFileChange = async (e: ChangeEvent) => {
    e.preventDefault();

    setBackdropLoading(true);
    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return null;
    setValue('urlImage', URL.createObjectURL(files[0]));
    setFileName(files[0].name);
    setTimeout(() => setBackdropLoading(false), 200);
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
        {/* <Box sx={{ padding: '2rem 0', margin: 'auto' }}>
          <UserProfile />
        </Box> */}
        <Box sx={{ margin: 'auto' }}>
          <FileUploaderTrans
            register={register}
            regName="files"
            accept=".jpg, .jpge, .png"
            onFileChange={handleFileChange}
          >
            <Box sx={{ position: 'relative' }}>
              <UserProfile
                src={watch().urlImage || watch().filePath}
                sizes="large"
                sx={{ marginRight: `0 !important`, position: 'relative' }}
              />
              <UserProfileAddPhotoWrap
              // sx={{
              //   color: 'black',
              //   position: 'absolute',
              //   width: '25px',
              //   height: '25px',
              //   bottom: '5px',
              //   right: '5px',
              //   fontSize: '2rem',
              //   background: 'white',
              //   padding: '8px',
              //   boxSizing: 'content-box',
              //   borderRadius: '1.75rem',
              //   boxShadow: '1px 2px 4px 1px #666666',
              //   display: 'flex',
              //   alignItems: 'center',
              // }}
              >
                <AddAPhotoOutlinedIcon
                  sx={{ zIndex: 992, width: '100%', height: '100%' }}
                />
              </UserProfileAddPhotoWrap>
            </Box>
          </FileUploaderTrans>
        </Box>
        <TextField
          required
          fullWidth
          id="name"
          label="이름"
          name="name"
          value={user?.name || ''}
          disabled
        />
        <TextField
          required
          fullWidth
          id="id"
          label="아이디"
          name="id"
          value={user?.username || ''}
          disabled
        />
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
        <Link
          href="/find/pw"
          onClick={async e => {
            e.preventDefault();
          }}
        >
          <Button
            type="button"
            fullWidth
            variant="outlined"
            color="neutral"
            sx={{ mt: 3, mb: 2 }}
            onClick={async e => {
              e.preventDefault();
              const isConfirm = await dialog({
                title: '비밀번호 변경',
                description: '로그아웃됩니다. 계속 하시겠습니까?',
              });
              if (!isConfirm) return;
              await logout();
              await router.push('/find/pw');
            }}
          >
            비밀번호 변경
          </Button>
        </Link>

        {/* <LocationBox>
          <FormControl fullWidth>
            <InputLabel id="location">지역</InputLabel>
            <Select
              labelId="location"
              id="location"
              value={location || ''}
              onChange={e =>
                setLocation(e.target.value as userRegistrationType)
              }
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
            value={company || ''}
            error={companyErr}
            fullWidth
          />
          <FormHelperText sx={{ color: 'red' }}>
            {companyErr && '올바른 입력형식이 아닙니다'}
          </FormHelperText>
        </DivisionBox> */}

        <PhoneBox>
          <TextField
            label="휴대전화"
            value={phone || ''}
            onChange={handlePhoneChange}
            placeholder="'-'를 제외한 숫자만 입력해주세요."
            error={phoneErr}
            fullWidth
          />
          <FormHelperText sx={{ color: 'red' }}>
            {phoneErr && '유효한 휴대폰 형식이 아닙니다.'}
          </FormHelperText>
        </PhoneBox>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Checkbox
            name="smsYn"
            checked={smsChecked}
            onChange={(e, checked) => {
              setSmsChecked(checked);
            }}
          />
          <Typography
            variant="body2"
            onClick={() => {
              setSmsChecked(prev => !prev);
            }}
          >
            SMS 수신 여부
          </Typography>
        </Box>
        <EmailBox>
          <TextField
            label="이메일"
            value={email || ''}
            onChange={handleEmailChange}
            placeholder="이메일을 입력해주세요."
            error={emailErr}
            fullWidth
          />
          <FormHelperText sx={{ color: 'red' }}>
            {emailErr && '유효한 이메일 형식이 아닙니다.'}
          </FormHelperText>
        </EmailBox>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Checkbox
            name="emailYn"
            checked={emailChecked}
            onChange={(e, checked) => {
              setEmailChecked(checked);
            }}
          />
          <Typography
            variant="body2"
            onClick={() => {
              setEmailChecked(prev => !prev);
            }}
          >
            이메일 수신 여부
          </Typography>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{ mt: 1, mb: 2 }}
        >
          {loading ? <Spinner fit={true} /> : '수정하기'}
        </Button>

        <PasswordChangeModal
          open={openPromptDialog}
          onClose={() => setOpenPromptDialog(false)}
        />

        <Backdrop open={backdropLoading}>
          <Spinner />
        </Backdrop>
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

const UserProfileAddPhotoWrap = styled(Box)`
  color: black;
  position: absolute;
  width: 25px;
  height: 25px;
  bottom: 5px;
  right: 5px;
  font-size: 2rem;
  background: white;
  padding: 8px;
  box-sizing: content-box;
  border-radius: 1.75rem;
  box-shadow: 1px 2px 4px 1px #696969;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    bottom: 0px;
    right: 0px;
  }
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
