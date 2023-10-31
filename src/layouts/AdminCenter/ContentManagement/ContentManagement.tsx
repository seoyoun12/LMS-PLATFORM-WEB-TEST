import { Box,Chip,TableBody,TableHead,Typography } from '@mui/material';
import { Table } from '@components/ui';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import dateFormat from 'dateformat';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ProductStatus } from '@common/api/course';
import { useContentList } from '@common/api/adm/content';
import { Spinner } from '@components/ui';
import styled from '@emotion/styled';

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width: string;
}[] = [
  { name: 'No', align: 'center', width: '5%' },
  { name: '콘텐츠명', align: 'center', width: '50%' },
  { name: '연결된 과정', align: 'center', width: '30%' },
  { name: '생성 날짜', align: 'center', width: '10%' },
  { name: '상태', align: 'center', width: '5%' },
];

export function ContentManagement() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const { data, error } = useContentList({ page });

  useEffect(() => {
    const { page } = router.query;
    setPage(!isNaN(Number(page)) ? Number(page) : 0);
  }, [router]);

  const onChangePage = async (page: number) => {
    await router.push({
      pathname: router.pathname,
      query: {
        page,
      },
    });
  };

  const onClickModifyContent = async (seq: number) => {
    router.push(`/admin-center/content/modify/${seq}`);
  };


  if (error) return <div>Error</div>;
  if (!data) return <Spinner />;
  return (
    <Box>
      <ContentTitleTypography variant="h5">콘텐츠 목록</ContentTitleTypography>

      <Table
        pagination={true}
        totalNum={data.totalElements}
        page={data.number}
        onChangePage={onChangePage}
        size="small"
        sx={{ tableLayout: 'fixed' }}
      >
        <TableHead>
          <TableRow>
            {headRows.map(({ name, align, width }) => (
              <ContentTitleTableCell key={name} align={align} width={width}>
                {name}
              </ContentTitleTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.content.map(content => (
            <TableRow
              sx={{ cursor: 'pointer' }}
              key={content.seq}
              hover
              onClick={() => onClickModifyContent(content.seq)}
            >
              <ContentTableCell align="center">{content.seq}</ContentTableCell>
              <ContentTableCell align="center">
                <SubjectBox>{content.contentName}</SubjectBox>
              </ContentTableCell>
              <ContentTableCell align="center">
                <SubjectBox>{content.courseName}</SubjectBox>
              </ContentTableCell>
              <ContentTableCell align="center">
                {dateFormat(content.createdDtime, 'isoDate')}
              </ContentTableCell>
              <ContentTableCell align="center">
                <Chip
                  variant="outlined"
                  size="small"
                  label={content.status === ProductStatus.APPROVE ? '정상' : '중지'}
                  color={
                    content.status === ProductStatus.APPROVE ? 'secondary' : 'default'
                  }
                />
              </ContentTableCell>

             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

// 콘텐츠 목록 글자
const ContentTitleTypography = styled(Typography)`
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

// 콘텐츠 목록 테이블의 Title부분
const ContentTitleTableCell = styled(TableCell)`
  font-weight: bold;
  background: #f5f5f5;
  border-right: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;

  &:last-child {
    border-right: 1px solid #f0f0f0;
  }
`;

// 콘텐츠 목록 테이블의 본문
const ContentTableCell = styled(TableCell)`
  margin: 0;
  border-right: 1px solid #f0f0f0;

  &:first-of-type {
    /* border-right: 1px solid #e0e0e0; */
    background: #f5f5f5;
  }
`;
