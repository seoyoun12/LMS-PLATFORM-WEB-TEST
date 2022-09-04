import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';

interface Props {
  fit?: boolean;
}

export function Spinner({ fit }: Props) {
  return (
    <Container style={{ minHeight: fit ? undefined : "50vh" }}>
      <SpinCircle size={fit ? '1.5rem' : '40px'} />
    </Container>
  );
}

const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinCircle = styled(CircularProgress)`
  color: rgb(33, 56, 109);
`;
