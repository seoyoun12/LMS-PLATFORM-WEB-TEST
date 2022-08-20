import {
  BoardType,
  CategoryBoard,
  categoryBoardList,
  removeCategoryBoard,
} from '@common/api/categoryBoard';
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
import { CatchingPokemonSharp } from '@mui/icons-material';
import { ProductStatus } from '@common/api/course';

const headRows = [
  { name: '글번호' }, // seq
  { name: '유저번호' }, // userSeq
  { name: '유저ID' }, // username
  { name: '제목' }, // subject
  { name: '본문' }, // content
  { name: '게시판유형' }, // boardType
  { name: '작성일' }, // createdDtime
  { name: '수정일' }, // modifiedDtime
  { name: '공지여부' }, // noticeYn
  { name: '공개여부' }, // publicYn
  { name: '상태' }, // status
  { name: '조회수' }, // hit
  { name: '첨부파일' }, // s3Files
  { name: '수정' },
  // { name: '삭제' },
];

const tabsConfig = [
  // { name: '전체', value: '' }, // board Type이 required
  { name: '공지사항', value: 'TYPE_NOTICE' },
  { name: '자주묻는질문', value: 'TYPE_FAQ' },
  { name: '회원가입 및 로그인', value: 'TYPE_GUIDE_AUTH ' },
  { name: '교육신청방법', value: 'TYPE_GUIDE_EDU_REGI ' },
  { name: '학습방법', value: 'TYPE_GUIDE_EDU_LEARNING ' },
];

export function CategoryManagement() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const [page, setPage] = useState(0);
  const [seq, setSeq] = useState<number | null>(null);
  const [typeValue, setTypeValue] = useState('TYPE_NOTICE');
  const { data, error, mutate } = categoryBoardList({
    boardType: typeValue,
    page,
  });

  console.log('파일 다운로드 구현해보기');
  console.log('data : ', data);
  console.log('한글변환 : ', tabsConfig[0].value);
  // console.log('data.content : ', data.content);

  console.log('123 : ', data?.content);

  // for (let i = 0; i < tabsConfig.length; i++) {
  //   console.log('i는 : ', i);
  //   if (tabsConfig[i].value === data.content) {
  //     console.log('asd');
  //   }
  // }

  // 다운로드
  const onClickDownloadFile = async () => {
    const link = document.createElement('a');
    link.download = `${data.content[0]?.s3Files[0]}`;
    // link.href = `${data.content[0]?.s3Files[0].path}`;
    // link.href = data.content[0]?.s3Files[0]?.path;
    link.click();
  };

  // 수정
  const onClickmodifyCategoryBoard = async (seq: number) => {
    router.push(`/admin-center/category/modify/${seq}`);
    mutate();
  };

  // 삭제
  const onClickRemoveCategory = async (seq: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: '공지사항 삭제하기',
        description: '정말로 삭제하시겠습니까?',
        confirmText: '삭제하기',
        cancelText: '취소',
      });
      if (dialogConfirmed) {
        await removeCategoryBoard(seq);
        snackbar({ variant: 'success', message: '성공적으로 삭제되었습니다.' });
        await mutate();
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
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

  if (error) return <div>...ERROR</div>;
  if (!data) return <Spinner />;

  return (
    <div>
      <RadioGroup row>
        {tabsConfig.map(({ name, value }: { name: string; value: string }) => (
          <FormControlLabel
            key={name}
            label={name}
            value={value}
            control={<Radio checked={typeValue == value} />}
            onClick={() => setTypeValue(value)}
          />
        ))}
      </RadioGroup>

      <Typography variant="h5">게시판 목록</Typography>

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
          {data?.content.map(category => (
            <TableRow key={category.seq} hover>
              <TableCell align="center">{category.seq}</TableCell>
              <TableCell align="center">{category.userSeq}</TableCell>
              <TableCell align="center">{category.username}</TableCell>
              <TableCell align="center">
                <SubjectTypography>{category.subject}</SubjectTypography>
              </TableCell>
              <TableCell align="center">
                <ContentTypography>{category.content}</ContentTypography>
              </TableCell>
              <TableCell align="center">{category.boardType}</TableCell>
              <TableCell align="center">
                {dateFormat(category.createdDtime, 'isoDate')}
              </TableCell>
              <TableCell align="center">
                {dateFormat(category.modifiedDtime, 'isoDate')}
              </TableCell>
              <TableCell align="center">{category.noticeYn}</TableCell>
              <TableCell align="center">{category.publicYn}</TableCell>
              <TableCell style={{ width: 10 }} align="right">
                <Chip
                  variant="outlined"
                  size="small"
                  label={category.status === ProductStatus.APPROVE ? '정상' : '중지'}
                  color={
                    category.status === ProductStatus.APPROVE ? 'secondary' : 'default'
                  }
                />
              </TableCell>
              <TableCell align="center">{category.hit}</TableCell>
              <TableCell align="center">
                <Button
                  onClick={onClickDownloadFile}
                  // download={category.s3Files[0] ? category.s3Files[0] : null}
                  // href={category.s3Files[0] ? category.s3Files[0].path : null}
                  // href=""
                >
                  {category.s3Files[0] ? category.s3Files[0].name : '파일없음'}
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="text"
                  // color="neutral"
                  color="warning"
                  size="small"
                  onClick={() => onClickmodifyCategoryBoard(category.seq)}
                >
                  수정
                </Button>
              </TableCell>
              {/* <TableCell align="center">
                <Button
                  variant="text"
                  color="warning"
                  size="small"
                  onClick={() => onClickRemoveCategory(category.seq)}
                >
                  삭제
                </Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
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
