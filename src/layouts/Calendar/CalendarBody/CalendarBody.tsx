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
import { courseCategoryType, CourseClassRes, courseSubCategoryType } from '@common/api/courseClass';

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

export const courseCategory = [
  { type: courseCategoryType.TYPE_SUP_COMMON, ko: '보수일반' },
  { type: courseCategoryType.TYPE_CONSTANT, ko: '수시' },
  { type: courseCategoryType.TYPE_NEW, ko: '신규' },
  { type: courseCategoryType.TYPE_ILLEGAL, ko: '법령위반자' },
  { type: courseCategoryType.TYPE_HANDICAPPED, ko: '교통약자 이동편의 증진' },
  { type: courseCategoryType.TYPE_DANGEROUS, ko: '위험물진 운송차량 운전자' },
];
export const courseSubCategory = [
  { type: courseSubCategoryType.BUS, ko: '버스' },
  { type: courseSubCategoryType.CHARTER_BUS, ko: '전세버스' },
  { type: courseSubCategoryType.SPECIAL_PASSENGER, ko: '특수여객' },
  { type: courseSubCategoryType.CORPORATE_TAXI, ko: '법인택시' },
  { type: courseSubCategoryType.GENERAL_CARGO, ko: '일반화물' },
  { type: courseSubCategoryType.PRIVATE_TAXI, ko: '개인택시' },
  { type: courseSubCategoryType.INDIVIDUAL_CARGO, ko: '개별화물' },
  { type: courseSubCategoryType.CONSIGNMENT, ko: '용달화물' },
  { type: courseSubCategoryType.SPECIAL_TRANSPORTATION, ko: '특별교통수단' },
  { type: courseSubCategoryType.KNEELING_BUS, ko: ' 저상버스' },
  { type: courseSubCategoryType.DANGEROUS_GOODS, ko: '위험물' },
  { type: courseSubCategoryType.DESIGNATED_WASTE, ko: '지정폐기물' },
  { type: courseSubCategoryType.HAZARDOUS_CHEMICALS, ko: '유해화학물질' },
  { type: courseSubCategoryType.HIGH_PRESSURE_GAS_FLAMMABLE, ko: '고압가스(가연성)' },
  { type: courseSubCategoryType.HIGH_PRESSURE_GAS_TOXIC, ko: '고압가스(독성)' },
];

export function CalendarBody({ setOpenModal, setModalInfo, openModal, modalInfo, calendarRef, filter, schedule }: Props) {
  const router = useRouter();
  const scheduleList = schedule.map(item => {
    return {
      ...item,
      title: item.status === 1 ? '접수중' : '마감', //말
      step: item.step, //기수
      mediaType: '동영상(VOD)',
      courseCategoryType: courseCategory.filter(categoryItem => categoryItem.type === item.course.courseCategoryType)[0], //eduType
      courseSubCategoryType: courseSubCategory.filter(sub => sub.type === item.course.courseSubCategoryType)[0], //업종
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
          const {
            event: {
              _def: { extendedProps },
              start,
              end,
            },
          }: { event: { _def: { extendedProps: Partial<ClickedPlanInfo> }; start: Date | null; end: Date | null } } = e;
          if (e.event._def.extendedProps.statue === -1) return window.alert('이 교육은 마감된 교육입니다!');
          setModalInfo({
            seq: extendedProps.seq as number,
            step: extendedProps.step as number,
            courseCategoryType: extendedProps.courseCategoryType as { type: courseCategoryType; ko: string },
            courseSubCategoryType: extendedProps.courseSubCategoryType as { type: courseSubCategoryType; ko: string },

            enrolledPeopleCnt: extendedProps.enrolledPeopleCnt as number,
            limitPeople: extendedProps.limitPeople as number,
            studyStartDate: extendedProps.studyStartDate as string,
            studyEndDate: extendedProps.studyEndDate as string,
            start: dateFormat(start as Date, 'yyyy-mm-dd'),
            end: dateFormat(end as Date, 'yyyy-mm-dd'),
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
            <Button variant="contained" onClick={() => router.push({ pathname: '/stebMove/steb2', query: { seq: modalInfo?.seq } })}>
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
                  <TableCell sx={{ borderBottom: '2px solid #b4b4b4' }}>{modalInfo.step}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '30%', background: '#e0e0e0', borderBottom: '2px solid #b4b4b4' }}>교육과정</TableCell>
                  <TableCell sx={{ borderBottom: '2px solid #b4b4b4' }}>
                    {modalInfo.courseCategoryType ? modalInfo.courseCategoryType.ko : '오류'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '30%', background: '#e0e0e0', borderBottom: '2px solid #b4b4b4' }}>업종구분</TableCell>
                  <TableCell sx={{ borderBottom: '2px solid #b4b4b4' }}>
                    {modalInfo.courseSubCategoryType ? modalInfo.courseSubCategoryType.ko : '오류'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '30%', background: '#e0e0e0', borderBottom: '2px solid #b4b4b4' }}>교육일</TableCell>
                  <TableCell sx={{ borderBottom: '2px solid #b4b4b4' }}>
                    {dateFormat(modalInfo.studyStartDate, 'yyyy-mm-dd')} ~ {dateFormat(modalInfo.studyEndDate, 'yyyy-mm-dd')}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '30%', background: '#e0e0e0', borderBottom: '2px solid #b4b4b4' }}>신청/정원</TableCell>
                  <TableCell sx={{ borderBottom: '2px solid #b4b4b4' }}>
                    {modalInfo.enrolledPeopleCnt} / {modalInfo.limitPeople}명
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
  const {
    event: {
      _def: {
        extendedProps: { step, courseCategoryType },
      },
      title,
    },
  } = info;
  return (
    <>
      <div>[{title}]</div>
      <div>
        {courseCategoryType?.ko ? courseCategoryType.ko : 'null'}교육 / {step ? (step === 0 ? '종일' : step) : 'null'}시간
      </div>
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
