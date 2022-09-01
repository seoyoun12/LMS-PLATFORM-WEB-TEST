import styled from '@emotion/styled';
import {
  Box,
  FormControl,
  Select,
  Typography,
  MenuItem,
  TextField,
  Button,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  Grid,
  SelectChangeEvent,
} from '@mui/material';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import React, { useState } from 'react';
import {
  userBusinessTypeOne,
  userBusinessTypeTwo,
} from '@layouts/MeEdit/TransWorker/TransWorker';
import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import {
  courseSubCategoryType,
  userBusinessType,
  UserTransSaveInputDataType,
} from '@common/api/courseClass';

interface Props {
  isIndividual: boolean;
  setIsIndividual: React.Dispatch<React.SetStateAction<boolean>>;
  register: UseFormRegister<UserTransSaveInputDataType>;
  watch: UseFormWatch<UserTransSaveInputDataType>;
  setValue: UseFormSetValue<UserTransSaveInputDataType>;
  setHideCarNumber: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CompanyInfo({ register, watch, setValue, setHideCarNumber }: Props) {
  // const [businessType, setBusinessType] = useState<string | null>(null);
  // const [businessSubType, setBusinessSubType] = useState<string | null>(null);
  // const [businessName, setBusinessName] = useState<string | null>(null);
  // const { businessName, businessType, businessSubType } = watch();
  const [disabledCompany, setDisabledCompany] = useState(false);

  const onChangeBusinessSubType = (e: SelectChangeEvent<unknown>) => {
    const {
      target: { value },
    } = e;

    if (
      courseSubCategoryType.BUS === value ||
      courseSubCategoryType.CHARTER_BUS === value
    ) {
      setValue('carNumber', null);
      setValue('businessName', '');
      setDisabledCompany(false);
      return setHideCarNumber(true);
    }
    if (
      courseSubCategoryType.PRIVATE_TAXI === value ||
      courseSubCategoryType.CONSIGNMENT === value ||
      courseSubCategoryType.INDIVIDUAL_CARGO === value
    ) {
      setDisabledCompany(true);
      setValue(
        'businessName',
        userBusinessTypeTwo.filter(item => item.enType === value)[0].type
      );
      return setValue('businessSubType', value);
    }
    setDisabledCompany(false);
    setHideCarNumber(false);
    setValue('businessName', '');
    setValue('businessSubType', value as courseSubCategoryType);
  };

  const onReturnValueBusinessName = () => {
    if (
      courseSubCategoryType.PRIVATE_TAXI === watch().businessSubType ||
      courseSubCategoryType.GENERAL_CARGO === watch().businessSubType ||
      courseSubCategoryType.INDIVIDUAL_CARGO === watch().businessSubType
    ) {
      return userBusinessTypeTwo.filter(
        item => item.enType === watch().businessSubType
      )[0].type;
    } else {
      return watch().businessName;
    }
  };

  // const onChangeCompanyName = (e: any) => {
  //   setValue('businessName', e.target.value);
  // };

  return (
    <CompanyInfoWrap>
      <Box>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center">
          {/* <HorizontalRuleRoundedIcon sx={{ transform: 'scale(1,2)', color: '#3498db' }} /> */}
          <span>업체정보</span>
        </Typography>
      </Box>
      {/* <Box>
        <Typography mb={1}>운수구분</Typography>
        <FormControl fullWidth>
          <Select labelId="businessType" id="businessType" {...register('businessType')}>
            {userBusinessTypeOne.map(item => (
              <MenuItem key={item.enType} value={item.enType}>
                {item.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box> */}
      <TableContainer>
        <Table sx={{ borderTop: '3px solid #000' }}>
          <TableCustomRow>
            <TableLeftCell>운수구분</TableLeftCell>
            <TableRightCell>
              <FormControl fullWidth>
                <Select
                  labelId="businessType"
                  id="businessType"
                  {...register('businessType')}
                  onChange={e => {
                    setValue('businessType', e.target.value as userBusinessType);
                    setValue('businessSubType', null);
                    setValue('businessName', null);
                  }}
                >
                  {userBusinessTypeOne.map(item => (
                    <MenuItem key={item.enType} value={item.enType}>
                      {item.type}
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
                <Select
                  labelId="businessSubType"
                  id="businessSubType"
                  placeholder="업종 유형선택"
                  {...register('businessSubType')}
                  onChange={onChangeBusinessSubType}
                >
                  {userBusinessTypeTwo
                    .filter(filter => filter.category === watch().businessType)
                    .map(item => (
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
              <TextField
                placeholder="회사명 또는 차량등록지역"
                {...register('businessName')}
                // value={onReturnValueBusinessName()}
                value={watch().businessName}
                disabled={disabledCompany}
                fullWidth
              />
            </TableRightCell>
          </TableCustomRow>
        </Table>
      </TableContainer>

      {/* <SummaryGrid container columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} mt={4} mb={4}> */}
      <Box display="flex" width="fit-content" margin="auto" mt={4} mb={4}>
        <Box>※</Box>
        <Box display="flex" flexDirection="column" ml={1}>
          <Typography>
            자동차등록증 상의 회사명(상호)를 반드시 국문으로 입력하시기 바랍니다.
          </Typography>
          <ExampleMessege>예시 {'>'} ss물류 → 에스에스물류</ExampleMessege>
        </Box>
      </Box>
      {/* <Box display="flex" flexGrow={1}>
          <Box>※</Box>
          <Box display="flex" flexDirection="column" ml={1}>
            <Typography>회사명이 없을 경우 차량등록지역을 입력해 주십시오.</Typography>
            <ExampleMessege>예시 {'>'} 공주시</ExampleMessege>
          </Box>
        </Box> */}
      {/* </SummaryGrid> */}
    </CompanyInfoWrap>
  );
}

const CompanyInfoWrap = styled(Box)`
  margin-top: 5rem;
`;

const ExampleMessege = styled(Typography)`
  color: red;
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
  text-align: center;
  font-weight: 700;
  width: 20%;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    border-bottom: none;
    width: 100%;
    text-align: start;
    padding: 12px 0;
    padding-bottom: 2px;
  }
`;
const TableRightCell = styled(TableCell)`
  flex-grow: 1;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    padding: 12px 0;
    padding-top: 2px;
  }
`;

const SummaryGrid = styled(Grid)``;
