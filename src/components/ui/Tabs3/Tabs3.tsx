import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab, { TabProps } from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

interface TabData {
  id: number;
  label: string;
  content: string;
  deletable?: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

export function Tabs3() {
  const [value, setValue] = React.useState(0);
  const [tabs, setTabs] = React.useState<TabData[]>([
    {
      id: 1,
      label: '첫번째 탭',
      content: '첫번째 탭 페이지입니다.',
      deletable: false,
    },
  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleAddTab = () => {
    const newTab: TabData = {
      id: tabs.length + 1,
      label: `새로운 탭 ${tabs.length + 1}`,
      content: `새로운 탭 ${tabs.length + 1} 페이지입니다.`,
      deletable: true,
    };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setValue(newTab.id);
  };

  const handleDeleteTab = (id: number) => {
    if (tabs.length === 1) {
      return; // 마지막 탭은 삭제하지 않음
    }

    const updatedTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(updatedTabs);

    if (value === id) {
      setValue(updatedTabs[0].id); // 첫 번째 탭으로 이동
    }
  };

  const handleTabDelete = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    handleDeleteTab(id);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          {tabs.map((tab) => (
            <CustomTab
              key={tab.id}
              label={tab.label}
              deletable={tab.deletable}
              value={tab.id}
            />
          ))}
        </StyledTabs>
        <AddTabButton onClick={handleAddTab}>
          <AddIcon />
        </AddTabButton>
      </Box>
      {tabs.map((tab) => (
        <CustomTabPanel
          key={tab.id}
          value={value}
          index={tab.id}
          deletable={tab.deletable}
        >
          <TabContent>{tab.content}</TabContent>
          {tab.deletable && (
            <TabDeleteButton
              onClick={(event) => handleTabDelete(event, tab.id)}
            >
              X
            </TabDeleteButton>
          )}
        </CustomTabPanel>
      ))}
    </Box>
  );
}

function CustomTabPanel(props: TabPanelProps & { deletable?: boolean }) {
  const { children, value, index, deletable, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const StyledTabs = styled(Tabs)`
  & .MuiTabs-flexContainer {
    gap: 8px;
  }
`;

const CustomTab = styled((props: TabProps & { deletable?: boolean }) => (
  <Tab {...props} />
))`
  display: flex;
  align-items: center;
  justify-content: space-between; // 탭 이름과 X 아이콘을 옆에 정렬
`;

const AddTabButton = styled(Button)`
  min-width: unset;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  padding: 0;
  margin-left: 8px;
`;

const TabContent = styled.div`
  display: flex;
  align-items: center;
`;

const TabDeleteButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 16px;
  color: #999;
  cursor: pointer;
`;
