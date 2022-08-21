import { CourseClassRes } from '@common/api/courseClass';
import dateFormat from 'dateformat';

export const checkDatePeriod = (
  startDate: string,
  endDate: string,
  currentData: string
) => {
  const getStartDateTime = new Date(dateFormat(startDate, 'yyyy-mm-dd')).getTime();
  const getEndDateTime = new Date(dateFormat(endDate, 'yyyy-mm-dd')).getTime();
  const getCurrentTime = new Date(dateFormat(currentData, 'yyyy-mm-dd')).getTime();

  let isBetweenPeriod = false;

  if (getStartDateTime <= getCurrentTime && getCurrentTime <= getEndDateTime) {
    isBetweenPeriod = true;
  }

  return isBetweenPeriod;
};

export const checkIsDate = (schedule: CourseClassRes[], currentMonth: Date) => {
  const getStartDateOfMonth = currentMonth.setDate(1);

  const getEndDateOfMonth = currentMonth.setDate(0);

  console.log(getStartDateOfMonth, getEndDateOfMonth);
  return;
};
