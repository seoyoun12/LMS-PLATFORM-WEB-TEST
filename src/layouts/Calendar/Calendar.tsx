import styled from '@emotion/styled';
import { Container } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import { CalendarHeader } from './CalendarHeader';
import dateFormat from 'dateformat';
import { CalendarBody } from './CalendarBody';
import { businessType, courseCategoryType, CourseClassRes, courseSubCategoryType, useCourseClass } from '@common/api/courseClass';

export interface ClickedPlanInfo {
  seq: number;
  step: number;
  courseSubCategoryType: { type: courseSubCategoryType; ko: string };
  courseCategoryType: { type: courseCategoryType; ko: string };

  enrolledPeopleCnt: number;
  limitPeople: number;
  studyStartDate: string;
  studyEndDate: string;
  start: string;
  end: string;
}
export interface CalendarDatasRes {
  title: string;
  courseCategoryType: courseCategoryType;
  lessonTime: number;
  eduTypeAndTime: string;
  description: string;
  year: number;
  jobType: string;
  eduLegend: string;
  currentJoin: number;
  limit: number;
  eduStart: string;
  eduEnd: string;
  start: string;
  end: string;
}

export interface CalendarEvent extends CalendarDatasRes {
  className: string;
  color?: string;
}

export enum MonthClickType {
  BTN_CLICK = 'BTN_CLICK',
  MONTH_CLICK = 'MONTH_CLICK',
}

export enum FilterType {
  TYPE_ALL = 'TYPE_ALL',
  TYPE_PASSENGER = 'TYPE_PASSENGER',
  TYPE_CARGO = 'TYPE_CARGO',
}

// const calendarDatas: CalendarEvent[] = [
//   {
//     className: 'PASSENGER',
//     title: `마감`, //status
//     courseCategoryType: courseCategoryType.TYPE_SUP_COMMON,
//     lessonTime: 24, //eduTime
//     eduTypeAndTime: '강화교육/종일', //eduType
//     description: '동영상(VOD)', //몰라
//     year: 9999, // steb
//     jobType: '여객', //courseSubCategoryType
//     eduLegend: '강화교육', //courseCategoryType
//     currentJoin: 599,
//     limit: 999,
//     eduStart: '2022-07-10', //studyStartDate
//     eduEnd: '2022-07-16', //studyStartDate
//     start: '2022-07-02', //start: requestStartDate
//     end: '2022-07-05', //start: requestStartDate
//     color: '#4c0c0c',
//   },
//   {
//     className: 'FREIGHT',
//     title: `접수중`,
//     courseCategoryType: courseCategoryType.TYPE_SUP_COMMON,
//     lessonTime: 24,
//     eduTypeAndTime: '신규교육/24시간',
//     description: '동영상(VOD)',
//     year: 999,
//     jobType: '화물',
//     eduLegend: '보수교육',
//     currentJoin: 59,
//     limit: 99,
//     eduStart: '2022-07-20',
//     eduEnd: '2022-07-26',
//     start: '2022-07-12',
//     end: '2022-07-15',
//     color: '#2980b9',
//   },
//   {
//     className: 'PASSENGER',
//     title: `접수중`,
//     courseCategoryType: courseCategoryType.TYPE_SUP_COMMON,
//     lessonTime: 24,
//     eduTypeAndTime: '신규교육/24시간',
//     description: '동영상(VOD)',
//     year: 9929,
//     jobType: '화물',
//     eduLegend: '보수교육',
//     currentJoin: 592,
//     limit: 992,
//     eduStart: '2022-07-20',
//     eduEnd: '2022-07-26',
//     start: '2022-07-12',
//     end: '2022-07-15',
//     color: '#2980b9',
//   },
// ];

export const eduLegendList = [
  { title: '화물보수교육', color: '#27ae60' },
  { title: '여객보수교육', color: '#036c19' },
  { title: '신규교육', color: '#2980b9' },
  { title: '강화교육', color: '#4c0c0c' },
  { title: '접수마감', color: '#e0e0e0' },
];

const filterList = [
  { type: '전체', enType: FilterType.TYPE_ALL },
  { type: '여객', enType: FilterType.TYPE_PASSENGER },
  { type: '화물', enType: FilterType.TYPE_CARGO },
];

const modalInfoTItle = ['기수', '보수교육', '업종구분', '교육일', '신청/정원', '예약가능시간'];

export function CNCalendar() {
  const [date, setDate] = useState(new Date());
  const [filter, setFilter] = useState<businessType>(businessType.TYPE_ALL);
  const [openModal, setOpenModal] = useState(false);
  const [modalInfo, setModalInfo] = useState<ClickedPlanInfo>();
  const { data, error, mutate } = useCourseClass({ businessType: filter, date: '2022-07' });
  const [schedule, setSchedule] = useState<CourseClassRes[]>();

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const calendarRef = useRef<FullCalendar>(null);

  //RadioButton Filter changer
  const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === businessType.TYPE_ALL) setFilter(e.target.value);
    if (e.target.value === businessType.TYPE_PASSENGER) setFilter(e.target.value);
    if (e.target.value === businessType.TYPE_CARGO) setFilter(e.target.value);
    mutate();
  };

  //Month changer
  const onChangeMonth = (type: MonthClickType, value: number) => {
    if (type === MonthClickType.BTN_CLICK) return setDate(prev => new Date(prev.setMonth(prev.getMonth() + value)));
    if (type === MonthClickType.MONTH_CLICK) return setDate(prev => new Date(prev.setMonth(value - 1)));
  };

  //fullcalendar changer
  const changeFCDMonth = (date: Date) => {
    const fommated = dateFormat(date, 'yyyy-mm-dd');
    calendarRef.current?.getApi().gotoDate(fommated);
  };
  useEffect(() => {
    if (calendarRef) changeFCDMonth(date);
  }, [calendarRef, date]);

  useEffect(() => {
    setSchedule(data);
  }, [data]);

  if (!data) return null;
  return (
    <CalendarWrap>
      <CalendarHeader onChangeMonth={onChangeMonth} date={date} filterList={filterList} onChangeFilter={onChangeFilter} filter={filter} />
      {schedule && (
        <CalendarBody
          setOpenModal={setOpenModal}
          setModalInfo={setModalInfo}
          openModal={openModal}
          modalInfo={modalInfo}
          calendarRef={calendarRef}
          // CalendarEvent={calendarDatas}
          schedule={schedule}
          filter={filter}
        />
      )}
    </CalendarWrap>
  );
}
const CalendarWrap = styled(Container)``;
