import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import React ,{ SyntheticEvent, useCallback, useEffect } from "react";
import styled from "styled-components";

interface Props {
  tabsConfig: {
    label: string;
    value: string;
  }[];
  showBorderBottom?: boolean;
  variant: "fullWidth" | "standard" | "scrollable";
  gap?:number
  rendering?:boolean;
  onChange?:(newValue : string)=>void;
  value?:string;
}

export function Tabs({ tabsConfig, showBorderBottom = true ,variant = "standard", gap , rendering=true ,onChange , value ,  ...props }: Props) {
  const router = useRouter();
  const { pathname, query } = router;

  useEffect(() => {
      if (!router.query.tab && rendering) {
        router.replace({
          pathname,
          query: {
            ...router.query,
            tab: tabsConfig[0].value,
          },
        });
    }
  }, [pathname, router]);

  const handleChange = useCallback(
    (event: SyntheticEvent, newValue: string) => {
      if(!rendering && onChange){
        onChange(newValue);
      }else{
        router.push({
          pathname,
          query: {
            ...router.query,
            tab: newValue,
          },
        });
      }
      
    },
    [pathname, router]
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
      variant={variant}
      gap={gap}
      {...props}
    >
      <MuiTabs
        className="mui-tabs"
        value={query.tab || value || tabsConfig[0].value}
        onChange={handleChange}
        aria-label="basic tabs example"
        variant={variant}
      >
        {tabsConfig.map(({ value, label }) => (
          <MuiTab key={value} className="mui-tabs-item" label={label} value={value} />
        ))}
      </MuiTabs>
    </TabBox>
  );
}


const TabBox = styled(Box)<{variant:string , gap?:number}>`
  .mui-tabs{
    display:flex;
    }

  
  .mui-tabs-item{
    margin : ${(({variant, gap})=> variant === "fullWidth" && gap  ? `0 ${gap}rem` : "0")};
  }

`