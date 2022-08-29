import { Modal, Table } from '@components/ui';
import { FormEvent, useRef, useState } from 'react';
import { useContentList } from '@common/api/adm/content';
import styles from '@styles/common.module.scss';
import {
  Button,
  Container,
  InputBase,
  TableBody,
  TableHead,
  Typography,
} from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Link } from '@components/common';
import { grey } from '@mui/material/colors';
import * as React from 'react';
import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { connectCourseToContent, disConnectContent } from '@common/api/adm/course';
import { useDialog } from '@hooks/useDialog';
import { useSnackbar } from '@hooks/useSnackbar';
import ReplayIcon from '@mui/icons-material/Replay';

interface Props {
  open: boolean;
  courseSeq: number;
  handleClose: () => void;
}

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}[] = [
  { name: 'ID', align: 'left' },
  { name: '콘텐츠명', align: 'right' },
  { name: '연결된 과정 ID', align: 'right' },
  { name: '연결된 과정명', align: 'right' },
];

export function ContentConnectModal({ open, handleClose, courseSeq }: Props) {
  const dialog = useDialog();
  const snackbar = useSnackbar();
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const { data, mutate } = useContentList({ page, contentName: keyword });

  const handleConnect = async (contentSeq: number) => {
    try {
      await connectCourseToContent({ courseSeq: courseSeq, contentSeq });
      await mutate();
      snackbar({ variant: 'success', message: '연결이 완료되었습니다.' });
    } catch (e) {
      snackbar({ variant: 'error', message: e.data.message });
      console.error(e);
    }
  };

  const handleDisconnect = async (courseSeq: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: '콘텐츠 연결 해제하기',
        description: '정말 콘텐츠 연결을 해제하시겠습니까?',
        confirmText: '해제하기',
        cancelText: '취소하기',
      });

      if (dialogConfirmed) {
        await disConnectContent(courseSeq);
        await mutate();
        snackbar({ variant: 'success', message: '해제가 완료되었습니다.' });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const handleSearch = async (event: FormEvent, isReload = false) => {
    event.preventDefault();
    if (isReload) {
      setKeyword(null);
      setPage(0);
      return mutate();
    }

    if (searchInputRef.current) {
      setKeyword(searchInputRef.current.value);
    }
  };

  return (
    <Modal
      title="콘텐츠 연결"
      maxWidth="md"
      loading={!data}
      open={open}
      onClose={handleClose}
      onCloseModal={handleClose}
      fullWidth
    >
      <ContentBody className={styles.globalContainer}>
        <SearchContainer onSubmit={handleSearch}>
          <SearchInput
            inputRef={searchInputRef}
            placeholder="콘텐츠 검색"
            size="small"
            type="search"
          />
          <IconButton type="submit">
            <SearchIcon />
          </IconButton>
        </SearchContainer>
        <TableTitleSection>
          <Typography variant="subtitle1">콘텐츠 목록</Typography>
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
        {data ? (
          <Table
            pagination={true}
            totalNum={data.totalElements}
            page={data.number}
            onChangePage={onChangePage}
            size="small"
          >
            <TableHead>
              <TableRow>
                {headRows.map(({ name, align }) => (
                  <TableCell key={name} align={align}>
                    {name}
                  </TableCell>
                ))}
                <TableCell>{}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.content.map(content => (
                <TableRow key={content.seq} hover>
                  <TableCell component="th" scope="row">
                    {content.seq}
                  </TableCell>
                  <TableCell align="right">
                    <Link
                      href={`/content/${content.seq}`}
                      underline="hover"
                      color={grey[900]}
                    >
                      {content.contentName}
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    {content.courseSeq ? content.courseSeq : '-'}
                  </TableCell>
                  <TableCell align="right">
                    {content.courseName ? content.courseName : '-'}
                  </TableCell>
                  <TableCell align="right">
                    <ConnectButton
                      disabled={!!content.courseSeq}
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleConnect(content.seq)}
                    >
                      연결하기
                    </ConnectButton>
                    <Button
                      disabled={!content.courseSeq}
                      variant="outlined"
                      color="neutral"
                      size="small"
                      onClick={() => handleDisconnect(content.courseSeq)}
                    >
                      해제하기
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : null}
      </ContentBody>
    </Modal>
  );
}

const ContentBody = styled(Container)`
  padding: 20px;
`;

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

const TableTitleSection = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 12px;
`;

const ReloadButton = styled(Button)`
  margin-left: auto;
`;
