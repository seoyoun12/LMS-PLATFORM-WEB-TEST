import { IQuiz, IQuizTime } from "@layouts/Lesson/LessonContentVideo";

export default function getRandomInteger(quiz: IQuiz[],currentLessonPlayTime: number) {

  const quizTimeSet = new Set<number>();
  
  function getRandomInt(currentLessonPlayTime: number) {
    const quizTerm = Math.floor(currentLessonPlayTime * 0.1);
    // currentLessonPlayTime의 10% 미만이어야 함. 추후 상수 quizTerm은 유저의 입력값으로 변경 필요.
    const num = Math.floor( Math.random() * (currentLessonPlayTime - quizTerm));
    let flag = true;

    // currentLessonPlayTime의 10% 미만이어야 함. 추후 상수 quizTerm은 유저의 입력값으로 변경 필요.
    for(let i = 0; i < quizTerm; i ++) {
      if(quizTimeSet.has(num + i) || quizTimeSet.has(num - i)) {
        flag = false;
        break;
      }
    }
    // currentLessonPlayTime의 10% 미만이어야 함. 추후 상수 quizTerm은 유저의 입력값으로 변경 필요.
    if(flag && num > quizTerm){
      quizTimeSet.add(num);
      return num
    } else {
      return getRandomInt(currentLessonPlayTime)
    }
  }

  const newQuiz = quiz.map((q: IQuiz): IQuizTime => {
    if(q.randomTime === true){
      const randomInt = getRandomInt(currentLessonPlayTime);
      return {
        ...q,
        quizOccurTime: randomInt,
        isSolvedQuiz: false
      }
    } 
    else {
      quizTimeSet.add(q.setTimeMin * 60 + q.setTimeSecond);
      return {
        ...q,
        quizOccurTime : q.setTimeMin * 60 + q.setTimeSecond,
        isSolvedQuiz: false
      };
    }
  });
  
  getRandomInt(currentLessonPlayTime)
  return newQuiz;
}

