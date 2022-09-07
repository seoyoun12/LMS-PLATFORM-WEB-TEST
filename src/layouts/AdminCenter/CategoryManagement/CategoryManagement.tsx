import {
  BoardType,
  CategoryBoard,
  categoryBoardList,
  removeCategoryBoard,
} from '@common/api/categoryBoard';
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
import { CatchingPokemonSharp } from '@mui/icons-material';
import { ProductStatus } from '@common/api/course';
import { downloadFile } from '@common/api/file';
import { S3Files } from 'types/file';

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width: string;
}[] = [
  { name: 'No', align: 'center', width: '10%' }, // seq
  { name: '게시판유형', align: 'center', width: '10%' }, // boardType
  { name: '제목', align: 'center', width: '10%' }, // subject
  { name: '작성일', align: 'center', width: '10%' }, // createdDtime
  { name: '수정일', align: 'center', width: '10%' }, // modifiedDtime
  { name: '조회수', align: 'center', width: '10%' }, // hit
  { name: '공지여부', align: 'center', width: '10%' }, // noticeYn
  { name: '공개여부', align: 'center', width: '10%' }, // publicYn
  { name: '상태', align: 'center', width: '10%' }, // status
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

  // for (let i = 0; i < tabsConfig.length; i++) {
  //   if (tabsConfig[i].value === data.content) {
  //   }
  // }

  // 다운로드
  // const onClickDownloadFile = async (seq: number) => {
  //   try {
  //     const blobData = await downloadFile(seq);
  //     const url = window.URL.createObjectURL(new Blob([blobData]));
  //     const a = document.createElement('a');
  //     console.log('blobData : ', blobData);
  //     console.log('seq : ', seq);
  //     console.log('data : ', data.content);
  //     a.href = url;
  //     a.download = `${s3Files[0].name}`;
  //     a.click();
  //     a.remove();
  //   } catch (e: any) {
  //     console.log(e);
  //   }
  // };

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
    <Box>
      <Typography fontSize={30} fontWeight="bold">
        게시판구분
      </Typography>
      <RadioGroup row sx={{ mb: 6 }}>
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

      <CategoryTypography variant="h5">게시판 목록</CategoryTypography>

      <Table
        pagination={true}
        totalNum={data?.totalElements}
        page={data?.number}
        onChangePage={onChangePage}
        size="small"
      >
        <TableHead>
          <CategoryTableRow>
            {headRows.map(
              ({
                name,
                align,
                width,
              }: {
                name: string;
                align: string;
                width: string;
              }) => (
                <CategoryTitleTableCell key={name} align="center" width={width}>
                  {name}
                </CategoryTitleTableCell>
              )
            )}
          </CategoryTableRow>
        </TableHead>

        <TableBody>
          {data?.content.map(category => (
            <TableRow
              sx={{ cursor: 'pointer' }}
              key={category.seq}
              hover
              onClick={() => onClickmodifyCategoryBoard(category.seq)}
            >
              <CategoryTableCell>{category.seq}</CategoryTableCell>
              <CategoryTableCell>
                {tabsConfig.filter(item => item.value === category.boardType)[0]?.name}
              </CategoryTableCell>
              <CategoryTableCell>
                <SubjectTypography>{category.subject}</SubjectTypography>
              </CategoryTableCell>
              <CategoryTableCell>
                {dateFormat(category.createdDtime, 'isoDate')}
              </CategoryTableCell>

              <CategoryTableCell>
                {dateFormat(category.modifiedDtime, 'isoDate')}
              </CategoryTableCell>
              <CategoryTableCell>{category.hit}</CategoryTableCell>

              <CategoryTableCell>{category.noticeYn}</CategoryTableCell>
              <CategoryTableCell>{category.publicYn}</CategoryTableCell>
              <CategoryTableCell>
                <Chip
                  variant="outlined"
                  size="small"
                  label={category.status === ProductStatus.APPROVE ? '정상' : '중지'}
                  color={
                    category.status === ProductStatus.APPROVE ? 'secondary' : 'default'
                  }
                />
              </CategoryTableCell>
              {/* <TableCell align="center">
                <Button
                  // onClick={() => onClickDownloadFile(category.s3Files[0].seq)}
                  // download={category.s3Files[0] ? category.s3Files[0] : null}
                  // href={category.s3Files[0] ? category.s3Files[0].path : null}
                  // href=""
                  onClick={async () => {
                    try {
                      const blobData = await downloadFile(category.s3Files[0].seq);
                      const url = window.URL.createObjectURL(new Blob([blobData]));
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${category.s3Files[0].name}`;
                      a.click();
                      a.remove();
                    } catch (e: any) {
                      console.log(e);
                    }
                  }}
                >
                  {category.s3Files[0] ? category.s3Files[0].name : '파일없음'}
                </Button>
              </TableCell> */}
              {/* <TableCell align="center">
                {category.s3Files[0] ? category.s3Files[0].name : '없음'}
              </TableCell> */}
              {/* <TableCell align="center">
                <Button
                  variant="text"
                  // color="neutral"
                  color="warning"
                  size="small"
                  onClick={() => onClickmodifyCategoryBoard(category.seq)}
                >
                  수정
                </Button>
              </TableCell> */}
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
    </Box>
  );
}

const CategoryTypography = styled(Typography)`
  margin-bottom: 12px;
  font-weight: 700;
`;

const CategoryTableRow = styled(TableRow)`
  white-space: nowrap;
`;

const SubjectTypography = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  /* width: 150px; */
`;

const ContentTypography = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 255px;
`;

const CategoryTitleTableCell = styled(TableCell)`
  font-weight: bold;
  background: #f5f5f5;
  border-right: 1px solid #f0f0f0;

  &:last-child {
    border-right: 1px solid #f0f0f0;
  }
`;
const CategoryTableCell = styled(TableCell)`
  white-space: nowrap;
  text-align: center;
  padding-top: 10px;
  margin: 0;
  border-right: 1px solid #f0f0f0;

  &:first-child {
    /* border-right: 1px solid #e0e0e0; */
    background: #f5f5f5;
  }
`;
