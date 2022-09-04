import React, { useState } from "react";
import {
  LearningMaterialHeaderContainer,
  LearningMaterialHeaderSubtitle,
  LearningMaterialHeaderTitle,
  LearningMaterialTabItem,
  LearningMaterialTabs,
  LearningMaterialTabWrapper,
  LearningMaterialWrapper,
} from "@layouts/Traffic/LearningMaterial/style";
import BackgroundImage from "public/assets/images/learning_material_background.svg";

interface LearningMaterialLayoutProps {
  children: React.ReactNode;
}

type TabType = "education" | "learning_guide" | "reference" | "video";

export function LearningMaterialLayout({
  children,
}: LearningMaterialLayoutProps) {
  const [currentTab, setCurrentTab] = useState();

  return (
    <>
      <LearningMaterialWrapper>
        <LearningMaterialHeaderContainer>
          <LearningMaterialHeaderTitle>학습자료</LearningMaterialHeaderTitle>
          <LearningMaterialHeaderSubtitle>
            학습에 필요한것을 도와드립니다!
          </LearningMaterialHeaderSubtitle>
          <BackgroundImage />
        </LearningMaterialHeaderContainer>
        <LearningMaterialTabWrapper>
          <LearningMaterialTabs>
            <LearningMaterialTabItem label="연령별교수학습지도안" />
            <LearningMaterialTabItem label="교육자료" />
            <LearningMaterialTabItem label="교육영상" />
            <LearningMaterialTabItem label="타기관자료모음" />
          </LearningMaterialTabs>
        </LearningMaterialTabWrapper>
      </LearningMaterialWrapper>

      {children}
    </>
  );
}
