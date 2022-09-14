import {
  ReferenceChipItem,
  ReferenceChipWrapper,
  ReferenceItemHeaderDateText,
  ReferenceItemHeaderDateWrapper,
  ReferenceItemHeaderWrapper,
  ReferenceItemWrapper,
  ReferenceWrapper,
} from "@layouts/Traffic/LearningMaterial/Reference/style";
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
import { format } from "date-fns";
import DownloadIcon from "public/assets/images/ic_download.svg";
import { Button } from "@mui/material";

interface ReferenceLayoutProps {
  materialType: MaterialType;
}

export default function ReferenceLayout({
  materialType,
}: ReferenceLayoutProps) {
  const [tabType, setTabType] = useState<MaterialSubType | "">("");
  const { data } = useGetLearningMaterial(materialType, tabType);
  console.log(data);

  const handleClickChip = (value: MaterialSubType) => {
    if (value === tabType) {
      setTabType("");
      return;
    }
    setTabType(value);
  };

  return (
    <ReferenceWrapper>
      <ReferenceChipWrapper>
        <ReferenceChipItem
          label="어린이"
          color="primary"
          variant={
            tabType === MaterialSubType.TYPE_CHILDREN ? "filled" : "outlined"
          }
          onClick={() => handleClickChip(MaterialSubType.TYPE_CHILDREN)}
        />
        <ReferenceChipItem
          label="청소년"
          color="primary"
          variant={
            tabType === MaterialSubType.TYPE_TEENAGER ? "filled" : "outlined"
          }
          onClick={() => handleClickChip(MaterialSubType.TYPE_TEENAGER)}
        />
        <ReferenceChipItem
          label="어르신"
          color="primary"
          variant={
            tabType === MaterialSubType.TYPE_ELDERLY ? "filled" : "outlined"
          }
          onClick={() => handleClickChip(MaterialSubType.TYPE_ELDERLY)}
        />
        <ReferenceChipItem
          label="자가운전자"
          color="primary"
          variant={
            tabType === MaterialSubType.TYPE_SELF_DRIVING
              ? "filled"
              : "outlined"
          }
          onClick={() => handleClickChip(MaterialSubType.TYPE_SELF_DRIVING)}
        />
      </ReferenceChipWrapper>

      <TableWrapper>
        <TableHeader>
          <TableItem width="10%">번호</TableItem>
          <TableItem width="55%">제목</TableItem>
          <TableItem width="25%">등록일</TableItem>
          <TableItem width="10%">파일받기</TableItem>
        </TableHeader>
      </TableWrapper>

      {data &&
        data.data.map((value) => (
          <ReferenceItemWrapper key={value.seq}>
            <ReferenceItemHeaderWrapper>
              <TableItem width="10%">{value.seq}</TableItem>
              <TableItem width="55%" textAlign="left">
                {value.title}
              </TableItem>
              <TableItem width="25%">
                <ReferenceItemHeaderDateWrapper>
                  <ReferenceItemHeaderDateText>
                    {format(new Date(value.createdDtime), "yyyy. MM. dd")}
                  </ReferenceItemHeaderDateText>
                </ReferenceItemHeaderDateWrapper>
              </TableItem>
              <TableItem width="10%">
                <Button>
                  <DownloadIcon />
                </Button>
              </TableItem>
            </ReferenceItemHeaderWrapper>
          </ReferenceItemWrapper>
        ))}
    </ReferenceWrapper>
  );
}
