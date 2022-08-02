import { CourseRes } from "@common/api/course";
import { TuiViewer } from "@components/common/TuiEditor";
import { Spinner } from "@components/ui";
import styled from "@emotion/styled"
import { Typography } from "@mui/material"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props{
    course:CourseRes;
}

const noticeConfig = [
    {seq:0, title:"오쩔" , type:"notice",content:"## 야!!!!!!\n**나가!**\n자고싶어!\n", date:"2022.04.12 18:46:21" , complete: true },
    {seq:1, title:"오지사항 제목입니다." ,type:"notice", content:"요를레히후.",date:"2022.04.15 9:46:21" , complete: false },
    {seq:2, title:"오지사항 제목입니다.지사항 제목입니다." , type:"notice", content:"요를레히요\n를\n레\n히\n요\n를\n레\n히\n요\n를레히요를레히요를레히요를레히후.",date:"2022.04.19 14:46:21" , complete: false }
  ]

function PromiseTest(seq:number){ 
    return new Promise((resolve , reject)=>{
        resolve(noticeConfig.filter((notice)=>notice.seq === seq))
    })
}

export function NoticeContent({course}:Props){
    const router = useRouter();
    const { query , pathname } = router;
    const [loading , setLoading] = useState(true);
    const [notice , setNotice] = useState<any>();

    const asyncFunc = async() =>{
        if(query.content){
            try{
                setLoading(true)
                //api 요청하는부분.
                const data : any = await PromiseTest(Number(query.seq));
                setNotice(data[0])
                setLoading(false)
            }catch(err){
                window.alert("불러오는 중 오류가 발생했습니다.")
                router.replace({pathname : router.asPath.split("?")[0]})
            }
        }
    }

    useEffect(()=>{
        asyncFunc()
    },[query.seq])
    
    
    if(query.content !== "notice" && !query.seq) return <div>잘못된 접근입니다.</div>
    if(loading) return <Spinner />
    return(
        <NoticeScetion>
            <Typography className="typo">{course.courseName}</Typography>
            <Typography className="typo" variant="h5" >{notice.title && notice.title}</Typography>
            <div id="viewer" ></div>
            <TuiViewer  initialValue={notice.content && notice.content}/>
        </NoticeScetion>
    )
}

const NoticeScetion = styled.div`
.typo{
    font-weight:bold;
}
`