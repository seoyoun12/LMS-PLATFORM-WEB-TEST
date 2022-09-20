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
  const backgroundColor: string[] = [
    '#ee4a5d',
    '#fff77f',
    '#bae7af',
    '#afc4e7',
    '#fdc4f8',
    '#cb9ffd',
    '#a9e1ed',
    '#f3cdad',
    '#afffba',
    '#dfd4e4',
  ];

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
      <Card header={data.surveyName} headSx={{ borderBottom: 0 }} />
      <Box display="flex">
        <PieCard>
          <Card>
            <Box display="flex" justifyContent="center" width="100%">
              <PieChart ChartData={PieData} width={300} height={300} legend="right" />
            </Box>
          </Card>
        </PieCard>
        <CntCards>
          <Card wrapSx={{ flexGrow: 0, height: '50px' }}>
            <CardLeft>설문 참여자</CardLeft>
            <CardRight>{data.participantCnt}</CardRight>
          </Card>
          <Card wrapSx={{ flexGrow: 0, height: '50px' }}>
            <CardLeft>객관식</CardLeft>
            <CardRight>{data.participantCnt}</CardRight>
          </Card>
          <Card wrapSx={{ flexGrow: 0, height: '50px' }}>
            <CardLeft>주관식</CardLeft>
            <CardRight>{data.participantCnt}</CardRight>
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
                <Card
                  header={item.surveyQuestionName}
                  wrapSx={{ height: '330px' }}
                  contentSx={{ padding: '16px' }}
                >
                  <PieChart
                    ChartData={convertedData}
                    width={250}
                    height={250}
                    legend="right"
                  />
                  <Stack flexGrow={1} display="flex" gap={5} flexWrap="wrap">
                    {chartObjItem.map((item, idx) => {
                      if (!item) return;
                      return (
                        <Box
                          key={idx}
                          sx={{
                            background: '#979797',
                            color: 'white',
                            borderRadius: '2px',
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
        <SurveySub>
          {data.subjResult.map(item => (
            <Box>{item.surveyQuestionName}</Box>
          ))}
        </SurveySub>
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
  gap: 30px;
`;

const CardLeft = styled(Box)`
  padding: 0px 8px;
  background: #256def;
  color: white;
  text-align: center;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
`;
const CardRight = styled(Box)`
  padding: 0px 8px;
  text-align: center;
  width: 50%;
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
