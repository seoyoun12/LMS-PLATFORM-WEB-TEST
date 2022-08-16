import { qnaDetail } from '@common/api/qna';
import { Box, Container, styled, TableBody, TableCell, TableRow } from '@mui/material';
import dateFormat from 'dateformat';
import { useRouter } from 'next/router';

export function QnaQuestionForm() {
  const router = useRouter();
  const qna = router.query;
  const { data } = qnaDetail(Number(qna.qnaSeq));

  console.log('data : ', data);

  return (
    <QuestionBox>
      <TableBody sx={{ display: 'table', width: '100%' }}>
        <TableRow sx={{ textAlign: 'center' }}>
          <TableCell sx={{ background: '#e0e0e0', width: '10%', textAlign: 'center' }}>
            seq
          </TableCell>
          <TableCell sx={{ width: '10%', textAlign: 'center' }}>{data?.seq}</TableCell>
          <TableCell sx={{ background: '#e0e0e0', width: '10%', textAlign: 'center' }}>
            문의타입
          </TableCell>
          <TableCell sx={{ width: '30%', textAlign: 'center' }}>{data?.type}</TableCell>
          <TableCell sx={{ background: '#e0e0e0', width: '10%', textAlign: 'center' }}>
            문의날짜
          </TableCell>
          <TableCell sx={{ width: '30%', textAlign: 'center' }}>
            {dateFormat(data?.createdDtime, 'isoDate')}
          </TableCell>
        </TableRow>
      </TableBody>
      <TableBody sx={{ display: 'table', width: '100%' }}>
        <TableRow>
          <TableCell sx={{ background: '#e0e0e0', width: '10%', textAlign: 'center' }}>
            문의제목
          </TableCell>
          <TableCell sx={{ width: '50%', textAlign: 'center' }}>{data?.title}</TableCell>
          <TableCell sx={{ background: '#e0e0e0', width: '10%', textAlign: 'center' }}>
            첨부파일
          </TableCell>
          <TableCell sx={{ width: '30%', textAlign: 'center' }}>
            {data?.s3Files[0] ? data.s3Files[0].name : '파일없음'}
          </TableCell>
        </TableRow>
      </TableBody>
      <TableBody sx={{ display: 'table', width: '100%' }}>
        <TableRow>
          <TableCellLeft sx={{ width: '8.9%', textAlign: 'center' }}>
            문의내용
          </TableCellLeft>
          <TableCellRight sx={{ padding: '50px', whiteSpace: 'pre-wrap' }}>
            {data?.content}
          </TableCellRight>
        </TableRow>
      </TableBody>
    </QuestionBox>
  );
}

const QuestionBox = styled(Box)`
  box-sizing: border-box;
  border: 1px solid #b4b4b4;
`;

const TableCellLeft = styled(TableCell)`
  background: #e0e0e0;
  border-top: 1px solid #b4b4b4;
  border-bottom: 1px solid #b4b4b4;
  width: 20%;
`;
const TableCellRight = styled(TableCell)`
  border-top: 1px solid #b4b4b4;
  border-bottom: 1px solid #b4b4b4;
  width: 80%;
`;
