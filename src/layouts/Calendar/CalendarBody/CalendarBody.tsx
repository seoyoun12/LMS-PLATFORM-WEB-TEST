import styled from '@emotion/styled';
import { CustomContentGenerator, EventContentArg } from '@fullcalendar/core';
import { Box, Button, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import FullCalendar from '@fullcalendar/react';
import { CalendarEvent, ClickedPlanInfo, FilterType } from '../Calendar';
import { Modal } from '@components/ui/Modal';
import dayGridPlugin from '@fullcalendar/daygrid';
import dateFormat from 'dateformat';
import { useRouter } from 'next/router';
import { courseCategoryType, CourseClassRes } from '@common/api/course';

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  setModalInfo: React.Dispatch<React.SetStateAction<ClickedPlanInfo | undefined>>;
  modalInfo: ClickedPlanInfo | undefined;
  calendarRef: React.RefObject<FullCalendar>;
  // CalendarEvent: CalendarEvent[];
  filter: string;
  schedule: CourseClassRes[];
}

const courseCategory = [
  { type: courseCategoryType.TYPE_SUP_COMMON, ko: '보수일반' },
  { type: courseCategoryType.TYPE_CONSTANT, ko: '수시' },
  { type: courseCategoryType.TYPE_NEW, ko: '신규' },
  { type: courseCategoryType.TYPE_ILLEGAL, ko: '법령위반자' },
  { type: courseCategoryType.TYPE_HANDICAPPED, ko: '교통약자 이동편의 증진' },
  { type: courseCategoryType.TYPE_DANGEROUS, ko: '위험물진 운송차량 운전자' },
];

// title: `접수중`,
// eduTypeAndTime: '신규교육/24시간',
// description: '동영상(VOD)',
// year: 999,
// jobType: '화물',
// eduLegend: '보수교육',
// currentJoin: 59,
// limit: 99,
// eduStart: '2022-07-20',
// eduEnd: '2022-07-26',
// start: '2022-07-12',
// end: '2022-07-15',

