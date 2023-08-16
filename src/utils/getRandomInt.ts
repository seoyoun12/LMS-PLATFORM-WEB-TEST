import { IQuiz, IQuizTime } from "@layouts/Lesson/LessonContentVideo";

export default function getRandomInteger(quiz: IQuiz[],currentLessonPlayTime: number) {

  const quizTimeSet = new Set<number>();
  
  function getRandomInt(currentLessonPlayTime: number) {
    // 재귀를 빠져나가는 flag varialble
    let flag = true;

    // 각 퀴즈의 간격은 총 플레이타임의10% 이상이어야 한다
    const quizTerm = Math.floor(currentLessonPlayTime * 0.1); 
  
    // 퀴즈가 출현될 시간(seconds)
    const num = Math.floor( Math.random() * (currentLessonPlayTime - quizTerm));
    
    for(let i = 0; i < quizTerm; i ++) {
      if(quizTimeSet.has(num + i) || quizTimeSet.has(num - i)) {
        flag = false;
        break;
      }
    }
  
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

