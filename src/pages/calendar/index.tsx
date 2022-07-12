import { Calendar } from "@layouts/Calendar";
import { Layout } from "@layouts/Layout";
import Head from "next/head";

export default function CalendarPage(){
    return (
    <>
        <Head>
        <title>CalendarPage</title>
        </Head>
        <Calendar />
    </>
    )
}

CalendarPage.Layout = Layout