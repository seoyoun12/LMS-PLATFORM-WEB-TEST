import React from "react";
import styled from "@emotion/styled";
import type { SurveyQuestionResponseDto } from "@common/api/Api";
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";

export interface Props {
	index: number;
	question: SurveyQuestionResponseDto;
	loading?: boolean;
}

export default function LessonContentSurveyQuestion(props: Props) {

	const [value, setValue] = React.useState<string>(props.question.answered || "");

	switch (props.question.questionType) {

		case "TYPE_MULTIPLE_CHOICE": return (
			<QuestionContainer>
				<QuestionTitle>{props.index + 1}. {props.question.content}</QuestionTitle>
				<QuestionItemContainer>
					<QuestionFormControl disabled={props.loading}>
						<RadioGroup name={`question_${props.index}`}>
							{Array
              .from(
              { length: 10 },
              (x, i) => [props.question.surveyMultipleChoice[`item${i + 1}`], (i + 1).toString()])
              .filter((v) => !!v[0])
              .map((v: [string, string], i) => (
								<QuestionFormControlLabel
                  key={i}
                  control={<Radio size="small"/>}
                  label={v[0]}
                  value={v[1]}
                  checked={
                    (value.startsWith("item")
                    ? value.slice(4)
                    : value) === v[1]
                  }
                  onChange={() => setValue(v[1])}/>
							))}
						</RadioGroup>
					</QuestionFormControl>
				</QuestionItemContainer>
			</QuestionContainer>
		);
    
		case "TYPE_SUBJECTIVE": return (
			<QuestionContainer>
				<QuestionTitle>{props.index + 1}. {props.question.content}</QuestionTitle>
				<QuestionItemContainer>
					<QuestionFormControl disabled={props.loading}>
						<TextField
							value={value}
							onChange={(e) => setValue(e.target.value || "")}
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
