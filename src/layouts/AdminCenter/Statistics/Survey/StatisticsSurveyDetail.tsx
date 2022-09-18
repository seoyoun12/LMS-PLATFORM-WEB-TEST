import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { BarChart, DoughnutChart, PieChart } from '@components/ui/Charts';
const BarData = {
  labels: ['dd', 'as', 'sdf', 'sd', 'sdfsd'],
  datasets: [
    {
      label: '어쩔티비',
      backgroundColor: 'rgba(238, 173, 81,1)',
      borderColor: 'rgba(238, 173, 81,1)',
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [12, 34, 45, 22, 32],
    },
  ],
};

const DoughnutData = {
  labels: ['원', '투'],
  datasets: [
    {
      labels: ['넹', '넹2'],
      backgroundColor: ['rgba(238, 173, 81,1)', '#ee7051', '#51a7ee', '#ee51ee'],
      borderColor: 'rgba(238, 173, 81,1)',
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [12, 12],
    },
  ],
};

const PieData = {
  labels: ['객관식', '주관식'],
  datasets: [
    {
      labels: ['객관식', '주관식'],
      backgroundColor: ['rgba(238, 173, 81,1)', '#ee7051', '#51a7ee', '#ee51ee'],
      borderColor: 'rgba(238, 173, 81,1)',
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [23, 12],
    },
  ],
};

export function StatisticsSurveyDetail() {
  const router = useRouter();
  const { surveySeq } = router.query;

  return (
    <StaticsSurveyDetailWrap>
      <Box>설문통계</Box>
      <Box>준비중입니다.</Box>
      <BarChart ChartData={BarData} width={250} height={250} />
      <DoughnutChart
        ChartData={DoughnutData}
        width={250}
        height={250}
        centerText="Test"
      />
      <PieChart ChartData={PieData} width={250} height={250} />
    </StaticsSurveyDetailWrap>
  );
}

const StaticsSurveyDetailWrap = styled(Box)``;
