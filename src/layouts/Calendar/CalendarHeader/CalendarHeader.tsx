import styled from '@emotion/styled';
import { Box, Radio, Typography } from '@mui/material';
import React from 'react';
import { eduLegendList, FilterType, MonthClickType } from '../Calendar';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { grey } from '@mui/material/colors';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';

interface Props {
  onChangeMonth: (type: MonthClickType, value: number) => void;
  date: Date;
  filterList: { type: string; enType: string }[];
  onChangeFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filter: string;
}

const Months = [
  { title: '1월', value: 1 },
  { title: '2월', value: 2 },
  { title: '3월', value: 3 },
  { title: '4월', value: 4 },
  { title: '5월', value: 5 },
  { title: '6월', value: 6 },
  { title: '7월', value: 7 },
  { title: '8월', value: 8 },
  { title: '9월', value: 9 },
  { title: '10월', value: 10 },
  { title: '11월', value: 11 },
  { title: '12월', value: 12 },
];

export function CalendarHeader({ onChangeMonth, date, filterList, onChangeFilter, filter }: Props) {
  return (
    <CalendarHeaderWrap>
      <DateWrap>
        <ArrowLeftIcon
          sx={{ fontSize: '3rem', color: grey[500], cursor: 'pointer' }}
          onClick={() => {
            const clickType = MonthClickType.BTN_CLICK;
            onChangeMonth(clickType, -1);
          }}
        />
        <YearWrap>{date.getFullYear()}년</YearWrap>
        <MonthWrap>
          {Months.map(month => (
            <Box
              sx={{ height: '50px', flexGrow: 1, cursor: 'pointer' }}
              className={`header-month-box `}
              onClick={() => {
                const clickType = MonthClickType.MONTH_CLICK;
                onChangeMonth(clickType, month.value);
              }}
            >
              <Typography className={`header-month ${month.value === date.getMonth() + 1 ? 'active' : ''}`}>{month.title}</Typography>
            </Box>
          ))}
        </MonthWrap>
        <ArrowRightIcon
          sx={{ fontSize: '3rem', color: grey[500], cursor: 'pointer' }}
          onClick={() => {
            const clickType = MonthClickType.BTN_CLICK;
            onChangeMonth(clickType, 1);
          }}
        />
      </DateWrap>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography>- 해당 일정을 클릭 하시면 자세한 교육내용을 확인하실 수 있습니다.</Typography>
        <Box>
          {filterList.map(item => (
            <>
              <Radio value={item.enType} onChange={onChangeFilter} checked={filter === item.enType} />
              <span>{item.type}</span>
            </>
          ))}
        </Box>
      </Box>
      <Box display="flex" alignItems="center" width="fit-content" margin="auto">
        {eduLegendList.map(legend => (
          <>
            <HorizontalRuleRoundedIcon sx={{ fontSize: '2.5rem', color: legend.color }} /> <span>{legend.title}</span>
          </>
        ))}
      </Box>
    </CalendarHeaderWrap>
  );
}

const CalendarHeaderWrap = styled(Box)`
  margin-top: 2rem;
  .header-month-box {
    position: relative;
  }
  .header-month {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -10px;
    right: 10%;
    left: 10%;
    bottom: -10px;
  }
  .active {
    z-index: 4;
    color: white;
    font-weight: bold;
    background: #254a98;
  }
`;

const DateWrap = styled(Box)`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  border: 1px solid #9e9e9e;
`;
const YearWrap = styled(Box)`
  padding: 0.5rem 1rem;
`;
const MonthWrap = styled(Box)`
  display: flex;
  flex-grow: 1;
`;
