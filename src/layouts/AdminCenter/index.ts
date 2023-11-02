import dynamic from "next/dynamic";

export { AdminCenter } from "./AdminCenter";
export { AdminCenterLayout } from "./AdminCenterLayout";
export { CourseManagement } from "./CourseManagement/CourseManagement";
export { CourseUpload } from "./CourseManagement/CourseUpload";
export { CourseModify } from "./CourseManagement/CourseModify";
export { ContentList } from "./CourseManagement/ContentList";
export { EvaluationInfo } from "./CourseManagement/EvaluationInfo";
export { Library } from "./CourseManagement/Library";
export { CourseTrafficManagement } from "./CourseTrafficManagement/CourseTrafficManagement";
export { CourseTrafficUpload } from "./CourseTrafficManagement/CourseTrafficUpload";
export { CourseTrafficModify } from "./CourseTrafficManagement/CourseTrafficModify";
export { ContentManagement } from "./ContentManagement/ContentManagement";
export { ContentUpload } from "./ContentManagement/ContentUpload";
export { ContentModify } from "./ContentManagement/ContentModify";
export { ContentUploadForm } from "@components/admin-center/ContentUploadForm";
export { UserManagement } from "./UserManagement/UserManagement";
// 운수 / 저상 게시판
export { CategoryManagement } from "./CategoryManagement/CategoryManagement";
export { CategoryUpload } from "./CategoryManagement/CategoryUpload";
export { CategoryModify } from "./CategoryManagement/CategoryModify";
export { CategoryUploadForm } from "@components/admin-center/CategoryUploadForm";
// 도민 게시판
export { CategoryTrafficManagement } from "./CategoryTrafficManagement/CategoryTrafficManagement";
export { CategoryTrafficUpload } from "./CategoryTrafficManagement/CategoryTrafficUpload";
export { CategoryTrafficModify } from "./CategoryTrafficManagement/CategoryTrafficModify";
export { CategoryTrafficUploadForm } from "@components/admin-center/CategoryTrafficUploadForm";

export { CalendarManagement } from "./CalendarManagement/CalendarManagement";
export { CalendarUpload } from "./CalendarManagement/CalendarUpload";
export { CalendarModify } from "./CalendarManagement/CalendarModify";

export { BannerManagement } from "./BannerManagement/BannerManagement";
export { BannerUpload } from "./BannerManagement/BannerUpload";

export { SurveyManagement } from "./SurveyMenagement/SurveyManagement";
export { SurveyUpload } from "./SurveyMenagement/SurveyUpload";
export { SurveyModify } from "./SurveyMenagement/SurveyModify";

export { QnaManagement } from "./QnaManagement/QnaManagement";
export { QnaAnswer } from "./QnaManagement/QnaAnswer";

export const CourseInfoManagement = dynamic(
  () => import("./CourseInfoManagement/CourseInfoManagement"),
  { ssr: false }
);
export { CourseInfoModify } from "./CourseInfoManagement/CourseInfoModify";
