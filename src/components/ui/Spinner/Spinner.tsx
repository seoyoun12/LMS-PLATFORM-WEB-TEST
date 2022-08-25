import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';

interface Props {
  fit?: boolean;
}

export function Spinner({ fit }: Props) {
  return (
    <Container fit={fit}>
      <SpinCircle size={fit ? '1.5rem' : '40px'} />
    </Container>
  );
}

const Container = styled(Box)<{ fit: boolean }>`
  display: flex;
  ${({ fit }) => (fit ? '' : 'min-height: 50vh;')}
  align-items: center;
  justify-content: center;
`;

const SpinCircle = styled(CircularProgress)`
  color: rgb(33, 56, 109);
`;
