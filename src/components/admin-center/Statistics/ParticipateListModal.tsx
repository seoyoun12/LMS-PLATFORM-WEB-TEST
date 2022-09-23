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
import { ParticipateDetailModal } from './ParticipateDetailModal';

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

export function ParticipateListModal({ open, onCloseModal }: Props) {
  const [notFound, setNotFound] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [openParticipateDetail, setOpenParticipateDetail] = useState(false);

  const handleClose = () => {
    setOpenParticipateDetail(false);
  };
  const handleSearch = async (e: FormEvent, isReload = false) => {
    e.preventDefault();
    setNotFound(false);
    if (isReload) {
      setPage(0);
      return;
    }
    if (searchInputRef.current) {
      setKeyword(searchInputRef.current.value);
    }
  };

  return (
    <Modal title="설문 참여자" open={open} onCloseModal={onCloseModal} maxWidth="lg">
      <Box minWidth="500px">
        <SearchContainer onSubmit={handleSearch}>
          <SearchInput
            inputRef={searchInputRef}
            placeholder="설문 참여자 이름 입력"
            size="small"
            type="search"
          />
          <IconButton type="submit">
            <SearchIcon />
          </IconButton>
        </SearchContainer>
        <TableTitleSection>
          <Typography variant="subtitle1">설문 참여자 목록(클릭시 정보보기)</Typography>
          <ReloadButton
            size="small"
            color="neutral"
            variant="text"
            endIcon={<ReplayIcon htmlColor={grey[700]} />}
            onClick={e => handleSearch(e, true)}
          >
            전체 다시 불러오기
          </ReloadButton>
        </TableTitleSection>
        {notFound ? (
          <NotFound content="설문에 참여한 유저정보가 존재하지 않습니다!" />
        ) : (
          <Table
          // pagination={true}
          // totalNum={data.totalElements}
          // page={data.number}
          // onChangePage={onChangePage}
          // size="small"
          >
            <TableHead>
              <TableRow>
                {headRows.map(({ name, align }) => (
                  <TableCell key={name} align={align}>
                    {name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => setOpenParticipateDetail(true)}
              >
                <TableCell component="th" scope="row" align="center">
                  홍홍
                </TableCell>
                <TableCell align="center">홍길동씨</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </Box>
      <ParticipateDetailModal open={openParticipateDetail} onCloseModal={handleClose} />
    </Modal>
  );
}

const ParticipateListModalWrap = styled(Box)``;
const SearchContainer = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px 6px 0 6px;
  margin-bottom: 24px;
  border-radius: 4px;
  border: 1px solid ${grey[300]};
`;

const SearchInput = styled(InputBase)`
  width: 100%;
`;

const TableTitleSection = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 12px;
`;

const ReloadButton = styled(Button)`
  margin-left: auto;
`;
