import { Container, TableBody, TableHead, Typography, Button, TableRow, TableCell } from '@mui/material';
import styles from '@styles/common.module.scss';
import styled from '@emotion/styled';
import router, { useRouter } from "next/router";
import { useSnackbar } from "@hooks/useSnackbar";
import { useEffect, useState } from "react";
import { CategoryBoard, BoardType, categoryBoardList } from "@common/api/categoryBoard";
import { Accordion, Table } from '@components/ui';
import dateFormat from 'dateformat';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpSharpIcon from '@mui/icons-material/KeyboardArrowUpSharp';
import { grey } from '@mui/material/colors';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { BoardAccordion } from '@components/ui/BoardAccordion';


export function CategoryBoardFaq() {

  const [page, setPage] = useState(0);
  const { data, error, mutate } = categoryBoardList({ page, boardType: "TYPE_FAQ" });

  return (
    <Container>
      {data && data?.content.map((content) => {
        const accordionInfo = [{ 
          date: content.createdDtime, 
          name: content.subject, 
          children: [{ name: content.content}] 
        }]
        return <BoardAccordion boardAccordionList={accordionInfo}/>
      })}
    </Container>
  )
}
