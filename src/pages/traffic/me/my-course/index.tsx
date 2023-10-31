import { useEffect, useState } from 'react'
import Me from '@components/traffic/me/MeLayout'
import useDominMe, { MyCourse as IMyCourse } from '@hooks/useDominMe';
import { useRouter } from 'next/router';
import CourseDetailModal from '@components/traffic/me/common/CourseDetailModal';
import MyCourseGridTemplate from '@components/traffic/me/common/MyCourseGridTemplate';

export interface DetailCourse extends IMyCourse {
  courseUserSeq: number;
  recentLessonSeq: number;
}


export default function MyCourse() {
  const { myCourseList, isMyCourseListValidating } = useDominMe();
  const { myLearningStatus } = useDominMe();
  const [detailCourse, setDetailCourse] = useState<DetailCourse>(null);
  const navigation = useRouter();

  const onRemoveDetailCourse = () => {
    setDetailCourse(null);
    navigation.back();
  }
  
  useEffect(() => {
    if(!navigation.query.seq) return;
    const seq = navigation.query.seq;
    const course = myCourseList.data.find((course) => course.seq === +seq);
    // myLeaningStatus의 thumbnailImage와 변수 course의 courseThumbnail을 비교하여 같으면 myLeaningStatus의 courseUserSeq와 recentLessonSeq 변수 course에 추가한다.
    // courseUserSeq와 LessonSeq를 추가한 course를 detailCourse에 저장하고 모달로 보내어 모달에서 학습하기 버튼을 누를 때 해당 강의로 이동하게 함
    const CourseUserSeqAndLessonSeqAddedCourse =
    myLearningStatus.data.find((learningClass) => learningClass.thumbnailImage === course.courseThumbnail);

    const detailCourse = {
      ...course,
      courseUserSeq: CourseUserSeqAndLessonSeqAddedCourse.courseUserSeq,
      recentLessonSeq: CourseUserSeqAndLessonSeqAddedCourse.recentLessonSeq,
    }
    setDetailCourse(detailCourse);

    // eslint-disable-next-line
  },[navigation.query])

  if(isMyCourseListValidating) return <div>과정을 불러오고 있습니다..</div>
  
  return (
    <>
    {detailCourse && <CourseDetailModal detailCourse={detailCourse}  onClose={onRemoveDetailCourse} />}
    <Me title="신청내역">
      <MyCourseGridTemplate list={myCourseList?.data} />
    </Me>
    </>
  )
}
