import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { toPersent } from '@utils/toPersent';

interface Props {
  d: number,
  label: string,
  motherCount: number,
  childCount: number,
}

export default function FluctuationBusinessCard({d, label, motherCount, childCount}: Props) {
  return (
    <CardContainer>
      <DescriptionCard>
        <Box sx={{display: 'flex', flexDirection: 'column',alignItems:'center'}}>
          <Typography>{label}</Typography>
          <Typography>{d}
            <PersentageSpan>
              ({toPersent(motherCount,childCount,0)}%)
            </PersentageSpan>
          </Typography>
        </Box>
      </DescriptionCard>
    </CardContainer>
  )
}


const PersentageSpan = styled.span`
  font-size: 0.8rem;
`

const Item = styled(Box)`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  letter-spacing: 2px;
  padding: .5rem;
`;

const DescriptionCard = styled(Item)`
  flex:1;
  display: flex;
  flex-direction: column;
  color: #222;
  background-color: #fff;
  box-shadow: 0 2px 4px 1px rgba(0,0,0,.4);
  gap: 1rem;
  
`

const CardContainer = styled(Box)`
  flex:1;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  min-width: 140px;
  gap: 1rem;
`