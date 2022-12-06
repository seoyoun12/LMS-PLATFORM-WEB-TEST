import {
  Box,
  Button,
  Chip,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import { Spinner } from "@components/ui";
import styled from "@emotion/styled";
import { Table } from "@components/ui";
import dateFormat from "dateformat";
import { YN } from "@common/constant";
import { useSnackbar } from "@hooks/useSnackbar";
import { useEffect, useState } from "react";
import { useDialog } from "@hooks/useDialog";
import { useRouter } from "next/router";
import { courseTrafficList } from "@common/api/adm/course-traffic";

const headRows: {
  name: string;
  align: "inherit" | "left" | "center" | "right" | "justify";
  width: string;
}[] = [
  { name: "No", align: "center", width: "5%" },
  { name: "도민유형", align: "center", width: "10%" },
  { name: "제목", align: "center", width: "63%" },
  { name: "생성날짜", align: "center", width: "8.5%" },
  { name: "수정날짜", align: "center", width: "8.5%" },
  { name: "상태", align: "center", width: "5%" },
];

export function CourseTrafficManagement() {
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [seq, setSeq] = useState<number | null>(null);

  const { data, error, mutate } = courseTrafficList({ page });

  console.log("data : ", data);

  // pagination
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
  return (
    <Box>
      <CourseTrafficTitleTypography variant="h5">
        과정 목록(도민)
      </CourseTrafficTitleTypography>

      <Table
        pagination={true}
        // totalNum={data.totalElements}
        // page={data.number}
        // onChangePage={onChangePage}
        size="small"
        sx={{ tableLayout: "fixed" }}
      >
        <TableHead>
          <TableRow>
            {headRows.map(({ name, align, width }) => (
              <CourseTrafficTitleTableCell
                key={name}
                align={align}
                width={width}
              >
                {name}
              </CourseTrafficTitleTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {/* {data.content.map((course) => ( */}
          <TableRow
            sx={{ cursor: "pointer" }}
            // key={course.seq}
            hover
            // onClick={() => onClickModifyCourse(course.seq)}
          >
            <CourseTrafficTableCell align="center">
              {/* {course.seq} */}
            </CourseTrafficTableCell>
            {/* <TableCell align="center">{course.courseType}</TableCell> */}
            <CourseTrafficTableCell align="center"></CourseTrafficTableCell>
            <CourseTrafficTableCell align="center"></CourseTrafficTableCell>
            <CourseTrafficTableCell align="center">
              <SubjectBox>{/* {course.courseName} */}</SubjectBox>
            </CourseTrafficTableCell>
            <CourseTrafficTableCell align="center">
              {/* {dateFormat(course.createdDtime, "isoDate")} */}
            </CourseTrafficTableCell>
            <CourseTrafficTableCell align="center">
              <Chip
              // label={course.status ? "정상" : "중지"}
              // variant="outlined"
              // size="small"
              // color={course.status ? "secondary" : "default"}
              />
            </CourseTrafficTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}

// 과정 목록 글자
const CourseTrafficTitleTypography = styled(Typography)`
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
const CourseTrafficTitleTableCell = styled(TableCell)`
  font-weight: bold;
  background: #f5f5f5;
  border-right: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;

  &:last-child {
    border-right: 1px solid #f0f0f0;
  }
`;

// 과정 목록 테이블의 본문
const CourseTrafficTableCell = styled(TableCell)`
  margin: 0;
  border-right: 1px solid #f0f0f0;

  &:first-of-type {
    background: #f5f5f5;
  }
`;
