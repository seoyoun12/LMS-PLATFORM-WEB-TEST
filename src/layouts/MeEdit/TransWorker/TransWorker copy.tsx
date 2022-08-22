import { businessType, courseSubCategoryType } from '@common/api/courseClass';
import { getTransport, modifTransWorker, useMyUser } from '@common/api/user';
import { YN } from '@common/constant';
import styled from '@emotion/styled';
import { useDialog } from '@hooks/useDialog';
import { useInput } from '@hooks/useInput';
import { useSnackbar } from '@hooks/useSnackbar';
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
  Checkbox,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Props {
  type: 'transport' | 'lowfloorbus' | 'educator';
  locationList: { ko: string; en: string }[];
}
const phoneRegex = /[0-9]$/;
const phoneList = ['010', '032', '02', '031'];

export const userBusinessTypeOne = [
  { type: '여객', enType: 'PASSENGER' },
  { type: '화물', enType: 'FREIGHT' },
];
export const userBusinessTypeTwo = [
  {
    category: 'PASSENGER',
    type: '버스',
    enType: courseSubCategoryType.BUS,
    // isMoreInfo: true
  },
  {
    category: 'PASSENGER',
    type: '전세버스',
    enType: courseSubCategoryType.CHARTER_BUS,
  },
  {
    category: 'PASSENGER',
    type: '특수여객',
    enType: courseSubCategoryType.SPECIAL_PASSENGER,
  },
  {
    category: 'PASSENGER',
    type: '법인택시',
    enType: courseSubCategoryType.CORPORATE_TAXI,
  },
  {
    category: 'FREIGHT',
    type: '일반화물',
    enType: courseSubCategoryType.GENERAL_CARGO,
  },
  {
    category: 'PASSENGER',
    type: '개인택시',
    enType: courseSubCategoryType.PRIVATE_TAXI,
  },
  {
    category: 'FREIGHT',
    type: '개별화물',
    enType: courseSubCategoryType.INDIVIDUAL_CARGO,
  },
  {
    category: 'FREIGHT',
    type: '용달화물',
    enType: courseSubCategoryType.CONSIGNMENT,
  },
  {
    category: 'PASSENGER',
    type: '특별교통수단',
    enType: courseSubCategoryType.SPECIAL_TRANSPORTATION,
  },
  {
    category: 'PASSENGER',
    type: '저상버스',
    enType: courseSubCategoryType.KNEELING_BUS,
  },
  {
    category: 'FREIGHT',
    type: '위험물',
    enType: courseSubCategoryType.DANGEROUS_GOODS,
  },
  {
    category: 'FREIGHT',
    type: '지정폐기물',
    enType: courseSubCategoryType.DESIGNATED_WASTE,
  },
  {
    category: 'FREIGHT',
    type: '유해화학물질',
    enType: courseSubCategoryType.HAZARDOUS_CHEMICALS,
  },
  {
    category: 'FREIGHT',
    type: '고압가스(가연성)',
    enType: courseSubCategoryType.HIGH_PRESSURE_GAS_FLAMMABLE,
  },
  {
    category: 'FREIGHT',
    type: '고압가스(독성)',
    enType: courseSubCategoryType.HIGH_PRESSURE_GAS_TOXIC,
  },
];

