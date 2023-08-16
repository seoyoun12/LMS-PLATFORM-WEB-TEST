import { Modal, Spinner } from '@components/ui';
import { Dispatch, SetStateAction, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import ModalInnerLayout from './ModalInnerLayout';
import TabButtons from './TabButtons';
import TabContent from './TabContent';
import QuizCreateForm from './QuizCreateForm';
import { LessonQuizResponseDto } from '@common/api/Api';

interface Props {
  open: boolean;
  quiz: LessonQuizResponseDto[];
  lessonSeq: number;
  onCloseModal: () => void;
  handleClose: (bool: boolean) => void;
  setQuizList: Dispatch<SetStateAction<LessonQuizResponseDto[]>>;
}

const BASIC_FORM: Partial<LessonQuizResponseDto> = {
  lessonQuizTypeEnum: 'ALARM',
  alarmContent: '',
  quizContent: '',
  answer: '',
  feedback: '',
  item1: '',
  item2: '',
  item3: '',
  item4: '',
  itemO: 'O',
  itemX: 'X',
  lessonSeq:0,
  randomTime: true,
  setTimeMin: 0,
  setTimeSecond: 0
}

function AddQuizModal({ open, quiz,lessonSeq, onCloseModal, handleClose,setQuizList }: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  const [form, setForm] = useState<LessonQuizResponseDto>(null);
  const [createMode, setCreateMode] = useState(false);
  const [createForm,setCreateForm] = useState<Partial<LessonQuizResponseDto>>(BASIC_FORM);

  const onTabChange = useCallback((_, newValue: number) => {
    setTabIndex(newValue);
    if (quiz.length !== 0 && newValue === quiz.length) return setCreateMode(true);
    if(quiz.length === 0) return setCreateMode(true);
    else return setCreateMode(false);
  },[quiz?.length]);


  // onFormChange, onCheckChange는 <기존의 퀴즈>를 수정할 때 쓰입니다
  const onFormChange = useCallback((event: SyntheticEvent | string, key = '') => {
    if(typeof event === 'string') return setForm((prev) => ({...prev, [key]: event}))
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    return setForm((prev) => ({...prev, [name]: value}))
  },[])

  const onCheckChange = useCallback((event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const { name, checked } = target;
    setForm((prev) => ({...prev, [name]: checked}))
  },[])
  

  // onFormCreateChange, onCheckCreateChange는 <새로운 퀴즈>를 생성할 때 쓰입니다.
  const onFormCreateChange = useCallback((event: SyntheticEvent | string, key = '') => {
    if(typeof event === 'string')
      return setCreateForm((prev) => ({...prev, [key]: event}))
    
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    return setCreateForm((prev) => ({...prev, [name]: value}))
  },[])

  const onCheckCreateChange = useCallback((event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const { name, checked } = target;
    setCreateForm((prev) =>({...prev, [name]: checked}))
  },[])

  const onClearAddQuizState = useCallback(() => {
      setTabIndex(0);
      setCreateMode(false);
      setForm(null);
      setCreateForm(BASIC_FORM);
      setQuizList(null);
      onCloseModal();
      handleClose(true);
  },[])
  
  useEffect(() => {
    if(!quiz) return;

    // 퀴즈가 바뀌거나, 사용자(관리자)가 다른 탭버튼을 누르거나, 레슨 차시가 바뀔때마다 실행됩니다.
    setForm(quiz[tabIndex])

    // 생성 폼에는 모든 값이 더미값이기 때문에 lessonSeq도 변경해줍니다.
    setCreateForm((prev) => ({...prev, lessonSeq}))
  } ,[quiz,tabIndex,lessonSeq])
  

  useEffect(() => {
    if(quiz?.length === 0) setCreateMode(true)
    else setCreateMode(false)
  },[quiz])
  

  if(!quiz) return <Spinner />;

  return (
    <Modal
      open={open}
      onCloseModal={onClearAddQuizState}
      sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'100%',
        borderRadius:'10px',
        margin: 'auto',
        background: 'rgba(0,0,0,0.2)',
      }}
      fullWidth
      title="퀴즈상태 변경"
      >

      <ModalInnerLayout>
        <TabButtons onTabChange={onTabChange} quizLength={quiz.length} tabIndex={tabIndex}/>
      {!createMode && quiz.map((item,index) => (
        <TabContent
          key={item.lessonQuizSeq}
          index={index}
          form={form}
          item={item}
          onFormChange={onFormChange}
          tabIndex={tabIndex}
          onCheckChange={onCheckChange}
          onClearAddQuizState={onClearAddQuizState}
          />
      ))}
      {
        (createMode || quiz.length === 0)
        && <QuizCreateForm
            form={createForm}
            onFormChange={onFormCreateChange}
            onCheckChange={onCheckCreateChange}
            createMode={createMode}
            onClearAddQuizState={onClearAddQuizState}
            />
      }
    </ModalInnerLayout>
  </Modal>
  )
}

export default AddQuizModal