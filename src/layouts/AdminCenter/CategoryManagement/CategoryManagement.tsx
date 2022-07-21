<<<<<<< HEAD
import { BoardType, categoryBoardList, removeCategoryBoard } from "@common/api/categoryBoard";
=======
import { categoryBoardList, removeCategoryBoard } from "@common/api/categoryBoard";
>>>>>>> feat/calendar
import { useDialog } from "@hooks/useDialog";
import { useSnackbar } from "@hooks/useSnackbar";
import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useRouter } from "next/router";
import styles from "@styles/common.module.scss";
<<<<<<< HEAD
import { createContext, useContext, useEffect, useState } from "react";
=======
import { useEffect, useState } from "react";
>>>>>>> feat/calendar
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

<<<<<<< HEAD
const tabsConfig = [
  {name: "공지사항", value: "TYPE_NOTICE"},
  {name: "자주묻는질문", value: "TYPE_FAQ"},
  {name: "문의내역조회", value: "TYPE_REVIEW"}
]




=======
>>>>>>> feat/calendar
export function CategoryManagement() {

  const router = useRouter();
  const snackbar = useSnackbar();
  const dialog = useDialog();
<<<<<<< HEAD

  const [ page, setPage ] = useState(0);
  const [ seq, setSeq ] = useState<number | null>(null);
  const [ modifyPage, setModifyPage ] = useState();

  // const { categorySeq } = router.query;
  
  const { data, error, mutate } = categoryBoardList({ 
    boardType: "TYPE_NOTICE",
    // boardType: String(BoardType),
    page 
  }); 


  // 수정
  const onClickmodifyCategoryBoard = async (seq: number) => {
    setSeq(seq);
    const modifyData = (data?.content.find((item) => item.seq === seq))
    router.push(`/admin-center/category/modify/${seq}`);
    mutate();
    // console.log("seq : ", seq)
    // console.log("modifyData : ", modifyData);
    // const categoryBoardData = modifyData;
    // const categorySeq = seq;
  }

=======
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



>>>>>>> feat/calendar
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

<<<<<<< HEAD
  
  // Radio Button check value
  // const [ TypeOfBoard, setTypeOfBoard ] = useState<string>("TYPE_NOTICE");

  // const handleClickedRadioButton = async (boardTypeString: string) => {
  //   setTypeOfBoard(boardTypeString)
  //   console.log("boardType : ", boardTypeString);
  //   await mutate({  boardType : boardTypeString });
  // }

  // const { data, error, mutate } = categoryBoardList({ 
  //   boardType: "TYPE_FAQ",
  //   page 
  // }); 
  
  // const handleClickedRadioButton = async (boardTypeString: string) => {
  //   setTypeOfBoard(boardTypeString)
  //   console.log("1. boardType : ", boardTypeString);
  //   await mutate({boardTypeString : boardTypeString});
  // }



  // const [ modifyPage, setModifyPage ] = useState();

  return (
    <div>
      {/* <RadioGroup row onChange={handleClickedRadioButton}> */}
      <RadioGroup row>
        {tabsConfig.map(({ name, value }: { name: string, value: string }) => (
          <FormControlLabel
            key={name}
            label={name}
            value={value}
            control={<Radio />}
            // onClick={() => handleClickedRadioButton(boardTypeString)} 
          />
        ))}
      </RadioGroup>
=======

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

>>>>>>> feat/calendar

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
<<<<<<< HEAD
              <TableCell key={name} align="center">{name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
=======
              <TableCell key={name} 
                align="center"
              >
                {name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

>>>>>>> feat/calendar
        
        <TableBody>
          {data?.content.map((category) => (
            <TableRow key={category.seq} hover>
              <TableCell align="center">{category.seq}</TableCell>
<<<<<<< HEAD
              <TableCell align="center">{category.userSeq}</TableCell>
              <TableCell align="center">{category.username}</TableCell>
              <TableCell align="center"><SubjectTypography>{category.subject}</SubjectTypography></TableCell>
              <TableCell align="center"><ContentTypography>{category.content}</ContentTypography></TableCell>
              <TableCell align="center">{category.boardType}</TableCell>
              <TableCell align="center">{dateFormat(category.createdDtime, "isoDate")}</TableCell>
              <TableCell align="center">{dateFormat(category.modifiedDtime, "isoDate")}</TableCell>
              <TableCell align="center">{category.noticeYn}</TableCell>
              <TableCell align="center">{category.publicYn}</TableCell>
              <TableCell align="center">{category.status}</TableCell>
              <TableCell align="center">{category.hit}</TableCell>
              <TableCell align="center">{category.s3Files[0] ? category.s3Files[0].name : "파일없음"}</TableCell>
              <TableCell align="center">
                {/* <Link href={`/admin-center/category/modify/${category.seq}`}> */}
                <Button
                  variant="text"
                  color="neutral"
                  size="small"
                  onClick={() => onClickmodifyCategoryBoard(category.seq)}
                >
                  수정
                </Button>
                {/* </Link> */}
              </TableCell>
              <TableCell align="center">
=======
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
>>>>>>> feat/calendar
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
<<<<<<< HEAD
      </Table>
    </div>
  )
=======

      </Table>
    
    </div>

  )

>>>>>>> feat/calendar
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

