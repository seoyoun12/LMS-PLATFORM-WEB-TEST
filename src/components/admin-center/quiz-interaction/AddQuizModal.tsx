import { Modal, Spinner } from '@components/ui';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import ModalInnerLayout from './ModalInnerLayout';
import TabButtons from './TabButtons';
import TabContent from './TabContent';
import { IQuiz, IQuizTime } from '@layouts/Lesson/LessonContentVideo';
import QuizCreateForm from './QuizCreateForm';
interface Props {
  open: boolean;
  quiz: IQuizTime[];
  lessonSeq: number;
  onCloseModal: () => void;
}



function AddQuizModal({ open, quiz,lessonSeq, onCloseModal }: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  const [form, setForm] = useState<IQuiz>(null)
  
  const [createForm,setCreateForm] = useState<Partial<IQuiz>>({
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
  });
  const [createMode, setCreateMode] = useState(false);

  const onTabChange = useCallback((_, newValue: number) => {
    setTabIndex(newValue);
    if (newValue === quiz.length) setCreateMode(true);
    else setCreateMode(false);
  },[quiz?.length]);

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



  const onFormCreateChange = useCallback((event: SyntheticEvent | string, key = '') => {
    if(typeof event === 'string') return setCreateForm((prev) => ({...prev, [key]: event}))
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    return setCreateForm((prev) => ({...prev, [name]: value}))
  },[])
  const onCheckCreateChange = useCallback((event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const { name, checked } = target;
    setCreateForm((prev) =>({...prev, [name]: checked}))
  },[])
  
  useEffect(() => {
    if(!quiz) return;
    setForm(quiz[tabIndex])
    setCreateForm((prev) => ({...prev, lessonSeq}))
  } ,[quiz,tabIndex,lessonSeq])
  

  useEffect(() => {
    if(quiz?.length === 0) setCreateMode(true)
    else setCreateMode(false)

  },[quiz?.length])

  if(!quiz) return <Spinner />;

  return (
    <Modal
      open={open}
      onCloseModal={() => {
        onCloseModal();
        setTabIndex(0);
        setCreateMode(false);
      }}
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
          />
      ))}
      {
        (createMode || quiz.length === 0) && <QuizCreateForm form={createForm} onFormChange={onFormCreateChange} onCheckChange={onCheckCreateChange} createMode={createMode} />
      } 
      
    </ModalInnerLayout>
  </Modal>
  )
}

export default AddQuizModal