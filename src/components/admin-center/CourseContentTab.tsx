import styled from '@emotion/styled'
import { Link } from '@mui/icons-material'
import { Box, Button } from '@mui/material'

export default function CourseContentTab() {
  return (
    <Wrapper>
      <Table>
        <Row>
          <InRow flex={0.1}>ID</InRow>
          <InRow flex={0.4}>콘텐츠명</InRow>
          <InRow flex={0.2}>유형</InRow>
          <InRow flex={0.2}>생성일</InRow>
          <InRow flex={0.1}>상태</InRow>
        </Row>
        <Row rounded="8px">
          <InRow flex={0.1}>65</InRow>
          <InRow flex={0.4}>잼민이 교육</InRow>
          <InRow flex={0.2}>CONTENT_MP2554</InRow>
          <InRow flex={0.2}>2452-10-11</InRow>
          <InRow flex={0.1}>정상</InRow>
        </Row>
      </Table>
      <Box sx={{position:'relative'}}>
      <ContentLinkButton variant='contained' startIcon={<Link/>}>콘텐츠 연결</ContentLinkButton>
      </Box>
    </Wrapper>
  )
}

const ContentLinkButton = styled(Button)`
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
