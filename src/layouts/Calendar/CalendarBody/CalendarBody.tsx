/* eslint-disable */

import styled from '@emotion/styled';
import { CustomContentGenerator, EventContentArg } from '@fullcalendar/core';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import FullCalendar from '@fullcalendar/react';
import {
  CalendarEvent,
  ClickedPlanInfo,
  courseBusinessTypeList,
  eduLegendList,
  FilterType,
} from '../Calendar';
import { Modal } from '@components/ui/Modal';
import dayGridPlugin from '@fullcalendar/daygrid';
import dateFormat from 'dateformat';
import { useRouter } from 'next/router';
import {
  courseType,
  courseCategoryType,
  CourseClassRes,
  courseSubCategoryType,
  businessType,
} from '@common/api/courseClass';
import { courseClassEnrollInfo } from '@common/recoil';
import { useRecoilState } from 'recoil';
import { useIsLoginStatus } from '@hooks/useIsLoginStatus';
import { YN } from '@common/constant';
import { getIsExistUser } from '@common/api/courseUser';
import { useState } from 'react';
import { Spinner } from '@components/ui';
import { CheckBeforeEnrollDialog } from '@components/ui/Calendar';

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
  const [loading, setLoading] = useState(false);
  const [enrollInfo, setEnrollInfo] = useRecoilState(courseClassEnrollInfo);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogDuplicatedType, setDialogDuplicatedType] = useState(true);

  const onCloseDialog = () => {
    setDialogOpen(false);
  };

  const scheduleList = schedule?.map(item => {
    //정원이 다 찼을경우
    const isFullPeople =
      item.limitPeople !== 0 && item.enrolledPeopleCnt === item.limitPeople;

    //마감여부
    //이전 날짜일경우(마지막 날짜보다 현재날짜가 작을경우 true)
    const prevSchedule =
      new Date(item.requestEndDate.replaceAll('-', '/')).getTime() -
        new Date().getTime() >=
      0
        ? true
        : false;

    //이후 날짜일경우
    const nextSchedule = new Date().getTime() > new Date(item.eduEnd).getTime();

    //이후 날짜일 경우.
    const isReceive =
      new Date(item.requestEndDate.replaceAll('-', '/')).getTime() -
        new Date().getTime() >=
      0
        ? new Date(item.requestStartDate.replaceAll('-', '/')).getTime() -
            new Date().getTime() <=
          0
          ? true
          : false
        : false;

    //오늘이 교육의 마지막날짜일경우
    const TodayDate = new Date();
    //마지막 교육일의 이전날짜
    const prevDate = new Date(new Date(item.studyEndDate.replaceAll('-', '/')).getTime());
    //마지막 교육일의 다음날짜
    const nextDate = new Date(new Date(item.studyEndDate.replaceAll('-', '/')).getTime());
    prevDate.setHours(0);
    prevDate.setMinutes(0);
    prevDate.setSeconds(0);
    nextDate.setHours(24);
    nextDate.setMinutes(0);
    nextDate.setSeconds(0);
    const isTodayEduEnd =
      prevDate.getTime() < TodayDate.getTime() &&
      TodayDate.getTime() < nextDate.getTime();
    // 오늘이 교육날짜 이후라면(해당내용은 위에 정의되어있음. 하기의 코드와 같이 짧게 리팩토링 필요)
    const isAfterEndEdu = nextDate.getTime() < TodayDate.getTime();

    //아래 삼항연산자는 리팩토링 필요가 있음.
    return {
      ...item,
      //신청지난 스케쥴
      title: prevSchedule
        ? //수강가능기간 여부(지난 스케쥴 여부도 있음)
          item.enableToEnrollYn === YN.YES
          ? //정원이 찼는지 여부
            isFullPeople
            ? '접수마감'
            : //오늘이 교육의 마지막날일경우
            isTodayEduEnd
            ? '접수마감'
            : '접수중'
          : '준비중'
        : '교육종료', //말
      isReceive,
      isFullPeople,
      prevSchedule,
      isTodayEduEnd,
      step: item.step, //기수
      lessonTime: item.course.lessonTime,
      mediaType: '동영상(VOD)',
      courseCategoryType: courseCategory.filter(
        categoryItem => categoryItem.type === item.course.courseCategoryType
      )[0], //eduType
      courseSubCategoryType: courseSubCategory.filter(
        sub => sub.type === item.course.courseSubCategoryType
      )[0], //업종
      // courseCategoryType: courseCategoryType.TYPE_SUP_COMMON, //보수일반 고정 2022-08-31 변경,
      // courseSubCategoryType: courseSubCategoryType.BUS, //업종 버스고정 2022-08-31 변경, 버스(여객) , 개별화물(화물)
      eduTypeAndTime: item.course.lessonTime, // eduTime
      currentJoin: item.enrolledPeopleCnt, //현재 수강
      limit: item.limitPeople, //수강 제한
      studyStartDate: item.studyStartDate, //studyStartDate 학습시작날짜
      studyEndDate: item.studyEndDate, //studyStartDate 학습종료날짜
      // start: item.requestStartDate, //start: requestStartDate 신청시작날짜
      // end: item.requestEndDate, //start: requestStartDate 신청종료날짜
      start: item.studyStartDate, //학습시작날짜
      end: item.studyEndDate, //학습종료날짜
      className:
        item.enableToEnrollYn === YN.YES
          ? isFullPeople
            ? 'TYPE_NONE'
            : 'TYPE_SUP_COMMON'
          : 'TYPE_NONE',
      // item.enableToEnrollYn === YN.YES ? eduLegendList.filter(legend => legend.enType === item.course.courseCategoryType)[0]?.enType : 'TYPE_NONE', 나중에 필요시 사용
      // className: isReceive
      // ? eduLegendList.filter(legend => legend.enType === item.course.courseCategoryType)[0]?.enType || 'TYPE_NONE'
      // : 'TYPE_NONE',
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
          // console.log(
          //   e.event._def.extendedProps.prevSchedule,
          //   e.event._def.extendedProps.isReceive
          // );
          if (!e.event._def.extendedProps.prevSchedule)
            return window.alert('종료된 교육입니다!');
          if (e.event._def.extendedProps.isFullPeople)
            return window.alert('접수마감된 교육입니다.');
          if (!e.event._def.extendedProps.isReceive)
            return window.alert('신청기간이 아닙니다!');
          if (e.event._def.extendedProps.isTodayEduEnd)
            return window.alert('접수마감 되었습니다!');
          setModalInfo({
            seq: extendedProps.seq as number,
            step: extendedProps.step as number,
            lessonTime: extendedProps.lessonTime as number,
            courseBusinessType: e.event._def.extendedProps.course
              .courseBusinessType as businessType,
            courseCategoryType: extendedProps.courseCategoryType as {
              type: courseCategoryType;
              ko: string;
            },
            courseSubCategoryType: extendedProps.courseSubCategoryType as {
              type: courseSubCategoryType;
              ko: string;
            },
            enableToEnrollYn: extendedProps.enableToEnrollYn as YN,
            enrolledPeopleCnt: extendedProps.enrolledPeopleCnt as number,
            limitPeople: extendedProps.limitPeople as number,
            studyStartDate: extendedProps.studyStartDate as string,
            studyEndDate: extendedProps.studyEndDate as string,
            requestStartDate: extendedProps.requestStartDate as string,
            requestEndDate: extendedProps.requestEndDate as string,
            start: dateFormat(start as Date, 'yyyy/mm/dd'),
            end: dateFormat(end as Date, 'yyyy/mm/dd'),
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
              onClick={async () => {
                setEnrollInfo({
                  // courseCategoryType: modalInfo ? modalInfo.courseCategoryType.type : courseCategoryType.TYPE_NONE,
                  // courseBusinessType: FilterType.TYPE_PASSENGER, //서버에서 받아야함
                  seq: modalInfo?.seq ? modalInfo.seq : 0,
                });
                if (!isLogin) {
                  window.alert('로그인이 필요한 서비스입니다.');
                  return router.push({
                    pathname: '/sign-in',
                    query: { redirect: `stebMove/steb2` },
                  });
                }

                try {
                  setLoading(true);
                  const { data } = await getIsExistUser(modalInfo.seq);
                  if (!data.available) {
                    setLoading(false);
                    setDialogMessage(data.message);
                    setDialogDuplicatedType(data.duplicated);
                    return setDialogOpen(true);
                  }
                  setLoading(false);
                } catch (e: any) {
                  setLoading(false);
                  return window.alert('오류입니다! 관리자에게 문의해주세요.');
                }
                router.push('/stebMove/steb2');
                setLoading(false);
              }}
              disabled={loading}
            >
              {loading ? <Spinner fit={true} /> : '교육신청'}
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
            <span>교육 상세정보</span>
          </EduGuide>
          {/* <EduSummury>
            <span>교육개요</span>
          </EduSummury> */}
          <TableBody
            sx={{ display: 'table', width: '100%', borderTop: '1px solid #c4c4c4' }}
          >
            {modalInfo && (
              <>
                <TableRow>
                  <TableLeftCell>기수</TableLeftCell>
                  <TableRightCell>{modalInfo.step}기</TableRightCell>
                </TableRow>
                <TableRow>
                  <TableLeftCell>온라인과정</TableLeftCell>
                  <TableRightCell>
                    {/* {modalInfo.courseCategoryType ? modalInfo.courseCategoryType.ko : '오류'} */}
                    {localStorage.getItem('site_course_type') === 'TYPE_LOW_FLOOR_BUS'
                      ? '저상버스 운전자교육'
                      : '보수일반'}
                  </TableRightCell>
                </TableRow>
                {localStorage.getItem('site_course_type') === 'TYPE_LOW_FLOOR_BUS' ? (
                  ''
                ) : (
                  <TableRow>
                    <TableLeftCell>운수구분</TableLeftCell>
                    <TableRightCell>
                      {
                        courseBusinessTypeList.filter(
                          item => item.enType === modalInfo.courseBusinessType
                        )[0]?.type
                      }
                      {/* 여객 / 화물 */}
                    </TableRightCell>
                  </TableRow>
                )}

                {/* <TableRow>
                  <TableLeftCell>업종구분</TableLeftCell>
                  <TableRightCell>{modalInfo.courseSubCategoryType ? modalInfo.courseSubCategoryType.ko : '오류'}</TableRightCell>
                </TableRow> */}
                <TableRow>
                  <TableLeftCell>교육일</TableLeftCell>
                  <TableRightCell>
                    {dateFormat(
                      modalInfo.studyStartDate.replaceAll('-', '/'),
                      'yyyy-mm-dd'
                    )}{' '}
                    ~{' '}
                    {dateFormat(
                      modalInfo.studyEndDate.replaceAll('-', '/'),
                      'yyyy-mm-dd'
                    )}
                  </TableRightCell>
                </TableRow>
                <TableRow>
                  <TableLeftCell>신청 / 정원</TableLeftCell>
                  <TableRightCell>
                    {modalInfo.limitPeople === 0
                      ? '제한없음'
                      : `${modalInfo.enrolledPeopleCnt} / ${modalInfo.limitPeople}명`}
                  </TableRightCell>
                </TableRow>
                <TableRow>
                  <TableLeftCell>예약가능시간</TableLeftCell>
                  <TableRightCell>
                    {dateFormat(
                      modalInfo.requestStartDate.replaceAll('-', '/'),
                      'yyyy-mm-dd'
                    )}{' '}
                    ~{' '}
                    {dateFormat(
                      modalInfo.requestEndDate.replaceAll('-', '/'),
                      'yyyy-mm-dd'
                    )}
                  </TableRightCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </TableContainer>
      </Modal>
      <CheckBeforeEnrollDialog
        open={dialogOpen}
        onClose={onCloseDialog}
        message={dialogMessage}
        duplicated={dialogDuplicatedType}
        confirmAction={() => {
          router.push(`/me/enroll-history`);
          return setDialogOpen(false);
        }}
      />
    </CalendarWrap>
  );
}
function renderEventContent(info: CustomContentGenerator<EventContentArg>) {
  const {
    //@ts-ignore
    event: {
      _def: { extendedProps },
      title,
    },
  } = info;

  // @ts-ignore
  return (
    <Box sx={{ color: 'black', fontSize: '1rem' }}>
      <Box display="flex">
        <Box
          sx={{
            color:
              extendedProps.prevSchedule && extendedProps.enableToEnrollYn === YN.YES
                ? extendedProps.isFullPeople
                  ? '#7a7a7a'
                  : '#df280a'
                : '#7a7a7a',
          }}
          fontWeight="bold"
        >
          [{title}]&nbsp;
        </Box>
        <Box>
          {/* {extendedProps.step}기 {extendedProps.courseCategoryType.ko}교육 */}
          {localStorage.getItem('site_course_type') === 'TYPE_LOW_FLOOR_BUS'
            ? '저상버스 운전자교육'
            : '보수일반'}
        </Box>
      </Box>
      {localStorage.getItem('site_course_type') === 'TYPE_LOW_FLOOR_BUS' ? (
        ''
      ) : (
        <Box>
          {/* courseBusinessTypeList.filter(
            item => item.enType === extendedProps.course.courseBusinessType
          )[0]?.type */}

          {extendedProps.courseSubCategoryType.type === courseSubCategoryType.BUS
            ? '여객'
            : extendedProps.courseSubCategoryType.type ===
              courseSubCategoryType.INDIVIDUAL_CARGO
            ? '화물'
            : 'null'}
          {/* 여객 / 화물 */}
        </Box>
      )}

      <Box>
        {extendedProps.limitPeople === 0
          ? '제한없음'
          : `${extendedProps.enrolledPeopleCnt} / ${extendedProps.limitPeople}`}
      </Box>
      {/* <Typography color="black">
        {courseCategoryType?.ko ? courseCategoryType.ko : 'null'}교육 / {lessonTime ? (lessonTime === 0 ? '종일' : lessonTime) : 'null'}시간
      </Typography> */}
      {/* <Typography color="black">
        {
          //@ts-ignore
          info && info.event._def.extendedProps.mediaType
        }
      </Typography> */}
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

  //블록 넘치는 글자 hide
  .fc-daygrid-event {
    overflow: hidden;
  }

  .TYPE_SUP_COMMON {
    background: #f0ffdf;
    border: #d3f2a0;
  }
  .TYPE_SUP_CONSTANT {
    background: #d9fdf1;
    border: #baeedc;
  }
  .TYPE_CONSTANT {
    background: #eed4ba;
    border: #036c19;
  }
  .TYPE_NEW {
    background: #e0e095;
    border: #2980b9;
  }
  .TYPE_ILLEGAL {
    background: #cce0ed;
    border: #4c0c0c;
  }
  .TYPE_HANDICAPPED {
    background: #c2c0ea;
    border: #3f2de2;
  }
  .TYPE_DANGEROUS {
    background: #e8c0cf;
    border: #b34caa;
  }
  .TYPE_NONE {
    background: #dfdfdf;
    border: #e0e0e0;
  }
`;
const EduGuide = styled(Typography)`
  width: fit-content;
  font-weight: 700;
  font-size: 24px;
  margin: auto;
  padding-bottom: 12px;
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
