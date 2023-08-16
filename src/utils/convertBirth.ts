/**
 * yy-mm-dd 형식의 birth를 받아 알아서 계산해 yyyy-mm-dd로 출력해줍니다.\
 * ex) 96-04-12 => 1996-04-12 , 04-05-06 => 2004-05-06
 * @param birth string
 * @returns string
 */
export const convertBirth = (birth: string) => {
  if (!birth) return '없음';
  if (birth.split('-')[0].length === 4) return birth;
  let format = '?';
  const birthYear = Number(birth.split('-')[0]);
  const currentYear = Number(String(new Date().getFullYear()).substring(2, 4));
  if (birthYear > currentYear) format = `19${birth}`;
  if (birthYear <= currentYear) format = `20${birth}`;
  return format;
};


