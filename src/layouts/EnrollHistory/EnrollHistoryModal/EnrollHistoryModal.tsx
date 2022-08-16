import { Modal } from '@components/ui';

interface Props {
  open: boolean;
  handleClose: () => void;
  courseUserSeq: number;
}

export function EnrollHistoryModal({ open, handleClose, courseUserSeq }: Props) {
  return (
    <Modal open={open} onCloseModal={handleClose} title="모달">
      모달
    </Modal>
  );
}
