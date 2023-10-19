import { atom } from 'recoil';

export const courseClassTrafficInfo = atom<CourseClassTraffic | null>({
  key: 'courseClassTraffic',
  default: null,
});

export interface PeopleCounts {
  [prop: string]: { [prop: string]: number };
}
export interface CourseClassTraffic {
  region?: string;
  organization?: string;
  expectedToStartDtime?: string;
  expectedToEndDtime?: string;
  eduTargetMain?: string;
  eduTargetSub?: string;
  courseSeq?: string;
  peopleCounts: PeopleCounts;
}
