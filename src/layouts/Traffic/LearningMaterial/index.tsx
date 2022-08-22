import { LearningMaterialBoard } from "@components/ui/Traffic/LearningMaterialBoard";
import { Container, Typography } from "@mui/material";
import React from "react";

interface LearningMaterialLayoutProps {
  children: React.ReactNode;
}

export function LearningMaterialLayout({
  children,
}: LearningMaterialLayoutProps) {
  return (
    <>
      <Container>
        <Typography>학습자료</Typography>
        <Typography>학습에 필요한것을 도와드립니다!</Typography>
      </Container>

      {children}
    </>
  );
}
