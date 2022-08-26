import { DELETE, GET, POST, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { FetchPaginationResponse } from 'types/fetch';
import { CourseInput, CourseRes } from '@common/api/course';
import { CourseDetailClientResponseDto, CourseModuleFindResponseDto, Pageable , } from '../Api';
import { YN } from '@common/constant';


interface LearningInfoRes {

  courseClassSeq: number; //과정클래스시퀀스
  courseName: string; //과정명
  courseUserSeq: number; //과정유저시퀀스
  displayClassLearningStatus: YN  //상태
  displayCompleteYn: string; //수료여부
  name: string;//실명
  regDate: string;//신청일
  studyDate:string; //학습기간 ~~로 옴
  userSeq: number; //유저시퀀스
  username: string ; //아이디
  yearAndStep: string;//기수
  displayTotalProgress:string;
}

export function useLearningInfo({page}:{page:number}){
  const {data , error , mutate} = useSWR<FetchPaginationResponse<LearningInfoRes[]>>([`/course/adm/learning-info/` ,
  {
    params: { page },
  },] , GET)
  return {
    data:data?.data,
    error,
    mutate
  }
}
