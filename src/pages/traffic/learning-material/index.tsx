import { LearningMaterial } from "@layouts/Traffic/LearningMaterial";
import { Layout } from "@layouts/Layout";
import Head from "next/head";

export default function LearningMaterialPage() {
  return (

    <>
      <Head>

        <title>LearningMaterial Page</title>

      </Head>
      <LearningMaterial/>
    </>

  )
}

LearningMaterialPage.Layout = Layout;