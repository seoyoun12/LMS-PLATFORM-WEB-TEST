import * as React from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import { Accordion } from "@components/ui";
import { categoryBoardNoticeList } from "@common/api/categoryBoardNotice";

export function Calendar(){
  const {data , error , mutate} = categoryBoardNoticeList({page: 1 , elementCnt:1, boardType:"TYPE_NOTICE"})

  console.log(data)

    return <div>
      {data && data?.content.map((content)=>{
        const accordionInfo = [{name: content.subject , children:[{name:content.content}]}]
        return <Accordion accordionList={accordionInfo} />
      })}
    </div>
}