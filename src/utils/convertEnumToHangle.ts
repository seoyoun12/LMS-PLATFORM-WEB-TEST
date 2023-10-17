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
    
    return str;
}

export const ConvertDetailEnum = (str: string) => {
  if(str === 'TYPE_CHILDREN') return [SubType.TYPE_KINDERGARTEN, SubType.TYPE_ELEMENTARY]
  if(str === 'TYPE_TEENAGER') return [SubType.TYPE_MIDDLE, SubType.TYPE_HIGH]
  if(str === 'TYPE_ELDERLY') return [SubType.TYPE_ELDERLY]
  if(str === 'TYPE_SELF_DRIVING') return [SubType.TYPE_SELF_DRIVER]
}