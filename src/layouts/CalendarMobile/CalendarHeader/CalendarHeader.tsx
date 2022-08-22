import styled from '@emotion/styled';
import { Box, Radio, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { eduLegendList, FilterType, MonthClickType } from '../Calendar';
import { grey } from '@mui/material/colors';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import LeftArrow from '/public/assets/svgs/LeftArrow.svg';
import RightArrow from '/public/assets/svgs/RightArrow.svg';

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

export function CalendarHeader({
  onChangeMonth,
  date,
  filterList,
  onChangeFilter,
  filter,
}: Props) {
  const handleLeftBtnClick = () => {
    const clickType = MonthClickType.BTN_CLICK;
    onChangeMonth(clickType, -1);
  };
  const handleRightBtnClick = () => {
    const clickType = MonthClickType.BTN_CLICK;
    onChangeMonth(clickType, 1);
  };
  const handleMonthClick = (value: number) => {
    const clickType = MonthClickType.MONTH_CLICK;
    onChangeMonth(clickType, value);
  };

  return (
    <CalendarHeaderWrap>
      <TopYearWrap>
        {/* <ArrowLeftRoundedIcon
          sx={{ fontSize: '3rem', color: grey[500], cursor: 'pointer' }}
          onClick={handleLeftBtnClick}
        /> */}
        <LeftArrow style={{ transform: 'scale(0.6)' }} onClick={handleLeftBtnClick} />
        <YearWrap>{date.getFullYear()}년</YearWrap>
        {/* <ArrowRightRoundedIcon
          sx={{ fontSize: '3rem', color: grey[500], cursor: 'pointer' }}
          onClick={handleRightBtnClick}
        /> */}
        <RightArrow style={{ transform: 'scale(0.6)' }} onClick={handleRightBtnClick} />
      </TopYearWrap>
      <DateWrap>
        {/* <ArrowLeftRoundedIcon
          sx={{ fontSize: '3rem', color: grey[500], cursor: 'pointer' }}
          onClick={handleLeftBtnClick}
        /> */}
        <MonthWrap
          value={date.getMonth()}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          TabIndicatorProps={{
            style: {
              display: 'none',
            },
          }}
        >
          {Months.map(month => (
            <Tab
              label={month.title}
              className={`header-month ${
                month.value === date.getMonth() + 1 ? 'active' : ''
              }`}
              onClick={() => handleMonthClick(month.value)}
            />
          ))}
        </MonthWrap>
        {/* <MonthWrap>
          {Months.map(month => (
            <Box
              sx={{ height: '50px', flexGrow: 1, cursor: 'pointer' }}
              className={`header-month-box `}
              onClick={() => handleLeftMonthClick(month.value)}
            >
              <Typography
                className={`header-month ${
                  month.value === date.getMonth() + 1 ? 'active' : ''
                }`}
              >
                {month.title}
              </Typography>
            </Box>
          ))}
        </MonthWrap> */}
        {/* <ArrowRightRoundedIcon
          sx={{ fontSize: '3rem', color: grey[500], cursor: 'pointer' }}
          onClick={handleRightBtnClick}
        /> */}
      </DateWrap>
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
    font-size: 20px;
    border: 1px solid #d6d6d6;
    border-radius: 30px;
    width: 76px;
    margin: 0 4px;
  }
  .active {
    z-index: 4;
    color: white !important ;
    font-weight: bold;
    background: #3c3c3c;
    border: 1px solid #d6d6d6;
    border-radius: 30px;
  }
`;

const TopYearWrap = styled(Box)`
  width: calc(100% - 40px);
  display: flex;
  align-items: center;
  font-weight: 700;
  margin: auto;
  margin-bottom: 1.5rem;
  justify-content: space-between;
`;

const DateWrap = styled(Box)`
  display: flex;
  height: 60px;
  align-items: center;
  font-size: 1.25rem;
`;
const YearWrap = styled(Box)`
  padding: 0.5rem 0;
  font-size: 28px;
`;
const MonthWrap = styled(Tabs)`
  display: flex;
  flex-grow: 1;
`;
