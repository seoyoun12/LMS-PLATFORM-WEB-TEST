import * as React from 'react';
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Link } from '@components/common';
import { grey } from '@mui/material/colors';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import dateFormat from 'dateformat';
import styled from '@emotion/styled';

interface AccordionList {
  // date?: string | undefined;
  name: string;
  icon?: EmotionJSX.Element;
  children: {
    name: string;
    grandChildren?: {
      href?: string | null;
      isActive?: boolean;
    };
  }[];
}

export function Accordion({
  accordionList,
}: {
  accordionList: AccordionList[];
}) {
  return (
    <>
      {accordionList.map(({ name, icon, children }) => (
        <MuiAccordion
          key={name}
          disableGutters
          elevation={0}
          sx={{
            '&:before': {
              display: 'none',
            },
          }}
        >
          <AccordionSummary
            className='Asdasd'
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            sx={{
              '&:hover': {
                backgroundColor: grey[50],
              },
            }}
          >
            {icon}
            <Box display='flex' flexDirection={'column'} width='100%'>
              <Typography className='CategoryBoardTwo'>{name}1</Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails sx={{ background: grey[100] }}>
            <nav aria-label='secondary mailbox folders'>
              <List disablePadding={true}>
                {children.map(({ name: childName, grandChildren }) => (
                  <React.Fragment key={childName}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <AccordionSummary
                          className='Asdasd'
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls='panel1a-content'
                          sx={{
                            '&:hover': {
                              backgroundColor: grey[50],
                            },
                          }}
                        >
                          {icon}
                          <Box
                            display='flex'
                            flexDirection={'column'}
                            width='100%'
                          >
                            <Typography className='CategoryBoardTwo'>
                              {childName}1
                            </Typography>
                          </Box>
                        </AccordionSummary>
                      </ListItemButton>
                    </ListItem>

                    <List disablePadding>
                      {grandChildren.map(
                        ({ name: grandChildName, href, isActive }) => (
                          <Link
                            href={href ? href : ''}
                            color={grey[900]}
                            key={grandChildName}
                          >
                            <ListItem
                              disablePadding
                              sx={{
                                backgroundColor: `${
                                  isActive ? grey[50] : 'inherit'
                                }`,
                              }}
                            >
                              <ListItemButton>
                                <ListItemText primary={grandChildName} />
                              </ListItemButton>
                            </ListItem>
                          </Link>
                        )
                      )}
                    </List>
                  </React.Fragment>
                ))}
              </List>
            </nav>
          </AccordionDetails>
        </MuiAccordion>
      ))}
    </>
  );
}
