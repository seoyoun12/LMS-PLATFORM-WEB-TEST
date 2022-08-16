import { BbsType, deleteFile, uploadFile } from '@common/api/adm/file';
import {
  uploadQnaAnswer,
  QnaAnswerInput,
  QnaAnswer,
  qnaDetail,
  Qna,
} from '@common/api/qna';
import { QnaAnswerForm } from '@components/admin-center/QnaAnswerForm';
import { QnaQuestionForm } from '@components/admin-center/QnaQuestionForm';
import { Spinner } from '@components/ui';
import { useSnackbar } from '@hooks/useSnackbar';
import { Container } from '@mui/material';
import router, { useRouter } from 'next/router';

export function QnaAnswer() {
  const snackbar = useSnackbar();
  const { qnaSeq } = router.query;
  const { data, error } = qnaDetail(Number(qnaSeq));

  console.log('이러지마제발', data);

  const fileHandler = async (files: File[], qnaAnswer: QnaAnswer) => {
    const isFileUpload = files.length > 0;
    if (isFileUpload) {
      await uploadFile({
        fileTypeId: qnaAnswer.seq,
        fileType: BbsType.TYPE_QNA_ANSWER,
        files,
      });
      console.log('qnaAnswer.seq : ', qnaAnswer.seq);
      console.log('isFileUpload : ', isFileUpload);
    }
  };

  const handleSubmit = async ({
    files,
    seq,
    qnaAnswerInput,
  }: {
    files: File[];
    seq: number;
    qnaAnswerInput: QnaAnswerInput;
  }) => {
    try {
      console.log('1: ', data.seq);
      console.log('2: ', qnaAnswerInput);
      console.log('3: ', files);
      console.log('4: ', data);
      const qnaAnswer = await uploadQnaAnswer(data.seq, qnaAnswerInput);
      console.log('qnaAnswerInput : ', qnaAnswerInput);
      await fileHandler(files, qnaAnswer.data);
      // await fileHandler(files, data);
      snackbar({ variant: 'success', message: '답변이 등록되었습니다.' });
      router.push(`/admin-center/qna`);
    } catch (e: any) {
      console.error(e);
      snackbar({ variant: 'error', message: '답변 등록에 실패했습니다.' });
    }
  };

  if (error) return <div>...ERROR</div>;
  if (!data) return <Spinner />;

  return (
    <Container>
      <QnaQuestionForm />
      <QnaAnswerForm onHandleSubmit={handleSubmit} />
    </Container>
  );
}
