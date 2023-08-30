import { IQuiz, IQuizTime } from "@layouts/Lesson/LessonContentVideo";

export default function getRandomInteger(quiz: IQuiz[], currentLessonPlayTime: number) {
  const quizTimeSet = new Set<number>();
  const quizTimeHesh = new Set<number>();
  const quizTerm = currentLessonPlayTime < 100 ? 1 : Math.floor(currentLessonPlayTime * 0.1);

  Array.from({ length: currentLessonPlayTime }, (_, i) => i * Math.floor(Math.random() * i + quizTerm))
  .forEach((time) => {
    if(time < currentLessonPlayTime){
      quizTimeHesh.add(time);
    }
  });
  
  const quizTimeCandidates:number[] = Object.values([...quizTimeHesh]).sort(() => Math.random());


  function getRandomInt(): number {
    const randomIndex = Math.floor(Math.random() * quizTimeCandidates.length);
    return quizTimeCandidates[randomIndex];
  }

  const newQuiz = quiz.map((q: IQuiz): IQuizTime => {
    if (q.randomTime === true) {
      const randomInt = getRandomInt();
      return {
        ...q,
        quizOccurTime: randomInt >= 0 ? randomInt : 0, // -1일 경우 예외 처리
        isSolvedQuiz: false
      };
    } else {
      const fixedTime = q.setTimeMin * 60 + q.setTimeSecond;
      quizTimeSet.add(fixedTime);
      return {
        ...q,
        quizOccurTime: fixedTime,
        isSolvedQuiz: false
      };
    }
  });

  return newQuiz;
}

