import styled from '@emotion/styled';
import { Box, Container, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { Modal } from '@components/ui/Modal';
import styles from '@styles/common.module.scss';
import { useEffect, useRef, useState } from 'react';
import React, { Component } from 'react';
import { Calendar, CustomContentGenerator, Dictionary, EventContentArg } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarHeader } from './CalendarHeader';
import dateFormat from 'dateformat';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import { CalendarBody } from './CalendarBody';

export interface ClickedPlanInfo {
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
export interface CalendarDatasRes {
  title: string;
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
  ALL = 'ALL',
  PASSENGER = 'PASSENGER',
  FREIGHT = 'FREIGHT',
}

const calendarDatas: CalendarEvent[] = [
  {
    className: 'PASSENGER',
    title: `마감`,
    eduTypeAndTime: '강화교육/종일',
    description: '동영상(VOD)',
    year: 9999,
    jobType: '여객',
    eduLegend: '강화교육',
    currentJoin: 599,
    limit: 999,
    eduStart: '2022-07-10',
    eduEnd: '2022-07-16',
    start: '2022-07-02',
    end: '2022-07-05',
    color: '#4c0c0c',
  },
  {
    className: 'FREIGHT',
    title: `접수중`,
    eduTypeAndTime: '신규교육/24시간',
    description: '동영상(VOD)',
    year: 999,
    jobType: '화물',
    eduLegend: '보수교육',
    currentJoin: 59,
    limit: 99,
    eduStart: '2022-07-20',
    eduEnd: '2022-07-26',
    start: '2022-07-12',
    end: '2022-07-15',
    color: '#2980b9',
  },
  {
    className: 'PASSENGER',
    title: `접수중`,
    eduTypeAndTime: '신규교육/24시간',
    description: '동영상(VOD)',
    year: 9929,
    jobType: '화물',
    eduLegend: '보수교육',
    currentJoin: 592,
    limit: 992,
    eduStart: '2022-07-20',
    eduEnd: '2022-07-26',
    start: '2022-07-12',
    end: '2022-07-15',
    color: '#2980b9',
  },
];

export const eduLegendList = [
  { title: '화물보수교육', color: '#27ae60' },
  { title: '여객보수교육', color: '#036c19' },
  { title: '신규교육', color: '#2980b9' },
  { title: '강화교육', color: '#4c0c0c' },
  { title: '접수마감', color: '#e0e0e0' },
];

const filterList = [
  { type: '전체', enType: FilterType.ALL },
  { type: '여객', enType: FilterType.PASSENGER },
  { type: '화물', enType: FilterType.FREIGHT },
];

const modalInfoTItle = ['기수', '보수교육', '업종구분', '교육일', '신청/정원', '예약가능시간'];

export function CNCalendar() {
  const [date, setDate] = useState(new Date());
  const [filter, setFilter] = useState('ALL');
  const [openModal, setOpenModal] = useState(false);
  const [modalInfo, setModalInfo] = useState<ClickedPlanInfo>();

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const calendarRef = useRef<FullCalendar>(null);

  //RadioButton Filter changer
  const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
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
    console.log(date.getMonth());
  }, [calendarRef, date]);

  return (
    <CalendarWrap>
      <CalendarHeader onChangeMonth={onChangeMonth} date={date} filterList={filterList} onChangeFilter={onChangeFilter} filter={filter} />
      <CalendarBody
        setOpenModal={setOpenModal}
        setModalInfo={setModalInfo}
        openModal={openModal}
        modalInfo={modalInfo}
        calendarRef={calendarRef}
        CalendarEvent={calendarDatas}
        filter={filter}
      />
      {/* <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        headerToolbar={{ start: '', end: '' }} //헤더 제거
        locale="ko"
        eventContent={renderEventContent}
        events={[
          {
            title: `접수중`,
            eduTypeAndTime: '신규교육/24시간',
            description: '동영상(VOD)',
            year: 999,
            jobType: '화물',
            eduLegend: '보수교육',
            currentJoin: 59,
            limit: 99,
            eduStart: '2022-07-20',
            eduEnd: '2022-07-26',
            start: '2022-07-12',
            end: '2022-07-15',
            color: '#2980b9',
          },
          {
            title: `마감`,
            eduTypeAndTime: '강화교육/종일',
            description: '동영상(VOD)',
            year: 999,
            jobType: '여객',
            eduLegend: '강화교육',
            currentJoin: 59,
            limit: 99,
            eduStart: '2022-07-10',
            eduEnd: '2022-07-16',
            start: '2022-07-02',
            end: '2022-07-05',
            color: '#4c0c0c',
          },
          {
            title: `마감`,
            eduTypeAndTime: '강화교육/종일',
            description: '동영상(VOD)',
            year: 999,
            jobType: '여객',
            eduLegend: '강화교육',
            currentJoin: 59,
            limit: 99,
            eduStart: '2022-07-10',
            eduEnd: '2022-07-16',
            start: '2022-07-02',
            end: '2022-07-05',
            color: '#4c0c0c',
          },
        ]}
        eventClick={e => {
          console.log(e);
          const {
            event: {
              _def: { extendedProps },
              start,
              end,
            },
          }: { event: { _def: { extendedProps: Partial<ClickedPlanInfo> }; start: Date | null; end: Date | null } } = e;
          setModalInfo({
            year: extendedProps.year ? extendedProps.year : -1,
            jobType: extendedProps.jobType ? extendedProps.jobType : '',
            eduLegend: extendedProps.eduLegend ? extendedProps.eduLegend : '',
            currentJoin: extendedProps.currentJoin ? extendedProps.currentJoin : 0,
            limit: extendedProps.limit ? extendedProps.limit : 0,
            eduStart: extendedProps.eduStart ? extendedProps.eduStart : '',
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
        action={<div onClick={() => setOpenModal(false)}>어쩌라구요</div>}
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
      </Modal> */}
    </CalendarWrap>
  );
}

// function renderEventContent(info: CustomContentGenerator<EventContentArg>) {
//   console.log(info);
//   return (
//     <>
//       <div>[{info && info?.event.title}]</div>
//       <div>{info && info?.event._def.extendedProps.eduTypeAndTime}</div>
//       <div>{info && info?.event._def.extendedProps.description}</div>
//     </>
//   );
// }

const CalendarWrap = styled(Container)`
  /* 
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
      border-radius: 220px; 
    }
  } 
  */
`;
