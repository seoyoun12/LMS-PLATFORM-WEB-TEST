import styled from "@emotion/styled";
import useDominDetailCourse from "@hooks/useDominDetailCourse";
import SelectBox from "@layouts/AdminCenter/CourseTrafficManagement/common/SelectBox";
import Field from "./common/Field";
import { useNewInput } from "@hooks/useNewInput";
import { makeCountArrayBySubType } from "@utils/makeCountArrayBySubtype";
import CourseAudientsCountInputList from "./common/CourseAudientsCountInputList";
import TableHeader from "./common/TableHeader";
import TableBody from "./common/TableBody";
import ProgressTableBody from "./common/ProgressTableBody";
import ProgressTitle from "./common/ProgressTitle";
import { ConvertEnum } from "@utils/convertEnumToHangle";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";


export interface CourseAudientCount {
  [key: string]: string;
}

export function CourseInfomationTraffic() {
  
  const [editTarget, setEditTarget] = useState(false);
  const navigation = useRouter();
  const { detailCourseInfo, updateAplicantCourseInfo } = useDominDetailCourse({courseUserSeq: navigation?.query?.enrollSeq as string})
  const { value: courseSubType,setValue:setCourseSubType, onChange: onChangeCourseSubType } = useNewInput({initialValue: detailCourseInfo?.userProvincialCourseInfoDetailCourseInfoDto?.eduTargetSub,type:'string'});
  const [courseAudientCount, setCourseAudientCount] = useState<CourseAudientCount>({});
  const [enrollSeq, setEnrollSeq] = useState<string>('');

  const onClickEdit = async() => {
    setEditTarget(prev => !prev);
    if(editTarget) {
      if(window.confirm('수정하시겠습니까?')){
        return await updateAplicantCourseInfo({
          eduTargetSub: courseSubType,
          ...courseAudientCount
        })
      }
    }
  }

  const onChangeCourseAudientCount = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourseAudientCount(prev => ({...prev, [name]: value}))
  }
  
  
  useEffect(() => {
   if(!detailCourseInfo) return;
    
    const { userProvincialCourseInfoDetailCourseInfoDto } = detailCourseInfo;
    
    for (const key in userProvincialCourseInfoDetailCourseInfoDto) {
      userProvincialCourseInfoDetailCourseInfoDto[key]
      ? setCourseAudientCount(prev => ({...prev, [key]: userProvincialCourseInfoDetailCourseInfoDto[key]}))
      : setCourseAudientCount(prev => ({...prev, [key]: ''}))
      
    }
    
    setCourseSubType(userProvincialCourseInfoDetailCourseInfoDto.eduTargetSub);
      // eslint-disable-next-line
  },[detailCourseInfo])

  useEffect(() => {
    if(!navigation.query) return;
    setEnrollSeq(navigation.query.enrollSeq as string);
  },[navigation.query])

  if(!detailCourseInfo) return <div>유저 상세 정보를 가져오고 있습니다...</div>
  
  const { learningStatusList, progressStatusList, userProvincialCourseInfoDetailCourseInfoDto: courseApplicant } = detailCourseInfo;
  return (
    <Wrapper>
      <Table>
        <TableTitle>수강정보</TableTitle>
        <Field
          isDouble
          title1="과정명"
          value1={courseApplicant.courseName}
          title2="회원아이디"
          value2={courseApplicant.username}
        />
        <Field
          isDouble
          title1="기관명"
          value1={courseApplicant.organization}
          title2="지역"
          value2={courseApplicant.region}
          />
        <Field
          isDouble
          title1="회원명"
          value1={courseApplicant.name}
          title2="등록일"
          value2={courseApplicant.regDate}
          />
        <Field
          isDouble
          title1="수강 시작일"
          value1={courseApplicant.studyDate.split(' ')[0]}
          title2="수강 종료일"
          value2={courseApplicant.studyDate.split(' ')[2]}
          />
        <Field
          isDouble
          title1="상태"
          value1={courseApplicant.learningStatus}
          title2="수료여부"
          value2={courseApplicant.completeYn === 'Y' ? '수료' : '미수료'}
          />
      </Table>
    
      <Table>
        <TableTitle>신청대상자 정보</TableTitle>
        <Field
          title1="교육대상자"
          value1={ConvertEnum(courseApplicant.eduTargetMain)}
          />
        <Field title1="교육대상자 세부">
          <SelectBox
            id="educationDetailType"
            label={`${courseSubType ? ConvertEnum(courseSubType) : '교육 대상자 세부타입'}`}
            value={courseSubType}
            onChange={onChangeCourseSubType}
            options={makeCountArrayBySubType(courseApplicant.eduTargetMain)}
            sx={{ width:'240px', marginBottom:'0px', height: '100%', fontSize: '14px' }}
            size="small"
            disabled={!editTarget}
          />
        </Field>
        <CourseAudientsCountInputList
          courseSubType={courseSubType}
          editTarget={editTarget}
          courseAudientCount={courseAudientCount}
          onChangeCourseAudientCount={onChangeCourseAudientCount}
          />
      </Table>
      <Button
        variant={editTarget ? "contained" : "outlined"}
        onClick={onClickEdit}
        sx={{margin:'0 auto'}}>
        {editTarget ? '수정완료' : '수정하기'}
      </Button>

      <Table>
        <TableTitle>학습현황</TableTitle>
        <TableHeader titleArray={['항목','이수(과락)기준','성적','제출일','제출여부']} />
        <TableBody list={learningStatusList} />
      </Table>

      <Table>
        <ProgressTitle courseUserSeq={enrollSeq} />
        <TableHeader titleArray={['챕터','강의명','강의시간','학습시간','진도율','완료여부','완료처리일','처리']} />
        <ProgressTableBody progressStatusList={progressStatusList} courseUserSeq={enrollSeq} />
      </Table>
    </Wrapper>
  );
}

