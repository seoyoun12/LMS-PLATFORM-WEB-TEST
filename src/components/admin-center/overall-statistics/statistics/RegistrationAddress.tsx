import { useEffect, useState } from 'react'
import StatisticsLayout from './StatisticsLayout'
import HorizontalbarChart from '../charts/HorizontalbarChart'
import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import { RegistrationAddress as  IRegistrationAddress } from '@hooks/useStatistics'
import { ChartData } from 'chart.js'
import { ConvertEnum } from '@utils/convertEnumToHangle'
import { toPersent } from '@utils/toPersent'


interface Props {
  data: IRegistrationAddress
}

export default function RegistrationAddress({ data }: Props) {
  const [chartData, setChartData] = useState<ChartData<'bar'>>();
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    if(!data) return;
   const labels = data.statisticsTransEduCarRegisteredRegionResponseDtoList.map((item) => ConvertEnum(item.userRegistrationTypeEnum));
    const chartData:ChartData<'bar'> = {
      labels,
      datasets: [
        {
          label: '이수자',
          backgroundColor: '#5D7CFC',
          data: data.statisticsTransEduCarRegisteredRegionResponseDtoList.map((item) => item.completedCnt),
          maxBarThickness: 30,
          
        },
        {
          label: '미이수자',
          backgroundColor: '#ff6384',
          data: data.statisticsTransEduCarRegisteredRegionResponseDtoList.map((item) => item.inCompletedCnt),
          maxBarThickness: 30,
        },
      ],
    };
    setLabels(labels)
    setChartData(chartData)
  },[data])

  return (
    <StatisticsLayout title="차량등록지별 (이수자수 / 이수율)">
      {
        chartData && data.sumTotalCntSum > 0
        ? <Wrapper>
        <Box sx={{ flex:1, alignSelf:'flex-start' }}>
          <HorizontalbarChart
            chartData={chartData}
            suggestMax={data.statisticsTransEduCarRegisteredRegionResponseDtoList.map((item) => item.totalCnt)}
            height={labels.length * 80}
            />
        </Box>
        <Summary>

          <SummaryCategory>
            <SummaryCategoryTitle>총 수강인원 </SummaryCategoryTitle>
            {
              labels?.map((label, index) => 
                <SummaryItem key={label} width={260}>
                  <SummaryItemTitle >{label}</SummaryItemTitle>
                  <SummaryItemContent >{data.statisticsTransEduCarRegisteredRegionResponseDtoList[index]?.totalCnt}</SummaryItemContent>
                </SummaryItem>
              )
            }
          </SummaryCategory>

          <SummaryCategory>
            <SummaryCategoryTitle>이수자</SummaryCategoryTitle>
            {
              chartData.datasets.map((dataset) => 
                dataset.label === '이수자' &&
                  dataset.data.map((count, index) => 
                    <SummaryItem key={index} width={200}>
                      <SummaryItemContent>{count} ({toPersent(data.statisticsTransEduCarRegisteredRegionResponseDtoList[index]?.totalCnt, count as number, 0)}%)</SummaryItemContent>
                    </SummaryItem>
                  ))
            }
          </SummaryCategory>

          <SummaryCategory>
            <SummaryCategoryTitle>미이수자</SummaryCategoryTitle>
            {
            chartData.datasets.map((dataset) => 
              dataset.label === '미이수자' &&
                dataset.data.map((count, index) =>   
                  <SummaryItem key={index} width={200}>
                    <SummaryItemContent>{count} ({toPersent(data.statisticsTransEduCarRegisteredRegionResponseDtoList[index]?.totalCnt, count as number, 0)}%)</SummaryItemContent>
                  </SummaryItem>
                ))
            }
          </SummaryCategory>

        </Summary>
      </Wrapper>
      : <Typography sx={{ fontSize: 20, fontWeight:'bold' }}>해당 조건을 만족하는 데이터가 존재하지 않습니다.</Typography>
      }
    </StatisticsLayout>
  )
}


const Wrapper = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Summary = styled(Box)`
  flex:1;
  display: flex;
  gap: 1rem; 
`

const SummaryCategory = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;  
`

const SummaryCategoryTitle = styled(Box)`
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.15rem;
  text-align:center;
`

const SummaryItem = styled(Box)<{width?: number}>`
  width: ${({width}) => width + 'px'};
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px 1px rgba(0,0,0,0.45);
  border-radius: 8px;
`


const SummaryItemContent = styled(Box)<{persentage?: number}>`
  width: 100%;
  text-align: center;
  color: ${({persentage}) => persentage ? persentage > 9 ? '#ff0000' : '#000' : '#000'};
`;

const SummaryItemTitle = styled(SummaryItemContent)`
  color: #fff;
  background-color: rgb(191,49,51);
  height:100%;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;