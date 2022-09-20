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
export function convertObjChartData(chartData: StatisticsSurveyObjDto) {
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
  const borderColor: string[] = [
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
  const hoverBackgroundColor: string[] = [
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
  const hoverBorderColor: string[] = [
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
  // let chartLabels: string[] = [];
  // let legendLabels: string[] = [];
  // let data: string[] | number[] = [];

  let chartObjLabels: string[] = []; //객관식 라벨들
  let chartObjItem: string[] = []; //객관식 아이템 이름
  let chartObjLegend: string[] = []; //객관식 아이템들
  let chartObjCnt: number[] = []; //객관식 아이템들
  let i = 1;
  for (const [key, value] of Object.entries(chartData)) {
    if (chartData[`item${i}`]) {
      chartObjItem.push(value.objName);
      chartObjCnt.push(value.objAnsweredCnt);
    }
    i++;
  }
  console.log('제발려', chartObjCnt, chartData, chartData[`chartData${1}`]);

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
  let chartLabels: string[] = [];
  let backgroundColor: string[] = [];
  let borderColor: string[] = [];
  let hoverColor: string[] = [];
  let hoberBorderColor: string[] = [];
  let legendLabels: string[] = [];
  let data: string[] | number[] = [];
  return;
}
