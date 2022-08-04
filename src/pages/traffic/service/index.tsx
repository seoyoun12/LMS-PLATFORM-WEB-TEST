import { Layout } from "@layouts/Layout";
import { Service } from "@layouts/Traffic/Service";
import Head from "next/head";

export default function ServicePage() {
  return (
    <>
      <Head>
        <title>Service Page</title>
      </Head>
      <Service />
    </>
  )
}

ServicePage.Layout = Layout;