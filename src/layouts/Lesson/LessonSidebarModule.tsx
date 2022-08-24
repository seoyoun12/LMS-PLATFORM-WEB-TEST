import React from "react";
import styled from "@emotion/styled";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type { CourseModuleFindResponseDto } from "@common/api/Api";
import Image from "next/image";
import Link from "next/link";

interface Props {
	module: CourseModuleFindResponseDto;
	courseUserSeq: number;
}

export default function LessonSidebarModule(props: Props) {

	switch (props.module.moduleType) {

		case "COURSE_MODULE_PROGRESS_RATE": return (
			<ModuleContainer>
				<ModuleContainerLeft>
					<ModuleTitle>{props.module.moduleName}</ModuleTitle>
				</ModuleContainerLeft>
				<ModuleContainerRight>
					<CheckCircleIcon sx={{ color: props.module.submitYn === "Y" ? "#256aef" : "text.secondary" }} />
				</ModuleContainerRight>
			</ModuleContainer>
		);
		case "COURSE_MODULE_SURVEY": return (
			<ModuleContainer>
				
				<ModuleContainerLeft>
					<Image src="/assets/images/iconModuleSurvey.png" width={15} height={15} alt="설문아이콘"/>
					<ModuleTitle style={{ marginLeft: "0.5rem" }}>
						<Link href={`/course/${props.courseUserSeq}/survey/${props.module.surveySeq}`}>
							{props.module.moduleName}
						</Link>
					</ModuleTitle>
				</ModuleContainerLeft>
				<ModuleContainerRight>
					<CheckCircleIcon sx={{ color: props.module.submitYn === "Y" ? "#256aef" : "text.secondary" }} />
				</ModuleContainerRight>
			</ModuleContainer>
		);
		case "COURSE_MODULE_TEST": return (
			<ModuleContainer>
				<ModuleContainerLeft>
					<Image src="/assets/images/iconModuleTest.png" width={13} height={15} alt="시험아이콘"/>
					<ModuleTitle style={{ marginLeft: "0.5rem" }}>{props.module.moduleName}</ModuleTitle>
				</ModuleContainerLeft>
				<ModuleContainerRight>
					<CheckCircleIcon sx={{ color: props.module.submitYn === "Y" ? "#256aef" : "text.secondary" }} />
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
	& a { color: inherit }
`;
