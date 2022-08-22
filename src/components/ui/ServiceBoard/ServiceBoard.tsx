import { CategoryBoardFaq } from '@layouts/Category/CategoryBoardFaq';
import { CategoryBoardLook } from '@layouts/Category/CategoryBoardLook';
import { CategoryBoardNotice } from '@layouts/Category/CategoryBoardNotice';
import { CategoryBoardQuestion } from '@layouts/Category/CategoryBoardQuestion';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Box, Container } from '@mui/material';
import { Tabs2 } from '../Tabs2';

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
      <Box sx={{ mb: '30px', mt: '30px' }}>
        <Tabs2
          tabsConfig={tabsConfig}
          variant={'fullWidth'}
          showBorderBottom={true}
          gap={3}
          fontSx={{ fontWeight: 700, fontSize: '20px' }}
          scrollable={true}
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
  width: 1200px;
`;
