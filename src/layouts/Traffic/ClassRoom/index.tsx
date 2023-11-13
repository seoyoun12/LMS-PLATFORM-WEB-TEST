
import { MediaContainer,MediaHeaderContainer,MediaHeaderTitle,MediaHeaderSubtitle  } from './style';
import BackgroundImage from 'public/assets/images/learning_material_background.svg';
import useDominMe from '@hooks/useDominMe';
import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';
import Image from 'next/image';
import { Spinner } from '@components/ui';
import { differenceInDays } from 'date-fns';

export default function ClassRoomLayout() {
  const { myLearningStatus } = useDominMe();

  const onClickMoveToLesson = (courseUserSeq: number, lessonSeq: number) => {
    // something invisible...
    console.log(lessonSeq)
    window.open(`/course/${courseUserSeq}/lesson/${lessonSeq}`,'_blank');
  }  
  
  return (
    <MediaContainer>
      
      <MediaHeaderContainer>
        <MediaHeaderTitle>학습하기</MediaHeaderTitle>
        <MediaHeaderSubtitle>온라인 교육을 학습할 수 있습니다.</MediaHeaderSubtitle>
        <BackgroundImage />
      </MediaHeaderContainer>


      <Wrapper>
        {
          myLearningStatus
          ? myLearningStatus.data.map((item) => {
            if(item.progressStatus === 'TYPE_PROGRESSING')
            return (
              <Item key={item.courseUserSeq} onClick={() => onClickMoveToLesson(item.courseUserSeq,item.recentLessonSeq)}>
                <Image src={item.thumbnailImage} width={240} height={184} alt="과정 썸네일 이미지" style={{borderRadius: '8px'}} />
                <ItemTitle className='title'>{item.courseTitle}</ItemTitle>
                <ItemProgrss>수강 종료까지 {differenceInDays( new Date(item.studyEndDate), new Date())}일 남았습니다.</ItemProgrss>
                <ItemProgrss>현재 수강률: {item.progress}% </ItemProgrss>
              </Item>
            )
          })
          : <Spinner />
        }  
        
      </Wrapper>
    </MediaContainer>
  );
}


const ItemText = styled(Typography)`
  align-self: flex-start;
`

const ItemTitle = styled(ItemText)`
  width: 240px; 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  font-size: 1.15rem;
  color: #161D2B;
  margin-top: .5rem;
`

const ItemProgrss = styled(ItemText)`
  font-size: .85rem;
  font-weight: bold;
  color: #c7c7c7;
  margin-top: .25rem;
`

const Item = styled(Box)`
  max-width: 300px;
  width: 300px;
  height: 300px;
  box-shadow: 0 0 2px 0 rgba(0,0,0,0.4);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 2rem;
  gap: .25rem;
  cursor: pointer;
  &:hover {
    border: 1px solid #2d63e278;
    transition: all 0.6s ease;
    transform: scale(1.05);
    .title {
      color: #2d63e2;
    }
  }
`

const Wrapper = styled(Box)`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 0 auto;
  padding: 2rem 0;
  @media (max-width: 768px) {
    padding: 32px 12px;
    margin: 0;
  }
`;
