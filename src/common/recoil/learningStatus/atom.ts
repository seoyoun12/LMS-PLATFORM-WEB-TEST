import { locationList } from '@layouts/MeEdit/MeEdit';
import { useState } from 'react';
import { atom, useRecoilState } from 'recoil';

export const learningStatus = atom<learningStatus>({
  key: 'learningStatus',
  default: null,
});

export interface learningStatus{
  courseUserSeq: number;
  lessonSeq: number;
  studyTime: number;
  courseProgressSeq: number;
  studyLastTime : number;
}