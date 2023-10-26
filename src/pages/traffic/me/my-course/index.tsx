import { useEffect, useState } from 'react'
import Me from '@components/traffic/me/MeLayout'
import useDominMe from '@hooks/useDominMe';
import { useRouter } from 'next/router';
import CourseDetailModal from '@components/traffic/me/common/CourseDetailModal';
import MyCourseGridTemplate from '@components/traffic/me/common/MyCourseGridTemplate';


export default function MyCourse() {
  const { myCourseList, isMyCourseListValidating } = useDominMe();
  const [detailCourse, setDetailCourse] = useState(null);
  const navigation = useRouter();


  const onRemoveDetailCourse = () => {
    setDetailCourse(null);
    navigation.back();
  }

  useEffect(() => {
    if(!navigation.query.seq) return;
    const seq = navigation.query.seq;
    const course = myCourseList.data.find((course) => course.seq === +seq);
    setDetailCourse(course);

    // eslint-disable-next-line
  },[navigation.query])

  if(isMyCourseListValidating) return <div>과정을 불러오고 있습니다..</div>
  
  return (
    <>
    {detailCourse && <CourseDetailModal detailCourse={detailCourse}  onClose={onRemoveDetailCourse} />}
    <Me title="온라인 교육 신청내역">
      
      <MyCourseGridTemplate list={myCourseList?.data} />
    </Me>
    </>
  )
}
