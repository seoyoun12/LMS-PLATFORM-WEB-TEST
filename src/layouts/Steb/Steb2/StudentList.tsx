import { courseUserOrganCancel, RegisterType } from '@common/api/courseClass';
import { courseClassEnrollList } from '@common/recoil';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  Container,
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { useRecoilState } from 'recoil';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import { Table } from '@components/ui';
import { locationList } from '@layouts/MeEdit/MeEdit';
import { useSnackbar } from '@hooks/useSnackbar';

const test = [
  {
    seq: 1,
    businessName: '좋은회사입니다',
    businessSubType: 'BUS',
    businessType: 'PASSENGER',
    carNumber: '12가1234',
    carRegisteredRegion: 'GONGJU',
    courseClassSeq: 123123,
    firstIdentityNumber: 312312,
    secondIdentityNumber: 1313132,
    name: 'Hi There',
    phone: '123123123',
    registerType: 'TYPE_ORGANIZATION',
    smsYn: 'Y',
  },
  {
    seq: 1,
    businessName: '좋은회22사입니다',
    businessSubType: 'BUS',
    businessType: 'PASSENGER',
    carNumber: '12가1234',
    carRegisteredRegion: 'GONGJU',
    courseClassSeq: 123123,
    firstIdentityNumber: 312312,
    secondIdentityNumber: 1313132,
    name: 'Hi There',
    phone: '123123123',
    registerType: 'TYPE_ORGANIZATION',
    smsYn: 'Y',
  },
  {
    seq: 1,
    businessName: '좋은회2233사입니다',
    businessSubType: 'BUS',
    businessType: 'PASSENGER',
    carNumber: '12가1234',
    carRegisteredRegion: 'GONGJU',
    courseClassSeq: 123123,
    firstIdentityNumber: 312312,
    secondIdentityNumber: 1313132,
    name: 'Hi There',
    phone: '123123123',
    registerType: 'TYPE_ORGANIZATION',
    smsYn: 'Y',
  },
];

