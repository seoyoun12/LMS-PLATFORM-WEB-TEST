import styled from "@emotion/styled";
import useDominCourse, { CourseType } from "@hooks/useDominCourse";
import { Refresh } from "@mui/icons-material";
import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import CourseTablePagination from "./feature/CourseTablePagination";
import CourseListSearchForm from "./feature/CourseListSearchForm";
import CourseTable from "./feature/CourseTable";

export function CourseTrafficManagement() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { getDominCourseList, data:courseList } = useDominCourse();

  useEffect(() => {
    getDominCourseList({courseType:CourseType.TYPE_PROVINCIAL,page,elementCnt:rowsPerPage});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[rowsPerPage,page])

  return(
  <Wrapper>
    <Title>과정 목록(도민)</Title>
    <CourseListSearchForm />
    <RefreshButton endIcon={<Refresh />} >전체 다시 불러오기</RefreshButton>
    <CourseTable courseList={courseList} />
    <CourseTablePagination
        courseList={courseList}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
  </Wrapper>
  )
}

const Wrapper = styled(Box)`
  width:100%;
`
const RefreshButton = styled(Button)`
  margin: 12px 0;
  color: #222;
`;
const Title = styled(Typography)`
  margin-bottom: 32px;
  font-weight: 700;
  font-size: 24px;
`;