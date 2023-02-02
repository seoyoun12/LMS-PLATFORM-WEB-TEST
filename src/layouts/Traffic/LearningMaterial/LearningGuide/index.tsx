import {
  MaterialSubType,
  MaterialType,
  useGetLearningMaterial,
} from '@common/api/learningMaterial';
import {
  LearningGuideContainer,
  LearningGuideContentContainer,
  LearningGuideItemContainer,
  LearningGuideItemContentContainer,
  LearningGuideItemContentDate,
  LearningGuideItemContentHeaderContainer,
  LearningGuideItemContentSubtitle,
  LearningGuideItemContentTitle,
  LearningGuideItemImageContainer,
  LearningGuideChipWrapper,
  LearningGuideChipItem
} from './style';
import { NotFound } from '@components/ui/NotFound';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface LearningGuideLayout {
  materialType: MaterialType;
}

export default function LearningGuideLayout({
  materialType,
}: LearningGuideLayout) {
  const [tabType, setTabType] = useState<MaterialSubType | ''>('');
  const { data } = useGetLearningMaterial(materialType, tabType);
  const router = useRouter();

  const handleClickChip = (value: MaterialSubType) => {
    if (value === tabType) {
      setTabType('');
      return;
    }
    setTabType(value);
  };
  const handleClickPost = (id: number) => {
    router.push(`/traffic/learning-material/education/${id}`);
  };

  return (
    <LearningGuideContainer>
      <LearningGuideChipWrapper>
        <LearningGuideChipItem
          label="전체"
          color="primary"
          variant={
            !tabType ? 'filled' : 'outlined'
          }
          onClick={() => handleClickChip(null)}
        />
        <LearningGuideChipItem
          label="어린이"
          color="primary"
          variant={
            tabType === MaterialSubType.TYPE_CHILDREN ? 'filled' : 'outlined'
          }
          onClick={() => handleClickChip(MaterialSubType.TYPE_CHILDREN)}
        />
        <LearningGuideChipItem
          label="청소년"
          color="primary"
          variant={
            tabType === MaterialSubType.TYPE_TEENAGER ? 'filled' : 'outlined'
          }
          onClick={() => handleClickChip(MaterialSubType.TYPE_TEENAGER)}
        />
        <LearningGuideChipItem
          label="어르신"
          color="primary"
          variant={
            tabType === MaterialSubType.TYPE_ELDERLY ? 'filled' : 'outlined'
          }
          onClick={() => handleClickChip(MaterialSubType.TYPE_ELDERLY)}
        />
        <LearningGuideChipItem
          label="자가운전자"
          color="primary"
          variant={
            tabType === MaterialSubType.TYPE_SELF_DRIVING
              ? 'filled'
              : 'outlined'
          }
          onClick={() => handleClickChip(MaterialSubType.TYPE_SELF_DRIVING)}
        />
      </LearningGuideChipWrapper>
      <LearningGuideContentContainer>
        {data?.data.length <= 0 ? (
          <NotFound content="자료가 존재하지 않습니다!" />
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
                      {/*<LearningGuideItemContentDate>*/}
                      {/*  조회수: 0*/}
                      {/*</LearningGuideItemContentDate>*/}
                    </LearningGuideItemContentHeaderContainer>
                    <LearningGuideItemContentSubtitle>
                      {format(new Date(item.createdDtime), 'yyyy. MM. dd')}
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
