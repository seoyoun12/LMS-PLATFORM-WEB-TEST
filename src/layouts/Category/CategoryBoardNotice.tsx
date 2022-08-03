import { Container, TableBody, TableHead, Typography, Button, TableRow, TableCell, Box } from '@mui/material';
import styles from '@styles/common.module.scss';
import styled from '@emotion/styled';
import router, { useRouter } from "next/router";
import { useSnackbar } from "@hooks/useSnackbar";
import { useEffect, useRef, useState } from "react";
import { CategoryBoard, BoardType, categoryBoardList } from "@common/api/categoryBoard";
import { Accordion, Spinner, Table } from '@components/ui';
import dateFormat from 'dateformat';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpSharpIcon from '@mui/icons-material/KeyboardArrowUpSharp';
import { grey } from '@mui/material/colors';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { BoardAccordion } from '@components/ui/BoardAccordion';
import React from 'react';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';


export function CategoryBoardNotice() {

  const [ page, setPage ] = useState(0);
  // const { data, error, mutate } = categoryBoardList({ page, boardType: "TYPE_NOTICE" });
  const router = useRouter();
  const [target , loadedItem , loading] = useInfiniteScroll(`/post`,"TYPE_NOTICE")


  //
  


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

  return (
    <Container>

      {/* <Table
        pagination={true}
        totalNum={data?.totalElements}
        page={data?.number}
        onChangePage={onChangePage}
        size="small"
      > */}
        {loadedItem && loadedItem.map((content) => {
          const accordionInfo = [{ 
            date: content.createdDtime, 
            name: content.subject, 
            children: [{ name: content.content}] 
          }]
          return <BoardAccordion boardAccordionList={accordionInfo}/>
        })}
        <Box ref={target} height='100px' >{loading ? <Spinner /> : ""}</Box>
      {/* </Table> */}
    </Container>
  )
}