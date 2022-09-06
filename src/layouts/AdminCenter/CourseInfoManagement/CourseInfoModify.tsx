import { detailCourseInfo } from '@common/api/adm/learningInfo';
import { useSnackbar } from '@hooks/useSnackbar';
import { useRouter } from 'next/router';

export function CourseInfoModify() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const { courseUserSeq } = router.query; // const {courseUserSeq} = router.query; {} 차이?
  // const { data, error } = detailCourseInfo({ courseUserSeq: Number(courseUserSeq) }); // 비구조화할당?
  const { data, error } = detailCourseInfo(Number(courseUserSeq));

  console.log('라우터 : ', router);
  console.log('라우터쿼리 : ', router.query);
  console.log('courseUserSeq:', courseUserSeq);
  console.log('data:', data);

  return <div>고양시는 고양고양</div>;
}
