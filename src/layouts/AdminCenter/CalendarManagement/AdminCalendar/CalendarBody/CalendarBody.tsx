/* eslint-disable */

import styled from '@emotion/styled';
import { CustomContentGenerator, EventContentArg } from '@fullcalendar/core';
import {
  Box,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import FullCalendar from '@fullcalendar/react';
import { CalendarEvent, ClickedPlanInfo, eduLegendList, FilterType } from '../Calendar';
import { Modal } from '@components/ui/Modal';
import dayGridPlugin from '@fullcalendar/daygrid';
import dateFormat from 'dateformat';
import { useRouter } from 'next/router';
import {
  courseType,
  courseCategoryType,
  CourseClassRes,
  courseSubCategoryType,
} from '@common/api/courseClass';
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
  schedule?: CourseClassRes[];
}

export const courseReg = [
  { type: courseType.TYPE_TRANS_WORKER, ko: '운수종사자' },
  { type: courseType.TYPE_LOW_FLOOR_BUS, ko: '저상버스' },
  { type: courseType.TYPE_PROVINCIAL, ko: '도민' },
];

export const courseCategory = [
  { type: courseCategoryType.TYPE_SUP_COMMON, ko: '보수일반' },
  { type: courseCategoryType.TYPE_SUP_CONSTANT, ko: '보수수시' },
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

export function CalendarBody({
  setOpenModal,
  setModalInfo,
  openModal,
  modalInfo,
  calendarRef,
  filter,
  schedule,
}: Props) {
  const router = useRouter();
  const isLogin = useIsLoginStatus();
  const [enrollInfo, setEnrollInfo] = useRecoilState(courseClassEnrollInfo);
  const scheduleList = schedule?.map(item => {
    //마감여부
    const prevSchedule =
      new Date(item.requestEndDate).getTime() - new Date().getTime() >= 0 ? true : false;
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
      courseCategoryType: courseCategory.filter(
        categoryItem => categoryItem.type === item.course.courseCategoryType
      )[0], //eduType
      courseSubCategoryType: courseSubCategory.filter(
        sub => sub.type === item.course.courseSubCategoryType
      )[0], //업종
      eduTypeAndTime: item.course.lessonTime, // eduTime
      currentJoin: item.enrolledPeopleCnt, //현재 수강
      limit: item.limitPeople, //수강 제한
      studyStartDate: item.studyStartDate, //studyStartDate
      studyEndDate: item.studyEndDate, //studyStartDate
      // start: item.requestStartDate, //start: requestStartDate
      // end: item.requestEndDate, //start: requestStartDate
      start: item.studyStartDate, //
      end: item.studyEndDate, // 학습시작일로 변경됨.
      className: isReceive
        ? eduLegendList.filter(
            legend => legend.enType === item.course.courseCategoryType
          )[0]?.enType || 'TYPE_NONE'
        : 'TYPE_NONE',
    };
  });

  return (
    <CalendarWrap filter={filter}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        headerToolbar={{ start: '', end: '' }} //헤더 제거
        // locale="ko"
        // dayCellContent={['😁', '😂', '😁', '😂', '😁', '😂']}
        // dayCellClassNames={date => ['fc-day-header-sun', '월', '화', '수', '목', '금', 'fc-day-header-sat'][date.dow]}
        dayHeaderClassNames={date =>
          ['fc-day-header-sun', '월', '화', '수', '목', '금', 'fc-day-header-sat'][
            date.dow
          ]
        }
        dayHeaderContent={date => ['일', '월', '화', '수', '목', '금', '토'][date.dow]}
        // showNonCurrentDates={false}

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
          }: {
            event: {
              _def: { extendedProps: Partial<ClickedPlanInfo> };
              start: Date | null;
              end: Date | null;
            };
          } = e;
          // if (!e.event._def.extendedProps.prevSchedule) return window.alert('마감된 교육입니다!');
          // if (!e.event._def.extendedProps.isReceive) return window.alert('신청기간이 아닙니다!');
          setModalInfo({
            seq: extendedProps.seq as number,
            step: extendedProps.step as number,
            lessonTime: extendedProps.lessonTime as number,
            courseCategoryType: extendedProps.courseCategoryType as {
              type: courseCategoryType;
              ko: string;
            },
            courseSubCategoryType: extendedProps.courseSubCategoryType as {
              type: courseSubCategoryType;
              ko: string;
            },

            enrolledPeopleCnt: extendedProps.enrolledPeopleCnt as number,
            limitPeople: extendedProps.limitPeople as number,
            studyStartDate: extendedProps.studyStartDate as string,
            studyEndDate: extendedProps.studyEndDate as string,
            requestStartDate: extendedProps.requestStartDate as string,
            requestEndDate: extendedProps.requestEndDate as string,
            start: dateFormat(start as Date, 'yyyy-mm-dd'),
            end: dateFormat(end as Date, 'yyyy-mm-dd'),
          });
          setOpenModal(true);
        }}
      />
      <Modal
        open={openModal}
        onCloseModal={() => setOpenModal(false)}
        // title={<Box >교육안내</Box>}
        action={
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              gap: '1rem',
              paddingBottom: '2rem',
            }}
          >
            <JoinButton
              variant="contained"
              onClick={() => {
                setEnrollInfo({
                  // courseCategoryType: modalInfo ? modalInfo.courseCategoryType.type : courseCategoryType.TYPE_NONE,
                  // courseBusinessType: FilterType.TYPE_PASSENGER, //서버에서 받아야함
                  seq: modalInfo?.seq ? modalInfo.seq : 0,
                });
                if (!isLogin) {
                  window.alert('로그인이 필요한 서비스입니다.');
                  return router.push('/admin-center');
                }
                router.push(`/admin-center/calendar/modify/${modalInfo.seq}`);
              }}
            >
              상세보기
            </JoinButton>
            <CloseButton variant="contained" onClick={() => setOpenModal(false)}>
              닫기
            </CloseButton>
          </Box>
        }
      >
        <TableContainer sx={{ width: '500px', padding: '0 2rem' }}>
          {/* <Box display="flex" alignItems="center" fontWeight="bold" mb={2}>
            <HorizontalRuleRoundedIcon sx={{ color: '#2980b9' }} />
            <span>교육개요</span>
          </Box> */}
          <EduGuide>
            <span>교육안내</span>
          </EduGuide>
          <EduSummury>
            <span>교육개요</span>
          </EduSummury>
          <TableBody
            sx={{ display: 'table', width: '100%', borderTop: '1px solid #c4c4c4' }}
          >
            {modalInfo && (
              <>
                <TableRow>
                  <TableLeftCell>기수</TableLeftCell>
                  <TableRightCell>{modalInfo.step}</TableRightCell>
                </TableRow>
                <TableRow>
                  <TableLeftCell>교육과정</TableLeftCell>
                  <TableRightCell>
                    {modalInfo.courseCategoryType
                      ? modalInfo.courseCategoryType.ko
                      : '오류'}
                  </TableRightCell>
                </TableRow>
                <TableRow>
                  <TableLeftCell>업종구분</TableLeftCell>
                  <TableRightCell>
                    {modalInfo.courseSubCategoryType
                      ? modalInfo.courseSubCategoryType.ko
                      : '오류'}
                  </TableRightCell>
                </TableRow>
                <TableRow>
                  <TableLeftCell>교육일</TableLeftCell>
                  <TableRightCell>
                    {dateFormat(modalInfo.studyStartDate, 'yyyy-mm-dd')} ~{' '}
                    {dateFormat(modalInfo.studyEndDate, 'yyyy-mm-dd')}
                  </TableRightCell>
                </TableRow>
                <TableRow>
                  <TableLeftCell>신청/정원</TableLeftCell>
                  <TableRightCell>
                    {modalInfo.limitPeople === 0
                      ? '제한없음'
                      : `${modalInfo.enrolledPeopleCnt} / ${modalInfo.limitPeople}명`}
                  </TableRightCell>
                </TableRow>
                <TableRow>
                  <TableLeftCell>예약가능시간</TableLeftCell>
                  <TableRightCell>
                    {dateFormat(modalInfo.requestStartDate, 'yyyy-mm-dd')} ~{' '}
                    {dateFormat(modalInfo.requestEndDate, 'yyyy-mm-dd')}
                  </TableRightCell>
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
    //@ts-ignore
    event: {
      _def: {
        extendedProps: { lessonTime, courseCategoryType, isReceive },
      },
      title,
    },
  } = info;
  // @ts-ignore
  return (
    <Box display="flex">
      <Typography sx={{ color: isReceive ? '#df280a' : '#7a7a7a' }} fontWeight="bold">
        [{title}]
      </Typography>
      <Typography color="black">
        {courseCategoryType?.ko ? courseCategoryType.ko : 'null'}교육 /{' '}
        {lessonTime ? (lessonTime === 0 ? '종일' : lessonTime) : 'null'}시간
      </Typography>
      <Typography color="black">
        {
          //@ts-ignore
          info && info.event._def.extendedProps.mediaType
        }
      </Typography>
    </Box>
  );
}
const CalendarWrap = styled(Box)<{ filter: string }>`
  .fc-dayGridMonth-view {
    border-top: 3px solid #000;
  }
  .fc-col-header {
    // 헤더css
    .fc-scrollgrid-sync-inner {
      background: #fafafa;
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

  .fc-day-today {
    background-color: white !important; // as possible as Avoid using '!important' !!!!
  }
  //date
  .fc-day-sun {
    color: #ea0b0b;
  }
  .fc-daygrid-day-top {
    padding: 10px 0 0 10px;
  }

  .fc-day-header-sun {
    color: #ea0b0b;
  }
  .fc-day-header-sat {
    color: #256aef;
  }

  //이벤트 블록
  .fc-daygrid-block-event {
    min-height: 80px;
    display: flex;
    align-items: center;
    border: 1px solid #dae2f3 !important;
    margin: 0.75rem 0;
    /* overflow: hidden; */
    padding-left: 1rem;
  }
  //이상한 이벤트 블록
  .fc-daygrid-dot-event {
    min-height: 80px;
    display: flex;
    align-items: center;
    border: 1px solid #dae2f3 !important;
    margin: 0.75rem 0;
    /* overflow: hidden; */
    padding-left: 1rem;
  }
  //블록 넘치는 글자 hide
  .fc-daygrid-event {
    overflow: hidden;
  }

  //calendar event start in date
  .fc-event-start {
    border-radius: 4px 0 0 4px;
    padding-left: 1rem;
    /* margin-left: 1rem !important; */
    /* text-align: left; */
  }
  //calendar event end in date
  .fc-event-end {
    border-radius: 0 4px 4px 0;
    padding-right: 1rem;
    /* margin-right: 1rem !important; */
    /* text-align: right; */
  }
  /* .fc-day-sat {
    color: red;
  } */

  .TYPE_SUP_COMMON {
    background: #f0ffdf;
    border: #d3f2a0;
  }
  .TYPE_SUP_CONSTANT {
    background: #036c19;
    border: #eed4ba;
  }
  .TYPE_CONSTANT {
    background: #036c19;
    border: #eed4ba;
  }
  .TYPE_NEW {
    background: #2980b9;
    border: #e0e095;
  }
  .TYPE_ILLEGAL {
    background: #4c0c0c;
    border: #cce0ed;
  }
  .TYPE_HANDICAPPED {
    background: #190b99;
    border: #c2c0ea;
  }
  .TYPE_DANGEROUS {
    background: #b807a9;
    border: #e8c0cf;
  }
  .TYPE_NONE {
    background: #e0e0e0;
    border: #dfdfdf;
  }
`;
const EduGuide = styled(Typography)`
  width: fit-content;
  font-weight: 700;
  font-size: 36px;
  margin: auto;
`;

const EduSummury = styled(Typography)`
  width: fit-content;
  font-weight: 700;
  font-size: 24px;
  border-top: 3px solid #000;
`;

const TableLeftCell = styled(TableCell)`
  width: 30%;
  background: #f5f5f5;
  border-right: 1px solid #c4c4c4;
  border-left: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
  font-weight: 400;
`;
const TableRightCell = styled(TableCell)`
  border-bottom: 1px solid #c4c4c4;
  border-right: 1px solid #c4c4c4;
  font-weight: 400;
`;

const JoinButton = styled(Button)`
  width: 25%;
  padding: 0.5rem;
  font-weight: 500;
`;
const CloseButton = styled(Button)`
  width: 25%;
  padding: 0.5rem;
  font-weight: 500;
  background-color: #383838;
`;
