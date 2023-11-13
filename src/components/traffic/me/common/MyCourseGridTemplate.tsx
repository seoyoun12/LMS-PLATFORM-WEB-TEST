import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Props<T> {
  list: T[]
  isLinkVideo?: boolean
}

export default function MyCourseGridTemplate<T extends { seq?: number, courseName?: string,courseThumbnail?: string, courseUserSeq?: number,thumbnailImage?:string,recentLessonSeq?: number, courseTitle?: string  }>({list,isLinkVideo}: Props<T>) {
  const [sortedlist , setSortedlist] = useState(list);
  


  useEffect(() => {
    const sortedList = list[0].seq ? list.slice().sort((a, b) => b.seq - a.seq) : list.slice().sort((a, b) => b.courseUserSeq - a.courseUserSeq);
    setSortedlist(sortedList);
  },[list])

  
  return (
    <List>
      {
        sortedlist.map((course) => (
          <Item key={course.seq ?? course.courseUserSeq}>
              {(course.courseThumbnail || course.thumbnailImage) && <Image src={course.courseThumbnail || course.thumbnailImage} width={280} height={180} alt="과정 썸네일" style={{borderRadius:'16px'}} />}
            <Title>{course.courseName ?? course.courseTitle}</Title>
            <ShowDetailLink
              href={isLinkVideo ? `/course/${course.courseUserSeq}/lesson/${course.recentLessonSeq}` : `/traffic/me/my-course?seq=${course.seq}`}
              as={isLinkVideo ?  `/course/${course.courseUserSeq}/lesson/${course.recentLessonSeq}` :  `/traffic/me/my-course/${course.seq}`}
              target={isLinkVideo ? '_blank' : '_self'}
              >
                {
                  isLinkVideo
                  ? <a target="_blank" rel="noreferrer">학습하기</a>
                  : <a>자세히 보기</a>
                }
              </ShowDetailLink>
          </Item>
        ))
      }
      </List>
  )
}



const Title = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 500;
  margin-top: .25rem;
  margin-bottom: 1rem;
`

const ShowDetailLink = styled(Link)`
  font-size: 1rem;
  font-weight: 500;
  color: #9819ae;
  text-decoration: none;
`


const Item = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  gap: .1rem;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0,0,0,.2);
  padding: 1rem;
  &:hover {
    box-shadow: 0 0 10px rgba(0,0,0,.4);
    background-color: #fdfdf5;
    transition: all .3s;
  }
  border-radius: 8px;
`;

const List = styled(Box)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px,1fr));
  grid-gap: 10px;
  padding: 2rem; 
`