import { ModuleType } from "@hooks/useDominModule";
import CourseModuleProgressRateForm from "./CourseModuleProgressRateForm";
import CourseModuleSurveyForm from "./CourseModuleSurveyForm";
import CourseModuleExamForm from "./CourseModuleExamForm";
import { ChangeEvent } from "react";

interface Props {
  moduleType: ModuleType;
  progressRate: number;
  onChangeProgressRate: (e: ChangeEvent<HTMLInputElement>) => void; 
  limitScore: number;
  onChangeLimitScore: (e: ChangeEvent<HTMLInputElement>) => void;
  submitYn: "Y" | "N";
  onChangeSubmitYn: (e: ChangeEvent<HTMLInputElement>) => void;
  surveySeq: number;
  onChangeSurveySeq: (e: ChangeEvent<HTMLInputElement>) => void;
  moduleName: string;
  onChangeModuleName: (e: ChangeEvent<HTMLInputElement> | string ) => void;
}

export default function CourseModuleChoiceInputs({ moduleName,onChangeModuleName, moduleType,progressRate,onChangeProgressRate,limitScore,onChangeLimitScore,submitYn,onChangeSubmitYn,surveySeq,onChangeSurveySeq }: Props) {
  return (
    <>
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
          moduleName={moduleName}
          onChangeModuleName={onChangeModuleName}
          />
      }
    </>
  )
}
