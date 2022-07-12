import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import React ,{ SyntheticEvent, useCallback, useEffect } from "react";
import styled from "@emotion/styled";
// import styled from "styled-components";

interface Props {
  tabsConfig: {
    label: string;
    value: string;
  }[];
  showBorderBottom?: boolean;
  sortFull?: boolean;
}

export function Tabs({ tabsConfig, showBorderBottom = true ,sortFull = false , ...props }: Props) {
  const router = useRouter();
  const { pathname, query } = router;

  useEffect(() => {
      if (!router.query.tab) {
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
        router.push({
          pathname,
          query: {
            ...router.query,
            tab: newValue,
          },
        });
      
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
      sortFull={sortFull}
      {...props}
    >
      <MuiTabs
        value={query.tab || tabsConfig[0].value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        {tabsConfig.map(({ value, label }) => (
          <MuiTab key={value} label={label} value={value} />
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