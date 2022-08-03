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

interface BoardAccordionAccordionList {
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
    <>
      {/* {boardAccordionList.map(({ date, name, icon, children }, idx) => ( */}
      {boardAccordionList.map(({ date, name, icon, children }) => (
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
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            sx={{
              '&:hover': {
                backgroundColor: grey[50]
              }
            }}
          >
            {icon}
            <BoardBox display="flex" flexDirection={"column"} width="100%" >
              <Typography className='CategoryBoardOne'>{dateFormat(date, 'isoDate')}</Typography>
              <Typography className='CategoryBoardTwo'>{name}</Typography>
            </BoardBox>
          </AccordionSummary>
          <BoardAccordionDetails>
            <nav aria-label="secondary mailbox folders">
              <List disablePadding={true}>
                {/* {children.map(({ name, isActive }, idx) => ( */}
                {children.map(({ name, isActive }) => (
                  <ListItem
                    disablePadding
                    key={name} // key props error
                    sx={{
                      backgroundColor: `${isActive ? grey[50] : 'inherit'}`,
                    }}
                  >
                    <ListItemButton>
                      <ListItemText primary={name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </nav>
          </BoardAccordionDetails>
        </MuiAccordion>
      ))}
    </>
  );
}


const BoardBox = styled(Box)`
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