import { Tabs } from '@components/ui/Tabs';
import { CategoryBoardFaq } from '@layouts/Traffic/Category/CategoryBoardFaq';
import { CategoryBoardLook } from '@layouts/Traffic/Category/CategoryBoardLook';
import { CategoryBoardNotice } from '@layouts/Traffic/Category/CategoryBoardNotice';
import { CategoryBoardQuestion } from '@layouts/Traffic/Category/CategoryBoardQuestion';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Box, Container } from '@mui/material';
import CSRTabs2 from '@components/ui/Tabs2/CSRTabs2';

enum TabValue {
  Notice = 'Notice',
  Faq = 'Faq',
  Question = 'Question',
  Look = 'Look',
}

const tabsConfig = [
  { label: '공지사항', value: TabValue.Notice },
  { label: '자주묻는질문', value: TabValue.Faq },
  { label: '교육문의', value: TabValue.Question },
  { label: '문의내역조회', value: TabValue.Look },
];

export function ServiceBoard() {
  const router = useRouter();
  const { tab } = router.query;

  return (
    <ServiceContainer>
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
          [TabValue.Notice]: <CategoryBoardNotice />,
          [TabValue.Faq]: <CategoryBoardFaq />,
          [TabValue.Question]: <CategoryBoardQuestion />,
          [TabValue.Look]: <CategoryBoardLook />,
        }[tab as string]
      }
    </ServiceContainer>
  );
}

const ServiceContainer = styled(Container)`
  margin: auto;
  /* width: 1200px; */
`;
