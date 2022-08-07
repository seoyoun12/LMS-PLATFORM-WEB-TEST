import { MemberType } from "@common/api/user";
import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react"


interface Props{
	setIsOpneQues:React.Dispatch<React.SetStateAction<boolean>>;
	setMemberType:React.Dispatch<React.SetStateAction<undefined | MemberType>>;
}

// export function CategoryBoardQuestionLogin({setIsOpneQues,setMemberType}:Props){
export function CategoryBoardQuestionLogin(){

	const router = useRouter();

	return (
	
		<SignInLayoutWrap>
			<Box display="flex" flexDirection={"column"} alignItems="center" >
				<Typography variant="h6" fontWeight={"bold"} >로그인 후 문의하시면</Typography>
				<Typography variant="h6" fontWeight={"bold"} >문의 내역이 관리되어 좀 더 정확한 상담을 받을 수 있습니다.</Typography>
				{/* <Box mt={2} >
					<Typography component={"span"} >로그인 할 수 없을때는{" "}</Typography>
					<Typography component={"span"} sx={{color:"#2980bf"}} >[비회원 문의]</Typography>
					<Typography component={"span"} >를 선택하세요</Typography>
				</Box> */}
				<Button type="button" variant="contained"sx={{ mt: 3, mb: 2 }} onClick={()=>router.push(`/sign-in`)} >로그인 </Button>
				{/* <Button type="button" onClick={()=>{setIsOpneQues(true);setMemberType(MemberType.TYPE_NON_MEMBER)}} >비회원 문의</Button> */}
			</Box>
		</SignInLayoutWrap>

	)
}

const SignInLayoutWrap = styled(Box)``