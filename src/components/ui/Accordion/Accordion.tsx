import * as React from 'react';
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from '@components/common';
import { grey } from '@mui/material/colors';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

interface AccordionList {
  title: string;
  icon: EmotionJSX.Element;
  contents: {
    name: string;
    href: string;
  }[];
}

export default function Accordion({ accordionList }: { accordionList: AccordionList[] }) {
  return (
    <>
      {accordionList.map(({ title, icon, contents }, idx) => (
        <MuiAccordion
          disableGutters elevation={0}
          sx={{
            '&:before': {
              display: 'none',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            sx={{
              '&:hover': {
                backgroundColor: grey[50]
              }
            }}
          >
            {icon}
            <Typography>{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <nav aria-label="secondary mailbox folders">
              <List disablePadding={true}>
                {contents.map(({ name, href }, idx) => (
                  <Link
                    href={href}
                    color={grey[900]}
                    key={idx}
                  >
                    <ListItem disablePadding>
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
