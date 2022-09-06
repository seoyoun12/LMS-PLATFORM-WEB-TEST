import React, { useCallback } from "react";
import {
  LearningMaterialContentWrapper,
  LearningMaterialHeaderContainer,
  LearningMaterialHeaderSubtitle,
  LearningMaterialHeaderTitle,
  LearningMaterialTabItem,
  LearningMaterialTabs,
  LearningMaterialTabWrapper,
  LearningMaterialWrapper,
} from "@layouts/Traffic/LearningMaterial/style";
import BackgroundImage from "public/assets/images/learning_material_background.svg";
import { useRouter } from "next/router";
import EducationLayout from "@layouts/Traffic/LearningMaterial/Education";
import LearningGuideLayout from "@layouts/Traffic/LearningMaterial/LearningGuide";
import ReferenceLayout from "@layouts/Traffic/LearningMaterial/Reference";
import VideoLayout from "@layouts/Traffic/LearningMaterial/Video";

type TabType = "education" | "learning_guide" | "reference" | "video";

export function LearningMaterialLayout() {
  const router = useRouter();
  const { type } = router.query as Record<"type", TabType>;

  const handleClickTab = (tabValue: TabType) => {
    router.push(`/traffic/learning-material/${tabValue}`);
  };

  const contentRender = useCallback(() => {
    switch (type) {
      case "education":
        return <EducationLayout />;
      case "learning_guide":
        return <LearningGuideLayout />;
      case "reference":
        return <ReferenceLayout />;
      case "video":
        return <VideoLayout />;
      default:
        return <></>;
    }
  }, [type]);

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
          <LearningMaterialTabs value={type}>
            <LearningMaterialTabItem
              label="연령별교수학습지도안"
              onClick={() => handleClickTab("education")}
              value="education"
            />
            <LearningMaterialTabItem
              label="교육자료"
              onClick={() => handleClickTab("learning_guide")}
              value="learning_guide"
            />
            <LearningMaterialTabItem
              label="교육영상"
              onClick={() => handleClickTab("video")}
              value="video"
            />
            <LearningMaterialTabItem
              label="타기관자료모음"
              onClick={() => handleClickTab("reference")}
              value="reference"
            />
          </LearningMaterialTabs>
        </LearningMaterialTabWrapper>
      </LearningMaterialWrapper>

      <LearningMaterialContentWrapper>
        {contentRender()}
      </LearningMaterialContentWrapper>
    </>
  );
}
