import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from '@components/common';
import { useRouter } from 'next/router';
import { grey } from '@mui/material/colors';
import { CourseData } from '@common/api';

const Accordion =
  styled((props: AccordionProps) => (
      <MuiAccordion disableGutters elevation={0} square {...props} />
    )
  )(
    ({ theme }) => ({
      border: `1px solid ${theme.palette.divider}`,
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
    })
  );

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export function CurriculumAccordion({ curriculum }: { curriculum: CourseData['curriculum'] }) {
  const router = useRouter();
  const [ expanded, setExpanded ] = React.useState<number | false>(false);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      {curriculum.map(({ title, panel, contents }, idx) => (
        <Accordion expanded={expanded === panel} onChange={handleChange(panel)} key={idx}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <nav aria-label="secondary mailbox folders">
              <List>
                {contents.map(({ title }, idx) => (
                  <Link
                    href={`/course/${router.query['courseId']}/content/1`}
                    color={grey[900]}
                    key={idx}
                  >
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary={title} />
                      </ListItemButton>
                    </ListItem>
                    <>
                      {idx === (contents.length - 1) || <Divider light />}
                    </>
                  </Link>
                ))}
              </List>
            </nav>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
