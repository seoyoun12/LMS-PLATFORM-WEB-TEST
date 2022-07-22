import { RegisterType } from '@common/api/courseClass';
import { courseClassOrganization } from '@common/recoil';
import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';

interface Props {
  registerType: RegisterType;
  setRegisterType: React.Dispatch<React.SetStateAction<RegisterType>>;
}
export function StudentList({ registerType, setRegisterType }: Props) {
  const [organization, setOrganization] = useRecoilState(courseClassOrganization);
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
        {registerType === RegisterType.TYPE_ORGANIZATION &&
          organization.length > 0 &&
          organization.map(item => (
            <Box display="flex">
              <Box width="30%">
                <Box>이름</Box>
                <Box>민증앞</Box>
                <Box>민증 뒤</Box>
                <Box>차량번호</Box>
                <Box>등록지</Box>
                <Box>휴대전화링</Box>
              </Box>
              <Box width="45%">
                <Box>{item.name}</Box>
                <Box>{item.firstIdentityNumber}</Box>
                <Box>{item.firstIdentityNumber}</Box>
                <Box>{item.carNumber}</Box>
                <Box>{item.carRegisteredRegion}</Box>
                <Box>{item.phone}</Box>
              </Box>
              <Box width="25%" display="flex" alignItems="flex-end">
                <Button variant="outlined" fullWidth>
                  삭제
                </Button>
              </Box>
            </Box>
          ))}
      </Box>
    </StudentListWrap>
  );
}

const StudentListWrap = styled(Box)``;
const ReservationType = styled(Box)`
  display: flex;
  gap: 2rem;
`;
