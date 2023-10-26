import styled from "@emotion/styled";
import PreviewBox from "./PreviewBox";
import SelectBox from "./common/SelectBox";
import RadioBox from "./common/RadioBox";
import FileInput from "./common/FileInput";
import ButtonGroup from "./feature/ButtonGroup";
import InfoMessage from "./feature/InfoMessage";
import useSelect from "@hooks/useSelect";
import { useNewInput } from "@hooks/useNewInput";
import { Box, TextField } from "@mui/material";
import useDominCourse, { CourseType, CreateCourseRequestBody, MainType, SubType } from "@hooks/useDominCourse";
import { ConvertDetailEnum } from "@utils/convertEnumToHangle";
import { useSnackbar } from "@hooks/useSnackbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BbsType, uploadFile } from "@common/api/adm/file";

export default function CourseUploadTab() {  

  const { value: educationType,setValue:setEducationType, onChange: onChangeEducationType } = useSelect<MainType>({defaultValue: MainType.TYPE_CHILDREN});
  const { value: educationDetailType,setValue:setEducationDetailType, onChange: onChangeEducationDetailType } = useSelect<SubType>({defaultValue: SubType.TYPE_KINDERGARTEN});
  
  const { value: status,setValue:setStatus, onChange: onChangeStatus } = useSelect({defaultValue: '정상' });
  const { value: show,setValue:setShow, onChange: onChangeShow } = useSelect({defaultValue:'보이기'});
  const { value: selectedFile, onChange: onChangeFile, onReset, preview,setPreview } = useNewInput<File>({initialValue: null,type:'file'});
  const { value: courseName, setValue: setCourseName, onChange: onChangeCourseName } = useNewInput({initialValue: '',type:'string'});
  const { value: lectureTime, setValue: setLectureTime, onChange: onChangeLectureTime } = useNewInput({initialValue: 0,type:'number'});
  const { course, postDominCourse, getDominCourse,putDominCourse,deleteDominCourse } = useDominCourse();
  const [boardSeq, setBoardSeq] = useState<number | null>(null);
  const navigation = useRouter();
  
  const snackbar = useSnackbar();
  
  const onUpdateThumbnail = async (seq: number) => {
      
      await uploadFile({
        fileTypeId: seq,
        fileType: BbsType.TYPE_COURSE,
        files: [selectedFile],
      });
    }

  const onClickUpload = async () => {
    const body:CreateCourseRequestBody = {
      courseType: CourseType.TYPE_PROVINCIAL,
      courseName: courseName as string,
      lessonTime: lectureTime as number,
      provincialEduTargetMain: educationType,
      provincialEduTargetSub: educationDetailType,
      status: status === '정상' ? 1 : 0,
      displayYn: show === '보이기' ? 'Y' : 'N',
      year: new Date().getFullYear(),
    }
    try {
      if(boardSeq) {
        await putDominCourse(body,boardSeq);
        selectedFile && await onUpdateThumbnail(boardSeq);
      } else {
        const course = await postDominCourse(body);
        console.log('course',course);
        await onUpdateThumbnail(course.seq);
      }
      navigation.push('/admin-center/course-traffic');
    } catch (error) {
      snackbar({
        message: '과정 등록에 실패했습니다.',
        variant:'error'
      })
    }
  }
  const onClickDelete = async (seq:number) => {
    try {
      if(window.confirm('해당 과정을 삭제하시겠습니까?')){
        await deleteDominCourse(seq);
        snackbar({
          message: '과정이 삭제되었습니다.',
          variant:'success'
        })
        navigation.push('/admin-center/course-traffic');
      }
    } catch (error) {
      snackbar({
        message: '과정 삭제에 실패했습니다.',
        variant:'error'
      })  
    } 
  }
  
  // 
  useEffect(() => {
    const boardSequence = navigation.query?.boardSeq;
    if(boardSequence){
      getDominCourse(+boardSequence);
      setBoardSeq(+boardSequence);
    }
    // eslint-disable-next-line
  },[navigation])


  // course가 바뀔때마다 기본값 세팅
  useEffect(() => {
    if(!course) return;
    setCourseName(course.courseName);
    setLectureTime(course.lessonTime);
    setEducationType(course.provincialEduTargetMain);
    setEducationDetailType(course.provincialEduTargetSub);
    setStatus(course.status === 1 ? '정상' : '중지');
    setShow(course.displayYn === 'Y' ? '보이기' : '숨김');
    setPreview(course.s3Files[0]?.path)
    // eslint-disable-next-line
  },[course])


  return (
    <Wrapper>
      <FiledSet>
        <Title>과정 등록</Title>
        <SelectBox
          id="educationType"
          label="교육 대상자 타입"
          value={educationType}
          onChange={onChangeEducationType}
          options={Object.values(MainType)}
          />
        <SelectBox
          id="educationDetailType"
          label="교육 대상자 세부타입"
          value={educationDetailType}
          onChange={onChangeEducationDetailType}
          options={ConvertDetailEnum(educationType)}
          />
        <TextField
          required
          value={courseName}
          onChange={onChangeCourseName}
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

      { preview && <PreviewBox preview={preview} selectedFile={selectedFile} onReset={onReset} /> }
      
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
        label="노출 여부"
        radios={["보이기", "숨김"]}
        defaultValue="보이기"
        value={show}
        onChange={onChangeShow}
        />
      
      <ButtonGroup
        onClick={onClickUpload}
        onClickDelete={boardSeq ? () => onClickDelete(boardSeq) : null} />

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