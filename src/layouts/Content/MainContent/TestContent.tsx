import { TuiViewer } from "@components/common/TuiEditor";
import { Spinner } from "@components/ui";
import styled from "@emotion/styled";
import { Box, Divider, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import dateFormat from 'dateformat'
import { useRouter } from "next/router";
import { useEffect,useState } from "react";

interface Props{
    
    noticeConfig:{
        title:string;
        content:string;
        date:string;
        complete: boolean;
    }[];
}

const testConfig = {
        title:"중간평가입니다.",
        score: 70 ,
        content:"## 어쩌구저쩌구\n**수강완료!**\n잠이나 자세요!\n머시꺵이머시꺵이머시꺵이머시꺵이머시꺵이머시꺵이머시꺵이머시꺵이머시꺵이머시꺵이머시꺵이머시꺵이머시꺵이머시꺵이머시꺵이머시꺵이머시꺵이",
        startDate: "2022.04.12 18:46:21",
        endDate: "2022.04.15 23:46:21",
        problemCnt: 20,
        isParticipation:true,
        isTest:true
}
// const reportConfig = {
//     title:"과제평가입니다.",
//     score:0,
//     content:"## 어쩌구저쩌구\n**수강완료!**\n수강했는데 과제야?\n과제멈춰!",
//     startDate: "2022.06.12 18:46:21",
//     endDate: "2022.07.15 23:46:21",
//     isParticipation:false,
//     isTest:false
// }

const datePeriod = (stateDate :string | Date , endDate : string | Date ) => {
    return `${dateFormat(stateDate, "m월 d일 TT H:MM ").replace("AM","오전").replace("PM","오후")} ~ ${dateFormat(endDate , "m월 d일 TT H:MM ").replace("AM","오전").replace("PM","오후")}`
}

export function TestContent({noticeConfig}:Props){
    const router = useRouter()
    const {query , pathname} = router;
    const [loading , setLoading] = useState(false)
    console.log(query)

    useEffect(()=>{
        if(query.content){
            try{
                console.log("머ㅏㄴ데에에",router,query,pathname)
                setLoading(true)
                //api 요청하는부분.
                // throw new Error("ㅋㅋ")
                setLoading(false)
            }catch(err){
                window.alert("불러오는 중 오류가 발생했습니다.")
                router.replace({pathname : router.asPath.split("?")[0]})
            }
        }
    },[query.content])

    if(query.content !== "test" && query.content !== "report") return <div>잘못된 접근입니다.</div>
    if(loading) return <Spinner />
    return (
    <TestSection>
        <TestTitle>
            <Typography className="title-typo" >{testConfig.title }</Typography>
            <Box sx={{display:"flex" ,  alignItems:"center"}} >
                <Typography className="score-typo" >{testConfig.score }점 /</Typography>
                <Typography className="score-typo" >100점</Typography>
            </Box>
        </TestTitle>

        <MiddleDivider />

        <ReadingPeriod>
            <Typography>열람 기간 {datePeriod(testConfig.startDate , testConfig.endDate)}  | {testConfig.problemCnt}문제</Typography>
        </ReadingPeriod>
        <ParticPeriod >{testConfig.isParticipation ? <span>참여기간입니다</span> : <span>참여기간이 아닙니다.</span>}</ParticPeriod>
        <TuiViewer initialValue={testConfig.content}  />
        <StartTest>{testConfig.isTest ? <Typography className="complete" >이미보셨음!</Typography> : <Typography>시험시작</Typography>}</StartTest>

    </TestSection>)
}

const TestSection = styled.div`
`

const TestTitle = styled.div`
    display:flex;
    justify-content: space-between;
    padding: 0.75rem 0 ;
    .title-typo {
    font-size:1.2rem;
    font-weight:bold;
    }
    .score-typo {
        font-weight:bold;
        :nth-child(2){
            font-weight:100;
            font-size:0.75rem;
            margin-left:4px;
        }
    }
`

const MiddleDivider = styled(Divider)`
    border-bottom: 3px solid #dbdbdb;
`

const ReadingPeriod = styled(Box)`
border-radius:4px;
font-weight:bold;
padding: 0.75rem 0 ;
`

const ParticPeriod = styled(Box)`
background: #63b0e3;
color:white;
border-radius:4px;
font-weight:bold;
padding: 0.75rem;
`

const StartTest = styled(Box)`
background: #5e5e5e;
color:white;
border-radius:4px;
font-weight:bold;
padding: 0.75rem;
text-align:center;
cursor: pointer;
.complete{
    cursor:not-allowed;
}
`