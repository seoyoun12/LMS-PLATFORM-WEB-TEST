import { categoryBoardList, removeCategoryBoard } from "@common/api/categoryBoard";
import { useDialog } from "@hooks/useDialog";
import { useSnackbar } from "@hooks/useSnackbar";
import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useRouter } from "next/router";
import styles from "@styles/common.module.scss";
import { useEffect, useState } from "react";
import { Table } from "@components/ui";
import dateFormat from "dateformat";
import styled from "@emotion/styled";
import { Controller, useForm } from "react-hook-form";
import { Link } from '@components/common';

const headRows = [
  { name: "seq" }, // seq
  { name: "userSeq" }, // userSeq
  { name: "userId" }, // username
  { name: "제목" }, // subject
  { name: "본문" }, // content
  { name: "타입" }, // boardType
  { name: "생성일" }, // createdDtime
  { name: "수정일" }, // modifiedDtime
  { name: "공지여부" }, // noticeYn
  { name: "공개여부" }, // publicYn
  { name: "상태" }, // status
  { name: "조회수" }, // hit
  { name: "파일" }, // s3Files
  { name: "수정" }, // s3Files
  { name: "삭제" } // s3Files
];

export function CategoryManagement() {

  const router = useRouter();
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const [ page, setPage ] = useState(0);
  const { data, error, mutate } = categoryBoardList({ 
    boardType: "TYPE_NOTICE",
    page });
  const [ seq, setSeq ] = useState<number | null>(null);
  // const [ modifyPage, setModifyPage ] = useState();
  // 수정
  const onClickmodifyCategoryBoard = async (seq: number) => {
    setSeq(seq);
  }



  // 삭제
  const onClickRemoveCategory = async (seq: number) => {
    try {
      const dialogConfirmed = await dialog({
        title: '공지사항 삭제하기',
        description: '정말로 삭제하시겠습니까?',
        confirmText: '삭제하기',
        cancelText: '취소'
      });
      if (dialogConfirmed) {
        await removeCategoryBoard(seq);
        snackbar({ variant: "success", message: "성공적으로 삭제되었습니다." });
        await mutate();
      }
    } catch (e: any) {
      snackbar({ variant: "error", message: e.data.message });
    }
  };

  // Pagination
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


  console.log("[확인] data?.content : ", data?.content);


  return (

    <div>

      <FormControl>
        <FormLabel>게시판 선택</FormLabel>
        <RadioGroup row>
          <FormControlLabel value="TYPE_POST_NOTICE" control={<Radio />} label="공지사항" />
          <FormControlLabel value="TYPE_FAQ" control={<Radio />} label="자주묻는질문" />
          <FormControlLabel value="TYPE_REVIEW" control={<Radio />} label="문의내역조회" />
        </RadioGroup>
      </FormControl>


      <Typography variant="h5">게시판 글 목록</Typography>

      <Table
        pagination={true}
        totalNum={data?.totalElements}
        page={data?.number}
        onChangePage={onChangePage}
        size="small"
      >
        <TableHead>
          <TableRow>
            {headRows.map(({ name }: { name: string }) => (
              <TableCell key={name} 
                align="center"
              >
                {name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        
        <TableBody>
          {data?.content.map((category) => (
            <TableRow key={category.seq} hover>
              <TableCell align="center">{category.seq}</TableCell>
              <TableCell>{category.userSeq}</TableCell>
              <TableCell>{category.username}</TableCell>
              <TableCell><SubjectTypography>{category.subject}</SubjectTypography></TableCell>
              <TableCell><ContentTypography>{category.content}</ContentTypography></TableCell>
              <TableCell>{category.boardType}</TableCell>
              <TableCell>{dateFormat(category.createdDtime, "isoDate")}</TableCell>
              <TableCell>{dateFormat(category.modifiedDtime, "isoDate")}</TableCell>
              <TableCell>{category.noticeYn}</TableCell>
              <TableCell>{category.publicYn}</TableCell>
              <TableCell>{category.status}</TableCell>
              <TableCell>{category.hit}</TableCell>
              <TableCell>{category.s3Files[0] ? category.s3Files[0].name : "파일없음"}</TableCell>
              <TableCell>
                <Link href={`/admin-center/category/modify/${category.seq}`}>
                  <Button
                    variant="text"
                    color="neutral"
                    size="small"
                    // onClick={() => onClickmodifyCategoryBoard(category.seq)}
                    // mode = { seq ? "modify" : "upload" }
                  >
                    수정
                  </Button>
                </Link>
              </TableCell>

              <TableCell>
                <Button
                  variant="text"
                  color="warning"
                  size="small"
                  onClick={() => onClickRemoveCategory(category.seq)}
                >
                  삭제
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    
    </div>

  )

}


const SubjectTypography = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 150px;
`

const ContentTypography = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 255px;
`

