import styled from '@emotion/styled';
import { Box, Checkbox, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import { useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { locationList } from '@layouts/MeEdit/MeEdit';

export function StudentInfo() {
  const [name, setName] = useState<string>(); //이름
  const [firstResiNumber, setFirstResiNumber] = useState<string>(); //주민앞
  const [secondResiNumber, setSecondResiNumber] = useState<string>(); //주민뒷
  const [vehicleNumber, setVehicleNumber] = useState<string | null>(null); //차량번호
  const [vehicleLocate, setVehicleLocate] = useState<string | null>(null); //차량등록지
  const [isIndividualCheck, setIsIndividualCheck] = useState(false);

  return (
    <StudentInfoWrap>
      <Box>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center">
          <HorizontalRuleRoundedIcon sx={{ transform: 'scale(1,2)', color: '#3498db' }} />
          <span>교육신청자 정보</span>
        </Typography>
      </Box>
      <Typography>이름</Typography>
      <TextField value={name} onChange={e => setName(e.target.value)} fullWidth />
      <Box>
        <Typography>주민등록번호</Typography>
        <Box display="flex" alignItems="center">
          <TextField
            value={firstResiNumber}
            onChange={e => {
              if (e.target.value.length > 7) return;
              setFirstResiNumber(e.target.value.replace(/[^0-9]/g, ''));
            }}
            fullWidth
          />
          <span>-</span>
          <TextField
            type="password"
            value={secondResiNumber}
            onChange={e => {
              if (e.target.value.length > 7) return;
              setSecondResiNumber(e.target.value.replace(/[^0-9]/g, ''));
            }}
            fullWidth
          />
        </Box>
      </Box>
      <Typography>차량 번호</Typography>
      <TextField fullWidth />
      <Box>
        <Typography>차량 등록지</Typography>
        <FormControl fullWidth>
          <Select>
            {locationList.map(item => (
              <MenuItem key={item.en} value={item.en}>
                {item.ko}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Typography>휴대전화</Typography>
      <TextField placeholder="'-'를 제외한 숫자만 입력해주세요." fullWidth />
      <Checkbox defaultChecked />
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
