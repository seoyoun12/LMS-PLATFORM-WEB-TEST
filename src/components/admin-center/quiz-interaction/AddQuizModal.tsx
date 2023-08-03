import { LessonQuizResponseDto } from '@common/api/Api';
import { Modal, Spinner } from '@components/ui';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import ModalInnerLayout from './ModalInnerLayout';
import TabButtons from './TabButtons';
import TabContent from './TabContent';
interface Props {
  open: boolean;
  quiz: LessonQuizResponseDto[];
  onCloseModal: () => void;
}

function AddQuizModal({ open, quiz, onCloseModal }: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  const [form, setForm] = useState<Partial<LessonQuizResponseDto>>(null)
  
  const onTabChange = useCallback((_, newValue: number) => {
    setTabIndex(newValue);
  },[]);

  const onFormChange = useCallback((event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    console.log(value);
    setForm({
      ...form,
      [name]: value
    })
  },[form])
  
  useEffect(() => {
    if(!quiz) return;
    setForm(quiz[tabIndex])
  } ,[quiz,tabIndex])
  
  if(!quiz) return <Spinner />;

  return (
    <Modal
      open={open}
      onCloseModal={onCloseModal}
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
      {quiz.map((item,index) => (
        <TabContent
          key={item.lessonQuizSeq}
          index={index}
          form={form}
          item={item}
          onFormChange={onFormChange}
          tabIndex={tabIndex} />
      ))}
    </ModalInnerLayout>
  </Modal>
  )
}

export default AddQuizModal