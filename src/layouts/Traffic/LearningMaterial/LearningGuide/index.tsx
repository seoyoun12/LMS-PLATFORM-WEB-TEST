import {
  MaterialType,
  useGetLearningMaterial,
} from "@common/api/learningMaterial";
import {
  LearningGuideContainer,
  LearningGuideContentContainer,
  LearningGuideHeaderContainer,
  LearningGuideHeaderSubtitle,
  LearningGuideHeaderTitle,
  LearningGuideItemContainer,
  LearningGuideItemContentContainer,
  LearningGuideItemContentDate,
  LearningGuideItemContentHeaderContainer,
  LearningGuideItemContentSubtitle,
  LearningGuideItemContentTitle,
  LearningGuideItemImageContainer,
} from "./style";
import BackgroundImage from "@/public/assets/images/certificates_background.svg";
import { NotFound } from "@components/ui/NotFound";
import { format } from "date-fns";
import { useRouter } from "next/router";

interface LearningGuideLayout {
  materialType: MaterialType;
}

export default function LearningGuideLayout({
  materialType,
}: LearningGuideLayout) {
  const { data } = useGetLearningMaterial(materialType, "");
  const router = useRouter();

  const handleClickPost = (id: number) => {
    router.push(`/traffic/learning-material/learning_guide/${id}`);
  };

  return (
    <LearningGuideContainer>
      <LearningGuideHeaderContainer>
        <LearningGuideHeaderTitle>증명서 발급</LearningGuideHeaderTitle>
        <LearningGuideHeaderSubtitle>
          수료확인 및 증명서 발급을 받을 수 있습니다!
        </LearningGuideHeaderSubtitle>
        <BackgroundImage />
      </LearningGuideHeaderContainer>

      <LearningGuideContentContainer>
        {data?.data.length <= 0 ? (
          <NotFound content="신청한 과정이 존재하지 않습니다!" />
        ) : (
          <>
            {data?.data &&
              data.data.map((item, index) => (
                <LearningGuideItemContainer
                  key={index}
                  onClick={() => handleClickPost(item.seq)}
                >
                  <LearningGuideItemImageContainer>
                    {item.s3Files && item.s3Files.length > 0 && (
                      <img src={item.s3Files[0].path} alt="course thumbnail" />
                    )}
                  </LearningGuideItemImageContainer>

                  <LearningGuideItemContentContainer>
                    <LearningGuideItemContentHeaderContainer>
                      <LearningGuideItemContentTitle>
                        {item.title}
                      </LearningGuideItemContentTitle>
                      <LearningGuideItemContentDate>
                        조회수: 0
                      </LearningGuideItemContentDate>
                    </LearningGuideItemContentHeaderContainer>
                    <LearningGuideItemContentSubtitle>
                      {format(new Date(item.createdDtime), "yyyy. MM. dd")}
                    </LearningGuideItemContentSubtitle>
                  </LearningGuideItemContentContainer>
                </LearningGuideItemContainer>
              ))}
          </>
        )}
      </LearningGuideContentContainer>
    </LearningGuideContainer>
  );
}
