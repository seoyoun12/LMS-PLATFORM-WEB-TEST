import React, { useCallback } from 'react';
import {
  LearningMaterialContentWrapper,
  LearningMaterialHeaderContainer,
  LearningMaterialHeaderSubtitle,
  LearningMaterialHeaderTitle,
  LearningMaterialTabItem,
  LearningMaterialTabs,
  LearningMaterialTabWrapper,
  LearningMaterialWrapper,
} from '@layouts/Traffic/LearningMaterial/style';
import BackgroundImage from 'public/assets/images/learning_material_background.svg';
import { useRouter } from 'next/router';
import EducationLayout from '@layouts/Traffic/LearningMaterial/Education';
import LearningGuideLayout from '@layouts/Traffic/LearningMaterial/LearningGuide';
import ReferenceLayout from '@layouts/Traffic/LearningMaterial/Reference';
import VideoLayout from '@layouts/Traffic/LearningMaterial/Video';
import { getMaterialType } from '@layouts/Traffic/LearningMaterial/util';
import LearningGuideDetailLayout from '@layouts/Traffic/LearningMaterial/LearningGuide/Detail';
import MediaLayout from './Media';
import MediaDetailLayout from './Media/Detail';
import { useRecoilState } from 'recoil';
import { isLoginState } from '@common/recoil';

export type MaterialTabType =
  | 'education'
  | 'learning-guide'
  | 'reference'
  | 'video'
  | 'media';

export function LearningMaterialLayout() {
  const router = useRouter();
  console.log('test' , router.query)
  const { type, id } = router.query as {
    type: MaterialTabType;
    id?: string;
  };
  const [isLogin , setIsLogin] = useRecoilState(isLoginState);
  console.log('type' , type)
  // const [tab, setTab] = useState<MaterialTabType>(type);

  // const tabsConfig = [
  //   {
  //     label: '연령별교수학습지도안',
  //     onClick: () => handleClickTab('education'),
  //     value: 'education',
  //   },
  //   {
  //     label: '교육자료',
  //     onClick: () => handleClickTab('learning_guide'),
  //     value: 'learning_guide',
  //   },
  //   {
  //     label: '교육영상',
  //     onClick: () => handleClickTab('video'),
  //     value: 'video',
  //   },
  //   {
  //     label: '타기관자료모음',
  //     onClick: () => handleClickTab('reference'),
  //     value: 'reference',
  //   },
  //   {
  //     label: '교육영상게시판',
  //     onClick: () => handleClickTab('media'),
  //     value: 'media',
  //   },
  // ];

  const handleClickTab = (tabValue: MaterialTabType) => {
    router.push(`/traffic/learning-material/${tabValue}`);
  };

  const contentRender = useCallback(() => {
    // education(교육자료) , learning-guide(지도안) 아닌가? 바뀐것같다.
    switch (type) {
      case 'learning-guide':
        return <EducationLayout materialType={getMaterialType(type)} />;
      case 'education':
        if (id) {
          return <LearningGuideDetailLayout />;
        }
        return <LearningGuideLayout materialType={getMaterialType(type)} />;
      case 'reference':
        return <ReferenceLayout materialType={getMaterialType(type)} />;
      case 'video':
        return <VideoLayout materialType={getMaterialType(type)} />;
      case 'media':
        if (id) {
          return <MediaDetailLayout />;
        }
        return <MediaLayout materialType={getMaterialType(type)} />;
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
          <LearningMaterialTabs
            variant="scrollable"
            allowScrollButtonsMobile={true}
            value={type}
          >
            <LearningMaterialTabItem
              label="연령별교수학습지도안"
              onClick={() => handleClickTab('learning-guide')}
              value="learning-guide"
            />
            <LearningMaterialTabItem
              label="교육자료"
              onClick={() => handleClickTab('education')}
              value="education"
            />
            <LearningMaterialTabItem
              label="교육영상"
              onClick={() => handleClickTab('video')}
              value="video"
            />
            <LearningMaterialTabItem
              label="타기관자료모음"
              onClick={() => handleClickTab('reference')}
              value="reference"
            />
            {isLogin && <LearningMaterialTabItem
              label="교육영상게시판"
              onClick={() => handleClickTab('media')}
              value="media"
            />
            }
            
          </LearningMaterialTabs>
        </LearningMaterialTabWrapper>
      </LearningMaterialWrapper>

      <LearningMaterialContentWrapper>
        {contentRender()}
      </LearningMaterialContentWrapper>
    </>
  );
}