export const DecideButtonGroup = styled(Box)`
  position: absolute;
  right: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`

export const DecideButton = styled(Button)<{large?:string}>`
  border-radius: 4px;
  background-color: rgba(191,49,51,0.94);
  color: #fff;
  font-weight: bold;
  font-size: ${({large}) => large === 'large' ? '1rem' : '.75rem'};
  box-shadow: 0 0 2px #000;
  border: 1px solid rgba(191,49,51,0.94);
  &:hover {
    background-color: #fdfdf5;
    transition: all .3s;
    color: rgba(191,49,51,0.94); 
  }
`


const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 3rem;
  margin-bottom: 2rem;
`;

const Table = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  box-shadow: 0 0 2px #888;
  overflow:hidden;
  border-radius: 8px;
`


export const TableTitle = styled(Box)`
  width: 100%;
  font-size: 1.15rem;
  font-weight: bold;
  align-self: flex-start;
  padding: 0 0.5rem;
  color: #222;
  background-color: #fdfdf5;
  height: 48px;
  vertical-align: middle;
  line-height: 48px;
  border-bottom: 1px solid #dfdfdf;
  
`;

export const Row = styled(Box)`
  display: flex;
  flex-direction: row;  
  height: 48px;
  
`;

export const InRow = styled(Row)`
  width: 100%;
  height: 48px;
  
`;



export const InRowTitle = styled(Row)<{bgcolor?:string,fontweight?:number;}>`
  flex: 0.2;
  border-right: 1px solid #fafafa;
  justify-content: center;
  align-items: center;
  font-weight: ${({fontweight}) => fontweight || 'bold'};
  background-color: ${({bgcolor}) => bgcolor || '#fdfdf5'};
  
`;

export const InRowContent = styled(Row)<{fontweight?:number,bgcolor?:string;}>`
  flex: 0.8;
  border-right: 1px solid #fafafa;
  padding: 8px;
  font-weight: ${({fontweight}) => fontweight || 400};
  background-color: ${({bgcolor}) => bgcolor || '#fff'};
  height: 48px;
  
`;

export const OutRow = styled(Row)`
  width: 100%;
  border-top: 1px solid #dfdfdf;
  
  vertical-align: middle;
  height: 48px;
  
`;

