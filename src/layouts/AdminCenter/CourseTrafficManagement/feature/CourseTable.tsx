import React from 'react'
import CourseTableHeaders from './CourseTableHeaders'
import CourseListItem from './CourseListItem'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { getCourseListResponse } from '@hooks/useDominCourse'
interface Props{
  courseList: getCourseListResponse | null;
}

export default function CourseTable({ courseList }:Props) {
  return (
    <Table>
      <CourseTableHeaders />
      { courseList?.content.map((item) => <CourseListItem key={item.seq} item={item} />) }
    </Table>
  )
}


const Table = styled(Box)`
  border: 1px solid #eee;
  border-left:0;
  width: 100%;
`