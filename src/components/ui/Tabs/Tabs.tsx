import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { SyntheticEvent, useCallback, useEffect } from 'react';

interface TabsConfig {
  label: string;
  value: string;
}

export function Tabs({ tabsConfig }: { tabsConfig: TabsConfig[] }) {
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
  }, []);

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
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        width: '100%',
      }}
    >
      <MuiTabs
        value={query.tab}
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
