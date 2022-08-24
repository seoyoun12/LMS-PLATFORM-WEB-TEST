import { Layout } from "@layouts/Layout";
import Head from "next/head";
import { Lesson, Props } from "@layouts/Content";
import { GetServerSideProps } from "next";

export default function LessonPage(props: Props) {
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

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {

  const courseUserSeq = Number(context.params.courseUserSeq);
  const lessonSeq = Number(context.params.lessonSeq);

  if (window.isNaN(courseUserSeq) || window.isNaN(lessonSeq)) {
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
