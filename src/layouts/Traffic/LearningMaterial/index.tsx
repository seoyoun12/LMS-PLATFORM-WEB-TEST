import { Container } from "@mui/material";
import React from "react";
import {
  LearningMaterialHeaderContainer,
  LearningMaterialHeaderSubtitle,
  LearningMaterialHeaderTitle,
} from "@layouts/Traffic/LearningMaterial/style";
import BackgroundImage from "public/assets/images/learning_material_background.svg";

interface LearningMaterialLayoutProps {
  children: React.ReactNode;
}

export function LearningMaterialLayout({
  children,
}: LearningMaterialLayoutProps) {
  return (
    <>
      <Container>
        <LearningMaterialHeaderContainer>
          <LearningMaterialHeaderTitle>학습자료</LearningMaterialHeaderTitle>
          <LearningMaterialHeaderSubtitle>
            학습에 필요한것을 도와드립니다!
          </LearningMaterialHeaderSubtitle>
          <BackgroundImage />
        </LearningMaterialHeaderContainer>
      </Container>

      {children}
    </>
  );
}
