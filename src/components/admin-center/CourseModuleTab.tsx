import styled from "@emotion/styled"
import useDominModule from "@hooks/useDominModule";
import CourseTablePagination from "@layouts/AdminCenter/CourseTrafficManagement/feature/CourseTablePagination";
import { Link } from "@material-ui/icons";
import { Box, Button } from "@mui/material"
import { useEffect, useState } from "react";
import CourseModuleListModal from "./CourseModuleListModal";
import useToggle from "@hooks/useToggle";
import { useRouter } from "next/router";
import { ConvertEnum } from "@utils/convertEnumToHangle";
import useDominCourseModule from "@hooks/useDominCourseModule";

export default function CourseModuleTab() {
  const navigation = useRouter();
  const { data: linkedModule, getModuleLinkedCourse } = useDominModule({courseSeq: navigation.query.boardSeq ? +navigation.query.boardSeq : null});
  const { deleteModuleConnection } = useDominCourseModule();
  const { toggle, onToggle } = useToggle();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  


  const onClickDisconnectModule = async (courseModuleSequence: number) => {
    try {
      await deleteModuleConnection(courseModuleSequence);
      await getModuleLinkedCourse()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const boardSeq = navigation.query.boardSeq;
    if(!boardSeq) return;
    
    
  //eslint-disable-next-line
  },[navigation])

  return (
    <>
      <CourseModuleListModal
        toggle={toggle}
        onToggle={onToggle}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        courseSeq={+navigation?.query.boardSeq}
      />
    <Wrapper>
      <Table>
        <Row>
          <InRow flex={0.1}>ID</InRow>
          <InRow flex={0.4}>모듈명</InRow>
          <InRow flex={0.3}>모듈타입</InRow>
          <InRow flex={0.1}>상태</InRow>
          <InRow flex={0.1}>모듈해제</InRow>
        </Row>
        {
          linkedModule?.data?.map((module) => (
            <Row key={module.courseModuleSeq} rounded="8px">
              <InRow flex={0.1}>{module.courseModuleSeq}</InRow>
              <InRow flex={0.4}>{module.moduleName}</InRow>
              <InRow flex={0.3}>{ConvertEnum(module.moduleType)}</InRow>
              <InRow flex={0.1}>{module.status > 0 ? '정상' : '중지'}</InRow>
              <InRow flex={0.1}><DisConnectButton onClick={() => onClickDisconnectModule(module.courseModuleSeq)} variant="contained">해제하기</DisConnectButton></InRow>
            </Row>
          ))
        }
      </Table>
      <Box sx={{position:'relative'}}>
        <StyledLink
          variant='contained'
          startIcon={<Link/>}
          onClick={onToggle}
          >
          모듈 연결
        </StyledLink>
      </Box>
        <CourseTablePagination
          page={page -1}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          count={linkedModule?.data?.length ?? 0}
        />
   </Wrapper>
   </>
   );
}

const DisConnectButton = styled(Button)``; 

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
`
const InRow = styled(Box)<{flex:number}>`
  flex: ${props => props.flex || 1};
  display: flex;
  align-items: center;
  justify-content: center;
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
