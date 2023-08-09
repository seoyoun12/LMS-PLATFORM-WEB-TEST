import { IQuiz } from "@layouts/Lesson/LessonContentVideo"
import falsyCheck from "./falsyCheck"

export default function validateProperties(type: 'ALARM' | 'MULTIPLE_CHOICE' | 'OX_QUIZ', form:Partial<IQuiz>): boolean {
  
  let flag = true;

  if(type === 'ALARM'){
    const alarmProperties = {
      alarmContent: form.alarmContent,
      quizContent: form.quizContent,
    }
    for(const key in alarmProperties) {
      if(!falsyCheck(alarmProperties[key])) {
        flag = false;
        break;
      }
    }
  }

  if(type === 'MULTIPLE_CHOICE'){
    const multipleChoiceProperties = {
      alarmContent: form.alarmContent,
      quizContent: form.quizContent,
      answer: form.answer,
      feedback: form.feedback,
      item1: form.item1,
      item2: form.item2,
      item3: form.item3,
      item4: form.item4,
    }
    for(const key in multipleChoiceProperties) {
      if(!falsyCheck(multipleChoiceProperties[key])) {
        flag = false;
        break;
      }
    }
  }

  if(type === 'OX_QUIZ') {
    const oxQuizProperties = {
      alarmContent: form.alarmContent,
      quizContent: form.quizContent,
      answer: form.answer,
      feedback: form.feedback,
      itemO: form.itemO,
      itemX: form.itemX
    }
    for(const key in oxQuizProperties) {
      if(!falsyCheck(oxQuizProperties[key])) {
        flag = false;
        break;
      }
    }
  }
  return flag
}