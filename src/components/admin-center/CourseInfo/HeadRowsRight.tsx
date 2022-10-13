import {
  useLearningInfoCourses,
  useLearningInfoStep,
} from '@common/api/adm/learningInfo';
import ApiClient from '@common/api/ApiClient';
import styled from '@emotion/styled';
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

interface Props {}

export function HeadRowsRight({}: Props) {
  return (
    <HeadRowsRightWrap>
      <Box width="100%">
        <Typography>업체명</Typography>
        <TextField fullWidth />
      </Box>
    </HeadRowsRightWrap>
  );
}
const HeadRowsRightWrap = styled(Box)`
  display: flex;
  gap: 4px;
  width: 33.3%;
`;