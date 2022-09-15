import { removeCourse, useCourseList } from '@common/api/adm/course';
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
import { courseAdmList, courseList, courseRemove } from '@common/api/course';
import { useSurveyAdm } from '@common/api/adm/survey';
import styled from '@emotion/styled';
import { SurveyManagementHeadRows } from '@components/admin-center/Survey/SurveyManagementHeadRows';
import { NotFound } from '@components/ui/NotFound';

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}[] = [
  { name: '번호', align: 'left' },
  { name: '과정명', align: 'center' },
  { name: '생성 날짜', align: 'center' },
  // { name: '노출 여부', align: 'right' },
  { name: '상태', align: 'center' },
  // { name: '수강생', align: 'right' },
  // { name: '수료생', align: 'right' },
];

export function SurveyManagement() {
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [seq, setSeq] = useState<number | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [titleSearch, setTitleSearch] = useState<string | null>(null); //설문제목
  const searchInputRef = React.useRef<HTMLInputElement | null>(null);

  const { data, error, mutate } = useSurveyAdm({ page, title: titleSearch });
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

  //링크이동
  const onClickModify = (seq: number) => {
    router.push(`/admin-center/survey/modify/${seq}`);
  };

  //검색
  const handleSearch = async (e: React.FormEvent, isReload = false) => {
    e.preventDefault();
    setNotFound(false);
    if (isReload) {
      setPage(0);
      return setTitleSearch('');
    }
    if (searchInputRef.current) {
      setTitleSearch(searchInputRef.current.value);
    }
  };

  //데이터 여부확인
  useEffect(() => {
    if (data) {
      data.content.length === 0 && setNotFound(true);
    }
  }, [data]);

  if (error) return <div>Error</div>;
  if (!data) return <Spinner />;
  // return <Spinner />;

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          mb: '12px',
          fontWeight: 700,
        }}
      >
        설문 목록
      </Typography>
      <SurveyManagementHeadRows
        ref={searchInputRef}
        handleSearch={handleSearch}
        search={titleSearch}
      />

      {notFound ? (
        <NotFound content="설문이 존재하지 않습니다!" />
      ) : (
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
                <TableCell align="center">
                  {/* <Link
                  href={`/admin-center/course/modify/${survey.seq}`}
                  underline="hover"
                  color={grey[900]}
                > */}
                  {survey.title}
                  {/* </Link> */}
                </TableCell>
                <TableCell align="center" className={spaceNoWrap}>
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
                <TableCell align="center">
                  <Chip
                    label={survey.status ? '정상' : '중지'}
                    variant="outlined"
                    size="small"
                    color={survey.status ? 'secondary' : 'default'}
                  />
                </TableCell>
                {/* <TableCell></TableCell>
              <TableCell></TableCell>

              <TableCell align="right" className={spaceNoWrap}>
                <Link href={`/admin-center/course/modify/${course.seq}`}>
                <Button
                  variant="text"
                  color="neutral"
                  size="small"
                  onClick={() => onClickModifyCourse(survey.seq)}
                >
                  상세
                </Button>
                </Link>
                <Button
                  variant="text"
                  color="warning"
                  onClick={() => onClickRemoveCourse(survey.seq)}
                  size="small"
                  >
                  삭제
                </Button>
              </TableCell> */}
              </CustomTableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}

const spaceNoWrap = css`
  white-space: nowrap;
`;

const CustomTableRow = styled(TableRow)`
  cursor: pointer;
`;
