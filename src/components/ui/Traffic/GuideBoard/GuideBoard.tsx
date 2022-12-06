import { Box, Container } from '@mui/material';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Tabs } from '@components/ui/Tabs';
import { GuideBoardAuth } from './GuideBoardAuth';
import { GuideBoardEduRegi } from './GuideBoardEduRegi';
import { GuideBoardEduLearning } from './GuideBoardEduLearning';

enum TabValue {
  TYPE_GUIDE_AUTH = 'TYPE_GUIDE_AUTH',
  TYPE_GUIDE_EDU_REGI = 'TYPE_GUIDE_EDU_REGI',
  TYPE_GUIDE_EDU_LEARNING = 'TYPE_GUIDE_EDU_LEARNING',
}

const tabsConfig = [
  { label: '회원가입 및 로그인', value: TabValue.TYPE_GUIDE_AUTH },
  { label: '교육신청방법', value: TabValue.TYPE_GUIDE_EDU_REGI },
  { label: '학습방법', value: TabValue.TYPE_GUIDE_EDU_LEARNING },
];

export function GuideBoard() {
  const router = useRouter();
  const { tab } = router.query;

  return (
    <GuideContainer>
      <Box sx={{ mb: '30px' }}>
        <Tabs tabsConfig={tabsConfig} variant={'fullWidth'} />
      </Box>
      {
        {
          [TabValue.TYPE_GUIDE_AUTH]: <GuideBoardAuth />,
          [TabValue.TYPE_GUIDE_EDU_REGI]: <GuideBoardEduRegi />,
          [TabValue.TYPE_GUIDE_EDU_LEARNING]: <GuideBoardEduLearning />,
        }[tab as string]
      }
    </GuideContainer>
  );
}

const GuideContainer = styled(Container)`
  max-width: 1200px;
`;
