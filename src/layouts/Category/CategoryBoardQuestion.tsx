import { Container } from '@mui/material';
import styled from '@emotion/styled';
import { useIsLoginStatus } from '@hooks/useIsLoginStatus';
import { CategoryBoardQuestionLogin } from './CategoryBoardQuestionLogin';
import { CategoryBoardQuestionForm } from './CategoryBoardQuestionForm';
import { useSnackbar } from '@hooks/useSnackbar';
import { Qna, QnaInput, uploadQna } from '@common/api/qna';
import { BbsType, uploadFile } from '@common/api/adm/file';
import router from 'next/router';

export function CategoryBoardQuestion() {
  const isLoginStatus = useIsLoginStatus();
  // const [isNonMenberQuestion, setIsNonMenberQuestion] = useState(false);
  // const [isOpenQues, setIsOpneQues] = useState(false);
  // const [memberType, setMemberType] = useState<undefined | MemberType>();

  //

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
      const qna = await uploadQna(qnaInput); // 게시판 내용 업로드. 파일보다 먼저
      await fileHandler(files, qna.data); // 파일업로드. 게시판 뒤
      snackbar({ variant: 'success', message: '업로드 되었습니다.' });
      router.push(`/traffic/category`);
    } catch (e: any) {
      console.error(e);
    }
  };

  //

  // useEffect(() => {
  //   if (isLoginStatus) {
  //     setIsOpneQues(true);
  //     setMemberType(MemberType.TYPE_MEMBER);
  //   }
  // }, []);

  return (
    <NtContainer>
      {isLoginStatus ? (
        <CategoryBoardQuestionForm onHandleSubmit={handleSubmit} />
      ) : (
        // <CategoryBoardQuestionLogin setIsOpneQues={setIsOpneQues} setMemberType={setMemberType} />
        <CategoryBoardQuestionLogin />
      )}{' '}
    </NtContainer>
  );
}

const NtContainer = styled(Container)`
  /* box-sizing: border-box;
  border: 1px solid black; */
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
