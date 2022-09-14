import { Spinner } from '@components/ui';
import styled from '@emotion/styled';
import { useDialog } from '@hooks/useDialog';
import { useSnackbar } from '@hooks/useSnackbar';
import { Table } from '@components/ui';
import {
  Box,
  Button,
  Container,
  Radio,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dateFormat from 'dateformat';
import { businessType } from '@common/api/courseClass';
import {
  courseClassRemove,
  CourseType,
  useCourseClassAdm,
} from '@common/api/adm/courseClass';
import { Link } from '@components/common';
import { courseBusinessTypeList, eduLegendList } from '@layouts/Calendar/Calendar';
import { AdminCalendar } from './AdminCalendar';

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}[] = [
  { name: '번호', align: 'left' },
  { name: '연도 / 기수', align: 'center' },
  { name: '접수여부', align: 'center' },
  { name: '교육타입 / 교육시간', align: 'center' },
  // { name: '방법', align: 'right' },
  { name: '교육구분', align: 'center' },
  // { name: '??', align: 'right' },
  // { name: '업종', align: 'center' },
  // { name: '교육대상', align: 'right' },

  { name: '신청인원 / 제한', align: 'center' },
  { name: '교육기간', align: 'center' },
  { name: '신청기간', align: 'center' },
];

export function CalendarManagement() {
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const router = useRouter();
  // const [ page, setPage ] = useState(0);
  const [manageMentDate, setManagementDate] = useState<Date>(new Date());
  const [courseType, setCourseType] = useState<CourseType>(CourseType.TYPE_TRANS_WORKER); //운수저상도민 타입
  const [manageBusinessType, setManageBusinessType] = useState<businessType>(
    businessType.TYPE_ALL
  );
  const { data, error, mutate } = useCourseClassAdm(
    manageBusinessType,
    dateFormat(manageMentDate, 'yyyy-mm'),
    courseType
  );

  const handleDate = (date: Date) => {
    setManagementDate(date);
  };

  const handleBusiness = (businessType: businessType) => {
    setManageBusinessType(businessType);
  };

  const handleCourseType = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const value = e.currentTarget.value; 무슨차이일까?
    const value = e.target.value;
    if (value === CourseType.TYPE_TRANS_WORKER) setCourseType(value);
    if (value === CourseType.TYPE_LOW_FLOOR_BUS) setCourseType(value);
    if (value === CourseType.TYPE_PROVINCIAL) setCourseType(value);
  };

  useEffect(() => {
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

  // 수정
  const onClickmodifyCourse = async (seq: number) => {
    router.push(`/admin-center/calendar/modify/${seq}`);
    mutate();
  };

  const onRemoveCourse = async (calendarId: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: '일정 삭제하기',
        description: '정말로 삭제하시겠습니까?',
        confirmText: '삭제하기',
        cancelText: '취소',
      });
      if (dialogConfirmed) {
        await courseClassRemove(calendarId);
        snackbar({ variant: 'success', message: '성공적으로 삭제되었습니다.' });
        // await mutate([`/course-class/adm`, { params: { businessType: businessType.TYPE_ALL, date: '2022-07' } }]);
        await mutate();
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

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

      <Box>
        <Box>과정타입</Box>
        <Radio
          value={CourseType.TYPE_TRANS_WORKER}
          onChange={handleCourseType}
          checked={courseType === CourseType.TYPE_TRANS_WORKER}
        />
        <span>운수종사자</span>
        <Radio
          value={CourseType.TYPE_LOW_FLOOR_BUS}
          onChange={handleCourseType}
          checked={courseType === CourseType.TYPE_LOW_FLOOR_BUS}
        />
        <span>저상버스</span>
        <Radio
          value={CourseType.TYPE_PROVINCIAL}
          onChange={handleCourseType}
          checked={courseType === CourseType.TYPE_PROVINCIAL}
        />
        <span>도민교통</span>
      </Box>

      <AdminCalendar
        handleDate={handleDate}
        handleBusiness={handleBusiness}
        courseType={courseType}
      />

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
            const isReceive =
              new Date(data.requestEndDate).getTime() - new Date().getTime() > 0
                ? true
                : false;
            return (
              <TableRow
                sx={{ cursor: 'pointer' }}
                key={data.seq}
                hover
                onClick={() => onClickmodifyCourse(data.seq)}
              >
                <TableCell>{data.seq}</TableCell>
                <TableCell align="center">
                  {data.year} / {data.step}
                </TableCell>
                <TableCell align="center">
                  {isReceive ? '접수중' : '마감'}
                  {/* </Link> */}
                </TableCell>
                {/* courseCategoryType eduLegendList */}
                <TableCell align="center">
                  {/* {eduLegendList.filter(
                    item => item.enType === data.course.courseCategoryType
                  )[0]?.title || '보수일반 교육'}{' '} */}
                  보수일반 /{data.course.lessonTime}
                  {/* {dateFormat(data.eduTypeAndTime, 'isoDate')} */}
                </TableCell>
                <TableCell align="center">
                  {
                    courseBusinessTypeList.filter(
                      business => business.enType === data.course.courseBusinessType
                    )[0].type
                  }
                  {/* 여객 / 화물 */}
                </TableCell>
                {/* <TableCell align="right">{'data.className'}</TableCell>
                <TableCell align="right">{'data.jobType'}</TableCell> */}
                {/* <TableCell align="center">{data.course.courseSubCategoryType}</TableCell> */}
                <TableCell align="center">
                  {data.enrolledPeopleCnt} / {data.limitPeople}
                </TableCell>
                <TableCell align="center">
                  {dateFormat(data.studyStartDate, 'yyyy-mm-dd')} ~{' '}
                  {dateFormat(data.studyEndDate, 'yyyy-mm-dd')}
                </TableCell>
                <TableCell align="center">
                  {dateFormat(data.requestStartDate, 'yyyy-mm-dd')} ~{' '}
                  {dateFormat(data.requestEndDate, 'yyyy-mm-dd')}
                </TableCell>
                {/* <TableCell>
                  <Link href={`/admin-center/calendar/modify/${data.seq}`}>
                    <Button variant="text" color="neutral" size="small">
                      상세
                    </Button>
                  </Link>
                  <Button
                    variant="text"
                    color="warning"
                    onClick={() => onRemoveCourse(data.seq)}
                    size="small"
                  >
                    삭제
                  </Button>
                </TableCell> */}
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

const CalendarManagementWrap = styled(Box)`
  tr {
    white-space: nowrap;
  }
`;
