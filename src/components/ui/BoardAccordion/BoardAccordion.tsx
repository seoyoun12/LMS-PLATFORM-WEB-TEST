import * as React from 'react';
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { grey } from '@mui/material/colors';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import dateFormat from 'dateformat';
import styled from '@emotion/styled';
import { width } from '@mui/system';

interface BoardAccordionAccordionList {
  seq: number;
  date?: string | undefined;
  name: string;
  icon?: EmotionJSX.Element;
  children: {
    name: string;
    isActive?: boolean;
  }[];
}

export function BoardAccordion({ boardAccordionList }: { boardAccordionList: BoardAccordionAccordionList[] }) {
  return (
    <Wrap>
      {/* {boardAccordionList.map(({ date, name, icon, children }, idx) => ( */}
      {boardAccordionList.map(({ seq ,date, name, icon, children }) => (
        <MuiAccordion
          key={name}
          disableGutters elevation={0}
          sx={{
            '&:before': {
              display: 'none',
            },
          }}
        >
          <AccordionSummary className='Asdasd'
            expandIcon={<ExpandMoreIcon sx={{position:'absolute' , width:'100px'}} />}
            aria-controls="panel1a-content"
            sx={{
              padding:0,
              '&:hover': {
                backgroundColor: grey[50]
              }
            }}
          >
            {icon}
            <BoardBox >
              <Typography width='10%' textAlign='center' >{seq}</Typography>
              <Typography width='70%' paddingLeft='1rem' >{name}</Typography>
              <Typography width='20%' textAlign='center' >{dateFormat(date, 'isoDate')}</Typography>
            </BoardBox>
          </AccordionSummary>
          <BoardAccordionDetails>
            <nav aria-label="secondary mailbox folders">
              <List disablePadding={true}>
                {/* {children.map(({ name, isActive }, idx) => ( */}
                {children.map(({ name, isActive }) => (
                  <BoardContentBox
                    key={name} // key props error
                    sx={{
                      // backgroundColor: `${isActive ? grey[50] : 'inherit'}`,
                    }}
                  >
                    <Box>
                      <Box>{name}</Box>
                    </Box>
                  </BoardContentBox>
                ))}
              </List>
            </nav>
          </BoardAccordionDetails>
        </MuiAccordion>
      ))}
    </Wrap>
  );
}

const Wrap = styled(Box)`
  .MuiAccordionSummary-expandIconWrapper{
    position:absolute;
    right:0;
    width:100px;
    height:24px;
    }
`

const BoardBox = styled(Box)`
  display:flex;
  align-items:center;
  width:100%;
  height:85px;
  .CategoryBoardOne {
    color: #a59d9d;
  }

  .CategoryBoardTwo {
    font-weight: bold;
    font-size: 1.3rem;
    width: 100%;
  }
`

const BoardAccordionDetails = styled(AccordionDetails)`
  background-color: #e0e0e0;
  padding: 0px;
  margin-bottom: 30px;
`
const BoardContentBox = styled(Box)`
  padding:2rem;
`