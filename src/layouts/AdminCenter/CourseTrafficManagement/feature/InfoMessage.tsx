import styled from '@emotion/styled';
import { Typography } from '@mui/material';


export default function InfoMessage() {
  return (
    <MessageContainer>
      사용 가능한 파일확장자: <EmphasisText> jpg, jpeg, png, gif, bmp </EmphasisText>{'\n'}
      권장 이미지 비율 : <EmphasisText>16:9</EmphasisText>  
    </MessageContainer>
  )
}


const MessageContainer = styled(Typography)`
  white-space: pre-line;
  margin-bottom: 1rem;
`
const EmphasisText = styled.span`
  color: #f41;
  font-weight: bold;
`;