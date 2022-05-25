import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styled from '@emotion/styled';


export function Spinner() {
	return (
		<Container>
			<SpinCircle />
		</Container>
	);
}

const Container = styled(Box)`
  display: flex;
  min-height: 50vh;
  align-items : center;
  justify-content: center;
`;

const SpinCircle = styled(CircularProgress)`
	color: rgb(33, 56, 109);
`;
