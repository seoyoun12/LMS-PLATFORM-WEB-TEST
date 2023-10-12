import { useCallback } from 'react';
import { ContentWrapper,HeaderContainer,HeaderSubtitle,HeaderTitle,TabItem,Tabs,TabWrapper,Wrapper } from '@layouts/Traffic/LearningMaterial/style';
import BackgroundImage from 'public/assets/images/learning_material_background.svg';
import { useRouter } from 'next/router';
import EducationLayout from '@layouts/Traffic/LearningMaterial/Education';
import LearningGuideLayout from '@layouts/Traffic/LearningMaterial/LearningGuide';
import ReferenceLayout from '@layouts/Traffic/LearningMaterial/Reference';
import VideoLayout from '@layouts/Traffic/LearningMaterial/Video';
import { getMaterialType } from '@layouts/Traffic/LearningMaterial/util';
import LearningGuideDetailLayout from '@layouts/Traffic/LearningMaterial/LearningGuide/Detail';

export type MaterialTabType ='education'| 'learning-guide'| 'reference'| 'video'| 'media';

export function LearningMaterialLayout() {
  const router = useRouter();
  const { type, id } = router.query as {
    type: MaterialTabType;
    id?: string;
  };
  
  const handleClickTab = (tabValue: MaterialTabType) => router.push(`/traffic/learning-material/${tabValue}`);
  
  const contentRender = useCallback(() => {
    
    switch (type) {
      case 'learning-guide':
        return <EducationLayout materialType={getMaterialType(type)} />;
      case 'education':
        // id가 있으면 path: education/{id} 형식인 detail페이지로 들어가고 아니면 리스트 보여주는 것 같음.. ㅁㅊ;
        return id ? <LearningGuideDetailLayout /> : <LearningGuideLayout materialType={getMaterialType(type)} />;
      case 'reference':
        return <ReferenceLayout materialType={getMaterialType(type)} />;
      case 'video':
        return <VideoLayout materialType={getMaterialType(type)} />;
      default:
        return <></>
    }
  }, [type,id]);

  return (
    <>
      <Wrapper>
        
              {/* Header */}
        <HeaderContainer>
          <HeaderTitle>학습자료</HeaderTitle>
          <HeaderSubtitle>
            학습에 필요한 것을 도와드립니다!
          </HeaderSubtitle>
          <BackgroundImage />
        </HeaderContainer>

              {/* Tabs  */}
        <TabWrapper>
          <Tabs
            variant='scrollable'
            allowScrollButtonsMobile={true}
            value={type}
          >
            <TabItem
              label='영상자료'
              onClick={() => handleClickTab('education')}
              value='education'
            />
            <TabItem
              label='연령별교수학습지도안'
              onClick={() => handleClickTab('learning-guide')}
              value='learning-guide'
            />
            
            <TabItem
              label='타기관자료모음'
              onClick={() => handleClickTab('reference')}
              value='reference'
            />
          </Tabs>
        </TabWrapper>
          {/* Content */}
      </Wrapper>
      <ContentWrapper>
        {contentRender()}
      </ContentWrapper>
    </>
  );
}
