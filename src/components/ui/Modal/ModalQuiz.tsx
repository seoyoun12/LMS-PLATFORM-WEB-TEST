import * as React from 'react';
import { LoadingButton } from '@mui/lab';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Spinner } from '@components/ui';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import router, { useRouter } from 'next/router';
import { Tabs3 } from '../Tabs3';

type ModalProps = {
  open: boolean;
  onCloseModal: () => void;
  title?: React.ReactNode;
  onSubmit?: () => void;
  actionLoading?: boolean;
  actionDisabled?: boolean;
  loading?: boolean;
  action?: string | React.ReactNode;
} & Omit<DialogProps, 'title'>;

export function ModalQuiz({
  open,
  children,
  title,
  action,
  onCloseModal,
  onSubmit,
  actionLoading,
  actionDisabled,
  loading = false,
  ...dialogProps
}: ModalProps) {
  return (
    <DialogBox
      onClose={onCloseModal}
      aria-labelledby='modal-title'
      open={open}
      {...dialogProps}
    >
      {loading ? (
        <Spinner />
      ) : (
        <ModalBox>
          <Tabs3></Tabs3>
        </ModalBox>
      )}
    </DialogBox>
  );
}

const DialogBox = styled(Dialog)`
  .MuiPaper-root {
    margin: 0;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* width: fit-content; */
  }
  .MuiDialog-container {
    justify-content: center;
    width: 100%;
  }
  //온라인 교육 신청쪽 테이블 박살남.
  @media (max-width: 820px) {
    .MuiDialogContent-root {
      padding: 0;
    }
  }
  @media (max-width: 768px) {
    .MuiPaper-root {
      margin: 0;
      width: 100%;
    }
    .MuiDialog-container {
      justify-content: none;
      width: 100%;
    }
    .MuiDialogContent-root {
      padding: 0;
    }
  }
  @media (max-width: 500px) {
    .MuiPaper-root {
      margin: 0;
      width: 100%;
    }
    .MuiDialog-container {
      justify-content: none;
      width: 100%;
    }
    .MuiDialogContent-root {
      padding: 0;
    }
  }
`;

const ModalBox = styled(Box)`
  /* border: 1px solid red; */
  width: 98%;
  height: 95%;
  /* border: 1px solid red; */
`;
