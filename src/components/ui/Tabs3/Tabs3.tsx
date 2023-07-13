import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Tabs from '@mui/material/Tabs';
import Tab, { TabProps } from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

interface TabData {
  id: string;
  label: string;
  content: string;
  deletable?: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  value: string;
  index: string;
}

export function Tabs3() {
  const [value, setValue] = React.useState('1');
  const [tabs, setTabs] = React.useState<TabData[]>([
    {
      id: '1',
      label: '첫번째 탭',
      content: '첫번째 탭 페이지입니다.',
      deletable: false,
    },
  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleAddTab = () => {
    const newLabel = generateUniqueLabel();
    const newTab: TabData = {
      id: uuidv4(),
      label: newLabel,
      content: `새로운 탭 ${newLabel} 페이지입니다.`,
      deletable: true,
    };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setValue(newTab.id);
  };

  const generateUniqueLabel = () => {
    let label = `새로운 탭 ${tabs.length + 1}`;
    let isUnique = false;
    let index = 1;

    while (!isUnique) {
      const existingLabel = tabs.find((tab) => tab.label === label);
      if (!existingLabel) {
        isUnique = true;
      } else {
        index++;
        label = `새로운 탭 ${tabs.length + index}`;
      }
    }

    return label;
  };

  const handleDeleteTab = (id: string) => {
    if (tabs.length === 1) {
      return; // 마지막 탭은 삭제하지 않음
    }

    const updatedTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(updatedTabs);

    if (value === id) {
      setValue(updatedTabs[0].id); // 첫 번째 탭으로 이동
    }
  };

  const handleTabDelete = (event: React.MouseEvent, id: string) => {
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
              value={tab.id}
              deletable={tab.deletable}
              label={tab.label}
              icon={
                tab.deletable ? (
                  <TabDeleteButton
                    onClick={(event) => handleTabDelete(event, tab.id)}
                  >
                    <CloseIcon />
                  </TabDeleteButton>
                ) : null
              }
            />
          ))}
        </StyledTabs>
        <AddTabButton onClick={handleAddTab}>
          <AddIcon />
        </AddTabButton>
      </Box>
      {tabs.map((tab) => (
        <CustomTabPanel key={tab.id} value={value} index={tab.id}>
          <TabContent>{tab.content}</TabContent>
        </CustomTabPanel>
      ))}
    </Box>
  );
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
  justify-content: center;
  gap: 4px;
  padding: 8px;
  position: relative;
  /* height: 40px; */
  white-space: nowrap;
  width: auto;
  flex: none;
  overflow: hidden;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  /* 추가된 스타일 */
  & .MuiTab-wrapper {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 100%;
  }
`;
const TabDeleteButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 16px;
  color: #999;
  cursor: pointer;
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
