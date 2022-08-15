import { categoryBoardList, removeCategoryBoard } from '@common/api/categoryBoard';
import { useDialog } from '@hooks/useDialog';
import { useSnackbar } from '@hooks/useSnackbar';
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Spinner, Table } from '@components/ui';
import dateFormat from 'dateformat';
import styled from '@emotion/styled';
import { qnaAdmList } from '@common/api/qna';

const headRows = [
  { name: 'seq' }, // seq
  { name: 'userSeq' }, // 유저시퀀스
  { name: 'title' }, // 문의제목
  { name: 'content' }, // 문의내용
  { name: 'type' }, // 문의유형
  { name: 'createdDtime' }, // 생성일
  { name: 's3Files' }, // 첨부파일
  { name: 'status' }, // 상태
  { name: 'answerdYn' }, // 답변여부
  { name: '답변' },
];

export function QnaManagement() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const [page, setPage] = useState(0);
  const [seq, setSeq] = useState<number | null>(null);
  const { data, error, mutate } = qnaAdmList({ page });

  // Pagination
  useEffect(() => {
    const { page } = router.query;
    setPage(!isNaN(Number(page)) ? Number(page) : 0);
  }, [router.query]);

  const onChangePage = async (page: number) => {
    await router.push({
      pathname: router.pathname,
      query: {
        page,
      },
    });
  };

  return (
    <>
      <Table
        pagination={true}
        totalNum={data?.totalElements}
        page={data?.number}
        onChangePage={onChangePage}
        size="small"
      >
        <TableHead>
          <TableRow>
            {headRows.map(({ name }: { name: string }) => (
              <TableCell key={name} align="center">
                {name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.content.map(qna => (
            <TableRow key={qna.seq} hover>
              <TableCell align="center">{qna.seq}</TableCell>
              <TableCell align="center">{qna.userSeq}</TableCell>
              <TableCell align="center">
                <SubjectTypography>{qna.title}</SubjectTypography>
              </TableCell>
              <TableCell align="center">
                <ContentTypography>{qna.content}</ContentTypography>
              </TableCell>
              <TableCell align="center">{qna.type}</TableCell>
              <TableCell align="center">
                {dateFormat(qna.createdDtime, 'isoDate')}
              </TableCell>
              {/* <TableCell align="center">
                {dateFormat(qna.modifiedDtime, 'isoDate')}
              </TableCell> */}
              <TableCell align="center">
                {qna.s3Files[0] ? qna.s3Files[0].name : '파일없음'}
              </TableCell>
              <TableCell align="center">{qna.status}</TableCell>
              <TableCell align="center">{qna.answeredYn}</TableCell>

              <TableCell align="center">
                <Button
                  variant="text"
                  color="warning"
                  size="small"
                  // onClick={() => onClickRemoveCategory(qna.seq)}
                >
                  답변
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

const SubjectTypography = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 150px;
`;

const ContentTypography = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 255px;
`;
