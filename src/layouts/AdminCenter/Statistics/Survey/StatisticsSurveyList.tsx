
import { Table } from '@components/ui';
import { Box, Button, Chip, TableBody, TableHead, Typography } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useEffect, useState } from 'react';
import { Link } from '@components/common';
import { grey } from '@mui/material/colors';
import { useSnackbar } from '@hooks/useSnackbar';
import { useDialog } from '@hooks/useDialog';
import * as React from 'react';
import { useRouter } from 'next/router';
import styles from '@styles/common.module.scss';
import { Container } from '@mui/material';
import dateFormat from 'dateformat';
import { YN } from '@common/constant';
import { Spinner } from '@components/ui';
import { css } from '@emotion/css';

import { useSurveyAdm } from '@common/api/adm/survey';
import styled from '@emotion/styled';

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width: string;
}[] = [
  { name: '번호', align: 'left', width: '5%' },
  { name: '과정명', align: 'right', width: '70%' },
  { name: '생성 날짜', align: 'right', width: '20%' },
  // { name: '노출 여부', align: 'right' },
  { name: '상태', align: 'right', width: '5%' },
  // { name: '수강생', align: 'right' },
  // { name: '수료생', align: 'right' },
];

export function StatisticsSurveyList() {
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [seq, setSeq] = useState<number | null>(null);

  const { data, error, mutate } = useSurveyAdm({ page });
  // const { data, error, mutate } = courseList({ page });

  // pagination
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

  const onClickModify = (seq: number) => {
    router.push(`/admin-center/statistics/survey/detail/${seq}`);
  };

  if (error) return <div>Error</div>;
  if (!data) return <Spinner />;
  // return <Spinner />;

  return (
    // <Container className={styles.globalContainer}>
    <Box>
      <StatisticsSurveyTypography variant="h5">
        설문 목록(통계)
      </StatisticsSurveyTypography>

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
                <StatisticsSurveyTitleTableCell key={name} align="center" width={width}>
                  {name}
                </StatisticsSurveyTitleTableCell>
              )
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.content.map(survey => (
            <TableRow
              key={survey.seq}
              hover
              onClick={() => onClickModify(survey.seq)}
              sx={{ cursor: 'pointer' }}
            >
              <StatisticsSurveyTableCell align="center">
                {survey.seq}
              </StatisticsSurveyTableCell>
              <StatisticsSurveyTableCell align="center">
                {/* <Link
                  href={`/admin-center/course/modify/${survey.seq}`}
                  underline="hover"
                  color={grey[900]}
                > */}
                {survey.title}
                {/* </Link> */}
              </StatisticsSurveyTableCell>
              {/* <TableCell align="right" className={spaceNoWrap}> */}
              <StatisticsSurveyTableCell align="center">
                {dateFormat(survey.createdDtime, 'isoDate')}
              </StatisticsSurveyTableCell>
              {/* <TableCell align="right">
                <Chip
                  label={survey.displayYn === YN.YES ? '보임' : '숨김'}
                  variant="outlined"
                  size="small"
                  color={survey.displayYn === YN.YES ? 'secondary' : 'default'}
                  />
              </TableCell> */}
              <StatisticsSurveyTableCell align="center">
                <Chip
                  label={survey.status ? '정상' : '중지'}
                  variant="outlined"
                  size="small"
                  color={survey.status ? 'secondary' : 'default'}
                />
              </StatisticsSurveyTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
    // </Container>
  );
}

// const spaceNoWrap = css`
//   white-space: nowrap;
// `;

// const CustomTableRow = styled(TableRow)`
//   cursor: pointer;
// `;

// 설문 목록 글자
const StatisticsSurveyTypography = styled(Typography)`
  margin-bottom: 30px;
  font-weight: 700;
`;

// 설문 목록 테이블의 title부분
const StatisticsSurveyTitleTableCell = styled(TableCell)`
  font-weight: bold;
  background: #f5f5f5;
  border-right: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;

  &:last-child {
    border-right: 1px solid #f0f0f0;
  }
`;

// 설문 목록 테이블의 본문
const StatisticsSurveyTableCell = styled(TableCell)`
  margin: 0;
  border-right: 1px solid #f0f0f0;

  &:first-of-type {
    background: #f5f5f5;
  }
`;

// 설문 제목. ellipsis 적용.
const StatisticsSurveyBox = styled(Box)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`;
