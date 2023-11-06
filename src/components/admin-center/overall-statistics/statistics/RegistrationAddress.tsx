import React, { useEffect, useState } from 'react'
import StatisticsLayout from './StatisticsLayout'
import HorizontalbarChart, { horizontalbarChartData, labels } from '../charts/HorizontalbarChart'
import styled from '@emotion/styled'
import { Box } from '@mui/material'

export default function RegistrationAddress() {
  const [categoryCount, setCategoryCount] = useState([]);

  useEffect(() => {
   const result = horizontalbarChartData.datasets.reduce((acc, dataset) => {
      dataset.data.forEach((count, index) => {
        acc[index] = (acc[index] || 0) + count;
      })
      return acc
    },[])
    setCategoryCount(result)
  },[])
  return (
    <StatisticsLayout title="차량등록지별 (이수자수 / 이수율)">
      <Wrapper>
        <Box sx={{flex:1,alignSelf:'flex-start'}}>
          <HorizontalbarChart />
        </Box>
        <Summary>

          <SummaryCategory>
            <SummaryCategoryTitle>
              <Box sx={{flex: 1, textAlign: 'center'}}>총 수강인원</Box>
            </SummaryCategoryTitle>
            {
              labels.map((label, index) => {
                return <SummaryItem key={label} width={260}>
                        <SummaryItemTitle >{label}</SummaryItemTitle>
                        <SummaryItemContent >{categoryCount[index]}</SummaryItemContent>
                      </SummaryItem>
              })}
          </SummaryCategory>

          <SummaryCategory>
            <SummaryCategoryTitle>
              <Box sx={{flex: 1, textAlign: 'center'}}>이수자</Box>
            </SummaryCategoryTitle>
            {
              horizontalbarChartData.datasets.map((dataset) => {
                if(dataset.label === '이수자') {
                  
                  return dataset.data.map((count, index) => {
                    // 해당 카테고리의 총원 수에서 이수자의 수를 나누어서 퍼센테이지를 구한 값입니다.
                    const persentage = Math.round(count / categoryCount[index] * 100);
                    return <SummaryItem key={index} width={200}>
                            <SummaryItemContent>{count} ({persentage}%)</SummaryItemContent>
                          </SummaryItem>
                  })
                }}
              )}
          </SummaryCategory>
          <SummaryCategory>
            <SummaryCategoryTitle>
              <SummaryItemContent>미이수자</SummaryItemContent>
            </SummaryCategoryTitle>
            {
              horizontalbarChartData.datasets.map((dataset) => {
                if(dataset.label === '미이수자') {
                  return dataset.data.map((count, index) => {
                    // 해당 카테고리의 총원 수에서 미이수자의 수를 나누어서 퍼센테이지를 구한 값입니다.
                    const persentage = Math.round(count / categoryCount[index] * 100);
                    return <SummaryItem key={index} width={200}>
                            <SummaryItemContent persentage={persentage}>{count} ({persentage}%)</SummaryItemContent>
                          </SummaryItem>
                  })
                }}
              )}
          </SummaryCategory>
        </Summary>

      </Wrapper>
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