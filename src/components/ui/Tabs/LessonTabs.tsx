import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import React, { SyntheticEvent, useCallback } from 'react';
import { styled } from '@mui/material';

export interface TabsConfig {
  label: string;
  value: string;
}

interface Props {
  tabsConfig: TabsConfig[];
  showBorderBottom?: boolean;
  rerender?: boolean;
  onChangeMenu: (menu?: string | string[]) => void;
  changeMenu: string;
}

export function LessonTabs({ tabsConfig, showBorderBottom = true, rerender = true, onChangeMenu, changeMenu, ...props }: Props) {
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
              width: '100%',
              borderBottom: 1,
              borderColor: 'divider',
            }
          : null
      }
      {...props}
    >
      <MuiTabs className="mui-tabs" value={changeMenu || tabsConfig[0].value} onChange={handleChange} aria-label="basic tabs example">
        {tabsConfig.map(({ value, label }) => (
          <CustomMuiTab key={value} className="mui-tabs-item" label={label} value={value} />
        ))}
      </MuiTabs>
    </TabBox>
  );
}

const TabBox = styled(Box)`
  .mui-tabs {
    display: flex;
  }
`;

const CustomMuiTab = styled(MuiTab)`
  font-size: 1rem;
  &[aria-selected="true"] {
    font-weight: bold;
  }
`;
