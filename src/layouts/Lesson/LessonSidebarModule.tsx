import React from "react";
import styled from "@emotion/styled";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Image from "next/image";
import type { CourseModuleFindResponseDto } from "@common/api/Api";
import { LESSON_CONTENT_TYPES } from "./Lesson.types";

interface Props {
  courseUserSeq: number;
  courseModule: CourseModuleFindResponseDto;
  completed?: boolean;
  onSelect: (url: string) => void;
}

export default function LessonSidebarModule(props: Props) {

  switch (props.courseModule.moduleType) {

    case "COURSE_MODULE_PROGRESS_RATE": return (<React.Fragment/>);
    case "COURSE_MODULE_SURVEY": return (
      <ModuleContainer>
        <ModuleContainerLeft>
          <Image src="/assets/images/iconModuleSurvey.png" width={15} height={15} alt="설문아이콘"/>
          <ModuleTitle style={{ marginLeft: "0.5rem" }} onClick={() => props.onSelect(`/course/${props.courseUserSeq}/${LESSON_CONTENT_TYPES[1].toLocaleLowerCase()}/${props.courseModule.surveySeq}`)}>
            {props.courseModule.moduleName}
          </ModuleTitle>
        </ModuleContainerLeft>
        <ModuleContainerRight>
          <CheckCircleIcon sx={{ color: props.completed ? "#256aef" : "text.secondary" }} fontSize="inherit"/>
        </ModuleContainerRight>
      </ModuleContainer>
    );
    case "COURSE_MODULE_TEST": return (
      <ModuleContainer>
        <ModuleContainerLeft>
          <Image src="/assets/images/iconModuleTest.png" width={13} height={15} alt="시험아이콘"/>
          <ModuleTitle style={{ marginLeft: "0.5rem" }}>{props.courseModule.moduleName}</ModuleTitle>
        </ModuleContainerLeft>
        <ModuleContainerRight>
          <CheckCircleIcon sx={{ color: props.completed ? "#256aef" : "text.secondary" }} fontSize="inherit"/>
        </ModuleContainerRight>
      </ModuleContainer>
    );
  }

}

const ModuleContainer = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  &:last-of-type { margin-bottom: unset }
`;

const ModuleContainerLeft = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
`;

const ModuleContainerRight = styled.div`
  display: flex;
  align-items: center;
`;

const ModuleTitle = styled.span`
  cursor: pointer;
`;