export function CalendarBody({ setOpenModal, setModalInfo, openModal, modalInfo, calendarRef, filter, schedule }: Props) {
  const router = useRouter();
  const scheduleList = schedule.map(item => {
    return {
      ...item,
      // title: item.course.courseName, //말
      title: item.status === 1 ? '접수중' : '마감', //말
      step: item.step, //기수
      mediaType: '동영상(VOD)',
      courseCategoryType: courseCategory.filter(categoryItem => {
        console.log(categoryItem, item.course.courseCategoryType);
        return categoryItem.type === item.course.courseCategoryType;
      })[0], //eduType
      courseSubCategoryType: item.course.courseSubCategoryType,
      eduTypeAndTime: item.course.lessonTime, // eduTime
      currentJoin: item.enrolledPeopleCnt, //현재 수강
      limit: item.limitPeople, //수강 제한
      studyStartDate: item.studyStartDate, //studyStartDate
      studyEndDate: item.studyEndDate, //studyStartDate
      start: item.requestStartDate, //start: requestStartDate
      end: item.requestEndDate, //start: requestStartDate
    };
  });

  return (
    <CalendarWrap filter={filter}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        headerToolbar={{ start: '', end: '' }} //헤더 제거
        locale="ko"
        eventContent={renderEventContent}
        events={scheduleList}
        eventClick={e => {
          console.log(e);
          const {
            event: {
              _def: { extendedProps },
              start,
              end,
            },
          }: { event: { _def: { extendedProps: Partial<CourseClassRes> }; start: Date | null; end: Date | null } } = e;
          if (e.event._def.title === '마감') return window.alert('이 교육은 마감된 교육입니다!');
          setModalInfo({
            year: extendedProps.year ? extendedProps.year : -1,
            courseSubCategoryType: extendedProps.courseSubCategoryType ? extendedProps.courseSubCategoryType : '',
            courseCategoryType: extendedProps.course.courseCategoryType ? extendedProps.courseCategoryType : '',
            currentJoin: extendedProps.currentJoin ? extendedProps.currentJoin : 0,
            limit: extendedProps.limit ? extendedProps.limit : 0,
            studyStartDate: extendedProps.studyStartDate ? extendedProps.studyStartDate : '',
            eduEnd: extendedProps.eduEnd ? extendedProps.eduEnd : '',
            start: start ? dateFormat(start, 'yyyy-mm-dd') : 'error',
            end: end ? dateFormat(end, 'yyyy-mm-dd') : 'error',
          });
          setOpenModal(true);
        }}
      />
      <Modal
        open={openModal}
        onCloseModal={() => setOpenModal(false)}
        title={'교육안내'}
        action={
          <Box sx={{ display: 'flex', width: 'fit-content', margin: 'auto', gap: '1rem' }}>
            <Button variant="contained" onClick={() => router.push({ pathname: '/stebMove/steb2', query: { ...modalInfo } })}>
              교육신청
            </Button>
            <Button variant="contained" color="neutral" onClick={() => setOpenModal(false)}>
              닫기
            </Button>
          </Box>
        }
      >
        <TableContainer sx={{ width: '500px' }}>
          <Box display="flex" alignItems="center" fontWeight="bold" mb={2}>
            <HorizontalRuleRoundedIcon sx={{ color: '#2980b9' }} />
            <span>교육개요</span>
          </Box>
          <TableBody sx={{ display: 'table', width: '100%', borderTop: '6px solid #2980b9' }}>
            {modalInfo && (
              <>
                <TableRow>
                  <TableCell sx={{ width: '30%', background: '#e0e0e0', borderBottom: '2px solid #b4b4b4' }}>기수</TableCell>
                  <TableCell sx={{ borderBottom: '2px solid #b4b4b4' }}>{modalInfo.year}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '30%', background: '#e0e0e0', borderBottom: '2px solid #b4b4b4' }}>교육과정</TableCell>
                  <TableCell sx={{ borderBottom: '2px solid #b4b4b4' }}>{modalInfo.eduLegend}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '30%', background: '#e0e0e0', borderBottom: '2px solid #b4b4b4' }}>업종구분</TableCell>
                  <TableCell sx={{ borderBottom: '2px solid #b4b4b4' }}>{modalInfo.jobType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '30%', background: '#e0e0e0', borderBottom: '2px solid #b4b4b4' }}>교육일</TableCell>
                  <TableCell sx={{ borderBottom: '2px solid #b4b4b4' }}>
                    {modalInfo.eduStart} ~ {modalInfo.eduEnd}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '30%', background: '#e0e0e0', borderBottom: '2px solid #b4b4b4' }}>신청/정원</TableCell>
                  <TableCell sx={{ borderBottom: '2px solid #b4b4b4' }}>
                    {modalInfo.currentJoin} / {modalInfo.limit}명
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '30%', background: '#e0e0e0', borderBottom: '2px solid #b4b4b4' }}>예약가능시간</TableCell>
                  <TableCell sx={{ borderBottom: '2px solid #b4b4b4' }}>
                    {modalInfo.start} ~ {modalInfo.end}
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </TableContainer>
      </Modal>
    </CalendarWrap>
  );
}
function renderEventContent(info: CustomContentGenerator<EventContentArg>) {
  console.log(info?.event._def);
  const {
    event: {
      _def: {
        extendedProps: { steb },
      },
      title,
    },
  } = info;
  return (
    <>
      <div>[{title}]</div>
      <div>{info && info.event._def.extendedProps.eduTypeAndTime} / </div>
      <div>{info && info.event._def.extendedProps.mediaType}</div>
    </>
  );
}
const CalendarWrap = styled(Box)<{ filter: string }>`
  .fc-col-header {
    // 헤더css
    .fc-scrollgrid-sync-inner {
      background: #374151;
      color: white;
      font-weight: bold;
      padding: 1rem 0;
    }
  }
  .fc-daygrid-day-top {
    justify-content: flex-end; //날짜 왼쪽정렬
    a {
      /* background: #8e8e8e;
      color: white;
      padding: 5px;
      border-radius: 220px; */
    }
  }
  /* ${({ filter }) => (filter !== 'ALL' ? '.' + filter : '')} {
    //필터
    display: none;
  } */
`;
