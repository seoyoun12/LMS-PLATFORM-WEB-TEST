import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import PieChart from '../charts/PieChart'
import StatisticsLayout from './StatisticsLayout'


export default function Whole() {
  return (
    <StatisticsLayout title="통합 (이수자 수/ 이수율)">
      <StatisticBox>
        <Box sx={{flex:1,borderRight:'2px solid #ccc',marginRight: '2rem',display:'flex',justifyContent:'center'}}>
          <PieChart width={360} height={360} />
        </Box>
        <Summary>  
          <SummaryItem>
            <SummaryTitle>전체 수강 인원</SummaryTitle>
            <SummaryText>10000 (100%)</SummaryText>
          </SummaryItem>
          <SummaryItem>
            <SummaryTitle>이수자</SummaryTitle>
            <SummaryText>7000 (70%)</SummaryText>
          </SummaryItem>
          <SummaryItem>
            <SummaryTitle>미이수자</SummaryTitle>
            <SummaryText>3000 (30%)</SummaryText>
          </SummaryItem>
        </Summary>
      </StatisticBox>
    </StatisticsLayout>
    
  )
}

const StatisticBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const Summary = styled(Box)`
  flex:1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  
`
const SummaryItem = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-shadow: 0 0 4px 3px #c7c7c7;
  border-radius: 8px;
  overflow: hidden;
  letter-spacing: 2px;
`

const SummaryTitle = styled(Typography)`
  flex: .3;
  background-color: rgb(181,49,51);
  padding: 8px;
  font-size: 18px;
  color: #fff;
  border-radius: 8px;
  text-align: center;
`

const SummaryText = styled(Typography)`
  flex: .7;
  width: 100%;
  font-size: 18px;
  text-align: center;
  
`
