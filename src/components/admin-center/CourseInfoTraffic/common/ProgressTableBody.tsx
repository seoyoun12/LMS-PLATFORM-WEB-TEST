import { DecideButton, InRowTitle, OutRow } from '../CourseInfomationTraffic';
import useDominDetailCourse from '@hooks/useDominDetailCourse';

interface Props {
  progressStatusList: [{
    chapter: number;
    chapterName: string;
    completeTimeStr: string;
    completeYn: "Y" | "N";
    completedDate: string;
    courseProgressSeq: number;
    learningTimeStr: string;
    progressRatio: string;
    totalTimeStr: string;
}]
 courseUserSeq: string;
}

export default function ProgressTableBody({ progressStatusList, courseUserSeq}: Props) {
  const { updateCompletedLessonToCancel, updateIncompletedLessonToComplete } = useDominDetailCourse({ courseUserSeq })
  
  const onClickDecideCompleteProcess = async (courseProgressSeq: number,completeYn) => {
    if(completeYn === 'Y') {
      if(window.confirm('해당 차시를 삭제처리 하시겠습니까?')) {
        return await updateCompletedLessonToCancel(courseProgressSeq)
      }
    } else {
      if(window.confirm('해당 차시를 이수처리 하시겠습니까?')) {
        return await updateIncompletedLessonToComplete(courseProgressSeq)  
        
      }
    }
  }
  return (
    <>
    {
      progressStatusList.map((item) => (
        <OutRow key={item.chapterName}>
          <InRowTitle>{item.chapter}</InRowTitle>
          <InRowTitle bgcolor='#fff' fontweight={400}>{item.chapterName}</InRowTitle>
          <InRowTitle bgcolor='#fff' fontweight={400}>{item.totalTimeStr}</InRowTitle>
          <InRowTitle bgcolor='#fff' fontweight={400}>{item.learningTimeStr}</InRowTitle>
          <InRowTitle bgcolor='#fff' fontweight={400}>{item.progressRatio}</InRowTitle>
          <InRowTitle bgcolor='#fff' fontweight={400}>{item.completeYn}</InRowTitle>
          <InRowTitle bgcolor='#fff' fontweight={400}>{item.completedDate ?? '미완료'}</InRowTitle> 
          <InRowTitle bgcolor='#fff' fontweight={400}>
            <DecideButton onClick={() => onClickDecideCompleteProcess(item.courseProgressSeq, item.completeYn)} variant="contained" size="small">
              { item.completeYn === 'Y' ? '이수취소' : '이수처리'}
            </DecideButton>
          </InRowTitle>
        </OutRow>
    ))}
    </>
  )
}
