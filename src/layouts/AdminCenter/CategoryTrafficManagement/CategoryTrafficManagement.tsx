import { categoryBoardList } from '@common/api/categoryBoard';
import {
  Box,
  Chip,
  FormControlLabel,
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
import { ProductStatus } from '@common/api/course';

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width: string;
}[] = [
  // { name: 'No1', align: 'center', width: '2.5%' }, // seq
  { name: 'No', align: 'center', width: '5%' }, // seq
  { name: '게시판유형', align: 'center', width: '8.5%' }, // boardType
  { name: '제목', align: 'center', width: '32%' }, // subject
  { name: '작성일', align: 'center', width: '12%' }, // createdDtime
  { name: '수정일', align: 'center', width: '12%' }, // modifiedDtime
  { name: '조회수', align: 'center', width: '8.5%' }, // hit
  { name: '공지여부', align: 'center', width: '8.5%' }, // noticeYn
  { name: '공개여부', align: 'center', width: '8.5%' }, // publicYn
  { name: '상태', align: 'center', width: '5%' }, // status
];

const tabsConfig = [
  { name: '공지사항', value: 'TYPE_NOTICE_PROVINCIAL' },
  { name: '자주묻는질문', value: 'TYPE_FAQ_PROVINCIAL' },
];

export function CategoryTrafficManagement() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [typeValue, setTypeValue] = useState('TYPE_NOTICE_PROVINCIAL');
  const { data, error, mutate } = categoryBoardList({
    boardType: typeValue,
    page,
  });

  // 수정
  const onClickmodifyCategoryTrafficBoard = async (seq: number) => {
    router.push(`/admin-center/category-traffic/modify/${seq}`);
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

  if (error) return <div>...ERROR</div>;
  if (!data) return <Spinner />;

  return (
    <Box>
      <Typography fontSize={30} fontWeight="bold">
        게시판 구분
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

      <CategoryTrafficTypography variant="h5">
        게시판(도민) 목록
      </CategoryTrafficTypography>

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
                <CategoryTrafficTitleTableCell key={name} align="center" width={width}>
                  {name}
                </CategoryTrafficTitleTableCell>
              )
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.content.map(category => (
            <TableRow
              sx={{ cursor: 'pointer' }}
              key={category.seq}
              hover
              onClick={() => onClickmodifyCategoryTrafficBoard(category.seq)}
            >
              <CategoryTrafficTableCell align="center">
                {category.postTypeSeq}
              </CategoryTrafficTableCell>
              <CategoryTrafficTableCell align="center">
                {tabsConfig.filter(item => item.value === category.boardType)[0]?.name}
              </CategoryTrafficTableCell>
              <CategoryTrafficTableCell align="center">
                <SubjectBox>{category.subject}</SubjectBox>
              </CategoryTrafficTableCell>
              <CategoryTrafficTableCell align="center">
                {dateFormat(category.createdDtime, 'isoDate')}
              </CategoryTrafficTableCell>
              <CategoryTrafficTableCell align="center">
                {dateFormat(category.modifiedDtime, 'isoDate')}
              </CategoryTrafficTableCell>
              <CategoryTrafficTableCell align="center">
                {category.hit}
              </CategoryTrafficTableCell>
              <CategoryTrafficTableCell align="center">
                {category.noticeYn === 'Y' ? '공지중' : '비공지'}
              </CategoryTrafficTableCell>
              <CategoryTrafficTableCell align="center">
                {category.publicYn === 'Y' ? '공개중' : '비공개'}
              </CategoryTrafficTableCell>
              <CategoryTrafficTableCell align="center">
                <Chip
                  variant="outlined"
                  size="small"
                  label={category.status === ProductStatus.APPROVE ? '정상' : '중지'}
                  color={
                    category.status === ProductStatus.APPROVE ? 'secondary' : 'default'
                  }
                />
              </CategoryTrafficTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

// 게시판 목록 글자
const CategoryTrafficTypography = styled(Typography)`
  margin-bottom: 30px;
  font-weight: 700;
`;

// 게시판 제목. ellipsis 적용.
const SubjectBox = styled(Box)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`;

// 게시판 목록 테이블의 Title부분
const CategoryTrafficTitleTableCell = styled(TableCell)`
  font-weight: bold;
  background: #f5f5f5;
  border-right: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;

  &:last-child {
    border-right: 1px solid #f0f0f0;
  }
`;

// 게시판 목록 테이블의 본문
const CategoryTrafficTableCell = styled(TableCell)`
  margin: 0;
  border-right: 1px solid #f0f0f0;

  &:first-of-type {
    background: #f5f5f5;
  }
`;
