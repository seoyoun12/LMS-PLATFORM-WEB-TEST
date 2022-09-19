import styled from '@emotion/styled';
import { Box, MenuItem, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { BarChart, DoughnutChart, PieChart } from '@components/ui/Charts';
import { useSurveyStatistics } from '@common/api/adm/statistics';
import { Spinner } from '@components/ui';
import { Card } from '@components/admin-center/Card/Card';
import { convertObjChartData } from '@utils/convertChartData';
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

export function StatisticsSurveyDetail() {
  const router = useRouter();
  const { surveySeq } = router.query;
  const { data, error } = useSurveyStatistics(Number(surveySeq));

  const PieData = {
    labels: ['객관식', '주관식'],
    datasets: [
      {
        labels: ['객관식', '주관식'],
        backgroundColor: ['rgba(238, 173, 81,1)', '#ee7051', '#51a7ee', '#ee51ee'],
        borderColor: 'rgba(238, 173, 81,1)',
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [data?.objCnt, data?.subjCnt],
      },
    ],
  };
  console.log(data);

  if (!data) return <Spinner />;
  if (error) return <div>Error...</div>;
  for (const [key, value] of Object.entries(data.objResult[0])) {
    console.log(key[`item${1}`], value);
  }

  return (
    <StaticsSurveyDetailWrap>
      <Box>설문통계</Box>
      <Box>{data.surveyName}</Box>
      <Box display="flex">
        <PieCard>
          <Card contentPadding={0}>
            <Box display="flex" justifyContent="center" width="100%">
              <PieChart ChartData={PieData} width={300} height={300} legend="right" />
            </Box>
          </Card>
        </PieCard>
        <CntCards>
          <Card contentPadding={0}>
            <CardLeft>설문 참여자</CardLeft>
            <CardRight sx={{ padding: '8px', flexGrow: 1 }}>
              {data.participantCnt}
            </CardRight>
          </Card>
          <Card contentPadding={0}>
            <CardLeft>객관식</CardLeft>
            <CardRight sx={{ padding: '8px', flexGrow: 1 }}>
              {data.participantCnt}
            </CardRight>
          </Card>
          <Card contentPadding={0}>
            <CardLeft>주관식</CardLeft>
            <CardRight sx={{ padding: '8px', flexGrow: 1 }}>
              {data.participantCnt}
            </CardRight>
          </Card>
        </CntCards>
      </Box>
      <SurveyLayout>
        <SurveyObj>
          {data.objResult.map(item => {
            const { convertedData, chartObjItem, chartObjCnt } =
              convertObjChartData(item);
            return (
              <Box key={item.surveyQuestionSeq}>
                <Card header={item.surveyQuestionName}>
                  <PieChart
                    ChartData={convertedData}
                    width={250}
                    height={250}
                    legend="right"
                  />
                  <Stack flexGrow={1} display="flex" gap={2}>
                    {chartObjItem.map((item, idx) => {
                      if (!item) return;
                      return (
                        <Box
                          sx={{
                            background: '#979797',
                            color: 'white',
                            borderRadius: '4px',
                            paddingLeft: '8px',
                          }}
                        >
                          {item}: {chartObjCnt[idx]}
                        </Box>
                      );
                    })}
                  </Stack>
                </Card>
              </Box>
            );
          })}
        </SurveyObj>
        <SurveySub>주관식 레이아웃</SurveySub>
      </SurveyLayout>
      {/* <BarChart ChartData={BarData} width={250} height={250} />
      <DoughnutChart
        ChartData={DoughnutData}
        width={250}
        height={250}
        centerText="Test"
      />
      <Card>
        <PieChart ChartData={PieData} width={250} height={250} />
      </Card> */}
    </StaticsSurveyDetailWrap>
  );
}

const StaticsSurveyDetailWrap = styled(Box)``;

const PieCard = styled(Box)`
  width: 30%;
`;
const CntCards = styled(Box)`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardLeft = styled(Box)`
  padding: 8px;
  background: #256def;
  color: white;
  text-align: center;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
`;
const CardRight = styled(Box)`
  padding: 8px;
  text-align: center;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
`;

const SurveyLayout = styled(Box)`
  display: flex;
`;
const SurveyObj = styled(Box)`
  width: 50%;
`;
const SurveySub = styled(Box)`
  width: 50%;
`;
