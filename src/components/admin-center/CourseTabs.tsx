import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import CourseUploadTab from "@layouts/AdminCenter/CourseTrafficManagement/CourseUploadTab";
import CourseContentTab from "./CourseContentTab";
import CourseModuleTab from "./CourseModuleTab";


export function CourseTabs() {
  
  const [tabIndex, setTabIndex] = useState(1);
  
  const onChangeTabIndex = (_:SyntheticEvent,index: number) => {
    setTabIndex(index);
  }
  
  return (
    <TabContext value={tabIndex+''}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <TabList onChange={onChangeTabIndex}>
        <Tab label="과정" value="1" />
        <Tab label="콘텐츠" value="2" />
        <Tab label="모듈" value="3" />
      </TabList>
    </Box>
    
    <TabPanel value="1">
      <CourseUploadTab />
    </TabPanel>
    
    <TabPanel value="2">
      <CourseContentTab />
    </TabPanel>

    <TabPanel value="3">
      <CourseModuleTab />
    </TabPanel>
  </TabContext>
    
    
  );
}
