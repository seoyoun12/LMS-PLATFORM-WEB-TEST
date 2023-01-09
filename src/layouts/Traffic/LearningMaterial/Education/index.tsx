import {
  EducationChipItem,
  EducationChipWrapper,
  EducationItemContentWrapper,
  EducationItemFileButton,
  EducationItemFileChip,
  EducationItemFilesItem,
  EducationItemHeaderDateText,
  EducationItemHeaderDateWrapper,
  EducationItemHeaderWrapper,
  EducationItemWrapper,
  EducationWrapper,
} from '@layouts/Traffic/LearningMaterial/Education/style';
import React, { useState } from 'react';
import {
  MaterialSubType,
  MaterialType,
  useGetLearningMaterial,
} from '@common/api/learningMaterial';
import {
  TableHeader,
  TableItem,
  TableWrapper,
} from '@layouts/Traffic/LearningMaterial/style';
import ArrowDown from 'public/assets/images/ic_arrow_down.svg';
import { format } from 'date-fns';
import { TuiViewer } from '@components/common/TuiEditor';
import { downloadFile } from '@common/api/file';
import SaveIcon from '@mui/icons-material/Save';
import { Box } from '@mui/material';

interface EducationLayoutProps {
  materialType: MaterialType;
}

export default function EducationLayout({
  materialType,
}: EducationLayoutProps) {
  const [tabType, setTabType] = useState<MaterialSubType | ''>('');
  const { data } = useGetLearningMaterial(materialType, tabType);
  // console.log(data);

  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  // 학습현황 - 연령별 교수학습 지도안 첨부파일 다운로드시 아코디언 닫히는 코드. 차후 수정
  const handleClickChip = (value: MaterialSubType) => {
    if (value === tabType) {
      setTabType(null);
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
            tabType === MaterialSubType.TYPE_CHILDREN ? 'filled' : 'outlined'
          }
          onClick={() => handleClickChip(MaterialSubType.TYPE_CHILDREN)}
        />
        <EducationChipItem
          label="청소년"
          color="primary"
          variant={
            tabType === MaterialSubType.TYPE_TEENAGER ? 'filled' : 'outlined'
          }
          onClick={() => handleClickChip(MaterialSubType.TYPE_TEENAGER)}
        />
        <EducationChipItem
          label="어르신"
          color="primary"
          variant={
            tabType === MaterialSubType.TYPE_ELDERLY ? 'filled' : 'outlined'
          }
          onClick={() => handleClickChip(MaterialSubType.TYPE_ELDERLY)}
        />
        <EducationChipItem
          label="자가운전자"
          color="primary"
          variant={
            tabType === MaterialSubType.TYPE_SELF_DRIVING
              ? 'filled'
              : 'outlined'
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

      {data &&
        data.data.map(value => (
          <EducationItemWrapper
            open={selectedPost === value.seq}
            key={value.seq}
            onClick={() => handleClickPost(value.seq)}
          >
            <EducationItemHeaderWrapper>
              <TableItem width="10%">{value.seq}</TableItem>
              <TableItem width="65%" textAlign="left">
                {value.title}
              </TableItem>
              <TableItem width="25%">
                <EducationItemHeaderDateWrapper
                  open={selectedPost === value.seq}
                >
                  <EducationItemHeaderDateText>
                    {format(new Date(value.createdDtime), 'yyyy. MM. dd')}
                  </EducationItemHeaderDateText>
                  <ArrowDown />
                </EducationItemHeaderDateWrapper>
              </TableItem>
            </EducationItemHeaderWrapper>
            <EducationItemContentWrapper>
              <TuiViewer initialValue={value.content} />
              <EducationItemFilesItem>
                {value.s3Files[0]?.name ? (
                  <EducationItemFileButton
                    sx={{
                      padding: '0px',
                      // backgroundColor: 'red',
                      borderRadius: '15px',
                    }}
                    onClick={async () => {
                      try {
                        const blobData = await downloadFile(
                          value.s3Files[0].seq
                        );
                        const url = window.URL.createObjectURL(
                          new Blob([blobData])
                        );
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${value.s3Files[0].name}`;
                        a.click();
                        a.remove();
                      } catch (e: any) {
                        console.log(e);
                      }
                    }}
                  >
                    <EducationItemFileChip
                      icon={<SaveIcon />}
                      sx={{ cursor: 'pointer' }}
                      label={
                        <Box sx={{ display: 'flex' }}>
                          <Box>{value.s3Files[0]?.name}</Box>
                        </Box>
                      }
                    />
                  </EducationItemFileButton>
                ) : (
                  ''
                )}
              </EducationItemFilesItem>
            </EducationItemContentWrapper>
          </EducationItemWrapper>
        ))}
    </EducationWrapper>
  );
}
