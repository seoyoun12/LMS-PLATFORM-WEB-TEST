import { Container } from '@mui/system';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { useState } from 'react';
import { CategoryBoardNotice } from '@layouts/Traffic/Category/CategoryBoardNotice';
import { CategoryBoardFaq } from '@layouts/Traffic/Category/CategoryBoardFaq';
import { CategoryBoardQuestion } from '@layouts/Traffic/Category/CategoryBoardQuestion';
import { CategoryBoardLook } from '@layouts/Traffic/Category/CategoryBoardLook';
import { Tabs2 } from '@components/ui/Tabs2';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { CSRTabs2Props } from '@components/ui/Tabs2/CSRTabs2';

const CSRTab2 = dynamic<CSRTabs2Props>(() => import('@components/ui/Tabs2/CSRTabs2'), {
  ssr: false,
});

const tabsConfig = [
  { label: '공지사항', value: 'cbNotice', href: <CategoryBoardNotice /> },
  { label: '자주묻는질문', value: 'cbFaq', href: <CategoryBoardFaq /> },
  { label: '교육문의', value: 'cbQuestion', href: <CategoryBoardQuestion /> },
  { label: '문의내역조회', value: 'cbLook', href: <CategoryBoardLook /> },
];

export function CategoryBoard() {
  const [value, setValue] = useState(tabsConfig[0].value);
  const router = useRouter();

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  // useLayoutEffect(()=>{
  //   setValue(router.route.split('/traffic/')[1])
  // },[])

  return (
    <NoticeWrap>
      <Box sx={{ mb: '30px', maxWidth: '1200px', margin: 'auto' }}>
        <CSRTab2
          tabsConfig={tabsConfig}
          variant={'fullWidth'}
          rendering={false}
          onChange={onChange}
          value={value}
          showBorderBottom={true}
          gap={3}
          fontSx={{ fontSize: '20px' }}
          responsiveWidth={768}
        />
      </Box>
      <Box
        sx={{ borderBottom: '1px solid #2A2A2A', position: 'relative', top: '-1px' }}
      ></Box>
      <NoticeContainer>
        <Box mt={6}>
          {tabsConfig.map(item => {
            return (
              <Box hidden={item.value !== value} key={item.value}>
                {/* key props error */}
                {item.href}
              </Box>
            );
          })}
        </Box>
      </NoticeContainer>
    </NoticeWrap>
  );
}
const NoticeWrap = styled(Box)`
  /* padding-top: 4rem;
  background: #e6edf3; */
  padding: 4rem 0 0;
  background: #e6edf3;

  .Mui-selected {
    color: black !important;
    font-weight: bold;
  }
`;
const NoticeContainer = styled(Container)``;
