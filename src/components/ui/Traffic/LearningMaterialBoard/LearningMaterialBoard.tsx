import { Box, Container } from '@mui/material';
import { useRouter } from 'next/router';
import { Tabs } from '@components/ui/Tabs';
import styled from 'styled-components';

enum TabValue {
  A = 'A', // 연령별 교수학습 지도안
  B = 'B', // 교육자료
  C = 'C', // 교육영상
  D = 'D', // 타기관자료모음
}

const tabsConfig = [
  { label: '연령별 교수학습 지도안', value: TabValue.A },
  { label: '교육자료', value: TabValue.B },
  { label: '교육영상', value: TabValue.C },
  { label: '타기관자료모음', value: TabValue.D },
];

export function LearningMaterialBoard() {
  const router = useRouter();
  const { tab } = router.query;

  return (
    <LearningMaterialContainer>
      <Box sx={{ mb: '30px' }}>
        <Tabs tabsConfig={tabsConfig} variant={'fullWidth'} />
      </Box>

      {
        {
          [TabValue.A]: <div>A</div>,
          [TabValue.B]: <div>B</div>,
          [TabValue.C]: <div>C</div>,
          [TabValue.D]: <div>D</div>,
        }[tab as string]
      }
    </LearningMaterialContainer>
  );
}

const LearningMaterialContainer = styled(Container)`
  width: 1200px;
`;
