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
import { Spinner } from '@components/ui';
import { NotFound } from '@components/ui/NotFound';
import { useState } from 'react';
import { getIsExistUser } from '@common/api/courseUser';
import { CheckBeforeEnrollDialog } from '@components/ui/Calendar';
import { isThisMinute } from 'date-fns';

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
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogDuplicatedType, setDialogDuplicatedType] = useState(true);

  const onCloseDialog = () => {
    setDialogOpen(false);
  };

  const scheduleItem = schedule?.map(({ date, day, children }) => {
    return {
      date: date,
      day,
      children: children.map(item => {
        //마감여부

        //정원이 다 찼을경우
        const isFullPeople =
          item.limitPeople !== 0 && item.enrolledPeopleCnt === item.limitPeople;

        //이전 날짜일경우
        const prevSchedule =
          new Date(item.requestEndDate.replaceAll('-', '/')).getTime() -
            new Date().getTime() >=
          0
            ? true
            : false;

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
        const prevDate = new Date(
          new Date(item.studyEndDate.replaceAll('-', '/')).getTime()
        );
        //마지막 교육일의 다음날짜
        const nextDate = new Date(
          new Date(item.studyEndDate.replaceAll('-', '/')).getTime()
        );
        prevDate.setHours(0);
        prevDate.setMinutes(0);
        prevDate.setSeconds(0);
        nextDate.setHours(24);
        nextDate.setMinutes(0);
        nextDate.setSeconds(0);
        const isTodayEduEnd =
          prevDate.getTime() < TodayDate.getTime() &&
          TodayDate.getTime() < nextDate.getTime();

        return {
          ...item,
          title: prevSchedule
            ? isReceive
              ? isFullPeople
                ? '접수마감'
                : //오늘이 교육의 마지막날일경우
                isTodayEduEnd
                ? '접수마감'
                : '접수중'
              : '준비중'
            : '교육종료', //말
          isReceive,
          prevSchedule,
          isFullPeople,
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
    isReceive: boolean,
    isFullPeople: boolean,
    isTodayEduEnd: boolean
  ) => {
    if (!prevSchedule || isFullPeople) return window.alert('종료된 교육입니다!');
    if (isFullPeople) return window.alert('접수마감된 교육입니다.');
    if (!isReceive) return window.alert('신청기간이 아닙니다!');
    if (isTodayEduEnd) return window.alert('접수마감 되었습니다!');
    setModalInfo({
      seq: item.seq,
      step: item.step,
      lessonTime: item.course.lessonTime,
      courseBusinessType: item.course.courseBusinessType as businessType,
      courseCategoryType: courseCategory.filter(
        categoryItem => categoryItem.type === item.course.courseCategoryType
      )[0],
      courseSubCategoryType: courseSubCategory.filter(
        sub => sub.type === item.course.courseSubCategoryType
      )[0],
      enrolledPeopleCnt: item.enrolledPeopleCnt,
      limitPeople: item.limitPeople,
      studyStartDate: item.studyStartDate,
      studyEndDate: item.studyEndDate,
      // start: dateFormat(item.start.replaceAll('-', '/'), 'yyyy-mm-dd'), //신청시작일자
      // end: dateFormat(item.end.replaceAll('-', '/'), 'yyyy-mm-dd'), //싱청종료일자
      start: dateFormat(item.studyStartDate.replaceAll('-', '/'), 'yyyy-mm-dd'), //학습일자로 바뀜 (2022-09-02) //여기서도 건들고 유틸쪽 checkDate에서 period체크 수정해야함
      end: dateFormat(item.studyEndDate.replaceAll('-', '/'), 'yyyy-mm-dd'), //학습일자로 바뀜 (2022-09-02) //여기서도 건들고 유틸쪽 checkDate에서 period체크 수정해야함
    });
    setOpenModal(true);
  };

  if (!scheduleItem) return <Spinner />;
  if (scheduleItem.length === 0) return <NotFound content="일정이 존재하지 않습니다!" />;
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
                    onClickOpenModal(
                      child,
                      child.prevSchedule,
                      child.isReceive,
                      child.isFullPeople,
                      child.isTodayEduEnd
                    )
                  }
                >
                  <CalendarItemHeader
                    sx={{
                      background: child.isReceive
                        ? child.isFullPeople
                          ? '#7a7a7a'
                          : '#df280a'
                        : '#7a7a7a',
                    }}
                  >
                    {child.title}
                  </CalendarItemHeader>
                  <Box mt={1}>
                    [{child.courseCategoryType.ko}]{' '}
                    {child.courseSubCategoryType.type === courseSubCategoryType.BUS
                      ? '여객'
                      : child.courseSubCategoryType.type ===
                        courseSubCategoryType.INDIVIDUAL_CARGO
                      ? '화물'
                      : 'null'}{' '}
                    - {child.courseCategoryType.ko} 교육
                  </Box>
                  <Box mt={1}>
                    {child.requestStartDate.split(' ')[0]} ~{' '}
                    {child.requestEndDate.split(' ')[0]} [
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
        fullWidth
        maxWidth="lg"
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
                    query: { redirect: router.asPath },
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
            >
              {loading ? <Spinner fit={true} /> : '교육신청'}
            </JoinButton>
            <CloseButton variant="contained" onClick={() => setOpenModal(false)}>
              닫기
            </CloseButton>
          </Box>
        }
      >
        <TableContainer sx={{ padding: '0 8px' }}>
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
                  <TableLeftCell>온라인교육</TableLeftCell>
                  {/* <TableRightCell>
                    {modalInfo.courseCategoryType
                      ? modalInfo.courseCategoryType.ko
                      : '오류'}
                  </TableRightCell> */}
                  <TableRightCell>보수일반교육</TableRightCell>
                </TableRow>
                <TableRow>
                  <TableLeftCell>교육구분</TableLeftCell>
                  <TableRightCell>
                    {
                      courseBusinessTypeList.filter(
                        item => item.enType === modalInfo.courseBusinessType
                      )[0]?.type
                    }
                    {/* 여객 / 화물 */}
                  </TableRightCell>
                  {/* <TableLeftCell>업종구분</TableLeftCell>
                  <TableRightCell>
                    {modalInfo.courseSubCategoryType
                      ? modalInfo.courseSubCategoryType.ko
                      : '오류'}
                  </TableRightCell> */}
                </TableRow>
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
      {/* <Dialog open={deplecateEnrollOpen} onClose={() => setDeplecateEnrollOpen(false)}>
        <DialogContent>
          <DialogContentText>
            이미 예약하신 신청내역이 있습니다. 신청내역을 확인하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeplecateEnrollOpen(false)}>취소</Button>
          <Button
            onClick={() => {
              router.push(`/me/enroll-history`);
              return setDeplecateEnrollOpen(false);
            }}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog> */}
    </CalendarWrap>
  );
}

const CalendarWrap = styled(Box)<{ filter: string }>`
  margin-top: 36px;
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
  font-size: 24px;
  margin: auto;
`;

const EduSummury = styled(Typography)`
  width: fit-content;
  font-weight: 700;
  font-size: 16px;
  border-top: 3px solid #000;
`;

const TableLeftCell = styled(TableCell)`
  /* width: 30%; */
  background: #f5f5f5;
  border-right: 1px solid #c4c4c4;
  border-left: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
  font-weight: 400;
  /* padding: '1rem 0'; */
  padding: '1px 0px';
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
