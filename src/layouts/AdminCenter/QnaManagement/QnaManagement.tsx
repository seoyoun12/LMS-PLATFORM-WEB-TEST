import { categoryBoardList, removeCategoryBoard } from '@common/api/categoryBoard';
import { useDialog } from '@hooks/useDialog';
import { useSnackbar } from '@hooks/useSnackbar';
import {
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
import { downloadFile } from '@common/api/file';

const headRows = [
  { name: '번호' }, // seq
  { name: '유저번호' }, // 유저시퀀스
  { name: '제목' }, // 문의제목
  { name: '본문' }, // 문의내용
  { name: '문의유형' }, // 문의유형
  { name: '작성일' }, // 생성일
  { name: '첨부파일' }, // 첨부파일
  { name: '상태' }, // 상태
  { name: '답변여부' }, // 답변여부
  // { name: '답변등록' },
];

const tabsConfig = [
  { name: '회원가입/로그인', value: 'TYPE_SIGNUP_OR_SIGNIN' },
  { name: '교육/수료', value: 'TYPE_EDU_OR_COMPLETE' },
  { name: '홈페이지/앱', value: 'TYPE_WEB_OR_APP ' },
  { name: '기타', value: 'TYPE_ETC ' },
];

export function QnaManagement() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const [page, setPage] = useState(0);
  const [seq, setSeq] = useState<number | null>(null);
  const { data, error, mutate } = qnaAdmList({ page });
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
            <TableRow
              sx={{ cursor: 'pointer' }}
              key={qna.seq}
              hover
              onClick={() => onClickAnswerQna(qna.seq)}
            >
              <TableCell align="center">{qna.seq}</TableCell>
              <TableCell align="center">{qna.userSeq}</TableCell>
              <TableCell align="center">
                <SubjectTypography>{qna.title}</SubjectTypography>
              </TableCell>
              <TableCell align="center">
                <ContentTypography>{qna.content}</ContentTypography>
              </TableCell>
              <TableCell align="center">
                {/* {qna.type} */}
                {tabsConfig.filter(item => item.value === qna.type)[0]?.name}
              </TableCell>
              <TableCell align="center">
                {dateFormat(qna.createdDtime, 'isoDate')}
              </TableCell>
              {/* <TableCell align="center">
                {dateFormat(qna.modifiedDtime, 'isoDate')}
              </TableCell> */}
              <TableCell align="center">
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
              </TableCell>
              <TableCell align="center">
                <Chip
                  variant="outlined"
                  size="small"
                  label={qna.status === ProductStatus.APPROVE ? '정상' : '중지'}
                  color={qna.status === ProductStatus.APPROVE ? 'secondary' : 'default'}
                />
              </TableCell>
              {/* <TableCell align="center">{qna.answeredYn}</TableCell> */}
              <TableCell>
                <Chip
                  sx={{ width: '80px', marginLeft: '10px', marginBottom: '3px' }}
                  // variant="outlined"
                  size="small"
                  label={
                    qna.answeredYn === AnsweredYn.ANSWEREDY ? '답변 완료' : '답변 대기'
                  }
                  color={
                    qna.answeredYn === AnsweredYn.ANSWEREDY ? 'secondary' : 'warning'
                  }
                />
              </TableCell>
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
