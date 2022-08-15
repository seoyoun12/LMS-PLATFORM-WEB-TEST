import { BbsType, deleteFile, uploadFile } from '@common/api/adm/file';
// import { qnaDetail, QnaAnswer, uploadQnaAnswer, QnaAnswerInput } from '@common/api/qna';
import { qnaDetail, uploadQnaAnswer, QnaAnswerInput } from '@common/api/qna';
import { QnaAnswerForm } from '@components/admin-center/QnaAnswerForm';
import { Spinner } from '@components/ui';
import { useSnackbar } from '@hooks/useSnackbar';
import { Box, styled } from '@mui/material';
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
    <>
      <QnaBox>
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
      </QnaBox>
    </>
  );
}

const QnaBox = styled(Box)`
  position: fixed;
  box-sizing: border-box;
  border: 1px solid black;
  width: 85%;
  height: 95%;
`;

const QuestionBox = styled(Box)`
  box-sizing: border-box;
  border: 1px solid black;
  float: left;
  width: 45%;
  height: 96%;
  margin-top: 1%;
  margin-left: 2.5%;
`;

const AnswerBox = styled(Box)`
  box-sizing: border-box;
  border: 1px solid black;
  display: inline-block;
  width: 45%;
  height: 96%;
  margin-top: 1%;
  margin-left: 5%;
`;
