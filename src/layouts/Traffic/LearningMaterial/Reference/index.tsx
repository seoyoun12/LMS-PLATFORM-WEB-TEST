import { ReferenceItemHeaderDateText,ReferenceItemHeaderDateWrapper,ReferenceItemHeaderWrapper,ReferenceItemWrapper,ReferenceWrapper } from '@layouts/Traffic/LearningMaterial/Reference/style';
import { MaterialType,useGetLearningMaterial } from '@common/api/learningMaterial';
import { TableHeader,TableItem,TableWrapper } from '@layouts/Traffic/LearningMaterial/style';
import { format } from 'date-fns';
import { Box, Button } from '@mui/material';
import {  POST } from '@common/httpClient';
import createDownloadLink from '@utils/createDownloadLink';
import DownloadIcon from 'public/assets/images/ic_download.svg';
import styled from '@emotion/styled';
import { TuiViewer } from '@components/common/TuiEditor';
import { useState } from 'react';
import CourseTablePagination from '@layouts/AdminCenter/CourseTrafficManagement/feature/CourseTablePagination';
interface ReferenceLayoutProps {
  materialType: MaterialType;
}

export default function ReferenceLayout({ materialType }: ReferenceLayoutProps) {
  const [page, setPage] = useState(0);
  const [elementCnt, setElementCnt] = useState(9);
  const { data } = useGetLearningMaterial(materialType, '',page, elementCnt);
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
        data.data?.content?.map(value => (
          <ReferenceItemWrapper key={value.seq} onClick={() => onClickToggleContent(value.seq)}>
            <ReferenceItemHeaderWrapper>
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
                  onClick={() =>
                    handleClickDownload(value.s3Files[0].name, value.s3Files[0].seq)
                  }
                >
                  <DownloadIcon />
                </Button>
              </TableItem>
            </ReferenceItemHeaderWrapper>
            {selectedPost === value.seq &&
              <ContentBox> 
                <TuiViewer initialValue={value.content} />
              </ContentBox>
              }
          </ReferenceItemWrapper>
        ))}
      <CourseTablePagination
        page={page}
        setPage={setPage}
        count={data?.data.totalElements || 0}
        rowsPerPage={elementCnt}
        setRowsPerPage={setElementCnt}
      />
    </ReferenceWrapper>
  );
}

const ContentBox = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  animation: dropdown 0.3s ease-in-out;
  /* dropdown keyframes */
  @keyframes dropdown {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  

`;
