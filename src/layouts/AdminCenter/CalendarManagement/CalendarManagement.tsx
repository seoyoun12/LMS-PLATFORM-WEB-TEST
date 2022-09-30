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
import {
  courseCategory,
  courseReg,
  courseSubCategory,
} from '@layouts/Calendar/CalendarBody/CalendarBody';

const headRows: {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width: string;
}[] = [
  { name: 'No', align: 'center', width: '4%' },
  { name: '과정분류', align: 'center', width: '6%' }, // courseType : 운수종사자 / 저상버스
  { name: '교육분류', align: 'center', width: '6%' }, // courseCategoryType : 보수 / 양성 / 신규 등
  { name: '업종', align: 'center', width: '6%' }, // courseSubCategoryType : 버스, 전세버스, 특수여객 등등
  { name: '과정명', align: 'center', width: '23%' }, // courseName
  { name: '연도 / 기수', align: 'center', width: '10%' }, // year / step
  { name: '신청인원 / 제한인원', align: 'center', width: '10%' }, // enrolledPeopleCnt / limitPeople
  { name: '신청기간', align: 'center', width: '15%' }, // requestStartDate ~ requestEndDate
  { name: '교육기간', align: 'center', width: '15%' }, // studyStartDate ~ studyEndDate
  { name: '접수여부', align: 'center', width: '5%' }, // isReceive
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

  // pagination 제거
  // useEffect(() => {
  //   const { page } = router.query;
  //   // setPage(!isNaN(Number(page)) ? Number(page) : 0);
  // }, [router]);

  // const onChangePage = async (page: number) => {
  //   await router.push({
  //     pathname: router.pathname,
  //     query: {
  //       page,
  //     },
  //   });
  // };

  // 수정
  const onClickmodifyCourse = async (seq: number) => {
    router.push(`/admin-center/calendar/modify/${seq}`);
    mutate();
  };

  // const onRemoveCourse = async (calendarId: number) => {
  //   try {
  //     const dialogConfirmed = await dialog({
  //       title: '일정 삭제하기',
  //       description: '정말로 삭제하시겠습니까?',
  //       confirmText: '삭제하기',
  //       cancelText: '취소',
  //     });
  //     if (dialogConfirmed) {
  //       await courseClassRemove(calendarId);
  //       snackbar({ variant: 'success', message: '성공적으로 삭제되었습니다.' });
  //       // await mutate([`/course-class/adm`, { params: { businessType: businessType.TYPE_ALL, date: '2022-07' } }]);
  //       await mutate();
  //     }
  //   } catch (e: any) {
  //     snackbar({ variant: 'error', message: e.data.message });
  //   }
  // };

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
      </Box>

      <AdminCalendar
        handleDate={handleDate}
        handleBusiness={handleBusiness}
        courseType={courseType}
      />

      <Table
        // pagination={true}
        // totalNum={data.totalElements}
        // page={1}
        //  onChangePage={onChangePage}
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
                <CalendarTitleTableCell key={name} align="center" width={width}>
                  {name}
                </CalendarTitleTableCell>
              )
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.map(data => {
            const isReceive =
              new Date(data.requestEndDate).getTime() - new Date().getTime() > 0
                ? true
                : false;
            return (
              <TableRow
                sx={{ cursor: 'pointer', overflow: 'hidden' }}
                key={data.seq}
                hover
                onClick={() => onClickmodifyCourse(data.seq)}
              >
                <CalendarTableCell align="center">{data.seq}</CalendarTableCell>
                <CalendarTableCell align="center">
                  {/* {data.course.courseType} */}
                  {courseReg.filter(item => item.type === data.course.courseType)[0]?.ko}
                </CalendarTableCell>
                <CalendarTableCell align="center">
                  {/* {data.course.courseCategoryType} */}
                  {
                    courseCategory.filter(
                      item => item.type === data.course.courseCategoryType
                    )[0]?.ko
                  }
                </CalendarTableCell>
                <CalendarTableCell align="center">
                  {/* {data.course.courseSubCategoryType} */}
                  {
                    courseSubCategory.filter(
                      item => item.type === data.course.courseSubCategoryType
                    )[0]?.ko
                  }
                </CalendarTableCell>
                <CalendarTableCell align="center">
                  {data.course.contentName}
                </CalendarTableCell>
                <CalendarTableCell align="center">
                  {data.year} / {data.step}
                </CalendarTableCell>
                <CalendarTableCell align="center">
                  {data.enrolledPeopleCnt} / {data.limitPeople}
                </CalendarTableCell>
                <CalendarTableCell align="center">
                  {dateFormat(data.requestStartDate, 'yyyy-mm-dd')} ~{' '}
                  {dateFormat(data.requestEndDate, 'yyyy-mm-dd')}
                </CalendarTableCell>
                <CalendarTableCell align="center">
                  {dateFormat(data.studyStartDate, 'yyyy-mm-dd')} ~{' '}
                  {dateFormat(data.studyEndDate, 'yyyy-mm-dd')}
                </CalendarTableCell>
                <CalendarTableCell align="center">
                  {isReceive ? '접수중' : '마감'}
                </CalendarTableCell>
                {/* 
                <CalendarTableCell></CalendarTableCell>
                <CalendarTableCell align="center">
                  {data.year} / {data.step}
                </CalendarTableCell>
                <CalendarTableCell align="center">
                  {isReceive ? '접수중' : '마감'}
                </CalendarTableCell> */}
                {/* courseCategoryType eduLegendList */}
                {/* <CalendarTableCell align="center"> */}
                {/* {eduLegendList.filter(
                    item => item.enType === data.course.courseCategoryType
                  )[0]?.title || '보수일반 교육'}{' '} */}
                {/* 보수일반 /{data.course.lessonTime} */}
                {/* {dateFormat(data.eduTypeAndTime, 'isoDate')} */}
                {/* </CalendarTableCell> */}
                {/* <CalendarTableCell align="center">
                  {
                    courseBusinessTypeList.filter(
                      business => business.enType === data.course.courseBusinessType
                    )[0].type
                  } */}
                {/* 여객 / 화물 */}
                {/* </CalendarTableCell> */}
                {/* <TableCell align="right">{'data.className'}</TableCell>
                <TableCell align="right">{'data.jobType'}</TableCell> */}
                {/* <TableCell align="center">{data.course.courseSubCategoryType}</TableCell> */}
                {/* <CalendarTableCell align="center">
                  {data.enrolledPeopleCnt} / {data.limitPeople}
                </CalendarTableCell>
                <CalendarTableCell align="center">
                  {dateFormat(data.studyStartDate, 'yyyy-mm-dd')} ~{' '}
                  {dateFormat(data.studyEndDate, 'yyyy-mm-dd')}
                </CalendarTableCell>
                <CalendarTableCell align="center">
                  {dateFormat(data.requestStartDate, 'yyyy-mm-dd')} ~{' '}
                  {dateFormat(data.requestEndDate, 'yyyy-mm-dd')}
                </CalendarTableCell> */}
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

// 일정 목록 글자
const CalendarTypography = styled(Typography)`
  margin-bottom: 30px;
  font-weight: 700;
`;

// 일정 목록 테이블의 Title부분
const CalendarTitleTableCell = styled(TableCell)`
  font-weight: bold;
  background: #f5f5f5;
  border-right: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;

  &:last-child {
    border-right: 1px solid #f0f0f0;
  }
`;

// 일정 목록 테이블의 본문
const CalendarTableCell = styled(TableCell)`
  margin: 0;
  border-right: 1px solid #f0f0f0;

  &:first-of-type {
    background: #f5f5f5;
  }
`;
