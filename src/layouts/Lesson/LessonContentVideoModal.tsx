import { ModalQuiz } from '@components/ui/Modal';
import { IQuizTime } from './LessonContentVideo';
interface Props {
  open: boolean;
  courseSeq?: number;
  handleClose: () => void;
  quiz: IQuizTime
}

export function LessonContentVideoModal({
  open,
  handleClose,
  quiz
}: Props) {
  return (
    <ModalQuiz
      title='헬로'
      maxWidth='md'
      // loading={!data}
      open={open}
      onClose={handleClose}
      onCloseModal={handleClose}
      quiz={quiz}
      fullWidth
    />
  );
}
