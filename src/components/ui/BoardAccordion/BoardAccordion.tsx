import * as React from 'react';
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from '@components/common';
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
    href?: string | null;
    isActive?: boolean;
  }[];
}

export function BoardAccordion({ boardAccordionList }: { boardAccordionList: BoardAccordionAccordionList[] }) {
  return (
    <>
      {boardAccordionList.map(({ date, name, icon, children }, idx) => (
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
            <Box display="flex" flexDirection={"column"} width="100%" >
              <Typography className='CategoryBoardOne'>{dateFormat(date, 'isoDate')}</Typography>
              <Typography className='CategoryBoardTwo'>{name}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <nav aria-label="secondary mailbox folders">
              <List disablePadding={true}>
                {children.map(({ name, href, isActive }, idx) => (
                  <Link
                    href={href ? href : ''}
                    color={grey[900]}
                    key={name}
                  >
                    <ListItem
                      disablePadding
                      sx={{
                        backgroundColor: `${isActive ? grey[50] : 'inherit'}`,
                      }}
                    >
                      <ListItemButton>
                        <ListItemText primary={name} />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                ))}
              </List>
            </nav>
          </AccordionDetails>
        </MuiAccordion>
      ))}
    </>
  );
}



// const Box1 = styled(Box)`
//   .CategoryBoardOne {
//     color: #a59d9d;
//   }

//   .CategoryBoardTwo {
//     font-weight: bold;
//     font-size: 1.3rem;
//     border-bottom: 1px solid lightgray;
//     width: 100%;
//     padding-bottom: 20px;
//   }
// `