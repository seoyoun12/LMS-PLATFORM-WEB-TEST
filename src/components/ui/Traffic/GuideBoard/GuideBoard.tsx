import { Box, Container } from '@mui/material';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { GuideBoardAuth } from './GuideBoardAuth';
import { GuideBoardEduRegi } from './GuideBoardEduRegi';
import { GuideBoardEduLearning } from './GuideBoardEduLearning';
import CSRTabs2 from '@components/ui/Tabs2/CSRTabs2';

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
      
        <CSRTabs2
          tabsConfig={tabsConfig}
          variant={'fullWidth'}
          showBorderBottom={true}
          gap={2}
          fontSx={{ fontWeight: 700, fontSize: '20px' }}
          responsiveWidth={768}
        />
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
