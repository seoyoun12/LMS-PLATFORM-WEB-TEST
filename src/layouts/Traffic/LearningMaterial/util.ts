import { MaterialTabType } from "@layouts/Traffic/LearningMaterial/index";
import { MaterialType } from "@common/api/learningMaterial";

export function getMaterialType(type: MaterialTabType): MaterialType {
  switch (type) {
    case "education":
      return MaterialType.TYPE_BY_AGE;

    case "learning-guide":
      return MaterialType.TYPE_EDUCATIONAL;

    case "video":
      return MaterialType.TYPE_VIDEO;

    case "reference":
      return MaterialType.TYPE_OTHER_ORGAN;

    case "media":
      return MaterialType.TYPE_MEDIA
  }
}
