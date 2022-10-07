import { useDialog } from '@hooks/useDialog';
import { useSnackbar } from '@hooks/useSnackbar';
import {
  Box,
  Button,
  Chip,
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
import { AnsweredYn, qnaAdmList } from '@common/api/qna';
import { ProductStatus } from '@common/api/course';

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width: string;
}[] = [
  { name: 'No', align: 'center', width: '5%' },
  { name: '문의유형', align: 'center', width: '12%' },
  { name: '회원아이디(회원이름)', align: 'center', width: '17%' },
  { name: '제목', align: 'center', width: '44%' },
  { name: '작성일', align: 'center', width: '8.5%' },
  { name: '답변여부', align: 'center', width: '8.5%' },
  { name: '상태', align: 'center', width: '5%' },
];

const tabsConfig = [
  { name: '회원가입/로그인', value: 'TYPE_SIGNUP_OR_SIGNIN' },
  { name: '교육/수료', value: 'TYPE_EDU_OR_COMPLETE' },
  { name: '홈페이지/앱', value: 'TYPE_WEB_OR_APP' },
  { name: '기타', value: 'TYPE_ETC' },
];

export function QnaManagement() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const [page, setPage] = useState(0);
  const [seq, setSeq] = useState<number | null>(null);
  const { data, error, mutate } = qnaAdmList({ page });

  // console.log('1대1문의 리스트 데이터 : ', data);
  // 답변
  const onClickAnswerQna = async (seq: number) => {
    router.push(`/admin-center/qna/qna-answer/${seq}`);
    mutate();
  };

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

  if (error) return <div>Error</div>;
  if (!data) return <Spinner />;
  return (
    <Box>
      <QnaTitleTypography variant="h5">1대1 문의 목록</QnaTitleTypography>
      <Table
        pagination={true}
        totalNum={data?.totalElements}
        page={data?.number}
        onChangePage={onChangePage}
        size="small"
        sx={{ tableLayout: 'fixed' }}
      >
        <TableHead>
          <TableRow>
            {headRows.map(({ name, align, width }) => (
              <QnaTitleTableCell key={name} align={align} width={width}>
                {name}
              </QnaTitleTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.content.map(qna => (
            <TableRow
              sx={{ cursor: 'pointer' }}
              key={qna.seq}
              hover
              onClick={() => onClickAnswerQna(qna.seq)}
            >
              <QnaTableCell align="center">{qna.seq}</QnaTableCell>
              <QnaTableCell align="center">
                {tabsConfig.filter(item => item.value === qna.type)[0]?.name}
              </QnaTableCell>
              {/* <QnaTableCell align="center">
                {qna.username}({qna.name})
              </QnaTableCell> */}

              <QnaTableCell align="center">
                {qna.username ? `${qna.username}(${qna.name})` : qna.name}
              </QnaTableCell>

              <QnaTableCell align="center">
                <SubjectBox>{qna.title}</SubjectBox>
              </QnaTableCell>
              <QnaTableCell align="center">
                {dateFormat(qna.createdDtime, 'isoDate')}
              </QnaTableCell>
              {/* <TableCell align="center">
                {dateFormat(qna.modifiedDtime, 'isoDate')}
              </TableCell> */}
              {/* <TableCell align="center">
                <Button
                  // onClick={() => onClickDownloadFile(category.s3Files[0].seq)}
                  // download={category.s3Files[0] ? category.s3Files[0] : null}
                  // href={category.s3Files[0] ? category.s3Files[0].path : null}
                  // href=""
                  onClick={async () => {
                    try {
                      const blobData = await downloadFile(qna.s3Files[0].seq);

                      const url = window.URL.createObjectURL(new Blob([blobData]));
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${qna.s3Files[0].name}`;
                      a.click();
                      a.remove();
                    } catch (e: any) {
                      console.log(e);
                    }
                  }}
                >
                  {qna.s3Files[0] ? qna.s3Files[0].name : '파일없음'}
                </Button>
              </TableCell> */}
              {/* <TableCell align="center">
                {qna.s3Files[0] ? qna.s3Files[0].name : '파일없음'}
              </TableCell> */}

              {/* <TableCell align="center">{qna.answeredYn}</TableCell> */}
              <QnaTableCell align="center">
                <Chip
                  sx={{ width: '80px' }} // marginLeft: '10px', marginBottom: '3px'
                  // variant="outlined"
                  size="small"
                  label={
                    qna.answeredYn === AnsweredYn.ANSWEREDY ? '답변 완료' : '답변 대기'
                  }
                  color={
                    qna.answeredYn === AnsweredYn.ANSWEREDY ? 'secondary' : 'warning'
                  }
                />
              </QnaTableCell>
              <QnaTableCell align="center">
                <Chip
                  variant="outlined"
                  size="small"
                  label={qna.status === ProductStatus.APPROVE ? '정상' : '중지'}
                  color={qna.status === ProductStatus.APPROVE ? 'secondary' : 'default'}
                />
              </QnaTableCell>
              {/* <TableCell align="center">
                <Button
                  variant="text"
                  color="warning"
                  size="small"
                  onClick={() => onClickAnswerQna(qna.seq)}
                >
                  답변
                </Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

// 1대1문의 목록 글자
const QnaTitleTypography = styled(Typography)`
  margin-bottom: 30px;
  font-weight: 700;
`;

// 1대1문의 제목. ellipsis 적용.
const SubjectBox = styled(Box)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`;

// 1대1문의 목록 테이블의 Title부분
const QnaTitleTableCell = styled(TableCell)`
  font-weight: bold;
  background: #f5f5f5;
  border-right: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;

  &:last-child {
    border-right: 1px solid #f0f0f0;
  }
`;

// 1대1문의 목록 테이블의 본문
const QnaTableCell = styled(TableCell)`
  margin: 0;
  border-right: 1px solid #f0f0f0;

  &:first-of-type {
    /* border-right: 1px solid #e0e0e0; */
    background: #f5f5f5;
  }
`;
