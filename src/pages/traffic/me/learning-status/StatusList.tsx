import CustomTabPanel from '@components/admin-center/drawer/CustomTabPanel'
import styled from '@emotion/styled';
import { MyLearningStatus } from '@hooks/useDominMe'
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';


interface Props{
  list: MyLearningStatus[];
  tabIndex: number;
  positive: boolean;
}

export default function StatusList({ list, tabIndex, positive}:Props) {
  // const sortedList = list[0].seq ? list.slice().sort((a, b) => b.seq - a.seq) : list.slice().sort((a, b) => b.courseUserSeq - a.courseUserSeq);
  return (
    <CustomTabPanel value={tabIndex} index={0}>
      <List>
      {
        list?.sort((a,b) => b.courseUserSeq - a.courseUserSeq ).map((item) => {
          if(positive ? item.progressStatus === 'TYPE_PROGRESSING': item.progressStatus !== 'TYPE_PROGRESSING') {
            return (
            <Item key={item.courseUserSeq}>
            { item.thumbnailImage && <Image src={item.thumbnailImage} width={280} height={180} alt="과정 썸네일" style={{borderRadius:'16px'}} /> }
            <Title>{item.courseTitle}</Title>
            <ShowDetailLink
              href={`/course/${item.courseUserSeq}/lesson/${item.recentLessonSeq}`}
              as={`/course/${item.courseUserSeq}/lesson/${item.recentLessonSeq}`}
              >
                <a target="_blank" rel="noopener noreferrer">
                  강의 시청
                </a>
              </ShowDetailLink>
          </Item>
            )}
        })
      }
      </List>
    </CustomTabPanel>
  )
}

const Title = styled(Typography)`
  font-size: 1.15rem;
  font-weight: 500;
  margin-top: .25rem;
  margin-bottom: 1rem;
  
  max-width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #161D2B;
`

const ShowDetailLink = styled(Link)`
  font-size: 1rem;
  font-weight: 500;
  color: #9819ae;
  text-decoration: none;
`


const Item = styled(Box)`
  
  width: 250px;
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: .25rem;
  width: 100%;
  
  @media screen and (max-width: 868px) {
    flex-direction: column;
  }
`