import React from "react";
import styled from "@emotion/styled";
import { Container } from "@mui/material";

export interface Props {
	courseUserSeq: number;
	surveySeq: number;
}

export default function Survey(props: Props) {

	return (
		<SurveyContainer>
			<pre>{JSON.stringify(props, null, 2)}</pre>
		</SurveyContainer>
	);

}

const SurveyContainer = styled(Container)`
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 4rem;
  padding: 0 3rem;
  display: flex;
  flex: 1 1 auto;
  position: relative;
  max-width: 100vmin;
  align-items: stretch;
`;