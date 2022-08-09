import { useCourseList } from '@common/api/adm/course';
import { Modal, Spinner, Table } from '@components/ui';
import { FormEvent, useRef, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputBase,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import { grey } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  open: boolean;
  //   courseSeq: number;
  handleClose: () => void;
  handleGetCourseSeq: (courseSeq: number, courseName: string) => void;
}

export function CourseRegiModal({ open, handleClose, handleGetCourseSeq }: Props) {
  const [keyword, setKeyword] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const { data, error } = useCourseList({ page: 0, courseTitle: keyword });

  const handleSearch = async (event: FormEvent, isReload = false) => {
    event.preventDefault();
    if (isReload) {
      setKeyword(null);
      setPage(0);
    }

    if (searchInputRef.current) {
      setKeyword(searchInputRef.current.value);
    }
  };
  const onChangePage = (page: number) => {
    setPage(page);
  };

  return (
    <Modal open={open} onCloseModal={handleClose} title="과정콘텐츠">
      <SearchContainer onSubmit={handleSearch}>
        <SearchInput inputRef={searchInputRef} placeholder="콘텐츠 검색" size="small" type="search" />
        <IconButton type="submit">
          <SearchIcon />
        </IconButton>
      </SearchContainer>
      {data ? (
        <Table pagination={true} totalNum={data.totalElements} page={data.number} onChangePage={onChangePage}>
          <TableHead>
            <TableCell>seq</TableCell>
            <TableCell>과정명</TableCell>
            <TableCell></TableCell>
          </TableHead>
          <TableBody>
            {data.content.map(item => {
              return (
                <TableRow key={item.seq}>
                  <TableCell>{item.seq}</TableCell>
                  <TableCell>{item.courseName}</TableCell>
                  <TableCell>
                    <ConnectButton
                      // disabled={!!content.courseSeq}
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleGetCourseSeq(item.seq, item.courseName)}
                    >
                      선택하기
                    </ConnectButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <Spinner />
      )}
    </Modal>
  );
}

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
const ConnectButton = styled(Button)`
  margin-right: 12px;
`;
