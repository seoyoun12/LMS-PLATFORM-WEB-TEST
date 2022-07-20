import styled from '@emotion/styled';
import { Box, FormControl, InputLabel, Select, Table, TableCell, TableContainer, TableRow, Typography, MenuItem } from '@mui/material';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import { useState } from 'react';

interface Props {
  eduList: {
    eduType: string;
    eduEnType: string;
    jobType: string;
    jobEnType: string;
  }[];
  eduDate: { generation: number; eduStart: string; eduEnd: string }[];
}

export function EduOverview({ eduList, eduDate }: Props) {
  const [eduCourse, setEduCourse] = useState(''); //교육과정
  const [jobType, setJobType] = useState(''); //업종구분
  const [generation, setGeneration] = useState(''); //기수
  const [eduStart, setEduStart] = useState(''); //교육시작일
  const [eduEnd, setEduEnd] = useState(''); //교육시작일

  return (
    <EduOverviewWrap>
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
                  <InputLabel id="student">선택</InputLabel>
                  <Select
                    labelId="student"
                    id="student"
                    value={eduCourse}
                    onChange={e => {
                      setEduCourse(e.target.value);
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
              <TableCell>
                <FormControl fullWidth>
                  <InputLabel id="student">선택</InputLabel>
                  <Select
                    labelId="student"
                    id="student"
                    value={jobType}
                    onChange={e => {
                      setJobType(e.target.value);
                    }}
                    label="student"
                  >
                    {eduList.map(item => (
                      <MenuItem key={item.jobType} value={item.jobEnType}>
                        {item.jobType}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
            </TableCustomRow>
            <TableCustomRow>
              <TableLeftCell>기수 / 교육일자</TableLeftCell>
              <TableCell>
                <FormControl fullWidth>
                  <InputLabel id="student">선택</InputLabel>
                  <Select
                    labelId="student"
                    id="student"
                    value={generation}
                    onChange={e => {
                      setGeneration(e.target.value);
                    }}
                    label="student"
                  >
                    {eduDate.map(item => (
                      <MenuItem key={item.generation} value={item.generation}>
                        {item.generation}기 / {item.eduStart} ~ {item.eduEnd}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
            </TableCustomRow>
          </Table>
        </TableContainer>
      </Box>
    </EduOverviewWrap>
  );
}

const EduOverviewWrap = styled(Box)``;
const TableCustomRow = styled(TableRow)`
  border-bottom: 2px solid #c3c3c3;
`;
const TableLeftCell = styled(TableCell)`
  background: #e1e1e1;
  width: 30%;
`;
