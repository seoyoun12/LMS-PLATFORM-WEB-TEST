import React from "react";
import styled from "@emotion/styled";
import type { SurveyQuestionResponseDto } from "@common/api/Api";
import { FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, TextField } from "@mui/material";

export interface Props {
	index: number;
	question: SurveyQuestionResponseDto;
	error?: boolean;
	loading?: boolean;
}

export default function LessonContentSurveyQuestion(props: Props) {

	switch (props.question.questionType) {

		case "TYPE_MULTIPLE_CHOICE": return (
			<QuestionContainer>
				<QuestionTitle>{props.index + 1}. {props.question.content}</QuestionTitle>
				<QuestionItemContainer>
					<QuestionFormControl
						required
						error={props.error}
						disabled={props.loading}
					>
						<RadioGroup name={`question_${props.index}`}>
							{Array.from({ length: 10 }, (x, i) => props.question.surveyMultipleChoice[`item${i + 1}`]).filter((v) => !!v).map((v: string, i) => (
								<QuestionFormControlLabel key={i} control={<Radio size="small"/>} label={v} value={i + 1}/>
							))}
						</RadioGroup>
						{props.error && <FormHelperText>하나를 선택해 주세요.</FormHelperText>}
					</QuestionFormControl>
				</QuestionItemContainer>
			</QuestionContainer>
		);
		case "TYPE_MULTIPLE_CHOICE": return (
			<QuestionContainer>
				<QuestionTitle>{props.index + 1}. {props.question.content}</QuestionTitle>
				<QuestionItemContainer>
					<QuestionFormControl
						required
						error={props.error}
						disabled={props.loading}
					>
						<TextField
							multiline
							rows={4}
							name={`question_${props.index}`}
						/>
					</QuestionFormControl>
				</QuestionItemContainer>
			</QuestionContainer>
		);

	}

}

const QuestionContainer = styled.div`
	margin-bottom: 4rem;
	&:last-of-type { margin-bottom: unset }
`

const QuestionTitle = styled.div`
	font-size: 1.25em;
	margin-bottom: 1rem;
`;

const QuestionItemContainer = styled.div``;

const QuestionFormControl = styled(FormControl)`
	width: 100%;
`;

const QuestionFormControlLabel = styled(FormControlLabel)`
	& > span {
		font-size: 1em;
	}
`;
