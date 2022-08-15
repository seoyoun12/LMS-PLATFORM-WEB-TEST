import { getSingleSurvey, SurveyRes } from '@common/api/adm/survey';
import styled from '@emotion/styled';
import { useSnackbar } from '@hooks/useSnackbar';
import { Box, Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface FormType extends SurveyRes {}

export function SurveyModify() {
  const snackbar = useSnackbar();
  const router = useRouter();

  const { register, setValue, watch, handleSubmit } = useForm<FormType>();

  useEffect(() => {
    (async function () {
      try {
        const { data } = await getSingleSurvey(1);
        console.log(data, '데이터임');
        setValue('title', data.title);
        setValue('courseSeq', data.courseSeq);
        setValue('createdDtime', data.createdDtime);
        setValue('itemCnt', data.itemCnt);
        setValue('modifiedDtime', data.modifiedDtime);
        setValue('seq', data.seq);
        setValue('status', data.status);
        setValue('surveyQuestionList', data.surveyQuestionList);
      } catch (e: any) {
        snackbar({ variant: 'error', message: e.data.message });
      }
    })();
  }, []);
  return (
    <SurveyModifyWrap>
      <Container>
        <Box>수정하기</Box>
        <Box>{watch().title}</Box>
      </Container>
    </SurveyModifyWrap>
  );
}

const SurveyModifyWrap = styled(Box)``;
