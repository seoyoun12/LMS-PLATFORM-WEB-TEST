import { ServiceBoard } from "@components/ui/ServiceBoard";
import { Container, Typography } from "@mui/material";

export function Service() {

  return (
    <>
      <Container>
        <Typography>고객센터</Typography>
        <Typography>학습에 필요한 것을 도와드립니다!</Typography>
      </Container>

      <ServiceBoard />

    </>
  )
}