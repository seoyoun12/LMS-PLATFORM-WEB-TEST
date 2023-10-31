import React, { useState } from 'react'
import Me from '@components/traffic/me/MeLayout'
import { Box, Tab, Tabs } from '@mui/material'
import styled from '@emotion/styled'
import useDominMe from '@hooks/useDominMe'

import a11yProps from '@utils/a11yProps'
import StatusList from './StatusList'

export default function LearningStatus() {
  const { myLearningStatus } = useDominMe();
  const [tabIndex, setTabIndex] = useState(0);
    
  console.log(myLearningStatus?.data);
  const onChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  }
  return (
    <Me title="학습현황">
      <Wrapper>
        <StyledTabs value={tabIndex} onChange={onChangeTab} aria-label="basic tabs example">
          <Tab label="학습중인 과정" {...a11yProps(0)} />
          <Tab label="학습종료 과정" {...a11yProps(1)}/>
        </StyledTabs>
        {/* 학습중인지 아닌지에 따라 달라지는 Tab Items */}
        <StatusList list={myLearningStatus?.data} tabIndex={tabIndex} positive={true}/>
        <StatusList list={myLearningStatus?.data} tabIndex={tabIndex} positive={false}/>
      </Wrapper>
    </Me>
  )
}

const Wrapper = styled(Box)`
  width:100%;
  padding: 0 32px;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 380px;
  .MuiTab-root {
    width:100%;
    font-size: 1.25rem;
    font-weight: 500;
    color: #000;
    text-align: center;
    flex:1;
    &:hover {
      color: #000;
      opacity: 0.68;
    }
  }
  .Mui-selected {
    color: #000;
    border-bottom: 2px solid #2d63e2;
  }
  .MuiTabs-flexContainer {
    justify-content: space-around;
  }
`

const StyledTabs = styled(Tabs)`
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  .MuiTabs-flexContainer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
  .MuiTabs-root {
    
  }
`