import styled from '@emotion/styled';
import { CustomContentGenerator, EventContentArg } from '@fullcalendar/core';
import { Box, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import FullCalendar from '@fullcalendar/react';
import { CalendarEvent, ClickedPlanInfo, FilterType } from '../Calendar';
import { Modal } from '@components/ui/Modal';
import dayGridPlugin from '@fullcalendar/daygrid';
import dateFormat from 'dateformat';

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  setModalInfo: React.Dispatch<React.SetStateAction<ClickedPlanInfo | undefined>>;
  modalInfo: ClickedPlanInfo | undefined;
  calendarRef: React.RefObject<FullCalendar>;
  CalendarEvent: CalendarEvent[];
  filter: string;
}

export function CalendarBody({ setOpenModal, setModalInfo, openModal, modalInfo, calendarRef, CalendarEvent, filter }: Props) {
  return (
    <CalendarWrap filter={filter}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        headerToolbar={{ start: '', end: '' }} //헤더 제거
        locale="ko"
        eventContent={renderEventContent}
        events={CalendarEvent}
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
      </Modal>
    </CalendarWrap>
  );
}
function renderEventContent(info: CustomContentGenerator<EventContentArg>) {
  console.log(info);
  return (
    <>
      <div>[{info && info?.event.title}]</div>
      <div>{info && info?.event._def.extendedProps.eduTypeAndTime}</div>
      <div>{info && info?.event._def.extendedProps.description}</div>
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
  ${({ filter }) => (filter !== 'ALL' ? '.' + filter : '')} {
    //필터
    display: none;
  }
`;
