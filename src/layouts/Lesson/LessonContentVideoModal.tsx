import { Modal } from '@components/ui/Modal/Modal copy';

export default function ModalModal() {
  //모달이어라~

  return (
    <Modal
      title='콘텐츠 연결'
      maxWidth='md'
      loading={!data}
      open={open}
      onClose={handleClose}
      onCloseModal={handleClose}
      fullWidth
    />
  );
}
