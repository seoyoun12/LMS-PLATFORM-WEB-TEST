import styled from '@emotion/styled'
import useToggle from '@hooks/useToggle'
import { Link } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import CourseContentListModal from './CourseContentListModal'
import CourseContentTableHeaders from './CourseContentTableHeaders'
import useDominCourse from '@hooks/useDominCourse'
import { useEffect } from 'react'
import { useRouter } from 'next/router'



export default function CourseContentTab() {
  const { toggle, onToggle } = useToggle()
  const { getDominCourse, course,isLoading } = useDominCourse();
  const navigation = useRouter();

  const onClickMoveToModifyContentPage = async (seq: number) => {
    navigation.push(`/admin-center/content/modify/${seq}`);
  };
  
  useEffect(() => {
    if(!navigation.query.boardSeq) return;
    getDominCourse(+navigation.query.boardSeq);

    //eslint-disable-next-line
  },[navigation])
  
  if(isLoading) return <div>콘텐츠를 불러오고 있습니다. 잠시만 기다려주세요.</div>
  
  return (
    <>
      <CourseContentListModal toggle={toggle} onToggle={onToggle} getDominCourse={getDominCourse} seq={+navigation.query.boardSeq} />
      <Wrapper>
        <Table>
          <CourseContentTableHeaders />
          {
            (course && course.content) && 
              <Row rounded="8px" onClick={() => onClickMoveToModifyContentPage(course.content.seq)}>
              <InRow flex={0.1}>{course.content.seq}</InRow>
              <InRow flex={0.4}>{course.content.contentName}</InRow>
              <InRow flex={0.2}>{course.content.contentType}</InRow>
              <InRow flex={0.2}>{course.content.createdDtime}</InRow>
              <InRow flex={0.1}>{course.content.status === 1 ? '정상' : '중지'}</InRow>
            </Row>
          }
        </Table>
        <Box sx={{position:'relative'}}>
          <StyledLink variant='contained' startIcon={<Link/>} onClick={onToggle}>
            콘텐츠 연결
          </StyledLink>
        </Box>
      </Wrapper>
    </>
  )
}

const StyledLink = styled(Button)`
  position:absolute;
  top:0;
  right:0; 
  margin-top: 1rem;
`

const Row = styled(Box)<{rounded?:string;}>`
  display: flex;
  border-bottom: 1px solid #c7c7c7c7;
  padding: .5rem 0;
  border-radius: ${props => props.rounded || '0px'};
  cursor: pointer;
`
const InRow = styled(Box)<{flex:number}>`
  flex: ${props => props.flex || 1};
  text-align: center;
  font-size: 14px;
`

const Table = styled(Box)`
  border: 1px solid #c7c7c7c7;
  border-radius: 8px;
  box-shadow: 1px 1px 2px #c7c7c7c7;
  shape-outside: border-box;
`

const Wrapper = styled(Box)`

`
