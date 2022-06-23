export enum QuestionType {
  QUESTION_OBJ = 'QUESTION_OBJ',
  QUESTION_SUBJ = 'QUESTION_SUBJ'
}

export enum ExamLevel {
  LEVEL_EASY = 'LEVEL_EASY',
  LEVEL_MEDIUM = 'LEVEL_MEDIUM',
  LEVEL_HARD = 'LEVEL_HARD'
}

export interface QuestionInput {
  answer?: string;
  chapter?: number;
  contentSeq?: number;
  description?: string;
  questionType: QuestionType;
  item1?: string;
  item2?: string;
  item3?: string;
  item4?: string;
  item5?: string;
  itemCnt?: number;
  level: ExamLevel;
  question?: string;
  status?: number;
}

export interface Question {
  answer: string;
  chapter: number;
  contentSeq: number;
  createdDtime: string;
  description: string;
  questionType: QuestionType;
  item1: string;
  item2: string;
  item3: string;
  item4: string;
  item5: string;
  itemCnt: number;
  level: ExamLevel;
  modifiedDtime: string;
  question: string;
  seq: number;
  status: number;
}

