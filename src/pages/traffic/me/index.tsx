
import Me from "@components/traffic/me/MeLayout";
import MyCourseGridTemplate from "@components/traffic/me/common/MyCourseGridTemplate";
import useDominMe from "@hooks/useDominMe";


export default function MePage() {
  
  const { myLearningStatus, myLearningStatusError, isMyLearningStatusValidating } = useDominMe();

  if(isMyLearningStatusValidating) return <div>학습현황을 불러오고 있습니다..</div>
  return (
      <Me>
        <MyCourseGridTemplate
          list={myLearningStatus?.data}
          isLinkVideo
          />
      </Me>
    
    
  )
}


