import { GET } from "@common/httpClient"

import { SWRResponse } from "swr"

export default function useLesson() {

  // const { data ,error, mutate } = useSWR(`/course-progress/lesson/check/${course?.courseUserSeq}/${props.contentSeq}`, fetcher)
  
  const getCheckAvailableLesson = async ({courseUserSeq, contentSeq}) => {
    try {
      const res:SWRResponse<boolean,Error> = await GET(`/course-progress/lesson/check/${courseUserSeq}/${contentSeq}`);
      return res.data;
      
    } catch (error) {
      return error
    }   
  }

  return { getCheckAvailableLesson }
}
