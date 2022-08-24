import Head from "next/head";
import type { GetServerSideProps } from "next";
import { Layout } from "@layouts/Layout";
import { Survey, SurveyProps } from "@layouts/Survey";

export default function LessonPage(props: SurveyProps) {
  return (
    <>
      <Head>
        <title>Survey Page</title>
      </Head>
      <Survey {...props}/>
    </>
  );
}

LessonPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps<SurveyProps> = async (context) => {

  const courseUserSeq = Number(context.params.courseUserSeq);
  const surveySeq = Number(context.params.surveySeq);

  if (Number.isNaN(courseUserSeq) || Number.isNaN(surveySeq)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      courseUserSeq: courseUserSeq,
      surveySeq: surveySeq,
    }
  };

}
