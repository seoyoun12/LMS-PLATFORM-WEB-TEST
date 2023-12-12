const rules = {
  DAILY_START_NOTIFICATION: ['|수강자명|', '|교육종료일|', '|수강과정명|', '|수강교육명|', '|바로가기|'],
  DAILY_COURSE_END_NOTIFICATION: ['|수강자명|', '|수강과정명|', '|수강교육명|','|바로가기|'],
  DAILY_INCOMPLETE_COURSE_NOTIFICATION: ['|수강자명|', '|바로가기|'],
  ENROLLMENT_CONFIRMATION: ['|수강자명|', '|수강교육명|', '|예약날짜|', '|교육일정|', '|교육업종|', '|교육과정|', '|교육시간|', '|교육전체차시수|','|바로가기|'],
  COURSE_COMPLETION_NOTIFICATION: ['|수강자명|','|교육명|', '|수강자명|', '|회사명|', '|차량번호|', '|교육시작일|', '|교육과정|', '|교육시간|','|바로가기|'],
  COURSE_MODIFICATION_NOTIFICATION: ['|수강자명|','|수정내용|','|수강내역|','|바로가기|'],
  COURSE_CANCELLATION_NOTIFICATION: ['|수강자명|','|과정명|','|바로가기|'],
  ADDITIONAL_ENROLLMENT_NOTIFICATION: ['|수강자명|', '|교육종료일|', '|수강과정명|', '|수강교육명|','|바로가기|'],
  QNA_ANSWER_NOTIFICATION: ['|질문제목|','|바로가기|'],
}

const arr = new Set();

for(const key in rules) {
  rules[key].forEach((item: string) => {
      arr.add(item); 
  })
}

const newArr = ['|수강자명|', '|교육종료일|', '|수강과정명|', '|수강교육명|', '|바로가기|', '|예약날짜|', '|교육일정|', '|교육업종|', '|교육과정|', '|교육시간|', '|교육전체차시수|', '|교육명|', '|회사명|', '|차량번호|', '|교육시작일|', '|수정내용|', '|수강내역|', '|과정명|', '|질문제목|']
