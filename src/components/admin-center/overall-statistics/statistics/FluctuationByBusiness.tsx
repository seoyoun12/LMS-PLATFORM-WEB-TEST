import React, { useCallback, useEffect, useState } from 'react'
import StatisticsLayout from './StatisticsLayout'
import MultipleLineChart from '../charts/MultipleLineChart'
import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import { FluctuationByBusiness as IFluctuationByBusiness } from '@hooks/useStatistics'
import { ChartData } from 'chart.js'
import { ConvertEnum } from '@utils/convertEnumToHangle'
interface Props {
  data: IFluctuationByBusiness[]
}

export default function FluctuationByBusiness({ data }: Props) {
  
  const [chartData, setChartData] = useState(null);
  const [labels, setLabels] = useState(null);
  const [period, setPeriod] = useState<number[]>(null);

  const extractStudentTotalCount = useCallback((target: keyof IFluctuationByBusiness, condition) => 
    data.filter((period) => period[target] === condition)
    .map((period) => period.studentCnt)
  ,[data])



  useEffect(() => {
    if(!data || data.length === 0) return;

    // 업종
    const labelsArr = ['', ...data.reduce((acc, cur) => {
      if(acc.includes(cur.userBusinessSubType)) return acc;
      else return [...acc, ConvertEnum(cur.userBusinessSubType)];
    },[])];
    const periodArr:number[] = data.reduce((acc, cur) => {
      if(acc.includes(cur.step)) return acc;
      else return [...acc, cur.step ];
    },[])

    const labels = periodArr.map((period) => ConvertEnum(period + '기'));
    console.log(labelsArr);
    const chartData:ChartData = {
      labels,
      datasets: [
        {
          type: 'line',
          label: '버스',
          datalabels: {
            display:true,
          },
          borderColor: '#EB5757',
          backgroundColor: '#EB5757',
          pointRadius: 8,
          data: extractStudentTotalCount('userBusinessSubType','BUS'),
          order: 0
        },
        {
          type: 'line',
          label: '전세버스',
          datalabels: {
            display:true,
          },
          borderColor: '#f09956',
          backgroundColor: '#f09956',
          pointRadius: 8,
          data: extractStudentTotalCount('userBusinessSubType','CHARTER_BUS'),
          order: 1
        },
        {
          type: 'line',
          label: '특수여객',
          datalabels: {
            display:true,
          },
          borderColor: '#f5f23c',
          backgroundColor: '#f5f23c',
          pointRadius: 8,
          data: extractStudentTotalCount('userBusinessSubType','SPECIAL_PASSANGER'),
          order: 2
        },
        {
          type: 'line',
          label: '법인택시',
          datalabels: {
            display:true,
          },
          borderColor: '#57eb57',
          backgroundColor: '#57eb57',
          pointRadius: 8,
          data: extractStudentTotalCount('userBusinessSubType','CORPORATE_TAXI'),
          order: 3
        },
        {
          type: 'line',
          label: '개인택시',
          datalabels: {
            display:true,
          },
          borderColor: '#4362ea',
          backgroundColor: '#4362ea',
          pointRadius: 8,
          data: extractStudentTotalCount('userBusinessSubType','PRIVATE_TAXI'),
          order: 4
        },
        {
          type: 'line',
          label: '일반화물',
          datalabels: {
            display:true,
          },
          borderColor: '#0f0899',
          backgroundColor: '#0f0899',
          pointRadius: 8,
          data: extractStudentTotalCount('userBusinessSubType','GENERAL_CARGO'),
          order: 5
        },
        {
          type: 'line',
          label: '용달화물',
          datalabels: {
            display:true,
          },
          borderColor: '#1ff93c',
          backgroundColor: '#1ff93c',
          pointRadius: 8,
          data: extractStudentTotalCount('userBusinessSubType','CONSIGNMENT'),
          order: 6
        },
        {
          type: 'line',
          label: '개별화물',
          datalabels: {
            display:true,
          },
          borderColor: '#1fd9f9',
          backgroundColor: '#1fd9f9',
          pointRadius: 8,
          data: extractStudentTotalCount('userBusinessSubType','INDIVIDUAL_CARGO'),
          order: 7
        },
        {
          type: 'line',
          label: '저상버스',
          datalabels: {
            display:true,
          },
          borderColor: '#1ff96b',
          backgroundColor: '#1ff96b',
          pointRadius: 8,
          data: extractStudentTotalCount('userBusinessSubType','KNEELING_BUS'),
          order: 8
        },
      ]
    };

    setChartData(chartData);
    setLabels([...new Set(labelsArr)]);
    setPeriod(periodArr);
  },[data])

  return (
    <StatisticsLayout title="업종별 증감">
      { chartData ? 
      <>
      <ChartWrapper>
        <MultipleLineChart data={chartData} />
      </ChartWrapper>
      <Summary>
        {
          labels.map((label) => (
            <Box key={label} sx={{display:'flex', alignItems:'center', justifyContent:'center', width:'100%', height:'100%'}}>
              <Column>
                <Typography sx={{fontSize: 20, fontWeight:'bold'}}>{label}</Typography>
              </Column>
            </Box>
          ))
        }
      </Summary>
      <Box sx={{width:'90%', display: 'flex', flexDirection:'column', justifyContent:'flex-start',alignItems:'flex-start'}}>
        {
          period.map((period) => 
            <Box key={period} sx={{display:'flex', alignItems:'center', justifyContent:'flex-start',width:'100%'}}>
              <Column>
                <Typography sx={{fontSize: 20, fontWeight:'bold'}}>{period} 기</Typography>
              </Column>
              {
                data?.map((item,index) => (
                  data[index].step === period && 
                  <Box key={item.userBusinessSubType} sx={{ flex:1, border:'1px solid #c7c7c7c7', boxSizing:'border-box', height: '40px', }}>
                    <Typography sx={{fontSize: 20, fontWeight:'bold', textAlign:'center'}}>{item.studentCnt}</Typography>
                  </Box>
                ))
              }
            </Box>
          )
        }
      </Box>
      </>
      : <Typography sx={{fontSize: 20, fontWeight:'bold'}}>해당 조건을 만족하는 데이터가 존재하지 않습니다.</Typography>
      }
    </StatisticsLayout>
  )
}

const Column = styled(Box)`
  display:flex;
  justify-content: center;
  align-items: center;
  background-color: #07225f;
  color:#fff;
  flex: 1;
  border: 1px solid #c7c7c7c7;
  height: 40px;
`

const ChartWrapper = styled(Box)`
  width: 100%;
  flex: .7;
`

const Summary = styled(Box)`
  margin-top: 4rem;
  width: 90%;
  flex: .3;
  
  display: flex;
  justify-content: center;
  align-items: center;
`