export function TransWorker({ type, locationList }: Props) {
  const { user, error } = useMyUser();
  const [occupation1, setOccupation1, onChangeOcc1] = useInput();
  const [occupation2, setOccupation2, onChangeOcc2] = useInput();
  const [showCompany, setShowCompany] = useState(false);
  // const [companyOption, setCompanyOption, onCompanyOpt] = useInput(false);
  const [company, setCompany, onChangeComp] = useInput();
  const [vehicleNumber, setVehicleNumber, onChangeVehicleNum] = useInput();
  const [vehicleRegi, setVehicleRegi, onChangeVehicleRegi] = useInput();
  const [phone, setPhone, onChangePhone1] = useInput();
  const [phone2, setPhone2, onChangePhone2] = useInput();
  const [phone3, setPhone3, onChangePhone3] = useInput();
  const [smsChecked, setSmsChecked] = useState(false);
  const dialog = useDialog();
  const snackbar = useSnackbar();
  const router = useRouter();

  useEffect(() => {
    (async function () {
      const { data } = await getTransport();
      setVehicleNumber(data.carNumber);
      setCompany(data.company);
      setPhone(data.phone.slice(0, 3));
      setPhone2(data.phone.slice(3, 7));
      setPhone3(data.phone.slice(7, 11));
      setSmsChecked(data.smsYn === YN.YES ? true : false);
      setOccupation1(data.userBusinessTypeOne);
      setOccupation2(data.userBusinessTypeTwo);
      setVehicleRegi(data.userRegistrationType);
    })();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!phone || !phone2 || !phone3) return window.alert('올바른 휴대전화 번호를 입력하세요!');
    if (!company) return window.alert('올바른 회사명을 입력하세요!');
    if (!vehicleNumber) return window.alert('올바른 차량번호를 입력하세요!');
    if (!vehicleRegi) return window.alert('올바른 등록지를 입력하세요!');
    if (!occupation1) return window.alert('업종을 선택해주세요.');
    if (!occupation2) return window.alert('업종구분을 선택해주세요.');
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
      if (!user) return snackbar({ variant: 'error', message: '수정 실패하였습니다.' });
      const data = {
        carNumber: vehicleNumber, //차번호
        company: company, //회사
        name: user.name, //이름
        phone: phone + phone2 + phone3, //폰번
        smsYn: smsYn, // 동의여부
        userBusinessTypeOne: occupation1, //업종
        userBusinessTypeTwo: occupation2, // 구분
        userRegistrationType: vehicleRegi, //지역
      };

      await modifTransWorker(data);
      return router.push('/me');
    }
  };

  return (
    <TransAndLowFloorContainer
      sx={{
        marginBottom: 8,
        padding: '72px 30px 48px',
        minWidth: '375px',
      }}
      maxWidth="sm"
    >
      <Box display="flex" flexDirection={'column'} gap="1rem" component={'form'} onSubmit={handleSubmit}>
        <Box sx={{ margin: 'auto' }}>
          <UserProfile />
        </Box>
        <TableContainer>
          <TableBody sx={{ display: 'table', width: '100%' }}>
            <TableCustomRow>
              <TableLeftCell>이름</TableLeftCell>
              <TableRightCell>
                <TextField required fullWidth id="name" name="name" value={user?.name ? user.name : 'Error'} disabled />
              </TableRightCell>
            </TableCustomRow>
            <TableCustomRow>
              <TableLeftCell>업종</TableLeftCell>
              <TableRightCell>
                <FormControl fullWidth>
                  <Select
                    labelId="occ1-select-label"
                    id="occ1-select"
                    value={occupation1 || ''}
                    onChange={e => {
                      onChangeOcc1(e);
                      setShowCompany(false);
                    }}
                    required
                  >
                    {userBusinessTypeOne.map(occ => (
                      <MenuItem key={occ.enType} value={occ.enType}>
                        {occ.type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableRightCell>
            </TableCustomRow>
            <TableCustomRow>
              <TableLeftCell>업종구분</TableLeftCell>
              <TableRightCell>
                <FormControl fullWidth>
                  <Select labelId="occ2-select-label" id="occ2-select" value={occupation2 || ''} onChange={e => onChangeOcc2(e)} required>
                    {userBusinessTypeTwo
                      .filter(item => item.category === occupation1)
                      .map((item, index) => (
                        <MenuItem key={item.enType} value={item.enType}>
                          {item.type}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </TableRightCell>
            </TableCustomRow>
            <TableCustomRow>
              <TableLeftCell>회사명</TableLeftCell>
              <TableRightCell>
                <TextField required fullWidth id="company" name="company" value={company} onChange={onChangeComp} />
              </TableRightCell>
            </TableCustomRow>
            <TableCustomRow>
              <TableLeftCell>차량번호</TableLeftCell>
              <TableRightCell>
                <TextField
                  required
                  fullWidth
                  id="vehicle-number"
                  placeholder="예) 01가1234 또는 서울 01가1234"
                  name="car-number"
                  value={vehicleNumber}
                  onChange={onChangeVehicleNum}
                />
              </TableRightCell>
            </TableCustomRow>
            <TableCustomRow>
              <TableLeftCell>차량등록지</TableLeftCell>
              <TableRightCell>
                <Select
                  labelId="regi-select-label"
                  id="regi-select"
                  value={vehicleRegi || ''}
                  onChange={e => onChangeVehicleRegi(e)}
                  required
                  fullWidth
                >
                  {locationList.map(locate => (
                    <MenuItem key={locate.en} value={locate.en}>
                      {locate.ko}
                    </MenuItem>
                  ))}
                </Select>
              </TableRightCell>
            </TableCustomRow>
            <TableCustomRow>
              <TableLeftCell>휴대전화</TableLeftCell>
              <TableRightCell>
                <Box display={'flex'} alignItems="center" gap="1rem">
                  <FormControl sx={{ minWidth: '130px' }}>
                    <Select labelId="phone-type-label" id="phone-type" onChange={onChangePhone1} value={phone || ''}>
                      {phoneList.map(item => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  -
                  <TextField
                    onChange={e => {
                      if (e.target.value.length > 4) return;
                      if (!phoneRegex.test(e.target.value)) return;
                      onChangePhone2(e);
                    }}
                    value={phone2}
                  />
                  -
                  <TextField
                    onChange={e => {
                      if (e.target.value.length > 4) return;
                      if (!phoneRegex.test(e.target.value)) return;
                      onChangePhone3(e);
                    }}
                    value={phone3}
                  />
                </Box>
              </TableRightCell>
            </TableCustomRow>
            <TableCustomRow>
              <TableLeftCell></TableLeftCell>
              <TableRightCell></TableRightCell>
            </TableCustomRow>
          </TableBody>
        </TableContainer>

        <FormControl fullWidth>
          <Typography>업종</Typography>
          {/* <InputLabel id="occ1-select-label">업종</InputLabel> */}
          <Select
            labelId="occ1-select-label"
            id="occ1-select"
            value={occupation1 || ''}
            onChange={e => {
              onChangeOcc1(e);
              setShowCompany(false);
            }}
            required
          >
            {userBusinessTypeOne.map(occ => (
              <MenuItem key={occ.enType} value={occ.enType}>
                {occ.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Typography>업종구분</Typography>
          <Select labelId="occ2-select-label" id="occ2-select" value={occupation2 || ''} onChange={e => onChangeOcc2(e)} required>
            {
              // occupation1 === "PASSENGER"
              // ?
              userBusinessTypeTwo
                .filter(item => item.category === occupation1)
                .map((item, index) => (
                  <MenuItem
                    key={item.enType}
                    value={item.enType}
                    // onClick={() => (item.isMoreInfo ? setShowCompany(true) : setShowCompany(false))}
                  >
                    {item.type}
                  </MenuItem>
                ))
              //     :
              // occupationOptions2.filter((item)=>item.category === occ1).map((item)=>
              // <MenuItem value={item.enType} onClick={()=>item.isMoreInfo ? setShowCompany(true) : setShowCompany(false)} >{item.type}</MenuItem>
              // )
            }
            {/* {occupationOptions2.map(
                        (occ)=> <MenuItem 
                                    value={occ.type} 
                                    onClick={()=>{
                                        occ ? setShowCompany(true) : setShowCompany(false)

                                    }} 
                                >
                                {occ.type}
                                </MenuItem> 
                        )
                    } */}
          </Select>
        </FormControl>

        {/* {showCompany && <TextField required fullWidth id="company" label="회사명" name="company" value={company} onChange={onChangeComp} />} */}
        <Typography>회사명</Typography>
        <TextField required fullWidth id="company" name="company" value={company} onChange={onChangeComp} />
        <Typography>차량번호</Typography>
        <TextField
          required
          fullWidth
          id="vehicle-number"
          placeholder="예) 01가1234 또는 서울 01가1234"
          name="car-number"
          value={vehicleNumber}
          onChange={onChangeVehicleNum}
        />
        <FormControl fullWidth>
          <Typography>차량등록지</Typography>
          <Select labelId="regi-select-label" id="regi-select" value={vehicleRegi || ''} onChange={e => onChangeVehicleRegi(e)} required>
            {locationList.map(locate => (
              <MenuItem key={locate.en} value={locate.en}>
                {locate.ko}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography>휴대전화</Typography>
        <Box display={'flex'} alignItems="center" gap="1rem">
          <FormControl sx={{ minWidth: '130px' }}>
            <Select labelId="phone-type-label" id="phone-type" onChange={onChangePhone1} value={phone || ''}>
              {phoneList.map(item => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
          -
          <TextField
            onChange={e => {
              if (e.target.value.length > 4) return;
              if (!phoneRegex.test(e.target.value)) return;
              onChangePhone2(e);
            }}
            value={phone2}
          />
          -
          <TextField
            onChange={e => {
              if (e.target.value.length > 4) return;
              if (!phoneRegex.test(e.target.value)) return;
              onChangePhone3(e);
            }}
            value={phone3}
          />
        </Box>
        <Box display={'flex'} alignItems="center">
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
      </Box>
    </TransAndLowFloorContainer>
  );
}

const TransAndLowFloorContainer = styled(Container)`
  .front-box {
    background: #fff;
  }
`;
const CssTextField = styled(InputBase)({
  padding: '15.5px 14px',
});

const BoxForm = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UserProfile = styled(Avatar)`
  width: 100px;
  height: 100px;
  margin-right: 36px;
`;

const TableCustomRow = styled(TableRow)``;
const TableLeftCell = styled(TableCell)``;
const TableRightCell = styled(TableCell)``;
