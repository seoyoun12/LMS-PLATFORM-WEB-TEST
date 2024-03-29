
import { Table } from "@components/ui";
import { Box,Chip,TableBody,TableHead,Typography } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useEffect, useState } from "react";
import * as React from "react";
import { useRouter } from "next/router";
import dateFormat from "dateformat";
import { YN } from "@common/constant";
import { Spinner } from "@components/ui";
import { courseAdmList } from "@common/api/course";
import { courseReg,courseCategory,courseSubCategory } from "@layouts/Calendar/CalendarBody/CalendarBody";
import styled from "@emotion/styled";
import { ManagementSearchHeadRow } from "@components/admin-center/ManagementSearchHeadRow";
import { NotFound } from "@components/ui/NotFound";

const headRows: {
  name: string;
  align: "inherit" | "left" | "center" | "right" | "justify";
  width: string;
}[] = [
  { name: "No", align: "center", width: "5%" },
  { name: "과정분류", align: "center", width: "8.5%" },
  { name: "교육분류", align: "center", width: "8.5%" },
  { name: "업종", align: "center", width: "8.5%" },
  { name: "과정명", align: "center", width: "32.5%" },
  { name: "생성날짜", align: "center", width: "10%" },
  { name: "노출여부", align: "center", width: "5%" },
  { name: "상태", align: "center", width: "5%" },
];

export function CourseManagement() {
  
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [seq, setSeq] = useState<number | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searchTitle, setSearchTitle] = useState<string>(""); //이름 혹은 아이디
  const searchInputRef = React.useRef<HTMLInputElement | null>(null);

  const { data, error, mutate } = courseAdmList({page,courseTitle: searchTitle,courseType:"TYPE_TRANS_WORKER"});
  useEffect(() => {
    const { page } = router.query;
    setPage(!isNaN(Number(page)) ? Number(page) : 0);
  }, [router.query]);

  const onChangePage = async (page: number) => {
    await router.push({
      pathname: router.pathname,
      query: {
        page,
      },
    });
  };

  // 수정
  const onClickModifyCourse = async (seq: number) => {
    setSeq(seq);
    router.push(`/admin-center/course/modify/${seq}`);
    mutate();
  };

  const handleSearch = async (e: React.FormEvent, isReload = false) => {
    e.preventDefault();
    setNotFound(false);
    if (isReload) {
      setPage(0);
      return setSearchTitle("");
    }
    if (searchInputRef.current) {
      setSearchTitle(searchInputRef.current.value);
    }
  };

  useEffect(() => {
    if (data) {
      data.content.length === 0 && setNotFound(true);
    }
  }, [data]);
  if (error) return <div>Error</div>;
  if (!data) return <Spinner />;
  
  return (
    <Box>
      <CourseTitleTypography variant="h5">
        과정 목록(운수/저상)
      </CourseTitleTypography>
      <ManagementSearchHeadRow
        ref={searchInputRef}
        search={searchTitle}
        placeholder="과정검색"
        handleSearch={handleSearch}
      />
      {notFound ? (
        <NotFound content="과정이 존재하지 않습니다!" />
      ) : (
        <Table
          pagination={true}
          totalNum={data.totalElements}
          page={data.number}
          onChangePage={onChangePage}
          size="small"
          sx={{ tableLayout: "fixed" }}
        >
          <TableHead>
            <TableRow>
              {headRows.map(({ name, align, width }) => (
                <CourseTitleTableCell key={name} align={align} width={width}>
                  {name}
                </CourseTitleTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.content.map((course) => (
              <TableRow
                sx={{ cursor: "pointer" }}
                key={course.seq}
                hover
                onClick={() => onClickModifyCourse(course.seq)}
              >
                <CourseTableCell align="center">{course.seq}</CourseTableCell>
                {/* <TableCell align="center">{course.courseType}</TableCell> */}
                <CourseTableCell align="center">
                  {
                    courseReg.filter(
                      (item) => item.type === course.courseType
                    )[0]?.ko
                  }
                </CourseTableCell>
                <CourseTableCell align="center">
                  {
                    courseCategory.filter(
                      (item) => item.type === course.courseCategoryType
                    )[0]?.ko
                  }
                </CourseTableCell>
                <CourseTableCell align="center">
                  {
                    courseSubCategory.filter(
                      (item) => item.type === course.courseSubCategoryType
                    )[0]?.ko
                  }
                </CourseTableCell>
                <CourseTableCell align="center">
                  <SubjectBox>{course.courseName}</SubjectBox>
                </CourseTableCell>
                <CourseTableCell align="center">
                  {dateFormat(course.createdDtime, "isoDate")}
                </CourseTableCell>
                <CourseTableCell align="center">
                  <Chip
                    label={course.displayYn === YN.YES ? "보임" : "숨김"}
                    variant="outlined"
                    size="small"
                    color={
                      course.displayYn === YN.YES ? "secondary" : "default"
                    }
                  />
                </CourseTableCell>
                <CourseTableCell align="center">
                  <Chip
                    label={course.status ? "정상" : "중지"}
                    variant="outlined"
                    size="small"
                    color={course.status ? "secondary" : "default"}
                  />
                </CourseTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}

// 과정 목록 글자
const CourseTitleTypography = styled(Typography)`
  margin-bottom: 30px;
  font-weight: 700;
`;

// 과정 제목. ellipsis 적용.
const SubjectBox = styled(Box)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`;

// 과정 목록 테이블의 Title부분
const CourseTitleTableCell = styled(TableCell)`
  font-weight: bold;
  background: #f5f5f5;
  border-right: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;

  &:last-child {
    border-right: 1px solid #f0f0f0;
  }
`;

// 과정 목록 테이블의 본문
const CourseTableCell = styled(TableCell)`
  margin: 0;
  border-right: 1px solid #f0f0f0;

  &:first-of-type {
    /* border-right: 1px solid #e0e0e0; */
    background: #f5f5f5;
  }
`;
