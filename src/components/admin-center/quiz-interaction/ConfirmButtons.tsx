import useQuiz from '@common/api/quiz/useQuiz'
import { DialogConfig, useDialog } from '@hooks/useDialog';
import { IQuiz } from '@layouts/Lesson/LessonContentVideo';
import { ButtonGroup } from '@mui/material'
import validateProperties from '@utils/validateProperties';
import QuizSubmitButton from './QuizSubmitButton';

interface Props {
  form: Partial<IQuiz>;
  createMode?: boolean;
  onClearAddQuizState: () => void
}
enum MessageType {
  CREATE = '생성',
  UPDATE = '수정',
  DELETE = '삭제',
}


// 해당 컴포넌트에서 사용하는 httpRequest를 추상화하기 위한 Wrapper function
const simpleRequestWrapper = async (
  request: () => Promise<void>,
  dialog: (props: DialogConfig) => void,
  message: MessageType,
  form:Partial<IQuiz>
  ) => {
  if(message !== MessageType.DELETE) {
  if(!validateProperties(form.lessonQuizTypeEnum, form))
    return dialog({
      title: '퀴즈를 등록할 수 없습니다.',
      description: '모든 항목을 입력해주세요.',
      confirmText: '확인',
      variant: 'alert',
    })
  }

  try {
    await request();
    dialog({
      title: `퀴즈가 ${message}되었습니다.`,
      description: `퀴즈가 ${message}되었습니다.`,
      confirmText: '확인',
      variant: 'alert',
    })
  } catch (error) {
    dialog({
      title: `퀴즈 ${message}에 실패했습니다.`,
      description: `${error.message}`,
      confirmText: '확인',
      variant: 'alert',
    })
  }
}


function ConfirmButtons({form,createMode,onClearAddQuizState}:Props) {
  const { createQuiz,deleteQuiz,updateQuiz } = useQuiz(form?.lessonSeq);
  const dialog = useDialog();
  
  console.log(form);
  return (
    <ButtonGroup
      variant="outlined"
      sx={{
        width:'100%',
        justifyContent:'center',
        marginTop:'2rem',
        gap: '0.5rem'
      }}
    >
    {
    createMode
    ? <QuizSubmitButton
        buttonType="info"
        buttonText='생성'
        onClick={async () => {
          await simpleRequestWrapper(() => createQuiz(form),dialog, MessageType.CREATE,form);
          onClearAddQuizState();
        }}
      />
    : <>
        <QuizSubmitButton
          buttonType='info'
          buttonText='수정'
          onClick={async () => {
            await simpleRequestWrapper(
            () => updateQuiz(form.lessonQuizSeq, form),
            dialog, 
            MessageType.UPDATE, // request type for dialog
            form 
          )
          onClearAddQuizState()
        }}
          />
        <QuizSubmitButton
          buttonText='삭제'
          buttonType='warning'
          onClick={async () => {
            await simpleRequestWrapper(
            () => deleteQuiz(form.lessonQuizSeq),
            dialog,
            MessageType.DELETE,
            null);
            onClearAddQuizState();
        }}
        />
      </>
    }
    
  </ButtonGroup>
  )
}

export default ConfirmButtons