/* eslint-disable */

import styled from '@emotion/styled';
import { CustomContentGenerator, EventContentArg } from '@fullcalendar/core';
import { Box, Button, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import FullCalendar from '@fullcalendar/react';
import { CalendarEvent, ClickedPlanInfo, eduLegendList, FilterType } from '../Calendar';
import { Modal } from '@components/ui/Modal';
import dayGridPlugin from '@fullcalendar/daygrid';
import dateFormat from 'dateformat';
import { useRouter } from 'next/router';
import { courseCategoryType, CourseClassRes, courseSubCategoryType } from '@common/api/courseClass';
import { courseClassEnrollInfo } from '@common/recoil';
import { useRecoilState } from 'recoil';
import { useIsLoginStatus } from '@hooks/useIsLoginStatus';

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
  { type: courseCategoryType.TYPE_DANGEROUS, ko: '위험물질 운송차량 운전자' },
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
  const isLogin = useIsLoginStatus();
  const [enrollInfo, setEnrollInfo] = useRecoilState(courseClassEnrollInfo);
  const scheduleList = schedule.map(item => {
    //마감 여부 확인
    // const isReceive =
    //   new Date(item.requestStartDate).getTime() - new Date().getTime() > 0 //값이 음수면 신청날짜 이므로 true
    //     ? new Date(item.requestEndDate).getTime() - new Date().getTime() > 0 //값이 양수면 날짜가끝나기 전이므로 true
    //       ? true
    //       : false
    //     : false;
    // console.log('아니 도대체 왜?', item.course.courseName, item, new Date(item.requestStartDate).getTime() - new Date().getTime());
    const prevSchedule = new Date(item.requestEndDate).getTime() - new Date().getTime() >= 0 ? true : false;
    const isReceive =
      new Date(item.requestEndDate).getTime() - new Date().getTime() >= 0
        ? new Date(item.requestStartDate).getTime() - new Date().getTime() <= 0
          ? true
          : false
        : false;

    return {
      ...item,
      title: prevSchedule ? (isReceive ? '접수중' : '준비중') : '마감', //말
      isReceive,
      prevSchedule,
      step: item.step, //기수
      lessonTime: item.course.lessonTime,
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
      className: isReceive
        ? eduLegendList.filter(legend => legend.enType === item.course.courseCategoryType)[0]?.enType || 'TYPE_NONE'
        : 'TYPE_NONE',
    };
  });

  return (
    <CalendarWrap filter={filter}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        headerToolbar={{ start: '', end: '' }} //헤더 제거
        locale="ko"
        contentHeight="auto" //스크롤 제거
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
          if (!e.event._def.extendedProps.prevSchedule) return window.alert('마감된 교육입니다!');
          if (!e.event._def.extendedProps.isReceive) return window.alert('신청기간이 아닙니다!');
          setModalInfo({
            seq: extendedProps.seq as number,
            step: extendedProps.step as number,
            lessonTime: extendedProps.lessonTime as number,
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
            <Button
              variant="contained"
              onClick={() => {
                setEnrollInfo({
                  // courseCategoryType: modalInfo ? modalInfo.courseCategoryType.type : courseCategoryType.TYPE_NONE,
                  // courseBusinessType: FilterType.TYPE_PASSENGER, //서버에서 받아야함
                  seq: modalInfo?.seq ? modalInfo.seq : 0,
                });
                if (!isLogin) {
                  window.alert('로그인이 필요한 서비스입니다.');
                  return router.push('/sign-in');
                }
                // router.push({ pathname: '/stebMove/steb2', query: { seq: modalInfo?.seq } });
                router.push('/stebMove/steb2');
              }}
            >
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
    // @ts-ignore
    event: {
      _def: {
        extendedProps: { lessonTime, courseCategoryType },
      },
      title,
    },
  } = info;
  // @ts-ignore
  return (
    <>
      <div>[{title}]</div>
      <div>
        {courseCategoryType?.ko ? courseCategoryType.ko : 'null'}교육 / {lessonTime ? (lessonTime === 0 ? '종일' : lessonTime) : 'null'}시간
      </div>
      <div>{
      // @ts-ignore
      info && info.event._def.extendedProps.mediaType}</div>
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
  .TYPE_SUP_COMMON {
    background: #27ae60;
    border: #27ae60;
  }
  .TYPE_CONSTANT {
    background: #036c19;
    border: #036c19;
  }
  .TYPE_NEW {
    background: #2980b9;
    border: #2980b9;
  }
  .TYPE_ILLEGAL {
    background: #4c0c0c;
    border: #4c0c0c;
  }
  .TYPE_HANDICAPPED {
    background: #190b99;
    border: #190b99;
  }
  .TYPE_DANGEROUS {
    background: #b807a9;
    border: #b807a9;
  }
  .TYPE_NONE {
    background: #e0e0e0;
    border: #e0e0e0;
  }
`;
