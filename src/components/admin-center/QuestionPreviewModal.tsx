import { Modal } from '@components/ui';
import { useQuestion } from '@common/api/question';

interface Props {
  open: boolean;
  handleClose: () => void;
  questionId: number | null;
}

export function QuestionPreviewModal({ open, handleClose, questionId }: Props) {
  const { question, questionError } = useQuestion(questionId);

  return (
    <Modal
      action="닫기"
      title="문제 미리보기"
      maxWidth="sm"
      fullWidth
      loading={!question}
      open={open}
      handleClose={handleClose}
      onSubmit={handleClose}
    >
    </Modal>
  );
}
