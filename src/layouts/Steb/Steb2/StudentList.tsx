import { courseUserOrganCancel, RegisterType } from '@common/api/courseClass';
import { courseClassEnrollList } from '@common/recoil';
import styled from '@emotion/styled';
import { Box, Button, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import React from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import { Table } from '@components/ui';
import { locationList } from '@layouts/MeEdit/MeEdit';
import { useSnackbar } from '@hooks/useSnackbar';

interface Props {
  registerType: RegisterType;
  setRegisterType: React.Dispatch<React.SetStateAction<RegisterType>>;
}
export function StudentList({ registerType, setRegisterType }: Props) {
  const [organization, setOrganization] = useRecoilState(courseClassEnrollList);
  const snackbar = useSnackbar();

  const onClickDelete = async (seq: number, test: any) => {
    console.log('아', seq, test);
    try {
      await courseUserOrganCancel(seq);
      setOrganization((prev) => prev.filter((item) => item.seq !== seq));
    } catch (e: any) {
      snackbar({ variant: 'error', message: e });
    }
  };

  return (
    <StudentListWrap>
      <ReservationType>
        <Button
          variant="outlined"
          color={registerType === RegisterType.TYPE_INDIVIDUAL ? 'primary' : 'neutral'}
          onClick={() => setRegisterType(RegisterType.TYPE_INDIVIDUAL)}
          fullWidth
        >
          개인
        </Button>
        <Button
          variant="outlined"
          color={registerType === RegisterType.TYPE_ORGANIZATION ? 'primary' : 'neutral'}
          onClick={() => setRegisterType(RegisterType.TYPE_ORGANIZATION)}
          fullWidth
        >
          단체
        </Button>
      </ReservationType>
      <Box>
        {registerType === RegisterType.TYPE_ORGANIZATION && (
          <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center">
            <HorizontalRuleRoundedIcon sx={{ transform: 'scale(1,2)', color: '#3498db' }} />
            <span>교육신청자 리스트</span>
          </Typography>
        )}
        <StudentItemListWrap>
          {registerType === RegisterType.TYPE_ORGANIZATION &&
            organization.length > 0 &&
            organization.map((item) => (
              <StudentListItem key={item.courseClassSeq}>
                <StuTableContainer>
                  <TableBody sx={{ display: 'table', width: '100%' }}>
                    <UserTableRow>
                      <TableCell>이름</TableCell>
                      <TableCell>{item.name}</TableCell>
                    </UserTableRow>
                    <UserTableRow>
                      <TableCell>민증</TableCell>
                      <TableCell>{item.firstIdentityNumber} - ●●●●●●●</TableCell>
                    </UserTableRow>
                    <UserTableRow>
                      <TableCell>차량번호</TableCell>
                      <TableCell>{item.carNumber}</TableCell>
                    </UserTableRow>
                    <UserTableRow>
                      <TableCell>등록지</TableCell>
                      <TableCell>{locationList.filter((regi) => regi.en === item.carRegisteredRegion)[0].ko}</TableCell>
                    </UserTableRow>
                    <UserTableRow>
                      <TableCell>휴대전화링</TableCell>
                      <TableCell>{item.phone}</TableCell>
                    </UserTableRow>
                  </TableBody>
                </StuTableContainer>
                <Box width="20%" display="flex" alignItems="flex-end">
                  <Button variant="outlined" onClick={() => onClickDelete(item.seq, item)} fullWidth>
                    삭제
                  </Button>
                </Box>
              </StudentListItem>
            ))}
        </StudentItemListWrap>
      </Box>
    </StudentListWrap>
  );
}

const StudentListWrap = styled(Box)``;
const ReservationType = styled(Box)`
  display: flex;
  gap: 2rem;
`;
const StudentItemListWrap = styled(Box)`
  div:last-child {
    border-bottom: none;
  }
`;
const StudentListItem = styled(Box)`
  display: flex;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e1e1e1;
`;
const StuTableContainer = styled(TableContainer)`
  width: 80%;
  .css-2lu2eg-MuiTableCell-root {
    border-bottom: none;
    padding: 0.5rem;
    font-weight: bold;
  }
  .css-dfr580-MuiTableRow-root {
    /* :first-child {
      td {
        border-top: none;
      }
    } */
    :last-child {
      td {
        border-bottom: none;
      }
    }
  }
`;

const UserTableRow = styled(TableRow)`
  display: flex;

  td:first-child {
    width: 50%;
  }
  td:last-child {
    display: block;
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
