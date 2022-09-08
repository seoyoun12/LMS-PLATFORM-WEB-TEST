import {
  EducationChipItem,
  EducationChipWrapper,
  EducationItemContentWrapper,
  EducationItemHeaderDateText,
  EducationItemHeaderDateWrapper,
  EducationItemHeaderWrapper,
  EducationItemWrapper,
  EducationWrapper,
} from "@layouts/Traffic/LearningMaterial/Education/style";
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

interface EducationLayoutProps {
  materialType: MaterialType;
}

export default function EducationLayout({
  materialType,
}: EducationLayoutProps) {
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
    <EducationWrapper>
      <EducationChipWrapper>
        <EducationChipItem
          label="어린이"
          color="primary"
          variant={
            tabType === MaterialSubType.TYPE_CHILDREN ? "filled" : "outlined"
          }
          onClick={() => handleClickChip(MaterialSubType.TYPE_CHILDREN)}
        />
        <EducationChipItem
          label="청소년"
          color="primary"
          variant={
            tabType === MaterialSubType.TYPE_TEENAGER ? "filled" : "outlined"
          }
          onClick={() => handleClickChip(MaterialSubType.TYPE_TEENAGER)}
        />
        <EducationChipItem
          label="어르신"
          color="primary"
          variant={
            tabType === MaterialSubType.TYPE_ELDERLY ? "filled" : "outlined"
          }
          onClick={() => handleClickChip(MaterialSubType.TYPE_ELDERLY)}
        />
        <EducationChipItem
          label="자가운전자"
          color="primary"
          variant={
            tabType === MaterialSubType.TYPE_SELF_DRIVING
              ? "filled"
              : "outlined"
          }
          onClick={() => handleClickChip(MaterialSubType.TYPE_SELF_DRIVING)}
        />
      </EducationChipWrapper>

      <TableWrapper>
        <TableHeader>
          <TableItem width="10%">번호</TableItem>
          <TableItem width="65%">제목</TableItem>
          <TableItem width="25%">등록일</TableItem>
        </TableHeader>
      </TableWrapper>

      {new Array(5).fill(null).map((_, index) => (
        <EducationItemWrapper
          open={selectedPost === index}
          key={index}
          onClick={() => handleClickPost(index)}
        >
          <EducationItemHeaderWrapper>
            <TableItem width="10%">{index}</TableItem>
            <TableItem width="65%" textAlign="left">
              이것은 연령별 교수학습 지도안 제목입니다.이것은 연령별 교수학습
              지도안 제목입니다.이것은 연령별 교수학습 지도안 제목입니다.
            </TableItem>
            <TableItem width="25%">
              <EducationItemHeaderDateWrapper open={selectedPost === index}>
                <EducationItemHeaderDateText>
                  2022. 05. 23
                </EducationItemHeaderDateText>
                <ArrowDown />
              </EducationItemHeaderDateWrapper>
            </TableItem>
          </EducationItemHeaderWrapper>
          <EducationItemContentWrapper>asdasd</EducationItemContentWrapper>
        </EducationItemWrapper>
      ))}
    </EducationWrapper>
  );
}
