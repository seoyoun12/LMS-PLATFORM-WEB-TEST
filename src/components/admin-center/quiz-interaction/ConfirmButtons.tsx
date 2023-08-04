import useQuiz from '@common/api/quiz/useQuiz'
import { useDialog } from '@hooks/useDialog';
import { IQuiz } from '@layouts/Lesson/LessonContentVideo';
import { Button, ButtonGroup } from '@mui/material'
import validateProperties from '@utils/validateProperties';

interface Props {
  form: Partial<IQuiz>;
  createMode?: boolean;
}

function ConfirmButtons({form,createMode}:Props) {
  const { createQuiz,deleteQuiz,updateQuiz } = useQuiz(form?.lessonSeq);
  const dialog = useDialog();

  const onSubmitUpdateQuiz = async () => {  
    if(!validateProperties(form.lessonQuizTypeEnum, form)){
      return dialog({
        title: '퀴즈를 등록할 수 없습니다.',
        description: '모든 항목을 입력해주세요.',
        confirmText: '확인',
        variant: 'alert',
      })
    } else {
      try {
        await updateQuiz(form.lessonQuizSeq, form);
        dialog({
          title: '퀴즈가 수정되었습니다.',
          description: '퀴즈가 수정되었습니다.',
          confirmText: '확인',
          variant: 'alert',
        })
      } catch (error) {
        dialog({
          title: '퀴즈 수정에 실패했습니다.',
          description: `${error.message}`,
          confirmText: '확인',
          variant: 'alert',
        })
      }
    }
  }
  const onSubmitCreateQuiz = async () => {
    if(!validateProperties(form.lessonQuizTypeEnum, form)){
      return dialog({
        title: '퀴즈를 등록할 수 없습니다.',
        description: '모든 항목을 입력해주세요.',
        confirmText: '확인',
        variant: 'alert',
      })
    } else {
      try {
        await createQuiz(form);
        dialog({
          title: '퀴즈가 등록되었습니다.',
          description: '퀴즈가 등록되었습니다.',
          confirmText: '확인',
          variant: 'alert',
        })
      } catch (error) {
        dialog({
          title: '퀴즈 등록에 실패했습니다.',
          description: `${error.message}`,
          confirmText: '확인',
          variant: 'alert',
        })
      }
    }
  }
  
  const onDeleteQuiz = async () => {
    
    const confirm = dialog({
      title: '퀴즈를 삭제하시겠습니까?',
      description: '퀴즈를 삭제하시겠습니까?',
      confirmText: '확인',
      cancelText: '취소',
      variant: 'confirm',
    });

    if(confirm){
      try {
        await deleteQuiz(form.lessonQuizSeq);
      } catch (error) {
        dialog({
          title: '퀴즈 삭제에 실패했습니다.',
          description: `${error.message}`,
          confirmText: '확인',
          variant: 'alert',
        })
      }
    }
  }

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
    {createMode
    ? <Button variant="contained" color="info" sx={{width:'120px'}} onClick={onSubmitCreateQuiz}>추가</Button>
    : <>
        <Button variant="contained" color="info" sx={{width:'120px'}} onClick={onSubmitUpdateQuiz}>수정</Button>
        <Button variant="contained" color="warning" sx={{width:'120px'}} onClick={onDeleteQuiz}>삭제</Button>
      </>
    }
    
  </ButtonGroup>
  )
}

export default ConfirmButtons