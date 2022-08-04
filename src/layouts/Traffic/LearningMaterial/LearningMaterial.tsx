import { LearningMaterialBoard } from "@components/ui/LearningMaterialBoard";
import { Container, Typography } from "@mui/material";


export function LearningMaterial() {

  return (
    <>
      <Container>
        <Typography>학습자료</Typography>
        <Typography>학습에 필요한것을 도와드립니다!</Typography>
      </Container>

      <LearningMaterialBoard />
    </>
  )
}