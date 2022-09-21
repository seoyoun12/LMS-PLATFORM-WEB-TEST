import { Modal, Table } from '@components/ui';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  InputBase,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState, useRef, FormEvent } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import ReplayIcon from '@mui/icons-material/Replay';
import { NotFound } from '@components/ui/NotFound';

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}[] = [
  { name: 'Seq', align: 'center' },
  { name: '설문자명', align: 'center' },
  //   { name: '연결된 과정 ID', align: 'center' },
  //   { name: '연결된 과정명', align: 'center' },
];

interface Props {
  open: boolean;
  onCloseModal: () => void;
}

export function ParticipateDetailModal({ open, onCloseModal }: Props) {
  return (
    <Modal title="유저정보" open={open} onCloseModal={onCloseModal} maxWidth="lg">
      <Box minWidth="500px">
        <Typography>홍길동 님의 설문 참여 정보입니다.</Typography>
      </Box>
    </Modal>
  );
}

const ParticipateDetailModalWrap = styled(Box)``;
