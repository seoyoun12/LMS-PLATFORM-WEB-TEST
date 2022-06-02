import styles from '@styles/common.module.scss';
import { Button, Container, TableBody, TableHead } from '@mui/material';
import { Spinner, Table } from '@components/ui';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import * as React from 'react';
import { useRouter } from 'next/router';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import styled from '@emotion/styled';
import { useState } from 'react';
import { ContentConnectModal } from '@components/admin-center/ContentConnectModal';
import { useCourse } from '@common/api/course';
import { ContentTypeHuman } from '@common/api/content';

const headRows: { name: string; align: 'inherit' | 'left' | 'center' | 'right' | 'justify'; }[] = [
  { name: 'ID', align: 'left' },
  { name: '콘텐츠명', align: 'right' },
  { name: '콘텐츠 유형', align: 'right' },
  { name: '새성 날짜', align: 'right' },
  { name: '상태', align: 'right' },
];

export function ContentList() {
  const router = useRouter();
  const [ openModal, setOpenModal ] = useState(false);
  const { courseId } = router.query;
  const { data, isError, mutate } = useCourse(Number(courseId));

  const handleCloseModal = async () => {
    setOpenModal(false);
    await mutate();
  };

  if (isError) return <div>error</div>;
  if (!data) return <Spinner />;
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
      <Table size="small">
        <TableHead>
          <TableRow>
            {headRows.map(({ name, align }) =>
              <TableCell key={name} align={align}>{name}</TableCell>
            )}
            <TableCell>{}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow hover>
            <TableCell align="left">
              {data.content.seq}
            </TableCell>
            <TableCell align="right">
              {data.content.contentName}
            </TableCell>
            <TableCell align="right">
              {ContentTypeHuman[data.content.contentType]}
            </TableCell>
            <TableCell align="right">
              {data.content.createdDtime}
            </TableCell>
            <TableCell align="right">
              {data.content.status}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <ContentConnectModal
        open={openModal}
        handleClose={handleCloseModal}
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
