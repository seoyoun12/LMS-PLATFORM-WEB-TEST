import { MaterialType } from "@common/api/learningMaterial";
import { NotFound } from "@components/ui/NotFound";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { MediaContainer, MediaContentContainer, MediaItemContainer, MediaItemContentContainer, MediaItemContentHeaderContainer, MediaItemContentSubtitle, MediaItemContentTitle, MediaItemImageContainer } from "./style";


interface MediaLayoutProps {
    materialType: MaterialType;
  }

export default function MediaLayout({ materialType }: MediaLayoutProps){
    const data  = [
        { seq:2,title:'네', createdDtime:'2022-12-01', s3Files:[ { length:2, path: `https://picsum.photos/${Math.round(Math.random() * 1000)}` } ] },
        { seq:223,title:'네weasd', createdDtime:'2022-12-11', s3Files:[ { length:45, path: `https://picsum.photos/${Math.round(Math.random() * 1000)}` } ] },
        { seq:24542,title:'네adasd', createdDtime:'2022-12-21', s3Files:[ { length:2324, path: `https://picsum.photos/${Math.round(Math.random() * 1000)}` } ] },
        { seq:264325,title:'asdasdasdasd네', createdDtime:'2022-12-31', s3Files:[ { length:0, path: `https://picsum.photos/${Math.round(Math.random() * 1000)}` } ] },
    ];
    const router = useRouter();
    
    const handleClickPost = (id: number) => {
        router.push(`/traffic/learning-material/media/${id}`);
    };


    return(
        <MediaContainer>
            <MediaContentContainer>
            {data.length <= 0 ? (
          <NotFound content="신청한 과정이 존재하지 않습니다!" />
        ) : (
          <>
            {data &&
              data.map((item, index) => (
                <MediaItemContainer
                  key={index}
                  onClick={() => handleClickPost(item.seq)}
                >
                  <MediaItemImageContainer>
                    {item.s3Files && item.s3Files.length > 0 && (
                      <img src={item.s3Files[0].path} alt="course thumbnail" />
                    )}
                  </MediaItemImageContainer>

                  <MediaItemContentContainer>
                    <MediaItemContentHeaderContainer>
                      <MediaItemContentTitle>
                        {item.title}
                      </MediaItemContentTitle>
                      {/*<LearningGuideItemContentDate>*/}
                      {/*  조회수: 0*/}
                      {/*</LearningGuideItemContentDate>*/}
                    </MediaItemContentHeaderContainer>
                    <MediaItemContentSubtitle>
                      {format(new Date(item.createdDtime), "yyyy. MM. dd")}
                    </MediaItemContentSubtitle>
                  </MediaItemContentContainer>
                </MediaItemContainer>
              ))}
          </>
        )}
            </MediaContentContainer>
        </MediaContainer>
    )
}