// Lesson에 사용되는 타입들.
// 아마 나중에 API에 추가되면 다른 인터페이스로 바꿔주세요.

export interface Notice {
  seq: number;
  title: string;
  content: string;
  date: string;
  type: string;
  complete: boolean;
}

export interface Test {
  title: string;
  score: number;
  description: string;
  isTest: boolean;
  type: string;
  complete: boolean;
}
