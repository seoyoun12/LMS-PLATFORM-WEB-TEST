import styled from '@emotion/styled';
import { Backdrop, Box, Button, MenuItem, Select, Typography } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { StatisticsSurveyResponseDto, StepsBySurveyForExcel } from '@common/api/Api';
import { useSnackbar } from '@hooks/useSnackbar';
import { useRouter } from 'next/router';
import {
  downloadExcelSurveyDetail,
  getExcelSurveyDetailStep,
} from '@common/api/adm/excel';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Card } from '../Card/Card';
import { YN } from '@common/constant';
import { Spinner } from '@components/ui';

export function StatDownloadExcel({ data }: { data: StatisticsSurveyResponseDto }) {
  const snackbar = useSnackbar();
  const router = useRouter();
  const { surveySeq } = router.query;
  const [loading, setLoading] = useState(false);

  const [steps, setSteps] = useState<StepsBySurveyForExcel[] | undefined>(); //기수 데이터들.

  const onClickExcelDownload = async (
    surveyName: string,
    surveySeq: string | number,
    courseClassSeq: number | null = null
  ) => {
    const a = document.createElement('a');
    setLoading(true);
    try {
      // const data = await getExcelSurveyDetail(Number(surveySeq));
      const data = await downloadExcelSurveyDetail({
        surveySeq: Number(surveySeq),
        isZipFile: YN.NO,
        courseClassSeq,
      });
      const excel = new Blob([data]);
      a.href = URL.createObjectURL(excel);
      a.download = `충남_관리자_설문통계_${surveyName}.xlsx`;
      a.click();
      a.remove();
      URL.revokeObjectURL(a.href);
      // console.log('엑셀', data);
      snackbar({ variant: 'success', message: '다운로드 완료' });
      setLoading(false);
    } catch (e) {
      snackbar({ variant: 'error', message: e.data.message });
      setLoading(false);
    }
  };

  const onClickZipFileExcelDownload = async (surveyName: string) => {
    const a = document.createElement('a');
    setLoading(true);
    try {
      // const data = await getExcelSurveyDetail(Number(surveySeq));
      const data = await downloadExcelSurveyDetail({
        surveySeq: Number(surveySeq),
        isZipFile: YN.YES,
      });
      const excel = new Blob([data]);
      a.href = URL.createObjectURL(excel);
      a.download = `충남_관리자_설문통계_${surveyName}.zip`;
      a.click();
      a.remove();
      URL.revokeObjectURL(a.href);
      snackbar({ variant: 'success', message: '다운로드 완료' });
      setLoading(false);
    } catch (e) {
      snackbar({ variant: 'error', message: e.data.message });
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    (async function () {
      try {
        const { data } = await getExcelSurveyDetailStep(Number(surveySeq));
        setSteps(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <Card
      header={
        <Box display="flex" justifyContent="space-between">
          <Box>{data.surveyName}</Box>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Wrapper display="flex" gap={2}>
              {/* <Button
                variant="contained"
                color="success"
                onClick={() => onClickExcelDownload(data.surveyName, data.surveySeq)}
              >
                <FileCopyIcon sx={{ marginRight: '4px' }} />
                설문통계 전체데이터 엑셀다운로드
              </Button> */}
              <Select
                displayEmpty={true}
                renderValue={dd => (
                  <Box
                    display="flex"
                    alignItems="center"
                    color="white"
                    sx={{ background: '#2e7d32', padding: '16px' }}
                  >
                    {' '}
                    <FileCopyIcon sx={{ marginRight: '4px' }} />
                    설문엑셀 다운로드
                  </Box>
                )}
                sx={{ width: '500px' }}
              >
                <MenuItem
                  value={'전체 다운로드 (.zip)'}
                  onClick={() => onClickZipFileExcelDownload(data.surveyName)}
                >
                  전체 다운로드 (.zip)
                </MenuItem>
                <MenuItem
                  value={'전체 다운로드 (.xlsx)'}
                  onClick={() => onClickExcelDownload(data.surveyName, Number(surveySeq))}
                >
                  전체 다운로드 (.xlsx)
                </MenuItem>
                {steps?.map(data => (
                  <MenuItem
                    key={data.courseClassSeq}
                    value={data.displayStep}
                    onClick={() =>
                      //   snackbar({
                      //     variant: 'info',
                      //     message: '해당 기능은 준비중입니다.',
                      //   })
                      onClickExcelDownload(
                        data.displayStep.replaceAll(' ', ''),
                        Number(surveySeq),
                        data.courseClassSeq
                      )
                    }
                  >
                    {data.displayStep}
                  </MenuItem>
                ))}
              </Select>
            </Wrapper>
            <Typography color="red" fontWeight="bold">
              1명이상의 수강생이 참여한 설문만 보입니다
            </Typography>
            <Backdrop open={loading}>
              <Box
                display="flex"
                flexDirection="column"
                sx={{ background: 'white', borderRadius: '4px', padding: '12px' }}
              >
                <Spinner fit={true} />
                <Box color="#246def" fontWeight="bold">
                  다운로드가 오래걸릴수 있습니다 페이지를 이탈하지 마세요.
                </Box>
              </Box>
            </Backdrop>
          </Box>
        </Box>
      }
      headSx={{ borderBottom: 0 }}
    />
  );
}

const StatDownloadExcelWarp = styled(Box)``;

//select 박스에 연결되어있음.
const Wrapper = styled(Box)`
  .MuiSelect-select {
    padding: 0 !important;
  }
  .MuiSvgIcon-root {
    color: white !important;
  }
`;
