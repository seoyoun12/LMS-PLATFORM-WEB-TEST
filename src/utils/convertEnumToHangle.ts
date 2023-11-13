import { SubType } from "@hooks/useDominCourse"


export const ConvertEnum = (str: string) => {
    if(str === 'TYPE_CHILDREN') return '어린이'
    if(str === 'TYPE_TEENAGER') return '청소년'
    if(str === 'TYPE_ELDERLY') return '어르신'
    if(str === 'TYPE_SELF_DRIVING') return '자가운전자'
    if(str === 'TYPE_SELF_DRIVER') return '자가운전자'
    if(str === 'TYPE_KINDERGARTEN') return '유치원'
    if(str === 'TYPE_ELEMENTARY') return '초등학교'
    if(str === 'TYPE_MIDDLE') return '중학교'
    if(str === 'TYPE_HIGH') return '고등학교'
    if(str === 'COURSE_MODULE_PROGRESS_RATE') return '진도율'
    if(str === 'COURSE_MODULE_TEST') return '시험'
    if(str === 'COURSE_MODULE_SURVEY') return '설문'
    if(str === 'CHEONAN') return  '천안';
    if(str === 'GONGJU') return  '공주';
    if(str === 'BORYEONG') return  '보령';
    if(str === 'ASAN') return  '아산';
    if(str === 'SEOSAN') return  '서산';
    if(str === 'NONSAN') return  '논산';
    if(str === 'GYERYONG') return  '계룡';
    if(str === 'DANGJIN') return  '당진';
    if(str === 'GEUMSAN') return  '금산';
    if(str === 'BUYEO') return  '부여';
    if(str === 'SEOCHEON') return  '서천';
    if(str === 'CHEONGYANG') return  '청양';
    if(str === 'HONGSEONG') return  '홍성';
    if(str === 'YESAN') return  '예산';
    if(str === 'TAEAN') return  '태안';
    if(str === 'CHUNGNAM') return  '충남';
    if(str === 'SEJONG') return  '세종';
    if(str === 'SEOUL') return  '서울';
    if(str === 'BUSAN') return  '부산';
    if(str === 'DAEGU') return  '대구';
    if(str === 'INCHEON') return  '인천';
    if(str === 'GWANGJU') return  '광주';
    if(str === 'DAEJEON') return  '대전';
    if(str === 'ULSAN') return  '울산';
    if(str === 'GYEONGGI') return  '경기';
    if(str === 'GANGWON') return  '강원';
    if(str === 'CHUNGBUK') return  '충북';
    if(str === 'JEONBUK') return  '전북';
    if(str === 'JEONNAM') return  '전남';
    if(str === 'GYEONGBUK') return  '경북';
    if(str === 'GYEONGNAM') return  '경남';
    if(str === 'JEJU') return  '제주';
    if(str === 'COURSE_MODULE_PROGRESS_RATE') return '진도율'
    if(str === 'COURSE_MODULE_TEST') return '시험'
    if(str === 'COURSE_MODULE_SURVEY') return '설문'
    if(str === 'BUS') return '버스'
    if(str === 'CHARTER_BUS') return '전세버스'
    if(str === 'SPECIAL_PASSENGER') return '특수여객'
    if(str === 'CORPORATE_TAXI') return '법인택시'
    if(str === 'GENERAL_CARGO') return '일반화물'
    if(str === 'PRIVATE_TAXI') return '개인택시'
    if(str === 'INDIVIDUAL_CARGO') return '개별화물'
    if(str === 'KNEELING_BUS') return '저상버스'
    if(str === 'birthYear10To19') return '10년생'
    if(str === 'birthYear20To29') return '20년생'
    if(str === 'birthYear30To39') return '30년생'
    if(str === 'birthYear40To49') return '40년생'
    if(str === 'birthYear50To59') return '50년생'
    if(str === 'birthYear60To69') return '60년생'
    if(str === 'birthYear70To79') return '70년생'
    if(str === 'birthYear80To89') return '80년생'
    if(str === 'birthYear90To99') return '90년생'
    return str;
}

export const ConvertDetailEnum = (str: string) => {
  if(str === 'TYPE_CHILDREN') return [SubType.TYPE_KINDERGARTEN, SubType.TYPE_ELEMENTARY]
  if(str === 'TYPE_TEENAGER') return [SubType.TYPE_MIDDLE, SubType.TYPE_HIGH]
  if(str === 'TYPE_ELDERLY') return [SubType.TYPE_ELDERLY]
  if(str === 'TYPE_SELF_DRIVING') return [SubType.TYPE_SELF_DRIVER]
}