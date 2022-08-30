export const LESSON_TABS = Object.freeze([
  { label: "커리큘럼", value: "curriculum" },
] as const);
export type LessonTabs = typeof LESSON_TABS[number];

export const LESSON_CONTENT_TYPES = Object.freeze(["LESSON", "SURVEY"] as const);
export type LessonContentType = typeof LESSON_CONTENT_TYPES[number];

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
