import CustomTabPanel from "../drawer/CustomTabPanel";
import AnswerBox from "./AnswerBox";
import TabsCommonEntry from "./TabsCommonEntry";
import TabsLayout from "./TabsLayout";
import MultipleChoiceBox from "./MultipleChoiceBox";
import { LessonQuizResponseDto } from "@common/api/Api";
import { SyntheticEvent } from "react";
import FeedbackBox from "./FeedbackBox";
import ConfirmButtons from "./ConfirmButtons";
import { IQuiz } from "@layouts/Lesson/LessonContentVideo";

interface Props {
  item: Partial<LessonQuizResponseDto>
  form: IQuiz
  onFormChange: (e: SyntheticEvent) => void
  onCheckChange: (e: SyntheticEvent) => void
  tabIndex: number;
  index: number;
}

function TabContent({item, form, onFormChange,onCheckChange, tabIndex, index}:Props) {
  return (
    <CustomTabPanel key={item.quizContent} value={tabIndex} index={index}>
      <TabsLayout>
        <TabsCommonEntry form={form} onFormChange={onFormChange} onCheckChange={onCheckChange}/>
        <AnswerBox form={form} onFormChange={onFormChange} /> 
    { item.lessonQuizTypeEnum === "MULTIPLE_CHOICE" && (
        <MultipleChoiceBox form={form} onFormChange={onFormChange} />
    )}
    { item.lessonQuizTypeEnum !== "ALARM" && (
        <FeedbackBox form={form}  onFormChange={onFormChange} />
    )}
        <ConfirmButtons form={form} />
      </TabsLayout> 
    </CustomTabPanel>
  )
}

export default TabContent