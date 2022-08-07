import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import styled from "styled-components";

export function CategoryBoardLookLogin() {

  const router = useRouter();

  return (

    <SignInLayoutWrap>
			<Box display="flex" flexDirection={"column"} alignItems="center" >
				<Typography variant="h6" fontWeight={"bold"} >문의 내역을 확인하시려면</Typography>
				<Typography variant="h6" fontWeight={"bold"} >로그인이 완료되어야 합니다.</Typography>
				<Button type="button" variant="contained"sx={{ mt: 3, mb: 2 }} onClick={()=>router.push(`/sign-in`)} >로그인 </Button>
			</Box>
		</SignInLayoutWrap>

  )
}

const SignInLayoutWrap = styled(Box)``
