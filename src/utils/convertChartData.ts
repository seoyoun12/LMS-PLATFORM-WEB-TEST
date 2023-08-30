import { StatisticsSurveyObjDto, StatisticsSurveySubjDto } from '@common/api/Api';
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
const borderColor: string[] = [
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
const hoverBackgroundColor: string[] = [
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
const hoverBorderColor: string[] = [
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


export function convertObjChartData(chartData: StatisticsSurveyObjDto) {
  
  // let chartLabels: string[] = [];
  // let legendLabels: string[] = [];
  // let data: string[] | number[] = [];

  const chartObjLabels: string[] = []; //객관식 라벨들
  const chartObjItem: string[] = []; //객관식 아이템 이름
  const chartObjLegend: string[] = []; //객관식 아이템들
  const chartObjCnt: number[] = []; //객관식 아이템들
  let i = 1;
  for (const [key, value] of Object.entries(chartData)) {
    if (key === `item${i}`) {
      chartObjItem.push(value.objName);
      chartObjCnt.push(value.objAnsweredCnt);
      i++;
    }
  }

  const convertedData = {
    labels: chartObjItem.filter(item => item),
    datasets: [
      {
        labels: chartObjItem.filter(item => item),
        backgroundColor,
        borderColor,
        hoverBackgroundColor,
        hoverBorderColor,
        data: chartObjCnt,
      },
    ],
  };

  return { convertedData, chartObjItem, chartObjCnt };
}
export function convertSubChartData(chartData: StatisticsSurveySubjDto[]) {
  const chartLabels: string[] = [];
  const backgroundColor: string[] = [];
  const borderColor: string[] = [];
  const hoverColor: string[] = [];
  const hoberBorderColor: string[] = [];
  const legendLabels: string[] = [];
  const data: string[] | number[] = [];
  return;
}
