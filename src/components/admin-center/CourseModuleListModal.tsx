import styled from '@emotion/styled'
import { Box, Button, FormControl, InputAdornment, Modal, Tab, TextField, Typography } from '@mui/material'
import React, { SyntheticEvent, useState } from 'react'
import { modalStyle } from './CourseContentListModal';
import { Close, Refresh, Search } from '@mui/icons-material';

import useDominModule, { Module, ModuleType, PostModuleRequest } from '@hooks/useDominModule';
import CourseTablePagination from '@layouts/AdminCenter/CourseTrafficManagement/feature/CourseTablePagination';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Keyboard } from '@material-ui/icons';
import SelectBox from '@layouts/AdminCenter/CourseTrafficManagement/common/SelectBox';
import useSelect from '@hooks/useSelect';
import { useNewInput } from '@hooks/useNewInput';
import RadioBox from '@layouts/AdminCenter/CourseTrafficManagement/common/RadioBox';


interface Props {
  toggle: boolean;
  onToggle: () => void;
  contents: Module[];
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  count: number;
  courseSeq: number;
}

export default function CourseModuleListModal({courseSeq, contents,toggle,onToggle, page, setPage, rowsPerPage, setRowsPerPage, count}:Props) {
  const { value:moduleType, onChange: onChangeModuleType } = useSelect<ModuleType>({defaultValue:ModuleType.COURSE_MODULE_PROGRESS_RATE});
  const { value:moduleName,  onChange:onChangeModuleName } = useNewInput({initialValue:'', type:'string'})
  const { value: status, onChange: onChangeStatus, } = useNewInput<string>({initialValue:'정상', type:'string'})
  const { postModule } = useDominModule();

  const [tabIndex, setTabIndex] = useState(1);
  const onChangeTabIndex = (_:SyntheticEvent,index: number) => {
    setTabIndex(index);
  }

  const onClickCreateModule = async () => {
    const body: PostModuleRequest = {
      examSeq: 0, // 시험..?
      limitProgress: 0, // 뭔데
      limitScore: 0, // 뭐..최소점수인가? 
      moduleName: moduleName,
      moduleType: moduleType,
      status: status === '정상' ? 1 : 0,
      submitYn: "Y", // 뭔데 도대체
      surveySeq: 0
    }
    try {
      await postModule(courseSeq,body);
    } catch (error) {
      console.log('모듈 등록 실패 ㅅㅅㅎㅅㅅㅅㅅ 솨리질럿')
    }
  }


  return (
    <Modal
      open={toggle}
      onClose={onToggle}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
    <Box sx={modalStyle}>
      <Title id="modal-modal-title" variant="h6">
        모듈 연결
        <Button onClick={onToggle} endIcon={<Close />} sx={{color:'#222'}} />
      </Title>
      <TabContext value={tabIndex+''}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={onChangeTabIndex} aria-label="lab API tabs example">
            <Tab label="모듈 목록" value="1" />
            <Tab label="모듈 생성" value="2" />
          </TabList>
        </Box>

        <TabPanel value="1">
          <Box>
            <FormControl fullWidth>
              <TextField placeholder='모듈 검색'
              InputProps={{ endAdornment: <InputAdornment position="end"><Search /></InputAdornment>}} />
            </FormControl>
          </Box>
          
          <Title marginTop="32px" marginBottom="16px">
            모듈 목록
            <Button endIcon={<Refresh />} sx={{color:'#222'}}>전체 다시 불러오기</Button>
          </Title>
          
          <Table>
            <Row>
              <InRow flex={0.1}>ID</InRow>
              <InRow flex={0.4}>모듈명</InRow>
              <InRow flex={0.4}>모듈타입</InRow>
              <InRow flex={0.1}>상태</InRow>
            </Row>
            {
              contents?.map((module) => (
                <Row key={module.courseModuleSeq} rounded="8px">
                  <InRow flex={0.1}>{module.courseModuleSeq}</InRow>
                  <InRow flex={0.4}>{module.moduleName}</InRow>
                  <InRow flex={0.4}>{module.moduleType}</InRow>
                  <InRow flex={0.1}>{module.status > 0 ? '정상' : '중지'}</InRow>
                </Row>
              ))
            }
            <CourseTablePagination
              page={page -1}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              count={count}
            />
          </Table>
        </TabPanel>
        
        <TabPanel value="2">
          <CreateModuleWrapper>
            <FormControl fullWidth>
              <TextField
                placeholder='모듈명'
                InputProps={{ endAdornment: <InputAdornment position="end"><Keyboard /></InputAdornment>}}
                value={moduleName}
                onChange={onChangeModuleName}
                />
            </FormControl>
            <SelectBox
              id='moduleType'
              label='모듈타입'
              options={Object.keys(ModuleType)}
              value={moduleType }
              onChange={onChangeModuleType}
              name='moduleType'
            />
            <RadioBox
              id='status'
              label='상태'
              radios={['정상', '중지']}
              value={status}
              onChange={onChangeStatus}
              name='status'
              defaultValue='정상'
            />

            <Button onClick={onClickCreateModule} variant='contained' sx={{width:'100%',boxShadow:'3px 3px 3px #b7b7b7'}}>생성</Button>
          </CreateModuleWrapper>
        </TabPanel>
    </TabContext>
      
    </Box>
  </Modal>
  )
}

const CreateModuleWrapper = styled(Box)`
  display:flex;
  flex-direction: column;
  gap: 2rem;
`


const Table = styled(Box)`
  width:100%;
  border: 1px solid #ccc;
  border-radius:8px;
  overflow:hidden;
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

const Title = styled(Typography)`
  margin-bottom: 1rem;
  display:flex;
  justify-content: space-between;
`;