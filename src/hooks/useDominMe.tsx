import { GET } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr'

export interface MyCourse {
  seq: number,
  userSeq: number,
  region: string,
  organization: string,
  eduTargetMain: string,
  eduTargetSub: string,
  expectedToStartDtime: string,
  expiredDtime: string,
  age3: number | null,
  age4: number | null,
  age5: number | null,
  grade1: number | null,
  grade2: number | null,
  grade3: number | null,
  grade4: number | null,
  grade5: number | null,
  grade6: number | null,
  selfDriver: number | null,
  elderly: number | null,
  userInfo: number | null,
  createdDtime: string,
  modifiedDtime: string,
  status: number;
  courseThumbnail: string;
  courseName: string;
}

export interface MyLearningStatus {
  courseClassSeq: number,
  courseSeq: number,
  courseTitle: string,
  courseUserSeq: number,
  firstLessonSeq: number,
  leftDays: number,
  progress: number,
  progressStatus: string,
  recentLessonSeq: number,
  startLeftDays: number,
  step: number,
  studyEndDate: string,
  studyStartDate: string,
  thumbnailImage: string
}



export default function useDominMe() {
  const { data:myCourseList, error:myCourseListError, isValidating:isMyCourseListValidating } = useSWR<SWRResponse<MyCourse[]>>('/provincial/enroll',GET)
  const { data:myLearningStatus, error: myLearningStatusError, isValidating:isMyLearningStatusValidating } = useSWR<SWRResponse<MyLearningStatus[]>>('/user/myinfo/provincial/learning-status',GET)
  
  return {  myCourseList, myCourseListError, isMyCourseListValidating,myLearningStatus, myLearningStatusError, isMyLearningStatusValidating }
}
