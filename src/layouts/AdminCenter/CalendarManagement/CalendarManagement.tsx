import { Spinner } from '@components/ui';
import styled from '@emotion/styled';
import { useDialog } from '@hooks/useDialog';
import { useSnackbar } from '@hooks/useSnackbar';
import { Table } from '@components/ui';
import { Container, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import dateFormat from 'dateformat';
import { businessType } from '@common/api/courseClass';
import { useCourseClassAdm } from '@common/api/adm/courseClass';

const headRows: { name: string; align: 'inherit' | 'left' | 'center' | 'right' | 'justify' }[] = [
  { name: 'seq', align: 'left' },
  { name: '접수여부', align: 'right' },
  { name: '교육타입/시간', align: 'right' },
  // { name: '방법', align: 'right' },
  { name: '화물/여객', align: 'right' },
  // { name: '??', align: 'right' },
  { name: '기수', align: 'right' },
  { name: '교육구분', align: 'right' },
  // { name: '교육대상', align: 'right' },

  { name: '신청인원 / 제한', align: 'right' },
  { name: '교육기간', align: 'right' },
  { name: '신청기간', align: 'right' },
];

const data = [
  {
    seq: 1,
    className: 'PASSENGER',
    title: `접수중`,
    eduTypeAndTime: '신규교육/24시간',
    description: '동영상(VOD)',
    year: 9929,
    jobType: '화물',
    eduLegend: '보수교육',
    currentJoin: 592,
    limit: 992,
    eduStart: '2022-07-20',
    eduEnd: '2022-07-26',
    start: '2022-07-12',
    end: '2022-07-15',
    color: '#2980b9',
  },
  {
    seq: 2,
    className: 'PASSENGER',
    title: `접수중`,
    eduTypeAndTime: '신규교육/24시간',
    description: '동영상(VOD)',
    year: 9929,
    jobType: '화물',
    eduLegend: '보수교육',
    currentJoin: 592,
    limit: 992,
    eduStart: '2022-07-20',
    eduEnd: '2022-07-26',
    start: '2022-07-12',
    end: '2022-07-15',
    color: '#2980b9',
  },
  {
    seq: 3,
    className: 'PASSENGER',
    title: `접수중`,
    eduTypeAndTime: '신규교육/24시간',
    description: '동영상(VOD)',
    year: 9929,
    jobType: '화물',
    eduLegend: '보수교육',
    currentJoin: 592,
    limit: 992,
    eduStart: '2022-07-20',
    eduEnd: '2022-07-26',
    start: '2022-07-12',
    end: '2022-07-15',
    color: '#2980b9',
  },
];

export function CalendarManagement() {
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const router = useRouter();
  // const [ page, setPage ] = useState(0);
  const { data, error } = useCourseClassAdm(businessType.TYPE_ALL, '2022-07');

  useEffect(() => {
    console.log('useEffect Triggered');
    const { page } = router.query;
    // setPage(!isNaN(Number(page)) ? Number(page) : 0);
  }, [router]);

  const onChangePage = async (page: number) => {
    await router.push({
      pathname: router.pathname,
      query: {
        page,
      },
    });
  };

  const onRemoveCourse = async (courseId: number) => {};

  // if (error) return <div>Error</div>;
  if (!data) return <Spinner />;
  return (
    <CalendarManagementWrap>
      <Typography
        variant="h5"
        sx={{
          mb: '12px',
          fontWeight: 700,
        }}
      >
        일정 목록
      </Typography>
      <Table
        pagination={true}
        // totalNum={data.totalElements}
        page={1}
        //  onChangePage={onChangePage}
        size="small"
      >
        <TableHead>
          <TableRow>
            {headRows.map(({ name, align }) => (
              <TableCell key={name} align={align}>
                {name}
              </TableCell>
            ))}
            <TableCell>{}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(data => {
            const isReceive = new Date(data.requestEndDate).getTime() - new Date().getTime() > 0 ? true : false;
            return (
              <TableRow key={data.seq} hover>
                <TableCell>{data.seq}</TableCell>
                <TableCell align="right">
                  {/* <Link href={`/course/${content.seq}`} underline="hover" color={grey[900]}> */}
                  {/*                 
                //마감 여부 확인
                const isReceive =
                  new Date(item.requestStartDate).getTime() - new Date().getTime() < 0 //값이 음수면 신청날짜 이므로 true
                    ? new Date(item.requestEndDate).getTime() - new Date().getTime() > 0 //값이 양수면 날짜가끝나기 전이므로 true
                      ? true
                      : false
                    : false; */}
                  {isReceive ? '접수중' : '마감'}
                  {/* </Link> */}
                </TableCell>
                <TableCell align="right">
                  {data.course.courseCategoryType} /{data.course.lessonTime}
                  {/* {dateFormat(data.eduTypeAndTime, 'isoDate')} */}
                </TableCell>
                <TableCell align="right">
                  {/* {data.description} */}
                  PESSENGER(임시)
                  {/* <Chip
                  label={data.displayYn === YN.YES ? '보임' : '숨김'}
                  variant="outlined"
                  size="small"
                  color={data.displayYn === YN.YES ? 'secondary' : 'default'}
                /> */}
                </TableCell>
                <TableCell align="right">
                  {data.step}
                  {/* <Chip
                  label={data.status ? '정상' : '중지'}
                  variant="outlined"
                  size="small"
                  color={data.status ? 'secondary' : 'default'}
                /> */}
                </TableCell>
                {/* <TableCell align="right">{'data.className'}</TableCell>
                <TableCell align="right">{'data.jobType'}</TableCell> */}
                <TableCell align="right">{data.course.courseSubCategoryType}</TableCell>
                <TableCell align="right">
                  {data.enrolledPeopleCnt} / {data.limitPeople}
                </TableCell>
                <TableCell align="right">
                  {dateFormat(data.studyStartDate, 'yyyy-mm-dd')} ~ {dateFormat(data.studyEndDate, 'yyyy-mm-dd')}
                </TableCell>
                <TableCell align="right">
                  {dateFormat(data.requestStartDate, 'yyyy-mm-dd')} ~ {dateFormat(data.requestEndDate, 'yyyy-mm-dd')}
                </TableCell>
                {/* <TableCell align="right">
                  <Link href={`/admin-center/course/modify/${data.seq}`}>
                  <Button variant="text" color="neutral" size="small">
                    상세
                  </Button>
                </Link>
                <Button variant="text" color="warning" onClick={() => onRemoveCourse(data.seq)} size="small">
                  삭제
                </Button>
                </TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </CalendarManagementWrap>
  );
}

const CalendarManagementWrap = styled(Container)`
  tr {
    white-space: nowrap;
  }
`;
