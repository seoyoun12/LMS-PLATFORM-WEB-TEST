import { CategoryBoardFaq } from '@layouts/Category/CategoryBoardFaq';
import { CategoryBoardLook } from '@layouts/Category/CategoryBoardLook';
import { CategoryBoardNotice } from '@layouts/Category/CategoryBoardNotice';
import { CategoryBoardQuestion } from '@layouts/Category/CategoryBoardQuestion';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { CSRTabs2Props } from '@components/ui/Tabs2/CSRTabs2';

const CSRTab2 = dynamic<CSRTabs2Props>(() => import('@components/ui/Tabs2/CSRTabs2'), {
  ssr: false,
});

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
      <Box sx={{ maxWidth: 1200, margin: 'auto', mb: '30px', mt: '30px' }}>
        <CSRTab2
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

const ServiceContainer = styled(Box)`
  margin: auto;
  /* width: 1200px; */
`;
