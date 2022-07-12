import styled from '@emotion/styled';
import { Container, Typography } from '@mui/material';
import styles from '@styles/common.module.scss';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import React, {Component} from 'react'
import { Calendar } from '@fullcalendar/core'
// import timeGridPlugin from '@fullcalendar/timegrid'

export function CNCalendar() {
  
  const [ value, onChange ] = useState(new Date());

  return (
    <Container className={styles.globalContainer}>
      <div className="App">
        {/* <FullCalendar 
          defaultView="dayGridMonth" 
          plugins={[ dayGridPlugin ]}
        /> */}
        
        <Typography>캘캘캘린더</Typography>
        <Typography>★</Typography>
        <Typography>★★</Typography>
        <Typography>★★★</Typography>
        <Typography>★★★★</Typography>
        <Typography>★★★★★</Typography>
        <Typography>★★★★★★</Typography>
        <Typography>★★★★★★★</Typography>
        <Typography>★★★★★★</Typography>
        <Typography>★★★★★</Typography>
        <Typography>★★★★</Typography>
        <Typography>★★★</Typography>
        <Typography>★★</Typography>
        <Typography>★</Typography>

      </div>
    </Container>
  )
}