import { Tab, Tabs } from '@mui/material'
import a11yProps from '@utils/a11yProps';
import React, { memo } from 'react'

interface Props {
  tabIndex: number;
  onTabChange: (e: React.SyntheticEvent, newValue: number) => void;
  quizLength: number;
}

function TabButtons({tabIndex, onTabChange, quizLength}:Props) {
  return (
    <Tabs value={tabIndex} onChange={onTabChange} aria-label="basic tabs example" sx={{padding:'0 1rem'}}>
    {
     Array.from({length: quizLength + 1}).map((_,index) => 
    <Tab
      key={index}
      label={index === quizLength ? '생성' : `퀴즈 ${index+1}`}
      {...a11yProps(index)}
      sx={{flex:1}}
      />)
    }
    </Tabs>
  )
}

export default memo(TabButtons);