import { useState } from 'react';
import styled from '@emotion/styled';
import { Box, Button, MenuItem, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import 'chart.js/auto';
import { PieChart } from '@components/ui/Charts';
import { useSurveyStatistics } from '@common/api/adm/statistics';
import { Modal, Spinner } from '@components/ui';
import { Card } from '@components/admin-center/Card/Card';
import { convertObjChartData } from '@utils/convertChartData';
import { NotFound } from '@components/ui/NotFound';
import { ParticipateListModal } from '@components/admin-center/Statistics/ParticipateListModal';
import { StatDownloadExcel } from '@components/admin-center/Statistics/StatDownloadExcel';

export function StatisticsSurveyDetail() {
  const router = useRouter();
  const { surveySeq } = router.query;
  const { data, error } = useSurveyStatistics(Number(surveySeq));
  const [open, setOpen] = useState(false);
  const [openParticipate, setOpenParticipate] = useState(false);
  const [modalSubList, setModalSubList] = useState<string[]>([]);
  const backgroundColor: string[] = [
    '#ee4a5d',
    '#ee7051',
    '#bae7af',
    '#afc4e7',
    '#ff98f6',
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

  const handleClose = () => {
    setOpenParticipate(false);
    setOpen(false);
  };

  if (!data) return <Spinner />;
  if (error) return <div>Error...</div>;

  return (
    <StaticsSurveyDetailWrap>
      <StatDownloadExcel data={data} />

      <Box display="flex">
        <PieCard>
          <Card header="객관식 주관식 문항개수 현황">
            <Box display="flex" justifyContent="center" width="100%">
              <PieChart ChartData={PieData} width={300} height={300} legend="right" />
            </Box>
          </Card>
        </PieCard>
        <CntCards>
          <Card
            header={'설문 정보'}
            wrapSx={{ flexGrow: 0 }}
            headSx={{ borderBottom: 'none' }}
          />
          <Card
            wrapSx={{ flexGrow: 0, height: '50px' }}
            // onClick={() => setOpenParticipate(true)}
          >
            <CardLeft>설문 참여자</CardLeft>
            <CardRight>{data.participantCnt}</CardRight>
          </Card>
          <Card wrapSx={{ flexGrow: 0, height: '50px' }}>
            <CardLeft>객관식 문항 개수</CardLeft>
            <CardRight>{data.objCnt}</CardRight>
          </Card>
          <Card wrapSx={{ flexGrow: 0, height: '50px' }}>
            <CardLeft>주관식 문항 개수</CardLeft>
            <CardRight>{data.subjCnt}</CardRight>
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
                  contentSx={{ height: '268px', padding: '16px' }}
                >
                  <PieChart
                    ChartData={convertedData}
                    width={236}
                    height={236}
                    legend="right"
                  />
                  <Stack flexGrow={1} display="flex" flexWrap="wrap" gap={1}>
                    {chartObjItem.map((item, idx) => {
                      if (!item) return;
                      return (
                        <Card
                          header={item}
                          headSx={{
                            padding: '0 4px',
                            background: backgroundColor[idx],
                            color: 'white',
                            fontSize: '14px',
                          }}
                          wrapSx={{ flexGrow: 0, margin: '0 8px' }}
                          contentSx={{
                            fontSize: '14px',
                            padding: '0 4px',
                            height: 'auto',
                          }}
                        >
                          <>{chartObjCnt[idx]}</>
                        </Card>
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
            <Box key={item.surveyQuestionSeq} sx={{ cursor: 'pointer' }}>
              <Card
                header={item.surveyQuestionName}
                contentSx={{ padding: '0 16px' }}
                wrapSx={{ height: '330px' }}
              >
                <Stack
                  width="100%"
                  height="250px"
                  sx={{
                    mask: `linear-gradient(black, black, transparent)`,
                    backdropFilter: `blur(8px)`,
                  }}
                  onClick={() => {
                    setOpen(true);
                    setModalSubList(item.answerList);
                  }}
                >
                  {item.answerList.map(item => {
                    if (item === '') return;
                    if (item.length > 50)
                      return <MenuItem>{item.slice(0, 50)}...</MenuItem>;
                    return <MenuItem>{item}</MenuItem>;
                  })}
                </Stack>
              </Card>
            </Box>
          ))}
        </SurveySub>
      </SurveyLayout>
      <Modal
        open={open}
        onCloseModal={handleClose}
        maxWidth="lg"
        action={
          <Button variant="contained" onClick={() => setOpen(false)}>
            닫기
          </Button>
        }
      >
        <Box padding="12px 0" minWidth="500px">
          {modalSubList.length === 0 ? (
            <NotFound content="입력된 주관식 정보가 없는것 같습니다.." />
          ) : (
            modalSubList.map(item => {
              if (item === '') return;
              return <MenuItem>{item}</MenuItem>;
            })
          )}
        </Box>
      </Modal>
      <ParticipateListModal open={openParticipate} onCloseModal={handleClose} />
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
  gap: 18px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const CardLeft = styled(Box)`
  padding: 0px 8px;
  background: #256def;
  color: white;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CardRight = styled(Box)`
  padding: 0px 8px;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SurveyLayout = styled(Box)`
  display: flex;
`;
const SurveyObj = styled(Box)`
  width: 50%;
`;
const SurveySub = styled(Box)`
  width: 50%;
  overflow: hidden;
`;
