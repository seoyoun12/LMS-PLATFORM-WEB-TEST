import * as React from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styled from '@emotion/styled';


export function Spinner() {
	return (
		<Container>
			<CircularProgress sx={{
				color: "rgb(33, 56, 109)"
			}} />
		</Container>
	);
}

const Container = styled(Box)`
  display: flex;
  // background: rgba(0, 0, 0, 0.3);
  // width: 100%;
  height: 86.5vh;
  align-items : center;
  justify-content: center;
`;