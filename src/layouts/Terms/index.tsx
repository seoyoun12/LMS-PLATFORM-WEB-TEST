import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getTerms } from '@common/api/terms';

export default function Terms() {
  const [term, setTerm] = useState<string>('');
  const router = useRouter();
  const { query } = router;

  //텀타입이 없을 시 개인정보처리약관으로 자동이동.
  useEffect(() => {
    if (query) {
      router.push({
        pathname: router.pathname,
        query: {
          termType: 'PERSONAL_INFORMATION_TERMS',
        },
      });
    }
  }, []);

  //약관 불러오는 훅
  useEffect(() => {
    (async function () {
      try {
        const termType =
          (query.termTypeas as 'CONDITIONS_TERMS') ||
          'PERSONAL_INFORMATION_TERMS' ||
          'LOCATION_BASED_TERMS';
        const { data } = await getTerms({ termType });
        setTerm(data.content);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [router]);

  if (!term)
    return (
      <TermsWrap>
        <TermsBody color="gray">약관 정보가 없는것 같습니다..</TermsBody>
      </TermsWrap>
    );

  return (
    <TermsWrap>
      <TermsBody>
        <TermsTitle>개인정보처리방침</TermsTitle>
        <Box>
          {term.split('\n').map((item, idx) => (
            <Box key={idx} sx={{ margin: '8px 0' }}>
              {item}
            </Box>
          ))}
        </Box>
      </TermsBody>
    </TermsWrap>
  );
}

const TermsWrap = styled(Box)`
  padding: 48px 64px;
  @media (max-width: 500px) {
    padding: 12px 24px;
  }
`;
const TermsBody = styled(Box)`
  width: fit-content;
  margin: auto;
`;
const TermsTitle = styled(Typography)`
  font-size: 32px;
  font-weight: bold;
  color: #494949;
  text-align: center;
  margin: 24px 0;
`;
