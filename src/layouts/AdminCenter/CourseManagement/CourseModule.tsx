import { useCourseModule } from '@common/api/adm/course';
import { Spinner } from '@components/ui';
import styled from '@emotion/styled';
import { Box, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';

const headRows = [
  { name: 'seq' },
  { name: '강의명' },
  { name: '등록날짜' },
  { name: '수정일자' },
  { name: '상태' },
  { name: '수정' },
  { name: '삭제' },
];

export function CourseModule() {
  const router = useRouter();
  const { courseSeq } = router.query;
  const { data, error, mutate } = useCourseModule(Number(courseSeq));

  console.log(data, '데이탕');
  if (error) return <div>error</div>;
  if (!data) return <Spinner />;
  return (
    <Box>
      <Box>테스트</Box>
      {data.map(item => (
        <MenuItem key={item.courseSeq}>{item.moduleName}</MenuItem>
      ))}
    </Box>
  );
}

const UploadBtn = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 30px;
  justify-content: flex-end;

  > button:last-of-type {
    margin-left: 12px;
  }
`;
