import { ModuleType } from "@hooks/useDominModule";
import CourseModuleProgressRateForm from "./CourseModuleProgressRateForm";
import CourseModuleSurveyForm from "./CourseModuleSurveyForm";
import CourseModuleExamForm from "./CourseModuleExamForm";

interface Props {
  moduleType: ModuleType;
  progressRate: number;
  onChangeProgressRate: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  limitScore: number;
  onChangeLimitScore: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitYn: "Y" | "N";
  onChangeSubmitYn: (e: React.ChangeEvent<HTMLInputElement>) => void;
  surveySeq: number;
  onChangeSurveySeq: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CourseModuleChoiceInputs({ moduleType,progressRate,onChangeProgressRate,limitScore,onChangeLimitScore,submitYn,onChangeSubmitYn,surveySeq,onChangeSurveySeq }: Props) {
  return (
    <div>
      {
        moduleType === ModuleType.COURSE_MODULE_PROGRESS_RATE &&
        <CourseModuleProgressRateForm onChangeProgressRate={onChangeProgressRate} progressRate={progressRate} />
      }
      {
        moduleType === ModuleType.COURSE_MODULE_TEST &&
        <CourseModuleExamForm limitScore={limitScore} onChangeLimitScore={onChangeLimitScore} />
      }
      {
        moduleType === ModuleType.COURSE_MODULE_SURVEY &&
        <CourseModuleSurveyForm
          submitYn={submitYn}
          onChangeSubmitYn={onChangeSubmitYn}
          progressRate={progressRate}
          onChangeProgressRate={onChangeProgressRate}
          surveySeq={surveySeq}
          onChangeSurveySeq={onChangeSurveySeq}
          />
      }
    </div>
  )
}
