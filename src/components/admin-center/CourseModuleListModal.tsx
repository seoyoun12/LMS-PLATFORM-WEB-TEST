import styled from '@emotion/styled'
import { Box, Button, FormControl, InputAdornment, Modal, TextField, Typography } from '@mui/material'
import { modalStyle } from './CourseContentListModal';
import { Close } from '@mui/icons-material';
import  { Module, ModuleType } from '@hooks/useDominModule';
import { Keyboard } from '@material-ui/icons';
import SelectBox from '@layouts/AdminCenter/CourseTrafficManagement/common/SelectBox';
import useSelect from '@hooks/useSelect';
import { useNewInput } from '@hooks/useNewInput';
import RadioBox from '@layouts/AdminCenter/CourseTrafficManagement/common/RadioBox';
import { Dispatch, SetStateAction } from 'react';
import CourseModuleChoiceInputs from './CourseModuleChoiceInputs';
import useDominCourseModule from '@hooks/useDominCourseModule';

interface Props {
  toggle: boolean;
  contents: Module[];
  page: number
  rowsPerPage: number;
  count: number;
  courseSeq: number;
  onToggle: () => void;
  setPage: Dispatch<SetStateAction<number>>
  setRowsPerPage: Dispatch<SetStateAction<number>>;
}

export default function CourseModuleListModal({ courseSeq, toggle,onToggle }:Props) {
  const { value: moduleType, onChange: onChangeModuleType } = useSelect<ModuleType>({defaultValue:ModuleType.COURSE_MODULE_PROGRESS_RATE});
  const { value: submitYn, onChange: onChangeSubmitYn } = useSelect<"Y" | "N">({defaultValue:'Y'})
  const { value: moduleName,  setValue: setModuleName,onChange:onChangeModuleName } = useNewInput<string>({initialValue:'', type:'string'})
  const { value: search, onChange: onChangeSearch } = useNewInput({initialValue:'', type:'string'})
  const { value: status, onChange: onChangeStatus, } = useNewInput<string>({initialValue:'정상', type:'string'})
  const { value: limitProgress, onChange: onChangeLimitProgress } = useNewInput( {initialValue:0, type:'number'} )
  const { value: limitScore, onChange: onChangeLimitScore } = useNewInput( {initialValue:0, type:'number'} )
  const { value: surveySeq, onChange: onChangeSurveySeq } = useNewInput( {initialValue:0, type:'number'} )
  const { postConnectSurveyToCourse } = useDominCourseModule({page:0, rowsPerPage:10})


  const onClickConnectSurveyToCourse = async () => {
    if(!courseSeq) return; 
    try {
      await postConnectSurveyToCourse(courseSeq,{
        examSeq: 0, 
        limitProgress,
        limitScore,
        moduleName: moduleName,
        moduleType: moduleType,
        status: status === '정상' ? 1 : 0,
        submitYn,
        surveySeq
      })
    } catch (error) {
      console.log(error)
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
        <CreateModuleWrapper>
          <SelectBox
              id='moduleType'
              label='모듈타입'
              options={Object.keys(ModuleType)}
              value={moduleType}
              onChange={onChangeModuleType}
              name='moduleType'
            />
          <FormControl fullWidth>
            <TextField
              placeholder='모듈명'
              InputProps={{ endAdornment: <InputAdornment position="end"><Keyboard /></InputAdornment>}}
              value={search}
              onChange={onChangeSearch}
              />
          </FormControl>
          {/* moduleType에 따라 달라지는 인풋모음 */}
          <CourseModuleChoiceInputs
            moduleType={moduleType}
            onChangeProgressRate={onChangeLimitProgress}
            progressRate={limitProgress}
            onChangeLimitScore={onChangeLimitScore}
            limitScore={limitScore}
            submitYn={submitYn}
            onChangeSubmitYn={onChangeSubmitYn}
            surveySeq={surveySeq}
            onChangeSurveySeq={onChangeSurveySeq}
            moduleName={moduleName}
            onChangeModuleName={onChangeModuleName}
            
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
          <Button
            onClick={onClickConnectSurveyToCourse}
            variant='contained'
            sx={{width:'100%',boxShadow:'3px 3px 3px #b7b7b7'}}
            >
            생성
          </Button>
      </CreateModuleWrapper>      
    </Box>
  </Modal>
  )
}

const CreateModuleWrapper = styled(Box)`
  display:flex;
  flex-direction: column;
  gap: 2rem;
`

const Title = styled(Typography)`
  margin-bottom: 1rem;
  display:flex;
  justify-content: space-between;
`;