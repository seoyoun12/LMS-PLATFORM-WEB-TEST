import { getExcelCourseLearning } from '@common/api/adm/excel';
import {
  useLearningInfoCourses,
  useLearningInfoStep,
} from '@common/api/adm/learningInfo';
import ApiClient from '@common/api/ApiClient';
import { Spinner } from '@components/ui';
import styled from '@emotion/styled';
import { useSnackbar } from '@hooks/useSnackbar';
import {
  Backdrop,
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ReplayIcon from '@mui/icons-material/Replay';
import { grey } from '@mui/material/colors';

interface Props {
  search: string;
  handleSubmit: (isReload: boolean) => void;
}

export function HeadRowsBottom({ search, handleSubmit }: Props) {
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const onClickExcelDownload = async () => {
    const a = document.createElement('a');
    setLoading(true);
    try {
      const data = await getExcelCourseLearning();
      const excel = new Blob([data]);
      a.href = URL.createObjectURL(excel);
      a.download = '충남_관리자_학습현황(운수/저상)_데이터.xlsx';
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
  return (
    <HeadRowsBottomWrap>
      {/* <Button variant="contained">검색하기</Button> */}
      <Box mb={2} fontSize={18} fontWeight='bold'>
        {search !== '' && `검색어 : ${search}`}
      </Box>
      <BoxRow sx={{ flexDirection: 'row' }}>
        <Button
          variant='contained'
          onClick={(e) => handleSubmit(false)}
          sx={{ width: '20%' }}
        >
          검색하기
        </Button>
        <ReloadButton
          size='small'
          color='neutral'
          variant='text'
          endIcon={<ReplayIcon htmlColor={grey[700]} />}
          sx={{ marginLeft: '12px' }}
          onClick={(e) => handleSubmit(true)}
        >
          전체 다시 불러오기
        </ReloadButton>
      </BoxRow>
      <BoxRow sx={{ flexDirection: 'row-reverse' }}>
        <Button
          variant='contained'
          color='success'
          disabled={loading}
          onClick={onClickExcelDownload}
        >
          {loading ? (
            <Spinner fit={true} />
          ) : (
            <>
              <FileCopyIcon sx={{ marginRight: '4px' }} />
              학습현황 엑셀다운로드
            </>
          )}
        </Button>
      </BoxRow>
      <Backdrop open={loading}>
        <Box
          display='flex'
          flexDirection='column'
          sx={{ background: 'white', borderRadius: '4px', padding: '12px' }}
        >
          <Spinner fit={true} />
          <Box color='#246def' fontWeight='bold'>
            다운로드가 오래걸릴수 있습니다 페이지를 이탈하지 마세요.
          </Box>
        </Box>
      </Backdrop>
    </HeadRowsBottomWrap>
  );
}
const HeadRowsBottomWrap = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
`;

const BoxRow = styled(Box)`
  width: 100%;
  display: flex;
`;

const ReloadButton = styled(Button)``;
