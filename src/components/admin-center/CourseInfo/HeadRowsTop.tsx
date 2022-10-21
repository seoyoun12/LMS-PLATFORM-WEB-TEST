import { CourseType } from '@common/api/adm/courseClass';
import styled from '@emotion/styled';
import { Box, Radio, Typography } from '@mui/material';

interface Props {
  courseType: CourseType;
  onChangeCourseType: (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export function HeadRowsTop({ courseType, onChangeCourseType }: Props) {
  return (
    <BoxRow>
      <Box>
        <Typography>과정타입선택</Typography>
        <Radio
          //   {...register('submitYn')}
          //   value={YN.YES}
          //   checked={watch().submitYn === YN.YES}
          onChange={onChangeCourseType}
          value={CourseType.TYPE_TRANS_WORKER}
          checked={CourseType.TYPE_TRANS_WORKER === courseType}
        />
        <span>운수종사자</span>
        <Radio
          onChange={onChangeCourseType}
          value={CourseType.TYPE_LOW_FLOOR_BUS}
          checked={CourseType.TYPE_LOW_FLOOR_BUS === courseType}
        />
        <span>저상버스</span>
        <Radio
          onChange={onChangeCourseType}
          value={CourseType.TYPE_PROVINCIAL}
          checked={CourseType.TYPE_PROVINCIAL === courseType}
        />
        <span>도민교통</span>
      </Box>
    </BoxRow>
  );
}

const BoxRow = styled(Box)`
  display: flex;
  width: 100%;
  gap: 16px;
`;
