import { CourseTrafficDetail } from '@common/api/adm/course-traffic';
import { useSnackbar } from '@hooks/useSnackbar';
import { useRouter } from 'next/router';

export function CourseTrafficModify() {
  const router = useRouter();
  const snackbar = useSnackbar();
  const { boardSeq } = router.query;
  const { data, error } = CourseTrafficDetail(Number(boardSeq));

  console.log('courseTrafficData : ', data);

  return (
    <div>
      <div>안녕</div>
      <div>나는 수정이야.</div>
    </div>
  );
}
