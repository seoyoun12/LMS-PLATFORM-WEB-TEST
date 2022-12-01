import { format } from "date-fns";
import { useRouter } from "next/router";
import { useState } from "react";
import { MaterialTabType } from "../..";
import { EducationChipItem, MediaDetailHeaderDateText, MediaDetailHeaderTitleText, MediaDetailHeaderWrapper, MediaDetailWrapper,  VideoItemContentWrapper } from "./style";

export default function MediaDetailLayout(){
    const router = useRouter();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { id } = router.query as {
      type: MaterialTabType;
      id: string;
    };
    return(
        <MediaDetailWrapper>
            <MediaDetailHeaderWrapper>
                <MediaDetailHeaderTitleText>제목이에용</MediaDetailHeaderTitleText>
                <MediaDetailHeaderDateText>
                    {format(new Date('2022-12-28'), 'yyyy. MM. dd')}
                </MediaDetailHeaderDateText>
                <EducationChipItem
                    label="청소년"
                    color="primary"
                    variant={'filled'}
                />
            </MediaDetailHeaderWrapper>
            <VideoItemContentWrapper>
                
              <iframe
                src={`https://www.youtube.com/embed/H0Yirlo6WSU`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </VideoItemContentWrapper>
        </MediaDetailWrapper>
    )
}