import { CourseClassRes } from '@common/api/courseClass';
import dateFormat from 'dateformat';

/**
 * 날짜를 체크하여 boolean값을 리턴합니다.
 * @Param startDate: string
 * @Param endDate: string
 * @Param currentDate: string
 * @Param replaceType: string
 * @Param splitType: string
 * @return boolean
 */
export const checkDatePeriod = (
  startDate: string,
  endDate: string,
  currentDate: string,
  replaceType: string = '-',
  splitType: string = ' '
) => {
  const getStartDateTime = new Date(
    startDate.replaceAll(replaceType, '/').split(splitType)[0]
  ).getTime();
  const getEndDateTime = new Date(
    endDate.replaceAll(replaceType, '/').split(splitType)[0]
  ).getTime();
  const getCurrentTime = new Date(
    currentDate.replaceAll(replaceType, '/').split(splitType)[0]
  ).getTime();

  let isBetweenPeriod = false;

  if (getStartDateTime <= getCurrentTime && getCurrentTime <= getEndDateTime) {
    isBetweenPeriod = true;
  }

  return isBetweenPeriod;
};

export const checkIsDate = (schedule: CourseClassRes[], currentDate: Date) => {
  const getStartDateOfMonth = new Date(currentDate);
  getStartDateOfMonth.setDate(1);
  const getEndDateOfMonth = new Date(currentDate);
  getEndDateOfMonth.setMonth(currentDate.getMonth() + 1);
  getEndDateOfMonth.setDate(0);
  let courseClassArr: { date: Date; day: string; children: CourseClassRes[] }[] = [];
  const daysName = {
    '0': '일요일',
    '1': '월요일',
    '2': '화요일',
    '3': '수요일',
    '4': '목요일',
    '5': '금요일',
    '6': '토요일',
  };

  for (let i = getStartDateOfMonth.getDate(); i <= getEndDateOfMonth.getDate(); i++) {
    const nowDate = new Date(currentDate);
    nowDate.setDate(i);
    console.log(schedule);
    const filteringSchedule = schedule.filter(filt =>
      checkDatePeriod(
        // filt.requestStartDate,
        // filt.requestEndDate,
        filt.studyStartDate, //학습시작일 (2022-09-02요구사항 변경)
        filt.studyEndDate, //학습종료일
        `${nowDate.getFullYear()}-${String(nowDate.getMonth() + 1).padStart(
          2,
          '0'
        )}-${String(nowDate.getDate()).padStart(2, '0')}`
      )
    );
    console.log('1', filteringSchedule);
    const scheduleItem = filteringSchedule.map(item => {
      return {
        date: nowDate,
        children: item,
      };
    });
    console.log('2', scheduleItem);

    const scheduleChildren = scheduleItem.map(item => item.children);
    console.log('3', scheduleChildren);

    if (scheduleChildren.length === 0) continue;

    const scheduleItemByDate = {
      date: nowDate,
      day: daysName[nowDate.getDay()],
      children: scheduleChildren,
    };
    console.log('4', scheduleItemByDate);

    courseClassArr.push(scheduleItemByDate);
  }
  return courseClassArr;
};
