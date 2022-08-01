import { locationList } from '@layouts/MeEdit/MeEdit';
import { useState } from 'react';
import { atom, useRecoilState } from 'recoil';

export const courseClassTrafficInfo = atom<CourseClassTraffic | null>({
  key: 'courseClassTraffic',
  default: null,
});

export interface PeopleCounts {
  [prop: string]: { [prop: string]: number };
}

export interface CourseClassTraffic {
  locate: string; //지엮
  division: string; // 소속
  date: string; //신청날짜
  student: string;
  category: string;

  peopleCounts: PeopleCounts;
  // firstGrade: number;
  // secondGrade: number;
  // thirdGrade: number;
  // fourthGrade: number;
  // fifthGrade: number;
  // sixthGrade: number;
  // fifthYearOldChild: number;
  // fourthYearOldChild: number;
  // thirdYearOldChild: number;
  // oldMan: number;
  // selfDriver: number;
}
