import { BbsType, deleteFile, uploadFile } from '@common/api/adm/file';
import { UserTransportUpdateResponseDto } from '@common/api/Api';
import { businessType, courseSubCategoryType } from '@common/api/courseClass';
import { getTransport, modifTransWorker, useMyUser } from '@common/api/user';
import { YN } from '@common/constant';
import { Spinner } from '@components/ui';
import { FileUploaderTrans } from '@components/ui/FileUploader';
import { IOSSwitch } from '@components/ui/Switch';
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
  SwitchProps,
  Backdrop,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import BackgroundImage from 'public/assets/svgs/service_background.svg';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import { Phone4Regex } from '@utils/inputRegexes';

interface Props {
  type: 'transport' | 'lowfloorbus' | 'educator';
  locationList: { ko: string; en: string }[];
}
const phoneList = [
  '010',
  '011',
  // , '012', '013', '014', '015', '016', '017', '018', '019'
];

export const userBusinessTypeOne = [
  { type: '여객', enType: 'PASSENGER' },
  { type: '화물', enType: 'FREIGHT' },
];
export const userBusinessTypeTwo = [
  {
    category: 'PASSENGER',
    TYPE_BUSINESS: 'TYPE_PASSENGER',
    type: '버스',
    enType: courseSubCategoryType.BUS,
    // isMoreInfo: true
  },
  {
    category: 'PASSENGER',
    TYPE_BUSINESS: 'TYPE_PASSENGER',
    type: '전세버스',
    enType: courseSubCategoryType.CHARTER_BUS,
  },
  {
    category: 'PASSENGER',
    TYPE_BUSINESS: 'TYPE_PASSENGER',
    type: '특수여객',
    enType: courseSubCategoryType.SPECIAL_PASSENGER,
  },
  {
    category: 'PASSENGER',
    TYPE_BUSINESS: 'TYPE_PASSENGER',
    type: '법인택시',
    enType: courseSubCategoryType.CORPORATE_TAXI,
  },
  {
    category: 'FREIGHT',
    TYPE_BUSINESS: 'TYPE_CARGO',
    type: '일반화물',
    enType: courseSubCategoryType.GENERAL_CARGO,
  },
  {
    category: 'PASSENGER',
    TYPE_BUSINESS: 'TYPE_PASSENGER',
    type: '개인택시',
    enType: courseSubCategoryType.PRIVATE_TAXI,
  },
  {
    category: 'FREIGHT',
    TYPE_BUSINESS: 'TYPE_CARGO',
    type: '용달화물',
    enType: courseSubCategoryType.CONSIGNMENT,
  },
  {
    category: 'FREIGHT',
    TYPE_BUSINESS: 'TYPE_CARGO',
    type: '개별화물',
    enType: courseSubCategoryType.INDIVIDUAL_CARGO,
  },
  // {
  //   category: 'PASSENGER',
  //   type: '특별교통수단',
  //   enType: courseSubCategoryType.SPECIAL_TRANSPORTATION,
  // },
  // {
  //   category: 'PASSENGER',
  //   type: '저상버스',
  //   enType: courseSubCategoryType.KNEELING_BUS,
  // },
  // {
  //   category: 'FREIGHT',
  //   type: '위험물',
  //   enType: courseSubCategoryType.DANGEROUS_GOODS,
  // },
  // {
  //   category: 'FREIGHT',
  //   type: '지정폐기물',
  //   enType: courseSubCategoryType.DESIGNATED_WASTE,
  // },
  // {
  //   category: 'FREIGHT',
  //   type: '유해화학물질',
  //   enType: courseSubCategoryType.HAZARDOUS_CHEMICALS,
  // },
  // {
  //   category: 'FREIGHT',
  //   type: '고압가스(가연성)',
  //   enType: courseSubCategoryType.HIGH_PRESSURE_GAS_FLAMMABLE,
  // },
  // {
  //   category: 'FREIGHT',
  //   type: '고압가스(독성)',
  //   enType: courseSubCategoryType.HIGH_PRESSURE_GAS_TOXIC,
  // },
];

