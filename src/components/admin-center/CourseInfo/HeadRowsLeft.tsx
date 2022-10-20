import {
  useLearningInfoCourses,
  useLearningInfoStep,
} from '@common/api/adm/learningInfo';
import ApiClient from '@common/api/ApiClient';
import styled from '@emotion/styled';
import {
  Box,
  MenuItem,
  Radio,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

interface Props {
  courseClassSeq: number | null;
  onChageCourseClassSeq: (courseClassSeq: number) => void;
  courseSeq: number | null;
  onChageCourseSeq: (courseSeq: number) => void;
}

export function HeadRowsLeft({
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
    <HeadRowsLeftWrap>
      <BoxRow>
        <Box>
          <Typography>업종선택</Typography>
          <Radio />
          <Radio />
          <Radio />
        </Box>
      </BoxRow>
      <BoxRow>
        <Box width="50%">
          <Typography>과정 선택</Typography>
          <Select onChange={onChangeSeletedSeq} value={String(courseSeq)} fullWidth>
            <MenuItem value={null}>전체</MenuItem>
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
            <MenuItem value={null}>전체</MenuItem>
            {steps?.map((item, idx) => (
              <MenuItem key={idx} value={item.courseClassSeq}>
                {item.yearAndStep}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </BoxRow>
      <Box>
        <Typography>교육연도</Typography>
        <Select fullWidth>
          <MenuItem value={null}>전체</MenuItem>
          <MenuItem value={2022}>2022</MenuItem>
        </Select>
      </Box>
      <Box>
        <Typography>학습기간</Typography>
        <Box display="flex" gap={2}>
          <Select fullWidth>
            <MenuItem value={null}>없음</MenuItem>
          </Select>
          <Select fullWidth>
            <MenuItem value={null}>없음</MenuItem>
          </Select>
        </Box>
      </Box>
    </HeadRowsLeftWrap>
  );
}
const HeadRowsLeftWrap = styled(Box)`
  gap: 4px;
  width: 33.3%;
`;

const BoxRow = styled(Box)`
  display: flex;
  width: 100%;
  gap: 16px;
`;
