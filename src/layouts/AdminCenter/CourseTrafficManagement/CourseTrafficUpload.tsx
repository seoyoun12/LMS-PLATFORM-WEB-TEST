import styled from "@emotion/styled";
import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import { useCallback, useState } from "react";
import PreviewBox from "./PreviewBox";

export function CourseTrafficUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const onChangeFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if(file) {
      const reader = new FileReader();
      reader.onload = e => {
        const preview = e.target.result;
        if(preview) {
          setSelectedFile(file); // metadata
          setPreview(preview); // base64
        }
      }
      reader.readAsDataURL(file);
    }
  },[])

  const onRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
  }

  return (
    <Wrapper>
      <FiledSet>
        <Title>과정 등록</Title>

        <FormControl fullWidth>
          <InputLabel id="educationType">교육 대상자 타입</InputLabel>
          <SelectBox label="교육 대상자 타입" labelId="educationType">
            {Array.from({length: 2}, (_, i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
          </SelectBox>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="educationDetailType">교육 대상자 세부타입</InputLabel>
          <SelectBox label="교육 대상자 세부타입" labelId="educationDetailType" >
            {Array.from({length: 2}, (_, i) => <MenuItem key={`detail${i}`} value={i}>{i}</MenuItem>)}
        </SelectBox>
        </FormControl>

        <Box component="form" noValidate autoComplete="off" sx={{width:'100%'}}>
          <TextField required id="outlined-required" variant="outlined" placeholder="과정명" label="과정명" fullWidth/>
        </Box>

        <InputContainer>
          <Typography>썸네일 이미지</Typography>
            <FileInput type="file" onChange={onChangeFile} 
            accept="image/jpg, image/jpeg, image/png, image/gif, image/bmp"/>
            <ChoiceFileButton>
              <UploadOutlinedIcon />
              <Typography>파일선택</Typography>
            </ChoiceFileButton>
          </InputContainer>

        <InfoMessage>
          사용 가능한 파일확장자: <EmphasisText> jpg, jpeg, png, gif, bmp </EmphasisText>{'\n'}
          권장 이미지 비율 : <EmphasisText>16:9</EmphasisText>  
        </InfoMessage>
        <Box>
        <TextField required type="number" id="playtime" variant="outlined" placeholder="교육 시간" label="교육 시간" fullWidth/>
        </Box>
      </FiledSet>
      { preview && <PreviewBox preview={preview} selectedFile={selectedFile} onRemoveFile={onRemoveFile} /> }

      <RadioWrapper>
        <FormLabel id="demo-radio-buttons-group-label">상태</FormLabel>
        <RadioBox
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="정상"
          name="radio-buttons-group"
        >
          <FormControlLabel value="정상" control={<Radio />} label="정상" />
          <FormControlLabel value="중지" control={<Radio />} label="중지" />
        </RadioBox>
      </RadioWrapper>

      <RadioWrapper>
        <FormLabel id="demo-radio-buttons-group-label">과정 보이기</FormLabel>
        <RadioBox
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="보이기"
          name="radio-buttons-group"
        >
          <FormControlLabel value="보이기" control={<Radio />} label="보이기" />
          <FormControlLabel value="숨김" control={<Radio />} label="숨김" />
          
        </RadioBox>
      </RadioWrapper>
      <Box sx={{width:'100%',margin:'1.25rem 0',position:'relative'}}>
      <Button variant="contained" sx={{position:'absolute',top:0, right:0}}>업로드하기</Button>
      </Box>
    </Wrapper>
  );
}

const RadioWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`

const RadioBox = styled(RadioGroup)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const InputContainer = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 120px;
  height: 100px;
  margin: .5rem 0 0 0;
  gap: .5rem;
`
const FileInput = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
  border: none;
  width: 150px;
  height: auto;
  z-index: 9;
`
const ChoiceFileButton = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  margin-bottom: 1rem;
  width: 120px;
  cursor: pointer;
`
const InfoMessage = styled(Typography)`
  white-space: pre-line;
  margin-bottom: 1rem;
`
const EmphasisText = styled.span`
  color: #f41;
  font-weight: bold;
`;
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
const SelectBox = styled(Select)`
  width: 100%;
  margin-bottom: 1rem;
`;
const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`