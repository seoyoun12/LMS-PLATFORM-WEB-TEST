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
import { useSnackbar } from '@hooks/useSnackbar';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';

export function QnaAnswer() {
  const snackbar = useSnackbar();
  const router = useRouter();

  const fileHandler = async (files: File[], qnaAnswer: QnaAnswer) => {
    const isFileUpload = files.length > 0;
    if (isFileUpload) {
      await uploadFile({
        fileTypeId: qnaAnswer.seq,
        fileType: BbsType.TYPE_QNA_ANSWER,
        files,
      });
    }
  };

  const handleSubmit = async ({
    files,
    seq,
    qnaAnswerInput,
  }: {
    files: File[];
    seq: Qna['seq'];
    qnaAnswerInput: QnaAnswerInput;
  }) => {
    try {
      // await uploadQnaAnswer({ seq: data?.seq, qnaAnswerInput });
      const qnaAnswer = await uploadQnaAnswer(seq, qnaAnswerInput);
      await fileHandler(files, qnaAnswer.data);
      snackbar({ variant: 'success', message: '답변이 등록되었습니다.' });
      router.push(`/admin-center/qna`);
    } catch (e: any) {
      console.error(e);
      snackbar({ variant: 'error', message: '답변 등록에 실패했습니다.' });
    }
  };

  return (
    <Container>
      <QnaQuestionForm />
      <QnaAnswerForm onHandleSubmit={handleSubmit} />
    </Container>
  );
}
