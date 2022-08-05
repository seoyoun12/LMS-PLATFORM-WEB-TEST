import { GuideBoard } from "@components/ui/Traffic/GuideBoard";
import { Container, Typography } from "@mui/material";

export function Guide() {

  return (
    <>
      <Container>
        <Typography>교육이용안내</Typography>
        <Typography>학습에 필요한것을 도와드립니다!</Typography>
      </Container>

      <GuideBoard />
    </>
  )
}