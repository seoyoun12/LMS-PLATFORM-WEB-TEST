import { CourseClassTraffic, PeopleCounts } from '@common/recoil/courseClassTraffic/atom';
import { Box, styled, Table, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import React from 'react';
import { studentList } from '../Steb2/Steb2';

export function Step3StudentList({
  students,
  trafficInfo,
}: {
  students: PeopleCounts | undefined;
  trafficInfo: CourseClassTraffic | null;
}) {
  return (
    <Step3StudentWrap>
      {studentList
        .filter(item => item.enType === trafficInfo?.student)[0]
        ?.category.filter(fil => fil.enType === trafficInfo?.category)
        .map(item => (
          <TableContainer sx={{ width: '50%', margin: 'auto', marginTop: '2rem' }}>
            <Table sx={{ borderTop: '2px solid #c3c3c3' }}>
              {item.ageList.map(ages => (
                <TableCustomRow>
                  <TableLeftCell>{ages.age}</TableLeftCell>
                  <TableCell>{students?.[item.enType][ages.enAge] ? students[item.enType][ages.enAge] : 0}명</TableCell>
                </TableCustomRow>
              ))}
            </Table>
          </TableContainer>
        ))}
    </Step3StudentWrap>
  );
}

const Step3StudentWrap = styled(Box)``;

const TableCustomRow = styled(TableRow)`
  border-bottom: 2px solid #c3c3c3;
`;
const TableLeftCell = styled(TableCell)`
  background: #e1e1e1;
  width: 30%;
`;
