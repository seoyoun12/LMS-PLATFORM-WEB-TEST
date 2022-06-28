import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { SyntheticEvent, useCallback, useEffect } from 'react';

interface Props {
  tabsConfig: {
    label: string;
    value: string;
  }[];
  showBorderBottom?: boolean;
}


export function Tabs({ tabsConfig, showBorderBottom = true, ...props }: Props) {
  const router = useRouter();
  const { pathname, query } = router;

  useEffect(() => {
    if (!query.tab) {
      router.replace({
        pathname,
        query: {
          ...query,
          tab: tabsConfig[0].value
        }
      });
    }
  }, [ pathname, query, tabsConfig ]);

  const handleChange = useCallback((event: SyntheticEvent, newValue: string) => {
    router.push({
      pathname,
      query: {
        ...query,
        tab: newValue
      }
    });
  }, [ pathname, query ]);

  return (
    <Box
      sx={
        showBorderBottom
          ? {
            width: '100%',
            borderBottom: 1,
            borderColor: 'divider'
          }
          : null
      }
      {...props}
    >
      <MuiTabs
        value={query.tab || tabsConfig[0].value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        {tabsConfig.map(({ value, label }) =>
          <MuiTab key={value} label={label} value={value} />
        )}
      </MuiTabs>
    </Box>
  );
}
