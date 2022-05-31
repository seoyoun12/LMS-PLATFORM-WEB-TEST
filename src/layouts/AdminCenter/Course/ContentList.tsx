import styles from '@styles/common.module.scss';
import { Button, Container, TableHead } from '@mui/material';
import { Table } from '@components/ui';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import * as React from 'react';
import { useRouter } from 'next/router';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import styled from '@emotion/styled';
import { useState } from 'react';
import { ContentConnectModal } from '@components/admin-center/ContentConnectModal';
import { FileUpload } from '@components/ui/FileUploader/FileUpload';

const headRows: { name: string; align: 'inherit' | 'left' | 'center' | 'right' | 'justify'; }[] = [
  { name: 'ID', align: 'left' },
  { name: '콘텐츠 유형', align: 'right' },
  { name: '강의명', align: 'right' },
  { name: '학습시간', align: 'right' },
  { name: '인정시간', align: 'right' },
  { name: '페이지', align: 'right' },
  { name: '페이지 정보', align: 'right' },
  { name: '상태', align: 'right' },
];

export function ContentList() {
  const router = useRouter();
  const [ openModal, setOpenModal ] = useState(false);
  const courseId = router.query.courseId;

  const onChangePage = async (page: number) => {
    await router.push({
      pathname: router.pathname,
      query: {
        page
      }
    });
  };

  return (
    <Container className={styles.globalContainer}>
      <ContentConnectButton
        color="secondary"
        variant="contained"
        startIcon={<FileUploadIcon />}
        onClick={() => {
          setOpenModal(true);
        }}
      >
        콘텐츠 연결
      </ContentConnectButton>
      <FileUpload />
      <Table size="small">
        <TableHead>
          <TableRow>
            {headRows.map(({ name, align }) =>
              <TableCell key={name} align={align}>{name}</TableCell>
            )}
            <TableCell>{}</TableCell>
          </TableRow>
        </TableHead>
      </Table>

      <ContentConnectModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        courseId={Number(courseId)}
      />
    </Container>
  );
}

const ContentConnectButton = styled(Button)`
  display: flex;
  margin-left: auto;
  margin-bottom: 20px;
`;
