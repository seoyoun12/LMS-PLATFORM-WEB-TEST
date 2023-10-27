import StatisticsLayout from '@components/admin-center/overall-statistics/StatisticsLayout'
import PieChart, { data } from '@components/admin-center/overall-statistics/charts/PieChart'
import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'


export default function index() {
  return (
    <StatisticsLayout>
      <Wrapper>
        <LinkWrapper sx={{display:'flex',alignSelf:'flex-start'}}>
        <Link
          href="/admin-center/statistics/overall?type=total"
          as="/admin-center/statistics/overall?type=total"
        >
          링크0
        </Link>
        <Link
          href="/admin-center/statistics/overall?type=total"
          as="/admin-center/statistics/overall?type=total"
        >
          링크1
        </Link>
        <Link
          href="/admin-center/statistics/overall?type=total"
          as="/admin-center/statistics/overall?type=total"
        >
          링크2
        </Link>
        <Link
          href="/admin-center/statistics/overall?type=total"
          as="/admin-center/statistics/overall?type=total"
        >
          링크3
        </Link>
        <Link
          href="/admin-center/statistics/overall?type=total"
          as="/admin-center/statistics/overall?type=total"
        >
          링크4
        </Link>
        <Link
          href="/admin-center/statistics/overall?type=total"
          as="/admin-center/statistics/overall?type=total"
        >
          링크5
        </Link>
        <Link
          href="/admin-center/statistics/overall?type=total"
          as="/admin-center/statistics/overall?type=total"
        >
          링크6
        </Link>
        </LinkWrapper>
        <Title >전체 이수자 통계현황</Title>
        <Main>
          <ChartContainer>
            <PieChart />
          </ChartContainer>
          <SummaryWrapper>
            <SummaryRow> <SummaryTitle>전체 수강 인원 </SummaryTitle> {data.datasets[0].data[0] + data.datasets[0].data[1]}</SummaryRow>
            <SummaryRow><SummaryTitle> 이수자 </SummaryTitle>{data.datasets[0].data[0]}</SummaryRow>
            <SummaryRow><SummaryTitle>미이수자 </SummaryTitle>{data.datasets[0].data[1]}</SummaryRow>
          </SummaryWrapper>
        </Main>

      </Wrapper>
    </StatisticsLayout>
  )
}

const SummaryRow = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items:center;
  
  border-bottom:1px solid #fff;
  border-radius: 8px;
  box-shadow: 0 3px 8px #888;
  box-sizing:border-box;
  cursor: pointer;

  
`

const SummaryTitle = styled(Typography)`
  font-size: 1.5rem;
  font-weight: bold;
  align-self: flex-start;
  padding: 0 0.5rem;
  color: #161D2B;
  height: 100%;
  color: #fff;
  background-color: rgb(191,49,51);
  padding: 4px 8px;
  border-radius: 4px;
  gap : 1rem;
`;

const SummaryWrapper = styled(Box)`
  width: 100%;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2rem;
  font-size: 24px;
  gap: 1rem;
`

const Title = styled(Box)`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  align-self: flex-start;
  padding: 0 0.5rem;
  color: #161D2B;
  margin-top: 2rem;
`;

const LinkWrapper = styled(Box)`
  display:flex;
  justify-content:space-between;
  align-items:center;
  width: 100%;
  height: 100%;
  padding: 16px;
  border-bottom:1px solid #fff;
  box-sizing:border-box;
  cursor: pointer;
`

const Main = styled(Box)`
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ChartContainer = styled(Box)`
  width: 50%;
  max-width: 640px;
  height: 50%;
  max-height: 640px;
  display: flex;
  justify-content: center;
  align-items: center;
  border : 1px solid red;
  padding: 2.5rem;
`

const Wrapper = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`