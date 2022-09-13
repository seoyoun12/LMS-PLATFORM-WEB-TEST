import {
  VideoItemContentWrapper,
  VideoItemHeaderDateText,
  VideoItemHeaderDateWrapper,
  VideoItemHeaderWrapper,
  VideoItemWrapper,
  VideoWrapper,
} from "@layouts/Traffic/LearningMaterial/Video/style";
import React, { useState } from "react";
import {
  MaterialSubType,
  MaterialType,
  useGetLearningMaterial,
} from "@common/api/learningMaterial";
import {
  TableHeader,
  TableItem,
  TableWrapper,
} from "@layouts/Traffic/LearningMaterial/style";
import ArrowDown from "public/assets/images/ic_arrow_down.svg";

interface VideoLayoutProps {
  materialType: MaterialType;
}

export default function VideoLayout({ materialType }: VideoLayoutProps) {
  const [tabType, setTabType] = useState<MaterialSubType | "">("");
  const { data, mutate } = useGetLearningMaterial(materialType, tabType);

  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const handleClickChip = (value: MaterialSubType) => {
    if (value === tabType) {
      setTabType("");
      return;
    }
    setTabType(value);
  };

  const handleClickPost = (id: number) => {
    if (id === selectedPost) {
      setSelectedPost(null);
      return;
    }
    setSelectedPost(id);
  };

  return (
    <VideoWrapper>
      <TableWrapper>
        <TableHeader>
          <TableItem width="10%">번호</TableItem>
          <TableItem width="65%">제목</TableItem>
          <TableItem width="25%">등록일</TableItem>
        </TableHeader>
      </TableWrapper>

      {new Array(5).fill(null).map((_, index) => (
        <VideoItemWrapper
          open={selectedPost === index}
          key={index}
          onClick={() => handleClickPost(index)}
        >
          <VideoItemHeaderWrapper>
            <TableItem width="10%">{index}</TableItem>
            <TableItem width="65%" textAlign="left">
              이것은 교육영상 제목입니다.이것은 교육영상 제목입니다.이것은
              교육영상 제목입니다.
            </TableItem>
            <TableItem width="25%">
              <VideoItemHeaderDateWrapper open={selectedPost === index}>
                <VideoItemHeaderDateText>2022. 05. 23</VideoItemHeaderDateText>
                <ArrowDown />
              </VideoItemHeaderDateWrapper>
            </TableItem>
          </VideoItemHeaderWrapper>
          <VideoItemContentWrapper>asdasd</VideoItemContentWrapper>
        </VideoItemWrapper>
      ))}
    </VideoWrapper>
  );
}
