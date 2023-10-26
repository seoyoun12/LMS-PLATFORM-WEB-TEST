import { getYear } from "date-fns";

export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const SITE_COURSE_TYPE = 'site_course_type';

export const JSON_SERVER = 'http://localhost:8080';

export enum YN {
  YES = 'Y',
  NO = 'N',
}

export const phoneList = ['010', '011', '051'];


export const DUMMY_YEAR_ARRAY = Array.from({ length: getYear(new Date()) - 2022 + 1 }).map((_, i) => {
  return {year: i + 2022};
}).reverse();
