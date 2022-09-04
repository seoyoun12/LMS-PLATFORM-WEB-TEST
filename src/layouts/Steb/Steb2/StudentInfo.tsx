import styled from '@emotion/styled';
import {
  Box,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import { useEffect, useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { locationList } from '@layouts/MeEdit/MeEdit';
import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import {
  courseSubCategoryType,
  RegisterType,
  UserTransSaveInputDataType,
} from '@common/api/courseClass';
import { YN } from '@common/constant';
import { useMyUser, UserRole } from '@common/api/user';
import { Phone3Regex, Phone4Regex } from '@utils/inputRegexes';
import { CarNumberBox } from '@components/ui/Step';
import { userBusinessTypeTwo } from '@layouts/MeEdit/TransWorker/TransWorker';

const phoneList = ['010', '011'];
interface Props {
  register: UseFormRegister<UserTransSaveInputDataType>;
  setValue: UseFormSetValue<UserTransSaveInputDataType>;
  registerType: RegisterType;
  setRegisterType: React.Dispatch<React.SetStateAction<RegisterType>>;
  watch: UseFormWatch<UserTransSaveInputDataType>;
  hideCarNumber: boolean;
}

export function StudentInfo({
  register,
  setValue,
  registerType,
  setRegisterType,
  watch,
  hideCarNumber,
}: Props) {
  const [name, setName] = useState<string>(); //이름
  const [firstIdentityNumber, setFirstIdentityNumber] = useState<string>(); //주민앞
  const [secondIdentityNumber, setSecondidentityNumber] = useState<string>(); //주민뒷
  const [carNumber, setCarNumber] = useState<string | null>(null); //차량번호
  const [carRegisteredRegion, setCarRegisteredRegion] = useState<string | null>(null); //차량등록지
  const [smsYn, setSmsYn] = useState(true);
  const { user, error } = useMyUser();
  console.log(user, 'user');

  useEffect(() => {
    if (user && registerType === RegisterType.TYPE_INDIVIDUAL) {
      //if your admin or safety user that not have identity number
      if (!user?.identityNumber) return;
      const first = user.identityNumber.slice(0, 6);
      const second = user.identityNumber.slice(6, 14);
      setValue('name', user.name);
      setValue('firstIdentityNumber', first);
      setFirstIdentityNumber(first);
      setValue('secondIdentityNumber', second);
      setSecondidentityNumber(second);
      if (user?.phone) {
        setValue('firstPhone', user.phone.slice(0, 3));
        setValue('secondPhone', user.phone.slice(3, 7));
        setValue('thirdPhone', user.phone.slice(7, 11));
      }
    }
    if (user && registerType === RegisterType.TYPE_ORGANIZATION) {
      // const first = user.identityNumber.slice(0, 6);
      // const second = user.identityNumber.slice(6, 14);
      // setValue('name', user.name);
      // setValue('firstIdentityNumber', first);
      // setFirstIdentityNumber(first);
      // setValue('secondIdentityNumber', second);
      // setSecondidentityNumber(second);
      if (!user.roles.filter(role => role === UserRole.ROLE_TRANS_MANAGER)[0]) {
        window.alert('권한이 없는 유저입니다.');
        setRegisterType(RegisterType.TYPE_INDIVIDUAL);
      } else {
      }
    }
  }, [user, registerType]);

  return (
    <StudentInfoWrap>
      <Box>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center">
          {/* <HorizontalRuleRoundedIcon sx={{ transform: 'scale(1,2)', color: '#3498db' }} /> */}
          <span>교육신청자 정보</span>
        </Typography>
      </Box>

      <TableContainer>
        <Table sx={{ borderTop: '3px solid #000' }}>
          <TableCustomRow>
            <TableLeftCell>이름</TableLeftCell>
            <TableRightCell>
              <TextField
                disabled={registerType === RegisterType.TYPE_INDIVIDUAL && true}
                value={name}
                {...register('name')}
                fullWidth
              />
            </TableRightCell>
          </TableCustomRow>
          <TableCustomRow>
            <TableLeftCell>주민등록번호</TableLeftCell>
            <TableRightCell>
              <InputsBox>
                <TextField
                  disabled={registerType === RegisterType.TYPE_INDIVIDUAL && true}
                  value={firstIdentityNumber}
                  onChange={e => {
                    if (e.target.value.length > 6) return;
                    setFirstIdentityNumber(e.target.value.replace(/[^0-9]/g, ''));
                    setValue(
                      'firstIdentityNumber',
                      e.target.value.replace(/[^0-9]/g, '')
                    );
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
                    setValue(
                      'secondIdentityNumber',
                      e.target.value.replace(/[^0-9]/g, '')
                    );
                  }}
                  fullWidth
                />
              </InputsBox>
            </TableRightCell>
          </TableCustomRow>
          {hideCarNumber === false && (
            <TableCustomRow>
              <TableLeftCell>차량 번호</TableLeftCell>
              <TableRightCell>
                <CarNumberBox parantSetValue={setValue} />
                {/* <TextField {...register('carNumber')} fullWidth /> */}
              </TableRightCell>
            </TableCustomRow>
          )}
          <TableCustomRow>
            <TableLeftCell>차량 등록지</TableLeftCell>
            <TableRightCell>
              <FormControl fullWidth>
                <Select
                  {...register('carRegisteredRegion', {
                    required: true,
                  })}
                >
                  {locationList.map(item => (
                    <MenuItem key={item.en} value={item.en}>
                      {item.ko}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableRightCell>
          </TableCustomRow>
          <TableCustomRow>
            <TableLeftCell>휴대 전화</TableLeftCell>
            <TableRightCell>
              <InputsBox>
                <FormControl sx={{ minWidth: '130px' }}>
                  <Select
                    labelId="phone-type-label"
                    id="phone-type"
                    {...register('firstPhone')}
                    onChange={e => {
                      setValue('firstPhone', e.target.value);
                    }}
                    value={watch().firstPhone || ''}
                  >
                    {phoneList.map(item => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <TextField
                  // placeholder="'-'를 제외한 숫자만 11자리 입력해주세요."
                  // {...register('phone', { maxLength: { value: 12, message: 'phone must be longer than 12 characters' } })}
                  {...register('firstPhone')}
                  onChange={e => {
                    if (!Phone3Regex.test(e.target.value) || e.target.value.length > 3) {
                      return;
                    }
                    setValue('firstPhone', e.target.value);
                  }}
                  value={watch().firstPhone}
                  fullWidth
                /> */}
                -
                <TextField
                  // {...register('secondPhone')}
                  value={watch().secondPhone}
                  onChange={e => {
                    if (Phone4Regex.test(e.target.value)) {
                      return;
                    }
                    setValue('secondPhone', e.target.value.replace(/[^0-9]/g, ''));
                  }}
                  fullWidth
                />
                -
                <TextField
                  {...register('thirdPhone')}
                  onChange={e => {
                    if (Phone4Regex.test(e.target.value)) {
                      return;
                    }
                    setValue('thirdPhone', e.target.value.replace(/[^0-9]/g, ''));
                  }}
                  value={watch().thirdPhone}
                  fullWidth
                />
              </InputsBox>
            </TableRightCell>
          </TableCustomRow>
        </Table>
      </TableContainer>
      <Box display="flex" alignItems="center">
        <Checkbox
          checked={smsYn}
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
        <Typography
          component="span"
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            setSmsYn(prev => {
              setValue('smsYn', !prev ? YN.YES : YN.NO);
              return !prev;
            });
          }}
        >
          SMS문자 수신 동의
        </Typography>
      </Box>
      <Typography>※ 교육접수 완료 시 예약완료 문자가 발송됩니다.</Typography>
      <Typography>※ 신청인 본인의 휴대폰 번호를 입력하셔야 합니다.</Typography>
      <AccentedWord>
        ※ 휴대혼번호 입력후 SMS 동의시 교육관련 문자메시지를 받으실 수 있습니다.
      </AccentedWord>
      {/* <Box height="120px">이용약관 입니다.</Box> */}
      {/* <Box display="flex" alignItems="center">
        {isIndividualCheck ? (
          <CheckCircleIcon onClick={() => setIsIndividualCheck(false)} sx={{ color: '#3498db' }} />
        ) : (
          <CheckCircleOutlineIcon onClick={() => setIsIndividualCheck(true)} sx={{ color: '#b1b1b1' }} />
        )}
        <Typography ml={1}>개인정보 수집 및 이용 동의합니다</Typography>
        <EssentialWord>(필수)</EssentialWord>
      </Box> */}
    </StudentInfoWrap>
  );
}

const StudentInfoWrap = styled(Box)`
  margin-top: 5rem;
`;
const AccentedWord = styled(Typography)`
  color: red;
`;
const EssentialWord = styled(Typography)`
  color: rgb(39, 174, 96);
`;

const TableCustomRow = styled(TableRow)`
  border-bottom: 1px solid #d2d2d2;
  width: 100%;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const TableLeftCell = styled(TableCell)`
  /* background: #e1e1e1; */
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  width: 20%;

  @media (max-width: 768px) {
    border-bottom: none;
    width: 100%;
    padding: 12px 0;
    padding-bottom: 2px;
  }
`;
const TableRightCell = styled(TableCell)`
  width: 80%;

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 0;
    padding-top: 2px;
  }
`;

const InputsBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