interface Props {
  registerType: RegisterType;
  setRegisterType: React.Dispatch<React.SetStateAction<RegisterType>>;
}
export function StudentList({ registerType, setRegisterType }: Props) {
  const [organization, setOrganization] = useRecoilState(courseClassEnrollList);
  const snackbar = useSnackbar();

  const onClickDelete = async (seq: number, test: any) => {
    try {
      await courseUserOrganCancel(seq);
      setOrganization(prev => prev.filter(item => item.seq !== seq));
    } catch (e: any) {
      snackbar({ variant: 'error', message: e });
    }
  };

  return (
    <StudentListWrap>
      <Box borderBottom="3px solid #000" mb={4}>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center">
          <span>신청구분</span>
        </Typography>
      </Box>
      <ReservationType>
        <Button
          sx={{
            color: registerType === RegisterType.TYPE_INDIVIDUAL ? 'white' : '#888888',
            background:
              registerType === RegisterType.TYPE_INDIVIDUAL ? '#256aef' : '#f1f1f1',
            '&.MuiButtonBase-root:hover': {
              bgcolor:
                registerType === RegisterType.TYPE_INDIVIDUAL ? '#568dfa' : '#dfdfdf',
            },
            fontWeight: 'bold',
          }}
          onClick={() => setRegisterType(RegisterType.TYPE_INDIVIDUAL)}
          fullWidth
        >
          개인
        </Button>
        <Button
          sx={{
            color: registerType === RegisterType.TYPE_ORGANIZATION ? 'white' : '#888888',
            background:
              registerType === RegisterType.TYPE_ORGANIZATION ? '#256aef' : '#f1f1f1',
            '&.MuiButtonBase-root:hover': {
              bgcolor:
                registerType === RegisterType.TYPE_ORGANIZATION ? '#568dfa' : '#dfdfdf',
            },
            fontWeight: 'bold',
          }}
          onClick={() => setRegisterType(RegisterType.TYPE_ORGANIZATION)}
          fullWidth
        >
          단체
        </Button>
      </ReservationType>
      <Box>
        {registerType === RegisterType.TYPE_ORGANIZATION && (
          <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center">
            <HorizontalRuleRoundedIcon
              sx={{ transform: 'scale(1,2)', color: '#3498db' }}
            />
            <span>교육신청자 리스트</span>
          </Typography>
        )}
        <StudentItemListWrap>
          <StuGrid
            container
            columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}
            rowSpacing={4}
            columnSpacing={4}
          >
            {registerType === RegisterType.TYPE_ORGANIZATION &&
              organization.length > 0 &&
              organization.map(item => (
                // test.length > 0 &&
                // test.map(item => (
                <StudentListItem
                  item
                  xs={1}
                  sm={1}
                  md={1}
                  lg={1}
                  key={item.courseClassSeq}
                >
                  <StuTableContainer>
                    <StuTableBody>
                      <UserTableRow>
                        <TableLeftCell>이름</TableLeftCell>
                        <TableRightCell>{item.name}</TableRightCell>
                      </UserTableRow>
                      <UserTableRow>
                        <TableLeftCell>주민번호</TableLeftCell>
                        <TableRightCell>
                          {item.firstIdentityNumber} - ●●●●●●●
                        </TableRightCell>
                      </UserTableRow>
                      <UserTableRow>
                        <TableLeftCell>차량번호</TableLeftCell>
                        <TableRightCell>{item.carNumber}</TableRightCell>
                      </UserTableRow>
                      <UserTableRow>
                        <TableLeftCell>차량등록지</TableLeftCell>
                        <TableRightCell>
                          {
                            locationList.filter(
                              regi => regi.en === item.carRegisteredRegion
                            )[0].ko
                          }
                        </TableRightCell>
                      </UserTableRow>
                      <UserTableRow>
                        <TableLeftCell>휴대전화</TableLeftCell>
                        <TableRightCell>{`${item.firstPhone}-${item.secondPhone}-${item.thirdPhone}`}</TableRightCell>
                      </UserTableRow>
                    </StuTableBody>
                  </StuTableContainer>
                  <Box
                    width="200px"
                    display="flex"
                    alignItems="flex-end"
                    margin="auto"
                    mt={4}
                  >
                    <Button
                      variant="outlined"
                      color="neutral"
                      onClick={() => onClickDelete(item.seq, item)}
                      fullWidth
                    >
                      삭제
                    </Button>
                  </Box>
                </StudentListItem>
              ))}
          </StuGrid>
        </StudentItemListWrap>
      </Box>
    </StudentListWrap>
  );
}

const StudentListWrap = styled(Box)``;
const ReservationType = styled(Box)`
  display: flex;
  gap: 1rem;
  max-width: 460px;
  margin: auto;
`;
const StudentItemListWrap = styled(Box)`
  /* div:last-child { Remove last Element borderBottom
    border-bottom: none;
  } */
`;
const StudentListItem = styled(Grid)`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  /* border-bottom: 2px solid #e1e1e1; Add border Bottom */
`;
const StuTableContainer = styled(TableContainer)`
  .css-2lu2eg-MuiTableCell-root {
    border-bottom: none;
    padding: 0.5rem;
    font-weight: bold;
  }
`;

const StuGrid = styled(Grid)``;

const UserTableRow = styled(TableRow)`
  display: flex;

  /* td:first-of-type {
    width: 50%;
  } */
  td:last-child {
    display: block;
    /* width: 50%; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const StuTableBody = styled(TableBody)`
  display: table;
  width: 100%;
  border-top: 1px solid #c4c4c4;
  border-left: 1px solid #c4c4c4;
  border-right: 1px solid #c4c4c4;
  /* border: 1px solid #c4c4c4; */
`;
const TableLeftCell = styled(TableCell)`
  width: 30%;
  border-right: 1px solid #c4c4c4;
  background: #f4f4f4;
  font-weight: 400;
  font-size: 18px;
`;
const TableRightCell = styled(TableCell)`
  width: 70%;
  font-weight: 400;
  font-size: 18px;
`;
