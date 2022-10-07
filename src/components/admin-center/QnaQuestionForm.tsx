import { downloadFile } from '@common/api/file';
import { qnaDetail } from '@common/api/qna';
import {
  Box,
  Button,
  Chip,
  Container,
  styled,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import { borderBottom } from '@mui/system';
import dateFormat from 'dateformat';
import { useRouter } from 'next/router';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';

const tabsConfig = [
  { name: '회원가입/로그인', value: 'TYPE_SIGNUP_OR_SIGNIN' },
  { name: '교육/수료', value: 'TYPE_EDU_OR_COMPLETE' },
  { name: '홈페이지/앱', value: 'TYPE_WEB_OR_APP' },
  { name: '기타', value: 'TYPE_ETC' },
];

export function QnaQuestionForm() {
  const router = useRouter();
  const qna = router.query;
  const { data } = qnaDetail(Number(qna.qnaSeq));

  // console.log('1대1문의 데이터 : ', data);

  return (
    <QnaQuestionBox>
      <TableHeadFull colSpan={4} sx={{ display: 'table', width: '100%' }}>
        1대1문의 상세보기
      </TableHeadFull>
      <TableBody sx={{ display: 'table', width: '100%' }}>
        <TableRow>
          {/* <TableLeftCell align="center">이름</TableLeftCell>
          <TableRightCell>
            {data.username ? `${data.username}(${data.name})` : data.name}
          </TableRightCell> */}
          <TableLeftCell align="center">전화번호</TableLeftCell>
          <TableRightCell>{data.phone ? `${data.phone}` : '번호없음'}</TableRightCell>
          <TableLeftCell align="center" sx={{ whiteSpace: 'pre-wrap' }}>
            문의자
            <br />
            첨부파일
          </TableLeftCell>
          <TableRightCell>
            {data?.s3Files[0] ? (
              <Button
                sx={{ padding: '0px' }}
                onClick={async () => {
                  try {
                    const blobData = await downloadFile(data.s3Files[0].seq);
                    const url = window.URL.createObjectURL(new Blob([blobData]));
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${data.s3Files[0].name}`;
                    a.click();
                    a.remove();
                  } catch (e: any) {
                    console.log(e);
                  }
                }}
              >
                {data?.s3Files ? (
                  <FileChip
                    icon={<SaveIcon />}
                    sx={{ cursor: 'pointer' }}
                    // label={data?.s3Files[0].name}
                    label={
                      <Box sx={{ display: 'flex' }}>
                        {/* <Box sx={{ lineHeight: '32px' }}>{data?.s3Files[0].name}</Box> */}
                        <Box>{data?.s3Files[0].name}</Box>
                        {/* <Box sx={{ ml: '30px' }}>
                          <Chip
                            label={
                              <Box>
                                {Math.round((data?.s3Files[0].size / 1024) * 10) / 10}mb
                              </Box>
                            }
                          />
                        </Box> */}
                      </Box>
                    }
                  />
                ) : null}
                {/* {data?.s3Files[0].name} */}
              </Button>
            ) : (
              '파일없음'
            )}
          </TableRightCell>
        </TableRow>
        <TableRow>
          <TableLeftCell align="center">문의유형</TableLeftCell>
          <TableRightCell>
            {tabsConfig.filter(item => item.value === data.type)[0]?.name}
          </TableRightCell>
          <TableLeftCell align="center">문의날짜</TableLeftCell>
          {/* <TableRightCell>{dateFormat(data?.createdDtime, 'isoDate')}</TableRightCell> */}
          <TableRightCell>{data?.createdDtime}</TableRightCell>
        </TableRow>
        <TableRow>
          <TableLeftCell align="center">문의제목</TableLeftCell>
          <TableRightCell colSpan={3}>{data?.title}</TableRightCell>
          {/* <TableLeftCell align="center" sx={{ whiteSpace: 'pre-wrap' }}>
            문의자
            <br />
            첨부파일
          </TableLeftCell>
          <TableRightCell>
            {data?.s3Files[0] ? (
              <Button
                sx={{ padding: '0px' }}
                onClick={async () => {
                  try {
                    const blobData = await downloadFile(data.s3Files[0].seq);
                    const url = window.URL.createObjectURL(new Blob([blobData]));
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${data.s3Files[0].name}`;
                    a.click();
                    a.remove();
                  } catch (e: any) {
                    console.log(e);
                  }
                }}
              >
                {data?.s3Files[0].name}
              </Button>
            ) : (
              '파일없음'
            )}
          </TableRightCell> */}
        </TableRow>
        <TableRow>
          <TableLeftCell align="center">문의내용</TableLeftCell>
          <TableLongCell colSpan={3} sx={{ whiteSpace: 'pre-wrap' }}>
            {data?.content}
          </TableLongCell>
        </TableRow>
      </TableBody>

      {/* <TableBody
        sx={{ display: 'table', width: '100%', borderBottom: '1px solid #b4b4b4' }}
      >
        <TableRow sx={{ textAlign: 'center' }}>
          <TableCell sx={{ background: '#e0e0e0', width: '7%', textAlign: 'center' }}>
            번호
          </TableCell>
          <TableCell sx={{ width: '8%', textAlign: 'center' }}>{data?.seq}</TableCell>
          <TableCell sx={{ background: '#e0e0e0', width: '7%', textAlign: 'center' }}>
            이름
          </TableCell>
          <TableCell sx={{ width: '10%', textAlign: 'center' }}>
            {data.username ? `${data.username}(${data.name})` : data.name}
          </TableCell>
          <TableCell sx={{ background: '#e0e0e0', width: '7%', textAlign: 'center' }}>
            번호
          </TableCell>
          <TableCell sx={{ width: '20%', textAlign: 'center' }}>
            {data.phone ? `${data.phone}` : '번호없음'}
          </TableCell>
          <TableCell sx={{ background: '#e0e0e0', width: '8%', textAlign: 'center' }}>
            문의타입
          </TableCell> */}
      {/* <TableCell sx={{ width: '30%', textAlign: 'center' }}>{data?.type}</TableCell> */}
      {/* <TableCell sx={{ width: '20%', textAlign: 'center' }}>
            {tabsConfig.filter(item => item.value === data.type)[0]?.name}
          </TableCell>
          <TableCell sx={{ background: '#e0e0e0', width: '8%', textAlign: 'center' }}>
            문의날짜
          </TableCell>
          <TableCell sx={{ width: '12%', textAlign: 'center' }}>
            {dateFormat(data?.createdDtime, 'isoDate')}
          </TableCell>
        </TableRow>
      </TableBody> */}

      {/* <TableBody sx={{ display: 'table', width: '100%' }}>
        <TableRow>
          <TableCell sx={{ background: '#e0e0e0', width: '10%', textAlign: 'center' }}>
            문의제목
          </TableCell>
          <TableCell sx={{ width: '50%', textAlign: 'center' }}>{data?.title}</TableCell>
          <TableCell sx={{ background: '#e0e0e0', width: '10%', textAlign: 'center' }}>
            첨부파일
          </TableCell>
          {/* <TableCell sx={{ width: '30%', textAlign: 'center' }}>
            {data?.s3Files[0] ? data.s3Files[0].name : '파일없음'}
          </TableCell> */}
      {/* <TableCell align="center">
            {data?.s3Files[0] ? (
              <Button
                onClick={async () => {
                  try {
                    const blobData = await downloadFile(data.s3Files[0].seq);
                    const url = window.URL.createObjectURL(new Blob([blobData]));
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${data.s3Files[0].name}`;
                    a.click();
                    a.remove();
                  } catch (e: any) {
                    console.log(e);
                  }
                }}
              >
                {data?.s3Files[0].name}
              </Button>
            ) : (
              '파일없음'
            )}
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
      </TableBody> */}
    </QnaQuestionBox>
  );
}

const QnaQuestionBox = styled(Box)``;

const TableHeadFull = styled(TableCell)`
  width: 100%;
  background: #f5f5f5;
  border: 1px solid #c4c4c4;
  font-weight: bold;
`;

const TableLeftCell = styled(TableCell)`
  width: 10%;
  background: #f5f5f5;
  border-right: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
  &:first-of-type {
    border-left: 1px solid #c4c4c4;
    width: 10%;
  }
`;

const TableRightCell = styled(TableCell)`
  width: 40%;
  border-bottom: 1px solid #c4c4c4;
  border-right: 1px solid #c4c4c4;
  font-size: 14px;
`;

const TableLongCell = styled(TableCell)`
  width: 90%;
  border-bottom: 1px solid #c4c4c4;
  border-right: 1px solid #c4c4c4;
  font-size: 14px;
  padding-top: 50px;
  padding-bottom: 50px;
  white-space: pre-wrap;
`;

const FileChip = styled(Chip)`
  height: 36.5px;
`;
