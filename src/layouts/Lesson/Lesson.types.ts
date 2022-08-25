export const tabsConfig = Object.freeze([
  { label: "커리큘럼", value: "curriculum" },
  // { label: '공지사항', value: 'notice' },
  // { label: '수업자료', value: 'stuff' },
] as const);

export type TabsConfig = typeof tabsConfig[number];

export const testList = [
  { title: "중간평가입니다.", score: 70, description: "시험", type: "test", isTest: true, complete: true },
  // {title:"과제평가입니다." , score: 0 , description:"과제",type:"report", isTest:false , complete:false} 보류
];

export const noticeConfig = [
  {
    seq: 0,
    title: "오쩔",
    type: "notice",
    content: "## 안녕하세요\n**수강완료!**\n잠이나 자세요!\n",
    date: "2022.04.12 18:46:21",
    complete: true,
  },
  {
    seq: 1,
    title: "오지사항 제목입니다.",
    type: "notice",
    content: "요를레히후.",
    date: "2022.04.15 9:46:21",
    complete: false,
  },
  {
    seq: 2,
    title: "오지사항 제목입니다.지사항 제목입니다.",
    type: "notice",
    content: "요를레히요를레히요를레히요를레히요를레히요를레히요를레히후.",
    date: "2022.04.19 14:46:21",
    complete: false,
  },
];

export const fileList = [
  { seq: 0, title: "어쩔파일입니다.pdf" },
  { seq: 1, title: "어쩔파일입니다2.pdf" },
  { seq: 2, title: "어쩔파일입니다3.pdf" },
];


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
