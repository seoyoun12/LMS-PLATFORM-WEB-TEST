import styled from '@emotion/styled';
import { Container } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import { CalendarHeader } from './CalendarHeader';
import dateFormat from 'dateformat';
import { CalendarBody } from './CalendarBody';
import {
  businessType,
  courseCategoryType,
  CourseClassRes,
  courseSubCategoryType,
  courseType,
  useCourseClass,
} from '@common/api/courseClass';
import { Spinner } from '@components/ui';
import { useCourseClassAdm } from '@common/api/adm/courseClass';

export interface ClickedPlanInfo {
  seq: number;
  step: number;
  lessonTime: number;
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

export const eduLegendList = [
  {
    title: '보수일반 교육',
    enType: courseCategoryType.TYPE_SUP_COMMON,
    color: '#f0ffdf',
    borderColor: '#d3f2a0',
  },
  {
    title: '보수수시 교육',
    enType: courseCategoryType.TYPE_SUP_CONSTANT,
    color: '#036c19',
    borderColor: '#eed4ba',
  },
  {
    title: '수시 교육',
    enType: courseCategoryType.TYPE_CONSTANT,
    color: '#036c19',
    borderColor: '#eed4ba',
  },
  {
    title: '신규 교육',
    enType: courseCategoryType.TYPE_NEW,
    color: '#2980b9',
    borderColor: '#e0e095',
  },
  {
    title: '법령위반자 교육',
    enType: courseCategoryType.TYPE_ILLEGAL,
    color: '#4c0c0c',
    borderColor: '#cce0ed',
  },
  {
    title: '교통약자 교육',
    enType: courseCategoryType.TYPE_HANDICAPPED,
    color: '#190b99',
    borderColor: '#c2c0ea',
  },
  {
    title: '위험물질 운송차량교육',
    enType: courseCategoryType.TYPE_DANGEROUS,
    color: '#b807a9',
    borderColor: '#e8c0cf',
  },
  {
    title: '마감',
    enType: courseCategoryType.TYPE_NONE,
    color: '#e0e0e0',
    borderColor: '#dfdfdf',
  },
];

export const courseBusinessTypeList = [
  { type: '전체', enType: businessType.TYPE_ALL },
  { type: '여객', enType: businessType.TYPE_PASSENGER },
  { type: '화물', enType: businessType.TYPE_CARGO },
];

const modalInfoTItle = [
  '기수',
  '보수교육',
  '업종구분',
  '교육일',
  '신청/정원',
  '예약가능시간',
];

export function AdminCalendar({ handleDate }: { handleDate: (date: Date) => void }) {
  const [date, setDate] = useState(new Date());
  const [filter, setFilter] = useState<businessType>(businessType.TYPE_ALL);
  const [openModal, setOpenModal] = useState(false);
  const [modalInfo, setModalInfo] = useState<ClickedPlanInfo>();
  const { data, error, mutate } = useCourseClassAdm(
    // courseType: typeof window !== 'undefined' && (localStorage.getItem('site_course_type') as courseType),
    filter,
    dateFormat(date, 'yyyy-mm')
  );
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
    if (type === MonthClickType.BTN_CLICK) {
      const dummyDate = new Date();
      // dummyDate.setMonth(date.getMonth() + value);
      dummyDate.setFullYear(date.getFullYear() + value);
      console.log(dummyDate.toLocaleDateString());
      return setDate(dummyDate);
    }
    if (type === MonthClickType.MONTH_CLICK)
      return setDate(prev => new Date(prev.setMonth(value - 1)));
  };

  useEffect(() => {
    handleDate(date);
  }, [date]);

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

  // if (!data) return <Spinner />;
  return (
    <CalendarWrap>
      <CalendarHeader
        onChangeMonth={onChangeMonth}
        date={date}
        filterList={courseBusinessTypeList}
        onChangeFilter={onChangeFilter}
        filter={filter}
      />
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
    </CalendarWrap>
  );
}
const CalendarWrap = styled(Container)``;
