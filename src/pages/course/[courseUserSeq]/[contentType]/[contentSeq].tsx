import { Layout } from "@layouts/Layout";
import Head from "next/head";
import { Lesson, LessonProps, LESSON_CONTENT_TYPES, LessonContentType } from "@layouts/Lesson";
import { GetServerSideProps } from "next";

export default function LessonPage(props: LessonProps) {
  return (
    <>
      <Head>
        <title>Lesson Page</title>
      </Head>
      <Lesson {...props}/>
    </>
  );
}

LessonPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps<LessonProps> = async (context) => {

  const courseUserSeq = Number(context.params.courseUserSeq);
  const contentType = context.params.contentType.toString().toUpperCase() as LessonContentType;
  const contentSeq = Number(context.params.contentSeq);

  if (Number.isNaN(courseUserSeq) || LESSON_CONTENT_TYPES.indexOf(contentType) === -1 || Number.isNaN(contentSeq)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      courseUserSeq: courseUserSeq,
      contentType: contentType,
      contentSeq: contentSeq,
    }
  };

}
