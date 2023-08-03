import CustomTabPanel from "../drawer/CustomTabPanel";
import AnswerBox from "./AnswerBox";
import TabsCommonEntry from "./TabsCommonEntry";
import TabsLayout from "./TabsLayout";
import MultipleChoiceBox from "./MultipleChoiceBox";
import { LessonQuizResponseDto } from "@common/api/Api";
import { SyntheticEvent } from "react";
import FeedbackBox from "./FeedbackBox";
import ConfirmButtons from "./ConfirmButtons";

interface Props {
  item: Partial<LessonQuizResponseDto>
  form: Partial<LessonQuizResponseDto>
  onFormChange: (e: SyntheticEvent) => void
  tabIndex: number;
  index: number;
}

function TabContent({item, form, onFormChange, tabIndex, index}:Props) {
  return (
    <CustomTabPanel key={item.quizContent} value={tabIndex} index={index}>
      <TabsLayout>
        
        <TabsCommonEntry form={form} item={item} onFormChange={onFormChange}/>
        <AnswerBox item={item}/>      
    { item.lessonQuizTypeEnum === "MULTIPLE_CHOICE" && (
        <MultipleChoiceBox item={item}/>
    )}
    { item.lessonQuizTypeEnum !== "ALARM" && (
        <FeedbackBox item={item} form={form} />
    )}
        <ConfirmButtons />
        
      </TabsLayout> 
    </CustomTabPanel>
  )
}

export default TabContent