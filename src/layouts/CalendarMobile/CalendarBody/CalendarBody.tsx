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
import { Spinner } from '@components/ui';

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  setModalInfo: React.Dispatch<React.SetStateAction<ClickedPlanInfo | undefined>>;
  modalInfo: ClickedPlanInfo | undefined;
  calendarRef: React.RefObject<FullCalendar>;
  // CalendarEvent: CalendarEvent[];
  filter: string;
  schedule?: { date: Date; day: string; children: CourseClassRes[] }[];
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
  const scheduleItem = schedule?.map(({ date, day, children }) => {
    return {
      date: date,
      day,
      children: children.map(item => {
        //마감여부
        // console.log('난 아이템이야!', eduLegendList);

        //이전 날짜일경우
        const prevSchedule =
          new Date(item.requestEndDate).getTime() - new Date().getTime() >= 0
            ? true
            : false;

        //이후 날짜일 경우.
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
          start: item.requestStartDate, //start: requestStartDate
          end: item.requestEndDate, //start: requestStartDate
          className: isReceive
            ? eduLegendList.filter(
                legend => legend.enType === item.course.courseCategoryType
              )[0]?.enType || 'TYPE_NONE'
            : 'TYPE_NONE',
        };
      }),
    };
  });

  const onClickOpenModal = (
    item: CourseClassRes,
    prevSchedule: boolean,
    isReceive: boolean
  ) => {
    if (!prevSchedule) return window.alert('마감된 교육입니다!');
    if (!isReceive) return window.alert('신청기간이 아닙니다!');
    setModalInfo({
      seq: item.seq,
      step: item.step,
      lessonTime: item.lessonTime,
      courseCategoryType: item.courseCategoryType as {
        type: courseCategoryType;
        ko: string;
      },
      courseSubCategoryType: item.courseSubCategoryType as {
        type: courseSubCategoryType;
        ko: string;
      },
      enrolledPeopleCnt: item.enrolledPeopleCnt,
      limitPeople: item.limitPeople,
      studyStartDate: item.studyStartDate,
      studyEndDate: item.studyEndDate,
      start: dateFormat(item.start, 'yyyy-mm-dd'),
      end: dateFormat(item.end, 'yyyy-mm-dd'),
    });
    setOpenModal(true);
  };

  if (!scheduleItem) return <Spinner />;
  return (
    <CalendarWrap filter={filter}>
      <Box>
        {scheduleItem.map(item => (
          <Box>
            <CalendarSummary>
              <Box>{dateFormat(item.date, 'yyyy-mm-dd')}</Box>
              <Box>{item.day}</Box>
            </CalendarSummary>
            <CalendarDetail>
              {item.children.map(child => (
                <CalendarItem
                  onClick={() =>
                    onClickOpenModal(child, child.prevSchedule, child.isReceive)
                  }
                >
                  <CalendarItemHeader
                    sx={{ background: child.isReceive ? '#df280a' : '#7a7a7a' }}
                  >
                    {child.title}
                  </CalendarItemHeader>
                  <Box mt={1}>
                    [{child.courseCategoryType.ko}] {child.courseSubCategoryType.ko} -{' '}
                    {child.courseCategoryType.ko} 교육
                  </Box>
                  <Box mt={1}>
                    {dateFormat(child.requestStartDate, 'yyyy-mm-dd')} ~{' '}
                    {dateFormat(child.requestEndDate, 'yyyy-mm-dd')} [
                    {child.limitPeople === 0
                      ? '인원제한없음'
                      : `${child.currentJoin}/
                    ${child.limitPeople}`}
                    ]
                  </Box>
                </CalendarItem>
              ))}
            </CalendarDetail>
          </Box>
        ))}
      </Box>

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
                  return router.push('/sign-in');
                }
                router.push('/stebMove/steb2');
              }}
            >
              교육신청
            </JoinButton>
            <CloseButton variant="contained" onClick={() => setOpenModal(false)}>
              닫기
            </CloseButton>
          </Box>
        }
      >
        <TableContainer sx={{ width: '500px', padding: '0 2rem' }}>
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
                    {modalInfo.start} ~ {modalInfo.end}
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

const CalendarWrap = styled(Box)<{ filter: string }>`
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

const CalendarSummary = styled(Box)`
  background: #f0f0f0;
  border-top: 2px solid #c6c6c6;
  border-bottom: 2px solid #c6c6c6;
  padding: 8px 16px;
  font-weight: 700;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
`;
const CalendarDetail = styled(Box)``;

const CalendarItem = styled(Box)`
  border-bottom: 2px solid #c6c6c6;
  padding: 8px 16px;
`;

const CalendarItemHeader = styled(Box)`
  width: fit-content;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
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
