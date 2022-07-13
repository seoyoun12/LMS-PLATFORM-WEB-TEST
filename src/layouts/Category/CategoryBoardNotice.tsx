import { Container, TableBody, TableHead, Typography, Button, TableRow, TableCell } from '@mui/material';
import styles from '@styles/common.module.scss';
import styled from '@emotion/styled';
import router, { useRouter } from "next/router";
import { useSnackbar } from "@hooks/useSnackbar";
import { useEffect, useState } from "react";
import { CategoryBoard, BoardType, categoryBoardNoticeList } from "@common/api/categoryBoard";
import { Accordion, Table } from '@components/ui';
import dateFormat from 'dateformat';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpSharpIcon from '@mui/icons-material/KeyboardArrowUpSharp';
import { grey } from '@mui/material/colors';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';


// const headRows = [
//   { name: 'seq' },
//   { name: '날짜' },
//   { name: '제목' },
//   { name: '본문' }
// ]



export function CategoryBoardNotice() {

  const [page, setPage] = useState(0);
  const { data, error, mutate } = categoryBoardNoticeList({ page, boardType: "TYPE_NOTICE" });

  // const accordionList = [

    //   {
    //     name : data?.content[2].subject,
    //     children: [
    //       {
    //         name: data?.content[0].content,
    //         href: '',
    //         // isActive: router.pathname === '/admin-center/course'
    //       }
    //     ],
    //     // icon: <></>, //<SchoolOutlinedIcon sx={{ mr: '32px', color: grey[700] }} />,
    //   }
    // ]

  // console.log("data.content : ", data?.content);

  return (
    <Container>
      {data && data?.content.map((content) => {
        const accordionInfo = [{ name: content.subject, children: [{ name: content.content }] }]
        return <Accordion accordionList={accordionInfo} />
      })}
    </Container>
  )
}

