import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import React ,{ SyntheticEvent, useCallback } from "react";
import { styled } from "@mui/material";

interface Props {
  tabsConfig: {
    label: string;
    value: string;
  }[];
  showBorderBottom?: boolean;
  rerender?:boolean;
  onChangeMenu:(menu?:string | string[])=>void
  changeMenu:string;
  sortFull?: boolean;
}

export function LessonTabs({ tabsConfig, showBorderBottom = true , rerender = true,onChangeMenu,changeMenu, sortFull = false ,  ...props  }: Props) { //영어 구리다 공부하자 sortFull 엌ㅋㅋ
    
  const handleChange = useCallback(
    (event: SyntheticEvent, newValue: string) => {
        onChangeMenu(newValue);
      
    },
    [onChangeMenu]
  );

  return (
    <TabBox
      sx={
        showBorderBottom
          ? {
              width: "100%",
              borderBottom: 1,
              borderColor: "divider",
            }
          : null
      }
      sortFull={sortFull}
      
      {...props}
    >
      <MuiTabs
        className="mui-tabs"
        value={changeMenu || tabsConfig[0].value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        {tabsConfig.map(({ value, label }) => (
          <MuiTab key={value} className="mui-tabs-item" label={label} value={value} />
        ))}
      </MuiTabs>
    </TabBox>
  );
}

const TabBox = styled(Box)<{sortFull:boolean}>`
  .mui-tabs{
    display:flex;

  }
  .mui-tabs-item{
    flex-grow : ${(({sortFull})=> sortFull ? 1 : 0)};
  }
`
