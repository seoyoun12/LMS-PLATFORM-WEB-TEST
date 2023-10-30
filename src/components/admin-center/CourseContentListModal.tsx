import styled from '@emotion/styled';
import useDominContent from '@hooks/useDominContent';
import useDominCourse from '@hooks/useDominCourse';
import CourseTablePagination from '@layouts/AdminCenter/CourseTrafficManagement/feature/CourseTablePagination';
import { Close, Refresh, Search } from '@material-ui/icons';
import { Box, Button, FormControl, InputAdornment, Modal, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ContentLinkButtonGroup from './ContentLinkButtonGroup';
import CourseContentModalTableHeaders from './CourseContentModalTableHeaders';

interface Props {
  toggle: boolean;
  onToggle: () => void;
  getDominCourse: (seq:number) => Promise<any>;
  seq:number;
}

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '1000px',
  maxWidth: '1200px',
  width:'100%',

  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 12,
  p: 4,
  height: '600px',
  overflow: 'scroll',
};

export default function CourseContentListModal({toggle,onToggle,getDominCourse,seq}:Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data,isLoading, pageConfig } = useDominContent({page,elementCnt:rowsPerPage});
  const { linkCourseWithContent, dislinkCourseWithContent } = useDominCourse();
  const navigation = useRouter();
  const [thisSeq,setThisSeq] = useState(navigation.query.boardSeq);

  
  useEffect(() => {
    setThisSeq(navigation.query.boardSeq)
  },[navigation])


  

  if(isLoading) return <div>로딩중</div>
  return (
    <Modal
      open={toggle}
      onClose={async () => {onToggle(); await getDominCourse(seq)}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
    <Box sx={modalStyle}>
      
      <Title id="modal-modal-title" variant="h6" sx={{width:'100%'}}>
        콘텐츠 연결
        <Button onClick={async () => {onToggle(); await getDominCourse(seq)}} endIcon={<Close />} sx={{color:'#222'}} />
      </Title>
      
      
        <FormControl fullWidth>
          <TextField placeholder='콘텐츠 검색'
          InputProps={{ endAdornment: <InputAdornment position="end"><Search /></InputAdornment>}} />
        </FormControl>
      
      
      <Title marginTop="32px" marginBottom="16px">
        콘텐츠 목록
        <Button endIcon={<Refresh />} sx={{color:'#222'}}>전체 다시 불러오기</Button>
      </Title>
      
      <Table>
        <CourseContentModalTableHeaders />
        {
          data?.data.content.map((content) => (
            <Row key={content.seq}>
            <InRow flex={0.1} >{content.seq}</InRow>
              <InRow flex={0.25} >{content.contentName}</InRow>
              <InRow flex={0.15} >{content.courseSeq ?? '-'}</InRow>
              <InRow flex={0.3} >{content.courseName ?? '-'}</InRow>
              <InRow flex={0.2} gap="4px">
                <ContentLinkButtonGroup
                  onLink={() => linkCourseWithContent({courseSeq:+thisSeq,contentSeq: content.seq})}
                  onDislink={() => dislinkCourseWithContent(+thisSeq)}
                  courseSeq={content.courseSeq}
                  thisSeq={+thisSeq}
                />
              </InRow>
            </Row>
          ))
        }
        <CourseTablePagination
          page={page}
          count={pageConfig?.totalElements ?? 0}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Table>
    </Box>
  </Modal>
  )
}

const Table = styled(Box)`
  width:100%;
  border: 1px solid #ccc;
  border-radius:8px;
  overflow:hidden;
`
const Row = styled(Box)`
  display:flex;
  width:100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 40px; 
`

const InRow = styled(Box)<{flex?:number}>`
  flex:${props => props.flex || 1};
  text-align: center;
  display:flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ccc;
  height:100%;
  font-size: 14px;
  
`

const Title = styled(Typography)`
  margin-bottom: 1rem;
  display:flex;
  justify-content: space-between;
`;