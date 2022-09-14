import { removeCourse, useCourseList } from '@common/api/adm/course';
import { Table } from '@components/ui';
import { Button, Chip, TableBody, TableHead, Typography } from '@mui/material';
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
import { courseAdmList, courseList, courseRemove } from '@common/api/course';
import { useSurveyAdm } from '@common/api/adm/survey';
import styled from '@emotion/styled';

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}[] = [
  { name: '번호', align: 'left' },
  { name: '과정명', align: 'right' },
  { name: '생성 날짜', align: 'right' },
  // { name: '노출 여부', align: 'right' },
  { name: '상태', align: 'right' },
  // { name: '수강생', align: 'right' },
  // { name: '수료생', align: 'right' },
];

export function StaticsSurveyList() {
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
    router.push(`/admin-center/statics/survey/detail/${seq}`);
  };

  if (error) return <div>Error</div>;
  if (!data) return <Spinner />;
  // return <Spinner />;

  return (
    <Container className={styles.globalContainer}>
      <Typography
        variant="h5"
        sx={{
          mb: '12px',
          fontWeight: 700,
        }}
      >
        설문 목록(통계)
      </Typography>
      <Table
        pagination={true}
        totalNum={data.totalElements}
        page={data.number}
        onChangePage={onChangePage}
        size="small"
      >
        <TableHead>
          <TableRow>
            {headRows.map(({ name, align }) => (
              <TableCell className={spaceNoWrap} key={name} align={align}>
                {name}
              </TableCell>
            ))}
            <TableCell>{}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.content.map(survey => (
            <CustomTableRow
              key={survey.seq}
              hover
              onClick={() => onClickModify(survey.seq)}
            >
              <TableCell>{survey.seq}</TableCell>
              <TableCell align="right">
                {/* <Link
                  href={`/admin-center/course/modify/${survey.seq}`}
                  underline="hover"
                  color={grey[900]}
                > */}
                {survey.title}
                {/* </Link> */}
              </TableCell>
              <TableCell align="right" className={spaceNoWrap}>
                {dateFormat(survey.createdDtime, 'isoDate')}
              </TableCell>
              {/* <TableCell align="right">
                <Chip
                  label={survey.displayYn === YN.YES ? '보임' : '숨김'}
                  variant="outlined"
                  size="small"
                  color={survey.displayYn === YN.YES ? 'secondary' : 'default'}
                  />
              </TableCell> */}
              <TableCell align="right">
                <Chip
                  label={survey.status ? '정상' : '중지'}
                  variant="outlined"
                  size="small"
                  color={survey.status ? 'secondary' : 'default'}
                />
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>

              <TableCell align="right" className={spaceNoWrap}></TableCell>
            </CustomTableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

const spaceNoWrap = css`
  white-space: nowrap;
`;

const CustomTableRow = styled(TableRow)`
  cursor: pointer;
`;
