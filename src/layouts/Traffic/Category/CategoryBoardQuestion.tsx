import React from 'react';
import router from 'next/router';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { useIsLoginStatus } from '@hooks/useIsLoginStatus';
import { CategoryBoardQuestionLogin } from './CategoryBoardQuestionLogin';
import { CategoryBoardQuestionForm } from './CategoryBoardQuestionForm';
import { useSnackbar } from '@hooks/useSnackbar';
import { Qna, QnaInput, uploadQna } from '@common/api/qna';
import { BbsType, uploadFile } from '@common/api/adm/file';
import { Circle, Phone } from '@mui/icons-material';


export function CategoryBoardQuestion() {
  const isLoginStatus = useIsLoginStatus();
  const [loading, setLoading] = React.useState(false);


  const snackbar = useSnackbar();
  const fileHandler = async (files: File[], qna: Qna) => {
    const isFileUpload = files.length > 0;
    if (isFileUpload) {
      await uploadFile({
        fileTypeId: qna.seq,
        fileType: BbsType.TYPE_QNA,
        files,
      });
    }
  };

  const handleSubmit = async ({
    files,
    qnaInput,
  }: {
    files: File[];
    qnaInput: QnaInput;
  }) => {
    try {
      setLoading(true);
      const qna = await uploadQna(qnaInput);
      await fileHandler(files, qna.data);
      snackbar({ variant: 'success', message: '업로드 되었습니다.' });
      setLoading(false);
      router.reload();
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  return (
    <NtContainer>
      <InfoContainer>
        <InfoTitle> <Circle fontSize='small'/> 전화 문의</InfoTitle>
        <Typography sx={{paddingLeft:'2rem'}}>보다 빠른 문의를 원하시면  <Typography sx={{fontWeight:'bold',display:'inline-block'}}> ☎ 041-854-2101~2로 전화주세요</Typography></Typography>
      </InfoContainer>

      <InfoTitle> <Circle fontSize='small'/> 1:1문의하기</InfoTitle>
      {isLoginStatus ? (
        <InfoContainer>
        <CategoryBoardQuestionForm
          onHandleSubmit={handleSubmit}
          loading={loading}
        />
        </InfoContainer>
      ) : (
        <InfoContainer>
        <CategoryBoardQuestionLogin />
        </InfoContainer>
      )}{' '}
    </NtContainer>
  );
}

const NtContainer = styled.ul`
  width: 100%;
  height: 100%;
`;

const InfoContainer = styled.li`
  margin-bottom: 36px;
`

const InfoTitle = styled(Typography)`
  display: flex;
  align-items: center;
  gap: .5rem;
  font-size: 20px;
  font-weight: 600;
  height:48px;
`