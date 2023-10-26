import { MainType, SubType } from "@hooks/useDominCourse";


export const makeCountArrayBySubType = (type:MainType) => {
  if(type === MainType.TYPE_CHILDREN) {
    return [SubType.TYPE_KINDERGARTEN,SubType.TYPE_ELEMENTARY]
  }
  if(type === MainType.TYPE_TEENAGER) {
    return [SubType.TYPE_MIDDLE,SubType.TYPE_HIGH]
  }
  if(type === MainType.TYPE_SELF_DRIVING) {
    return [SubType.TYPE_SELF_DRIVER]
  }
  if(type === MainType.TYPE_ELDERLY) {
    return [SubType.TYPE_ELDERLY]
  }
}