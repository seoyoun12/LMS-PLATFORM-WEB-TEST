import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box,List,ListItem,ListItemButton,ListItemText } from '@mui/material';
import { Link } from '@components/common';
import { grey,red } from '@mui/material/colors';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { useMemo } from 'react';

interface AccordionList {
  date?: string | undefined;
  name: string;
  icon?: EmotionJSX.Element;
  children: {
    name: string;
    href?: string | null;
    isActive?: boolean;
  }[];
}
interface Props {
  accordionList: AccordionList[];
  activeIndex: number;
}

export function Accordion({ accordionList,activeIndex }: Props) {

  const indexColor = useMemo(() => {
    return activeIndex === 0 ? 'rgb(191,49,51)' : '#2d63e2'
  },[activeIndex])

  return (
    <>
      {accordionList.map(({ name, icon, children }) => (
        <MuiAccordion
          key={name}
          disableGutters
          elevation={0}
          sx={{
            width:'100%',
            display:'flex',
            flexDirection:'column',
            alignItems:'flex-start',
            borderBottom:`1px solid ${indexColor}`,
            '&:before': {
              display: 'none',
            },
          }}
        >
          
          <AccordionSummary
            className='Asdasd'
            expandIcon={<ExpandMoreIcon sx={{color:indexColor}} />}
            aria-controls='panel1a-content'
            sx={{
              width:'100%',
              '&:hover': {
                backgroundColor: grey[50],
              },
            }}
          >
            {icon}
            <Box display='flex' flexDirection={'column'}>
              <Typography className='CategoryBoardTwo' sx={{ color: indexColor }}>{name}</Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails sx={{padding:0, borderBottom:'1px solid #c7c7c7c7' }}>
            
              <List
                disablePadding={true}
                sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',padding:'1px'}}>
                {children.map(({ name, href, isActive }) => (
                  <Link href={href ? href : ''} color={grey[900]} key={name}>
                    <ListItem
                      sx={{
                        width:'289px',
                        backgroundColor: `${isActive ? indexColor : 'inherit'}`,
                        color: `${isActive ? 'white' : 'inherit'}`,
                        borderBottom:'1px solid #c7c7c7c7'
                      }}
                    > 
                      <ListItemText primary={name} sx={{fontWeight:'bold'}} />
                    </ListItem>
                  </Link>
                ))}
              </List>
            
          </AccordionDetails>
        </MuiAccordion>
      ))}
    </>
  );
}
