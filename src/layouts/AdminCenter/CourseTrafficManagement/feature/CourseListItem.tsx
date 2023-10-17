import styled from '@emotion/styled';
import { Content } from '@hooks/useDominCourse';
import { Box, Button } from '@mui/material';
import { ConvertEnum } from '@utils/convertEnumToHangle';
import { useRouter } from 'next/router';

interface Props {
  item: Content
}


export default function CourseListItem({item}:Props) {
  const navigation = useRouter();

  const onClickItem = () => {
    navigation.push(`/admin-center/course-traffic/modify/${item.seq}`);
  }
  return (
    <Row key={item.seq} onClick={onClickItem} >
      <InRow bgcolor="#ffe" flex={0.1}>{item.seq}</InRow>
      <InRow flex={0.12}>{ConvertEnum(item.provincialEduTargetMain)}</InRow>
      <InRow flex={0.13}>{ConvertEnum(item.provincialEduTargetSub)}</InRow>
      <InRow flex={0.4}>{item.courseName}</InRow>
      <InRow flex={0.15}>{item.createdDtime}</InRow>
      {/* 2개의 값 분기처리 */}
      <InRow flex={0.05}>{item.displayYn === "Y" ? <Button sx={{color:'#2d63e2'}}>보임</Button> : <Button sx={{color:'#f7365d'}}>숨김</Button>}</InRow>
      <InRow flex={0.05}>{item.status === 1 ? <Button sx={{color:'#2d63e2'}}>정상</Button> : <Button sx={{color:'#f7365d'}}>중지</Button>}</InRow>
    </Row>
  )
}
const Row = styled(Box)`
  display:flex;
  width:100%;
  cursor:pointer;
  &:hover{
    color: #2d63e2;
  }
`;

const InRow = styled(Box)<{flex:number,bgcolor?:string}>`
  flex:${props=>props.flex || 1};
  text-align: center;
  background-color:${props=>props.bgcolor || '#fff'};
  border:1px solid #eee;
  border-right:0;
  padding: .25rem;
`
