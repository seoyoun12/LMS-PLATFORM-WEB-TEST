import { CourseModify, AdminCenterLayout } from '@layouts/AdminCenter';

export default function CourseModifyPage() {
  return (
    <CourseModify />
  );
}

// TODO: 나중에 getServerSideProps 적용해보기
// export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
//   const { courseId } = ctx.query;
//   const { data, isError, isLoading } = useCourse(Number(courseId));
//
//   return {
//     props: {
//       data,
//       isError,
//       isLoading
//     }
//   };
// };

CourseModifyPage.Layout = AdminCenterLayout;
