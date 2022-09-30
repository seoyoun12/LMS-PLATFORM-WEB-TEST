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
  width: string;
}[] = [
  { name: 'No', align: 'center', width: '5%' },
  { name: '과정명', align: 'center', width: '70%' },
  { name: '생성 날짜', align: 'center', width: '20%' },
  { name: '상태', align: 'center', width: '5%' },
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
      <SurveyTypography variant="h5">설문 목록</SurveyTypography>

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
                  <SurveyTitleTableCell key={name} align="center" width={width}>
                    {name}
                  </SurveyTitleTableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.content.map(survey => (
              <TableRow key={survey.seq} hover onClick={() => onClickModify(survey.seq)}>
                <SurveyTableCell align="center">
                  <SubjectBox>{survey.seq}</SubjectBox>
                </SurveyTableCell>
                <SurveyTableCell align="center">
                  {/* <Link
                  href={`/admin-center/course/modify/${survey.seq}`}
                  underline="hover"
                  color={grey[900]}
                > */}
                  {survey.title}
                  {/* </Link> */}
                </SurveyTableCell>
                <SurveyTableCell align="center">
                  {dateFormat(survey.createdDtime, 'isoDate')}
                </SurveyTableCell>
                {/* <TableCell align="right">
                <Chip
                  label={survey.displayYn === YN.YES ? '보임' : '숨김'}
                  variant="outlined"
                  size="small"
                  color={survey.displayYn === YN.YES ? 'secondary' : 'default'}
                  />
              </TableCell> */}
                <SurveyTableCell align="center">
                  <Chip
                    label={survey.status ? '정상' : '중지'}
                    variant="outlined"
                    size="small"
                    color={survey.status ? 'secondary' : 'default'}
                  />
                </SurveyTableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}

// 설문 목록 글자
const SurveyTypography = styled(Typography)`
  margin-bottom: 30px;
  font-weight: 700;
`;

// 설문 제목. ellipsis 적용.
const SubjectBox = styled(Box)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`;

// 설문 목록 테이블의 Title부분
const SurveyTitleTableCell = styled(TableCell)`
  font-weight: bold;
  background: #f5f5f5;
  border-right: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;

  &:last-child {
    border-right: 1px solid #f0f0f0;
  }
`;

// 설문 목록 테이블의 본문
const SurveyTableCell = styled(TableCell)`
  margin: 0;
  border-right: 1px solid #f0f0f0;

  &:first-of-type {
    background: #f5f5f5;
  }
`;
