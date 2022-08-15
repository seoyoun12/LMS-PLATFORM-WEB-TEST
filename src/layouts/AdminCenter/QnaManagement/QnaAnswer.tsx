import { BbsType, deleteFile, uploadFile } from '@common/api/adm/file';
// import { qnaDetail, QnaAnswer, uploadQnaAnswer, QnaAnswerInput } from '@common/api/qna';
import { qnaDetail, uploadQnaAnswer, QnaAnswerInput } from '@common/api/qna';
import { QnaAnswerForm } from '@components/admin-center/QnaAnswerForm';
import { Spinner, Table } from '@components/ui';
import { useSnackbar } from '@hooks/useSnackbar';
import {
  Box,
  Container,
  styled,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import dateFormat from 'dateformat';
import { useRouter } from 'next/router';

export function QnaAnswer() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const qna = router.query;
  const { data, error } = qnaDetail(Number(qna.qnaSeq));

  console.log('qna : ', qna);
  console.log('qna.qnaSeq : ', qna.qnaSeq);
  console.log('data : ', data);

  const handleSubmit = async ({
    files,
    qnaAnswerInput,
  }: {
    files: File[];
    qnaAnswerInput: QnaAnswerInput;
  }) => {
    try {
      if (data?.seq) {
        // await uploadQnaAnswer({ seq: data?.seq, qnaAnswerInput });
        await fileHandler(files);
        snackbar({ variant: 'success', message: '답변이 등록되었습니다.' });
        router.push(`/admin-center/qna`);
      }
    } catch (e: any) {
      console.error(e);
      snackbar({ variant: 'error', message: '답변 등록에 실패했습니다.' });
    }
  };

  const fileHandler = async (files: File[]) => {
    if (files == undefined) {
      await deleteFile({
        fileTypeId: data?.seq,
        fileType: BbsType.TYPE_QNA_ANSWER,
        fileSeqList: data.s3Files.map(v => v.seq),
      });
    } else if (files.length > 0) {
      await deleteFile({
        fileTypeId: data?.seq,
        fileType: BbsType.TYPE_QNA_ANSWER,
        fileSeqList: data.s3Files.map(v => v.seq),
      });
      await uploadFile({
        fileTypeId: data?.seq,
        fileType: BbsType.TYPE_QNA_ANSWER,
        files,
      });
    }
  };

  if (error) return <div>...ERROR</div>;
  if (!data) return <Spinner />;

  return (
    <QnaContainer>
      <TableBody sx={{ display: 'table', width: '100%' }}>
        <TableRow>
          <TableCell sx={{ background: '#e0e0e0', width: '2%' }}>seq</TableCell>
          <TableCell>{data?.seq}</TableCell>
          <TableCell sx={{ background: '#e0e0e0', width: '10%' }}>문의제목</TableCell>
          <TableCell>{data?.title}</TableCell>
        </TableRow>
      </TableBody>
      <TableBody sx={{ display: 'table', width: '100%' }}>
        <TableRow>
          <TableCellLeft>문의제목</TableCellLeft>
          <TableCellRight>{data?.title}</TableCellRight>
        </TableRow>

        <TableRow>
          <TableCellLeft>문의내용</TableCellLeft>
          <TableCellRight>{data?.content}</TableCellRight>
        </TableRow>

        <TableRow>
          <TableCellLeft>문의날짜</TableCellLeft>
          <TableCellRight>{dateFormat(data.createdDtime, 'isoDate')}</TableCellRight>
        </TableRow>

        <TableRow>
          <TableCellLeft>문의타입</TableCellLeft>
          <TableCellRight>{data?.type}</TableCellRight>
        </TableRow>

        <TableRow>
          <TableCellLeft>첨부파일</TableCellLeft>
          <TableCellRight>
            {data.s3Files[0] ? data.s3Files[0].name : '파일없음'}
          </TableCellRight>
        </TableRow>
      </TableBody>

      <QuestionBox>
        {/* <QnaAnswerForm qna={data} onHandleSubmit={handleSubmit} /> */}
        <div>{data?.seq}</div>
        <div>{data?.title}</div>
        <div>{data?.content}</div>
        <div>{data?.createdDtime}</div>
        <div>{data?.type}</div>
        <div>{data.s3Files[0] ? data.s3Files[0].name : '파일없음'}</div>
      </QuestionBox>
      <AnswerBox></AnswerBox>
    </QnaContainer>
  );
}

// 1대1문의 답변 폼도 만들어야한다.

const QnaContainer = styled(Container)`
  box-sizing: border-box;
  border: 1px solid black;
`;

const QuestionTable = styled(Table)`
  overflow: hidden;
`;

const QuestionBox = styled(Box)`
  /* box-sizing: border-box;
  border: 1px solid black;
  float: left;
  width: 45%;
  height: 96%;
  margin-top: 1%;
  margin-left: 2.5%; */
`;

const AnswerBox = styled(Box)`
  /* box-sizing: border-box;
  border: 1px solid black;
  display: inline-block;
  width: 45%;
  height: 96%;
  margin-top: 1%;
  margin-left: 5%; */
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

const TableCellLeftTitle01 = styled(TableCell)`
  background: #e0e0e0;
  border-top: 1px solid #b4b4b4;
  border-bottom: 1px solid #b4b4b4;
  width: 2%;
`;

const TableCellRightTitle01 = styled(TableCell)`
  border-top: 1px solid #b4b4b4;
  border-bottom: 1px solid #b4b4b4;
  width: 50%;
  color: red;
  border: 2px solid yellow;
`;
