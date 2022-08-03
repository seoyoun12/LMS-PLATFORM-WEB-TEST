import { Modal } from '@components/ui';
import { useQuestion } from '@common/api/adm/question';

interface Props {
  open: boolean;
  handleClose: () => void;
  questionId: number | null;
}

export function QuestionPreviewModal({ open, handleClose, questionId }: Props) {
  const { question } = useQuestion(questionId); // questionError

  return (
    <Modal
      action="닫기"
      title="문제 미리보기"
      maxWidth="sm"
      fullWidth
      loading={!question}
      open={open}
      onCloseModal={handleClose}
      onSubmit={handleClose}
    >
    </Modal>
  );
}
