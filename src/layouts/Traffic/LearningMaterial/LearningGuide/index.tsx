import { MaterialType } from "@common/api/learningMaterial";

interface LearningGuideLayout {
  materialType: MaterialType;
}

export default function LearningGuideLayout({
  materialType,
}: LearningGuideLayout) {
  return <p>Learning Guide</p>;
}
