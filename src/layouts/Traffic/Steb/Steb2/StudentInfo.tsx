import styled from '@emotion/styled';
import { Box, Checkbox, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import { useEffect, useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { locationList } from '@layouts/MeEdit/MeEdit';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { RegisterType, UserTransSaveInputDataType } from '@common/api/courseClass';
import { YN } from '@common/constant';
import { useMyUser, UserRole } from '@common/api/user';

interface Props {
  register: UseFormRegister<UserTransSaveInputDataType>;
  setValue: UseFormSetValue<UserTransSaveInputDataType>;
  registerType: RegisterType;
  setRegisterType: React.Dispatch<React.SetStateAction<RegisterType>>;
}

export function StudentInfo({ register, setValue, registerType, setRegisterType }: Props) {
  const [name, setName] = useState<string>(); //이름
  const [firstIdentityNumber, setFirstIdentityNumber] = useState<string>(); //주민앞
  const [secondIdentityNumber, setSecondidentityNumber] = useState<string>(); //주민뒷
  const [carNumber, setCarNumber] = useState<string | null>(null); //차량번호
  const [carRegisteredRegion, setCarRegisteredRegion] = useState<string | null>(null); //차량등록지
  const [smsYn, setSmsYn] = useState(false);
  const [isIndividualCheck, setIsIndividualCheck] = useState(false);
  const { user, error } = useMyUser();

  useEffect(() => {
    if (user && registerType === RegisterType.TYPE_INDIVIDUAL) {
      console.log(user);
      const first = user.identityNumber.slice(0, 6);
      const second = user.identityNumber.slice(6, 14);
      setValue('name', user.name);
      setValue('firstIdentityNumber', first);
      setFirstIdentityNumber(first);
      setValue('secondIdentityNumber', second);
      setSecondidentityNumber(second);
    }
    if (user && registerType === RegisterType.TYPE_ORGANIZATION) {
      const first = user.identityNumber.slice(0, 6);
      const second = user.identityNumber.slice(6, 14);
      setValue('name', user.name);
      setValue('firstIdentityNumber', first);
      setFirstIdentityNumber(first);
      setValue('secondIdentityNumber', second);
      setSecondidentityNumber(second);
      if (!user.roles.filter(role => role === UserRole.ROLE_TRANS_MANAGER)[0]) {
        window.alert('권한이 없는 유저입니다.');
        setRegisterType(RegisterType.TYPE_INDIVIDUAL);
      } else {
        console.log('userRoles', user.roles.filter(role => role === UserRole.ROLE_TRANS_MANAGER)[0]);
      }
    }
  }, [user, registerType]);

  return (
    <StudentInfoWrap>
      <Box>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center">
          <HorizontalRuleRoundedIcon sx={{ transform: 'scale(1,2)', color: '#3498db' }} />
          <span>교육신청자 정보</span>
        </Typography>
      </Box>
      <Typography>이름</Typography>
      <TextField disabled={registerType === RegisterType.TYPE_INDIVIDUAL && true} value={name} {...register('name')} fullWidth />
      <Box>
        <Typography>주민등록번호</Typography>
        <Box display="flex" alignItems="center">
          <TextField
            disabled={registerType === RegisterType.TYPE_INDIVIDUAL && true}
            value={firstIdentityNumber}
            onChange={e => {
              if (e.target.value.length > 6) return;
              setFirstIdentityNumber(e.target.value.replace(/[^0-9]/g, ''));
              setValue('firstIdentityNumber', e.target.value.replace(/[^0-9]/g, ''));
            }}
            fullWidth
          />
          <span>-</span>
          <TextField
            disabled={registerType === RegisterType.TYPE_INDIVIDUAL && true}
            type="password"
            value={secondIdentityNumber}
            onChange={e => {
              if (e.target.value.length > 7) return;
              setSecondidentityNumber(e.target.value.replace(/[^0-9]/g, ''));
              setValue('secondIdentityNumber', e.target.value.replace(/[^0-9]/g, ''));
            }}
            fullWidth
          />
        </Box>
      </Box>
      <Typography>차량 번호</Typography>
      <TextField {...register('carNumber')} fullWidth />
      <Box>
        <Typography>차량 등록지</Typography>
        <FormControl fullWidth>
          <Select {...register('carRegisteredRegion')}>
            {locationList.map(item => (
              <MenuItem key={item.en} value={item.en}>
                {item.ko}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Typography>휴대전화</Typography>
      <TextField
        placeholder="'-'를 제외한 숫자만 입력해주세요."
        {...register('phone', { maxLength: { value: 12, message: 'phone must be longer than 12 characters' } })}
        // onChange={e => {
        //   console.log(e.target.value.length);
        //   if (e.target.value.length > 11) return
        //   setValue('phone', e.target.value);
        // }}
        fullWidth
      />
      <Checkbox
        value={smsYn}
        onChange={(e, checked) => {
          setSmsYn(checked);
          if (checked) {
            setValue('smsYn', YN.YES);
            setValue('smsYn', YN.YES);
          }
          if (!checked) {
            setValue('smsYn', YN.NO);
            setValue('smsYn', YN.NO);
          }
        }}
      />
      <Typography component="span">SMS문자 수신 동의</Typography>
      <Typography>※ 교육접수 완료 시 예약완료 문자가 발송됩니다.</Typography>
      <Typography>※ 신청인 본인의 휴대폰 번호를 입력하셔야 합니다.</Typography>
      <AccentedWord>※ 교육접수 완료 시 예약완료 문자가 발송됩니다.</AccentedWord>
      <Box height="120px">이용약관 입니다.</Box>
      <Box display="flex" alignItems="center">
        {isIndividualCheck ? (
          <CheckCircleIcon onClick={() => setIsIndividualCheck(false)} sx={{ color: '#3498db' }} />
        ) : (
          <CheckCircleOutlineIcon onClick={() => setIsIndividualCheck(true)} sx={{ color: '#b1b1b1' }} />
        )}
        <Typography ml={1}>개인정보 수집 및 이용 동의</Typography>
        <EssentialWord>(필수)</EssentialWord>
      </Box>
    </StudentInfoWrap>
  );
}

const StudentInfoWrap = styled(Box)``;
const AccentedWord = styled(Typography)`
  color: red;
`;
const EssentialWord = styled(Typography)`
  color: rgb(39, 174, 96);
`;