interface FormType {
  files: File[];
  fileSeq: number;
  filePath: string;
  urlImage: string;
}
const defaultValues = {
  files: [],
};

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
  const [fileName, setFileName] = useState<string | null>(null);
  const { register, reset, resetField, setValue, watch } = useForm<FormType>({
    defaultValues,
  });
  const dialog = useDialog();
  const snackbar = useSnackbar();
  const router = useRouter();
  const [backdropLoading, setBackdropLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  //  /[^0-9]/g 은 문자넣으면 true
  //  /[0-9]/g 은 문자넣으면 false
  const isStringInPhone = (phoneNum: string) => /[0-9]/g.test(phoneNum);

  useEffect(() => {
    (async function () {
      try {
        setBackdropLoading(true);
        const { data } = await getTransport();
        if (data.s3Files.length > 0) {
          setValue('fileSeq', data.s3Files[0].seq);
          setValue('filePath', data.s3Files[0].path);
        }
        setVehicleNumber(data.carNumber);
        setCompany(data.company);
        setPhone(isStringInPhone(data.phone) ? data.phone.slice(0, 3) : '');
        setPhone2(isStringInPhone(data.phone) ? data.phone.slice(3, 7) : '');
        setPhone3(isStringInPhone(data.phone) ? data.phone.slice(7, 11) : '');
        setSmsChecked(data.smsYn === YN.YES ? true : false);
        setOccupation1(data.userBusinessTypeOne);
        setOccupation2(data.userBusinessTypeTwo);
        setVehicleRegi(data.userRegistrationType);
        setBackdropLoading(false);
      } catch (e: any) {
        snackbar({ variant: 'error', message: e.data.message });
        setBackdropLoading(false);
      }
    })();

    return () => {
      URL.revokeObjectURL(watch().urlImage);
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!phone || !phone2 || !phone3)
      return window.alert('올바른 휴대전화 번호를 입력하세요!');
    // if (!company) return window.alert('올바른 회사명을 입력하세요!');
    // if (!vehicleNumber) return window.alert('올바른 차량번호를 입력하세요!');
    // if (!vehicleRegi) return window.alert('올바른 등록지를 입력하세요!');
    // if (!occupation1) return window.alert('업종을 선택해주세요.');
    // if (!occupation2) return window.alert('업종구분을 선택해주세요.');
    const dialogConfirmed = await dialog({
      title: '회원 정보 수정',
      description: '회원 정보를 수정하시겠습니까?',
      confirmText: '수정하기',
      cancelText: '취소하기',
    });
    setLoading(true);
    await handleOnCloseConfirm(dialogConfirmed);
    setLoading(false);
  };

  const handleOnCloseConfirm = async (isConfirm: boolean) => {
    if (isConfirm) {
      const smsYn = smsChecked ? YN.YES : YN.NO;
      if (!user) return snackbar({ variant: 'error', message: '수정 실패하였습니다.' });
      const postData = {
        carNumber: '', //차번호
        company: '', //회사
        name: user.name, //이름
        phone: phone + phone2 + phone3, //폰번
        smsYn: smsYn, // 동의여부
        userBusinessTypeOne: null, //업종
        userBusinessTypeTwo: null, // 구분
        userRegistrationType: null, //지역
      };

      try {
        const { data }: { data: UserTransportUpdateResponseDto } = await modifTransWorker(
          postData
        );
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

  const handleFileChange = async (e: ChangeEvent) => {
    e.preventDefault();

    setBackdropLoading(true);
    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return null;
    setValue('urlImage', URL.createObjectURL(files[0]));
    setFileName(files[0].name);
    setTimeout(() => setBackdropLoading(false), 200);
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

  const Placeholder = ({ children }) => {
    return <Box color="#bababa">{children}</Box>;
  };

  return (
    <>
      <EditHeaderContainer>
        <EditHeaderTitle>정보수정</EditHeaderTitle>
        <EditHeaderSubtitle>나의 정보를 수정합니다.</EditHeaderSubtitle>
        <BackgroundImage />
      </EditHeaderContainer>
      <TransAndLowFloorContainer>
        <Box
          display="flex"
          flexDirection={'column'}
          gap="1rem"
          component={'form'}
          mt={10}
          onSubmit={handleSubmit}
        >
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
          <TableCustomContainer sx={{ marginTop: '32px' }}>
            <TableCustomBody sx={{ display: 'table', width: '100%' }}>
              <TableCustomRow>
                <TableLeftCell>이름</TableLeftCell>
                <TableRightCell>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    name="name"
                    value={user?.name ? user.name : 'Error'}
                    disabled
                  />
                </TableRightCell>
              </TableCustomRow>
              {/* <TableCustomRow>
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
              </TableCustomRow> */}
              <TableCustomRow>
                <TableLeftCell>휴대전화</TableLeftCell>
                <TableRightCell>
                  <FormControl fullWidth>
                    <Select
                      labelId="phone-type-label"
                      id="phone-type"
                      onChange={onChangePhone1}
                      displayEmpty
                      renderValue={
                        phone === '' ? () => <Placeholder>지역명</Placeholder> : undefined
                      }
                      value={phone || ''}
                    >
                      {phoneList.map(item => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  -
                  <TextField
                    onChange={e => {
                      // if (e.target.value.length > 4) return;
                      // if (!phoneRegex.test(e.target.value)) return;

                      // console.log(Phone4Regex.test(e.target.value), e.target.value);
                      if (Phone4Regex.test(e.target.value)) {
                        return;
                      }
                      setPhone2(e.target.value.replace(/[^0-9]/g, ''));
                    }}
                    value={phone2}
                    placeholder="4자리 입력"
                    inputProps={{ inputMode: 'numeric' }}
                    fullWidth
                  />
                  -
                  <TextField
                    onChange={e => {
                      // if (e.target.value.length > 4) return;
                      // if (!phoneRegex.test(e.target.value)) return;
                      if (Phone4Regex.test(e.target.value)) {
                        return;
                      }
                      setPhone3(e.target.value.replace(/[^0-9]/g, ''));
                    }}
                    value={phone3}
                    placeholder="4자리 입력"
                    inputProps={{ inputMode: 'numeric' }}
                    fullWidth
                  />
                </TableRightCell>
              </TableCustomRow>
            </TableCustomBody>
          </TableCustomContainer>

          <CheckBoxWrap>
            <IOSSwitch
              name="smsYn"
              checked={smsChecked}
              onChange={(e, checked) => {
                setSmsChecked(checked);
              }}
            />
            <Typography variant="body2">SMS 수신 여부</Typography>
          </CheckBoxWrap>
          <SubmitButton type="submit" fullWidth variant="contained" disabled={loading}>
            {loading ? <Spinner fit={true} /> : '수정하기'}
          </SubmitButton>
        </Box>
        <Backdrop open={backdropLoading}>
          <Spinner />
        </Backdrop>
      </TransAndLowFloorContainer>
    </>
  );
}

const TransAndLowFloorContainer = styled(Box)`
  max-width: 1200px;
  margin: auto;
  margin-bottom: 128px;

  .front-box {
    background: #fff;
  }
`;

const EditHeaderContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 262px;
  position: relative;
  overflow: hidden;

  > svg {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    z-index: -1;
  }
`;

const EditHeaderTitle = styled(Typography)`
  font-size: 48px;
  font-weight: 500;
  color: #fff;
`;

const EditHeaderSubtitle = styled(Typography)`
  font-size: 17px;
  font-weight: 500;
  color: #fff;
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
  width: 150px;
  height: 150px;
  margin-right: 36px;
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
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

const TableCustomContainer = styled(TableContainer)`
  padding: 0 12px 0 12px;
`;
const TableCustomBody = styled(TableBody)`
  border-top: 3px solid #000;
`;

const TableCustomRow = styled(TableRow)`
  display: flex;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
const TableLeftCell = styled(TableCell)`
  font-size: 20px;
  font-weight: 700;
  width: 20%;
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    width: 100%;
    border-bottom: 0;
  }
`;
const TableRightCell = styled(TableCell)`
  width: 80%;
  display: flex;
  align-items: center;
  gap: 4px;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const CheckBoxWrap = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px 0 12px;
`;

const SubmitButton = styled(Button)`
  margin-top: 12px;
  margin-bottom: 8px;
  max-width: 650px;
  margin: auto;
  @media (max-width: 650px) {
    max-width: calc(100vw - 72px);
  }
`;
