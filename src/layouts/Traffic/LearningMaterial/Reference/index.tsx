import { ReferenceItemHeaderDateText,ReferenceItemHeaderDateWrapper,ReferenceItemHeaderWrapper,ReferenceItemWrapper,ReferenceWrapper } from '@layouts/Traffic/LearningMaterial/Reference/style';
import { MaterialType,useGetLearningMaterial } from '@common/api/learningMaterial';
import { TableHeader,TableItem,TableWrapper } from '@layouts/Traffic/LearningMaterial/style';
import { format } from 'date-fns';
import { Box, Button } from '@mui/material';
import {  POST } from '@common/httpClient';
import createDownloadLink from '@utils/createDownloadLink';
import DownloadIcon from 'public/assets/images/ic_download.svg';
import { TuiViewer } from '@components/common/TuiEditor';
import styled from '@emotion/styled';
import { useState } from 'react';
interface ReferenceLayoutProps {
  materialType: MaterialType;
}

export default function ReferenceLayout({ materialType }: ReferenceLayoutProps) {
  
  const { data } = useGetLearningMaterial(materialType, '');
  const [selectedPost, setSelectedPost] = useState(null);
  const handleClickDownload = async (name: string, seq: number) => {
    const data = await POST<string>(`/file/${seq}`,{},{ responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([data]));
    createDownloadLink(url, name)
  };
  
  const onClickToggleContent = (id: number) => {
    setSelectedPost(id === selectedPost ? null : id);
  }

  return (
    <ReferenceWrapper>
      <TableWrapper>
        <TableHeader>
          <TableItem width="10%">번호</TableItem>
          <TableItem width="55%">제목</TableItem>
          <TableItem width="25%">등록일</TableItem>
          <TableItem width="10%">파일받기</TableItem>
        </TableHeader>
      </TableWrapper>

      {data &&
        data.data.map(value => (
          <ReferenceItemWrapper key={value.seq}>
            <ReferenceItemHeaderWrapper
              onClick={() => onClickToggleContent(value.seq)}
            >
              <TableItem width="10%">{value.seq}</TableItem>
              <TableItem width="55%" textAlign="left">
                {value.title}
              </TableItem>
              <TableItem width="25%">
                <ReferenceItemHeaderDateWrapper>
                  <ReferenceItemHeaderDateText>
                    {format(new Date(value.createdDtime), 'yyyy. MM. dd')}
                  </ReferenceItemHeaderDateText>
                </ReferenceItemHeaderDateWrapper>
              </TableItem>
              <TableItem width="10%">
                <Button
                  onClick={() => handleClickDownload(value.s3Files[0].name, value.s3Files[0].seq)}
                >
                  <DownloadIcon />
                </Button>
              </TableItem>
            </ReferenceItemHeaderWrapper>
              {
                selectedPost === value.seq && (
                  <ContentBox>
                    <TuiViewer initialValue={value.content ?? '본문이 비어있는 글입니다.'} />
                  </ContentBox>
                )
              }
          </ReferenceItemWrapper>
        ))}
    </ReferenceWrapper>
  );
}

const ContentBox = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #e5e5e5;
  padding-bottom: .5rem;
`;