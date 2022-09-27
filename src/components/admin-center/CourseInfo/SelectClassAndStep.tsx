import {
  useLearningInfoCourses,
  useLearningInfoStep,
} from '@common/api/adm/learningInfo';
import ApiClient from '@common/api/ApiClient';
import styled from '@emotion/styled';
import { Box, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface Props {
  courseClassSeq: number | null;
  onChageCourseClassSeq: (courseClassSeq: number) => void;
  courseSeq: number | null;
  onChageCourseSeq: (courseSeq: number) => void;
}

export function SelectClassAndStep({
  courseSeq,
  onChageCourseSeq,
  courseClassSeq,
  onChageCourseClassSeq,
}: Props) {
  const { courses, coursesError } = useLearningInfoCourses();
  const { steps, stepsError } = useLearningInfoStep(courseSeq);

  const onChangeSeletedSeq = (e: SelectChangeEvent) => {
    onChageCourseSeq(Number(e.target.value));
    onChageCourseClassSeq(null);
  };
  const onChangeSelectedClassSeq = (e: SelectChangeEvent) => {
    onChageCourseClassSeq(Number(e.target.value) || null);
  };

  return (
    <SelectClassAndStepWrap>
      <Box width="50%">
        <Typography>과정 선택</Typography>
        <Select onChange={onChangeSeletedSeq} value={String(courseSeq)} fullWidth>
          <MenuItem value={null}>-없음-</MenuItem>
          {courses?.map((item, idx) => (
            <MenuItem key={idx} value={item.courseSeq}>
              {item.courseName}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box width="50%">
        <Typography>과정기수 선택</Typography>
        <Select
          onChange={onChangeSelectedClassSeq}
          value={String(courseClassSeq)}
          fullWidth
        >
          <MenuItem value={null}>-없음-</MenuItem>
          {steps?.map((item, idx) => (
            <MenuItem key={idx} value={item.courseClassSeq}>
              {item.yearAndStep}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </SelectClassAndStepWrap>
  );
}
const SelectClassAndStepWrap = styled(Box)`
  display: flex;
  width: 1000px;
  gap: 4px;
`;
