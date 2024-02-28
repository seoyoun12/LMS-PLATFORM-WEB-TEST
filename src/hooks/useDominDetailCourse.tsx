import { GET, POST, PUT, DELETE } from '@common/httpClient'
import useSWR, { SWRResponse } from 'swr'
import { MainType, SubType } from './useDominCourse'
import { useSnackbar } from './useSnackbar'


interface DetailCourseInfo {
  learningStatusList: [
    {
      elementName: string,
      learningStatus: string,
      leastProgress: string,
      point: string,
      submitDate: string,
      submitIp: string,
      submitYn: "Y" | "N",
      threshold: string
    }
  ],
  progressStatusList: [
    {
      chapter: number,
      chapterName: string,
      completeTimeStr: string,
      completeYn: "Y" | "N",
      completedDate: string,
      courseProgressSeq: number,
      learningTimeStr: string,
      progressRatio: string,
      totalTimeStr: string
    }
  ],
  userProvincialCourseInfoDetailCourseInfoDto: {
    age3: number,
    age4: number,
    age5: number,
    completeYn: "Y" | "N",
    courseName: string,
    eduTargetMain: MainType,
    eduTargetSub: SubType,
    elderly: number,
    grade1: number,
    grade2: number,
    grade3: number,
    grade4: number,
    grade5: number,
    grade6: number,
    learningStatus: string,
    name: string,
    organization: string,
    phone: string,
    regDate: string,
    region: string,
    selfDriver: number,
    studyDate: string,
    username: string,
    year: number;
  }
}

interface UpdateCourseInfoRequest {
  age3?: number,
  age4?: number,
  age5?: number,
  eduTargetMain: MainType,
  eduTargetSub: SubType,
  elderly?: number,
  grade1?: number,
  grade2?: number,
  grade3?: number,
  grade4?: number,
  grade5?: number,
  grade6?: number,
  organization: string,
  region: string,
  selfDriver?: number
}



interface Props {
  courseUserSeq: string;
}



export default function useDominDetailCourse({courseUserSeq}:Props) {
  
  const { data, isValidating:isDetailCourseInfoValidating,mutate:detailCourseInfoMutate }
  = useSWR<SWRResponse<DetailCourseInfo>>(
    !courseUserSeq ? null : `/user/adm/course-info/detail/provincial/${courseUserSeq}`,
    GET
    )
  
  const snackBar = useSnackbar();


  // 해당 과정신청자의 상세정보 수정
  const updateAplicantCourseInfo = async (data: Partial<UpdateCourseInfoRequest>) => {
    try {
      await PUT(`/user/adm/course-info/detail/provincial/${courseUserSeq}`,data)
      detailCourseInfoMutate();
      snackBar({
        message: '정보가 수정되었습니다.',
        variant: 'success'
      });
    } catch (error) {
      snackBar({
        message: '정보 수정에 실패하였습니다.',
        variant: 'error'
      });
    }
  }



  // 이수처리 취소
  const updateCompletedLessonToCancel = async (courseProgressSeq: number) => {
    try {
      await PUT(`/user/adm/course-info/progress/${courseUserSeq}/${courseProgressSeq}/cancel`)
      detailCourseInfoMutate();
      snackBar({
        message: '정보가 수정되었습니다.',
        variant: 'success'
      });
    } catch (error) {
      snackBar({
        message: '정보 수정에 실패하였습니다.',
        variant: 'error'
      });
    }
  }

  // 이수처리
  const updateIncompletedLessonToComplete = async (courseProgressSeq: number) => {
    try {
      await PUT(`/user/adm/course-info/progress/${courseUserSeq}/${courseProgressSeq}/complete`)
      detailCourseInfoMutate();
      snackBar({
        message: '해당 차시를 이수처리하였습니다.',
        variant: 'success'
      });
    } catch (error) {
      snackBar({
        message: '이수처리에 실패하였습니다.',
        variant: 'error'
      });
    }
  }
  
  const updateAllCompletedLessonToCancel = async () => {
    try {
      await PUT(`/user/adm/course-info/progress/${courseUserSeq}/all-cancel`)
      detailCourseInfoMutate();
      snackBar({
        message: '정보가 수정되었습니다.',
        variant: 'success'
      });
    } catch (error) {
      snackBar({
        message: '정보 수정에 실패하였습니다.',
        variant: 'error'
      });
    }
  }

  const updateAllIncompletedLessonToComplete = async () => {
    try {
      await PUT(`/user/adm/course-info/progress/${courseUserSeq}/all-complete`)
      detailCourseInfoMutate();
      snackBar({
        message: '해당 차시를 이수처리하였습니다.',
        variant: 'success'
      });
    } catch (error) {
      snackBar({
        message: '이수처리에 실패하였습니다.',
        variant: 'error'
      });
    }
  }
  
  

  

  return {
      detailCourseInfo: data?.data,
      isDetailCourseInfoValidating,
      detailCourseInfoMutate,
      updateAplicantCourseInfo,
      updateCompletedLessonToCancel,
      updateIncompletedLessonToComplete,
      updateAllCompletedLessonToCancel,
      updateAllIncompletedLessonToComplete,
      
    }
}
