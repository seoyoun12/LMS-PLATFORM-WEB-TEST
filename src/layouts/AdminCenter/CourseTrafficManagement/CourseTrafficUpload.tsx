import styled from "@emotion/styled";
import PreviewBox from "./PreviewBox";
import SelectBox from "./common/SelectBox";
import RadioBox from "./common/RadioBox";
import FileInput from "./common/FileInput";
import UploadButton from "./feature/UploadButton";
import InfoMessage from "./feature/InfoMessage";
import useSelect from "@hooks/useSelect";
import { useNewInput } from "@hooks/useNewInput";
import { Box, TextField } from "@mui/material";

export function CourseTrafficUpload() {  
  const { value: educationType, onChange: onChangeEducationType } = useSelect('');
  const { value: educationDetailType, onChange: onChangeEducationDetailType } = useSelect('');
  const { value: status, onChange: onChangeStatus } = useSelect('정상');
  const { value: show, onChange: onChangeShow } = useSelect('보이기');
  const { value: selectedFile, preview, onChange: onChangeFile, onRemoveFile } = useNewInput({initialValue: null,type:'file'});
  const { value: lectureName,onChange: onChangeLectureName } = useNewInput({initialValue: '',type:'string'});
  const { value: lectureTime, onChange: onChangeLectureTime } = useNewInput({initialValue: 0,type:'number'});
  
  
  return (
    <Wrapper>
      <FiledSet>
        <Title>과정 등록</Title>
        <SelectBox
          id="educationType"
          label="교육 대상자 타입"
          value={educationType}
          onChange={onChangeEducationType}
          options={Array.from({length: 2}, (_, i) => i)}
          />
        <SelectBox
          id="educationDetailType"
          label="교육 대상자 세부타입"
          value={educationDetailType}
          onChange={onChangeEducationDetailType}
          options={Array.from({length: 2}, (_, i) => i)}
          />
        <TextField
          required
          value={lectureName}
          onChange={onChangeLectureName}
          variant="outlined"
          placeholder="과정명"
          label="과정명"
          fullWidth
          />
        <FileInput onChangeFile={onChangeFile}/>
        <InfoMessage />
        <TextField
          required
          value={lectureTime}
          onChange={onChangeLectureTime}
          type="number"
          variant="outlined"
          placeholder="교육 시간"
          label="교육 시간"
          fullWidth
          />
      </FiledSet>

      { preview && <PreviewBox preview={preview} selectedFile={selectedFile} onRemoveFile={onRemoveFile} /> }
      
      <RadioBox
        name="status"
        id="status"
        label="상태"
        radios={["정상", "중지"]}
        defaultValue="정상"
        value={status}
        onChange={onChangeStatus}
        />
      <RadioBox
        name="show"
        id="show"
        label="상태"
        radios={["보이기", "숨김"]}
        defaultValue="보이기"
        value={show}
        onChange={onChangeShow}
        />
      <UploadButton onClickUpload={() => {console.log('hello world')}} />

    </Wrapper>
  );
}

const FiledSet = styled.fieldset`
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 100%;
`
const Title = styled.legend`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  align-self: flex-start;
  padding: 0 0.5rem;
  color: #222;
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`