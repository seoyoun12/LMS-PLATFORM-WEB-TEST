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
  TextField,
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
        <Box display="flex" fontSize="16px">
          <Box>
            <Box lineHeight="24px">1.</Box>
          </Box>
          <Box pl={1}>
            <Box lineHeight="24px">본 교육에 만족하셨습니까?</Box>
            <Box lineHeight="24px">{`=>`} 만족합니다.</Box>
          </Box>
        </Box>
        <Box display="flex" fontSize="16px">
          <Box>
            <Box lineHeight="24px">2.</Box>
          </Box>
          <Box pl={1} width="100%">
            <Box>본 교육을 듣고 느낀점을 서술해주십시오.</Box>
            <TextField
              multiline
              rows={4}
              fullWidth
              value={'현재 설문참여정보는 준비중인 기능입니다.'}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

const ParticipateDetailModalWrap = styled(Box)``;
