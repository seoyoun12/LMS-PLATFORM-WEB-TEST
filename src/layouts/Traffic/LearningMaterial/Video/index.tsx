import {VideoItemContentWrapper,VideoItemHeaderDateText,VideoItemHeaderDateWrapper,VideoItemHeaderWrapper,VideoItemWrapper,VideoWrapper,
} from "@layouts/Traffic/LearningMaterial/Video/style";
import { useState } from "react";
import {MaterialType,useGetLearningMaterial } from "@common/api/learningMaterial";
import {TableHeader,TableItem,TableWrapper } from "@layouts/Traffic/LearningMaterial/style";
import ArrowDown from "public/assets/images/ic_arrow_down.svg";
import { format } from "date-fns";
import CourseTablePagination from "@layouts/AdminCenter/CourseTrafficManagement/feature/CourseTablePagination";

interface VideoLayoutProps {
  materialType: MaterialType;
}

export default function VideoLayout({ materialType }: VideoLayoutProps) {
  const [page, setPage] = useState(0);
  const [elementCnt, setElementCnt] = useState(9);
  const { data } = useGetLearningMaterial(materialType, "",page, elementCnt);

  const [selectedPost, setSelectedPost] = useState<number | null>(null);

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
          <TableItem width="10%"></TableItem>
          <TableItem width="65%">제목</TableItem>
          <TableItem width="25%">등록일</TableItem>
        </TableHeader>
      </TableWrapper>

      {data &&
        data?.data?.content.map((value) => (
          <VideoItemWrapper
            open={selectedPost === value.seq}
            key={value.seq}
            onClick={() => handleClickPost(value.seq)}
          >
            <VideoItemHeaderWrapper>
              <TableItem width="10%">{value.seq}</TableItem>
              <TableItem width="65%" textAlign="left">
                {value.title}
              </TableItem>
              <TableItem width="25%">
                <VideoItemHeaderDateWrapper open={selectedPost === value.seq}>
                  <VideoItemHeaderDateText>
                    {format(new Date(value.createdDtime), "yyyy. MM. dd")}
                  </VideoItemHeaderDateText>
                  <ArrowDown />
                </VideoItemHeaderDateWrapper>
              </TableItem>
            </VideoItemHeaderWrapper>
            <VideoItemContentWrapper>
              <iframe
                src={`https://www.youtube.com/embed/${
                  value.origin.split("https://www.youtube.com/watch?v=")[1]
                }`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </VideoItemContentWrapper>
          </VideoItemWrapper>
        ))}
        <CourseTablePagination
          count={data?.data.totalElements || 0}
          page={page}
          setPage={setPage}
          rowsPerPage={elementCnt}
          setRowsPerPage={setElementCnt}
          />
    </VideoWrapper>
  );
}
