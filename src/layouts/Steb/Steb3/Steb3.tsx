import { Box, Container, styled, Typography } from '@mui/material';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import { StebHeader } from '../StebHeader';
import { useRecoilState } from 'recoil';
import { courseClassOrganization } from '@common/recoil';

export function Steb3() {
  const [enrollList, setEnrollList] = useRecoilState(courseClassOrganization);
  console.log(enrollList);
  return (
    <Steb3Wrap>
      <StebHeader value={3} />
      <Typography>안녕하세요</Typography>
      <Box>
        {enrollList.length > 0 &&
          enrollList.map((item) => (
            <Box key={item.seq}>
              <Box>{item.name}</Box>
              <Box>{item.businessType}</Box>
              <Box>{item.businessSubType}</Box>
              <Box>anjwl</Box>
            </Box>
          ))}
      </Box>
    </Steb3Wrap>
  );
}

const Steb3Wrap = styled(Container)``;
