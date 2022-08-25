import { Layout } from "@layouts/Layout";
import Head from "next/head";
import { Lesson, LessonProps } from "@layouts/Lesson";
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
  const lessonSeq = Number(context.params.lessonSeq);

  if (Number.isNaN(courseUserSeq) || Number.isNaN(lessonSeq)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      courseUserSeq: courseUserSeq,
      lessonSeq: lessonSeq,
    }
  };

}
