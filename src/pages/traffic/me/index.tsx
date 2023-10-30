
import MeLayout from "@components/traffic/me/MeLayout";
import MyCourseGridTemplate from "@components/traffic/me/common/MyCourseGridTemplate";
import useDominMe from "@hooks/useDominMe";


export default function MePage() {
  const { myLearningStatus, isMyLearningStatusValidating } = useDominMe();
  
  return (
      <MeLayout title="나의 수강목록">
        {
          isMyLearningStatusValidating
          ? <div>학습현황을 불러오고 있습니다..</div>
          : <MyCourseGridTemplate
              list={myLearningStatus?.data}
              isLinkVideo
            />
        }
      </MeLayout>
    
    
  )
}


