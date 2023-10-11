import { ReferenceItemHeaderDateText,ReferenceItemHeaderDateWrapper,ReferenceItemHeaderWrapper,ReferenceItemWrapper,ReferenceWrapper } from '@layouts/Traffic/LearningMaterial/Reference/style';
import { MaterialType,useGetLearningMaterial } from '@common/api/learningMaterial';
import { TableHeader,TableItem,TableWrapper } from '@layouts/Traffic/LearningMaterial/style';
import { format } from 'date-fns';
import { Button } from '@mui/material';
import {  POST } from '@common/httpClient';
import createDownloadLink from '@utils/createDownloadLink';
import DownloadIcon from 'public/assets/images/ic_download.svg';
interface ReferenceLayoutProps {
  materialType: MaterialType;
}

export default function ReferenceLayout({ materialType }: ReferenceLayoutProps) {
  
  const { data } = useGetLearningMaterial(materialType, '');

  const handleClickDownload = async (name: string, seq: number) => {
    const data = await POST<string>(`/file/${seq}`,{},{ responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([data]));
    createDownloadLink(url, name)
  };

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
          </ReferenceItemWrapper>
        ))}
    </ReferenceWrapper>
  );
}
