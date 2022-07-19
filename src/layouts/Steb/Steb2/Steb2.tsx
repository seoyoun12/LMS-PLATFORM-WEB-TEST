import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { StebHeader } from '../StebHeader';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import { useState } from 'react';

const eduList = [
  { eduType: '보수', eduEnType: 'BOSU', jobType: '화물', jobEnType: 'FRE' },
  { eduType: '보수', eduEnType: 'BOSU', jobType: '여객', jobEnType: 'PASS' },
  { eduType: '신규', eduEnType: 'FRE', jobType: '수물', jobEnType: '뭐' },
  { eduType: '강화', eduEnType: 'FRE', jobType: '취객', jobEnType: '어쩔' },
  // { eduType: '화물보수', eduEnType: 'FRE', jobType:'' , jobEnType:'' },
];

export function Steb2() {
  const [value, setValue] = useState<string>();
  return (
    <Steb2Wrap>
      <StebHeader value={2} />
      <Steb2BodyContainer maxWidth="sm">
        <Box>
          <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center">
            <HorizontalRuleRoundedIcon sx={{ transform: 'scale(1,2)', color: '#3498db' }} />
            <span>교육개요</span>
          </Typography>
          <TableContainer>
            <Table sx={{ borderTop: '4px solid #3498db' }}>
              <TableCustomRow>
                <TableLeftCell>교육과정</TableLeftCell>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel id="student">교육 대상자</InputLabel>
                    <Select
                      labelId="student"
                      id="student"
                      value={value}
                      onChange={e => {
                        setValue(e.target.value);
                      }}
                      label="student"
                    >
                      {eduList.map(item => (
                        <MenuItem key={item.eduType} value={item.eduEnType}>
                          {item.eduType}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableCustomRow>
              <TableCustomRow>
                <TableLeftCell>업종구분</TableLeftCell>
                <TableCell>ss</TableCell>
              </TableCustomRow>
              <TableCustomRow>
                <TableLeftCell>기수 / 교육일자</TableLeftCell>
                <TableCell>ss</TableCell>
              </TableCustomRow>
            </Table>
          </TableContainer>
        </Box>
        <Box>
          <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center">
            <HorizontalRuleRoundedIcon sx={{ transform: 'scale(1,2)', color: '#3498db' }} />
            <span>업체정보</span>
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center">
            <HorizontalRuleRoundedIcon sx={{ transform: 'scale(1,2)', color: '#3498db' }} />
            <span>교육신청자 정보</span>
          </Typography>
        </Box>
      </Steb2BodyContainer>
    </Steb2Wrap>
  );
}

const Steb2Wrap = styled(Container)``;

const Steb2BodyContainer = styled(Container)``;
const TableCustomRow = styled(TableRow)`
  border-bottom: 2px solid #c3c3c3;
`;
const TableLeftCell = styled(TableCell)`
  background: #e1e1e1;
  width: 30%;
`;
