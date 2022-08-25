import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { CourseModuleFindResponseDto, SurveyResponseDto } from "@common/api/Api";

export interface Props {
  courseUserSeq: number;
  courseModule: CourseModuleFindResponseDto;
  survey: SurveyResponseDto;
}

export default function LessonContentSurvey(props: Props) {

  return (
    <SurveyContainer>
      <SurveyHeader>
        <SurveyHeaderTitle>{props.survey.title}</SurveyHeaderTitle>
        <SurveyHeaderCompletedText>{props.courseModule.submitYn === "Y" ? "완료" : "미완료"}</SurveyHeaderCompletedText>
      </SurveyHeader>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </SurveyContainer>
  );

}

const SurveyContainer = styled.div`
  margin: 0 auto;
  display: flex;
  position: relative;
  width: 100%;
  max-width: 1000px;
  flex-direction: column;
`;

const SurveyHeader = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #AEAEAE;
`;

const SurveyHeaderTitle = styled.span`
  flex-grow: 1;
  font-size: 1.5rem;
  font-weight: 700;
`

const SurveyHeaderCompletedText = styled.span`
  color: #404040;
`

