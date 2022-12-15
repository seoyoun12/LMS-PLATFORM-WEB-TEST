import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { SxProps } from '@mui/system';
import useResponsive from '@hooks/useResponsive';

export interface CSRTabs2Props {
  tabsConfig: {
    label: string;
    value: string;
    onClick?: () => void;
  }[];
  showBorderBottom?: boolean;
  variant?: 'fullWidth' | 'standard' | 'scrollable';
  gap?: number;
  rendering?: boolean;
  onChange?: (newValue: string) => void;
  value?: string;
  fontSx?: SxProps;
  // scrollable?: boolean;
  showIndicator?: boolean;
  responsiveWidth?: number;
}

//variant 속성이 명시되어 있어도 reponseWitdh가 정의되어 있다면 variant: scrollable이 강제됩니다.

export default function CSRTabs2({
  tabsConfig,
  showBorderBottom = true,
  variant = 'standard',
  gap,
  rendering = true,
  onChange,
  value,
  fontSx,
  // scrollable = false,
  showIndicator = true,
  responsiveWidth = 1,
  ...props
}: CSRTabs2Props) {
  const router = useRouter();
  const { pathname, query } = router;
  const [cssValue, setCssValue] = useState<{ variant: string; gap: number }>({
    variant: 'standard',
    gap: 0,
  });
  const isMobile = useResponsive(responsiveWidth);

  useEffect(() => {
    if (!router.query.tab && rendering) {
      router.replace({
        pathname,
        query: {
          ...router.query,
          tab: tabsConfig[0].value,
        },
      });
    }
  }, [pathname, router]);

  const handleChange = useCallback(
    (event: SyntheticEvent, newValue: string) => {
      if (!rendering && onChange) {
        onChange(newValue);
      } else {
        router.push({
          pathname,
          query: {
            ...router.query,
            tab: newValue,
          },
        });
      }
    },
    [pathname, router]
  );
  useLayoutEffect(() => {
    setCssValue({ variant: variant, gap: gap });
  }, [variant, gap]);

  return (
    <TabBox
      sx={
        showBorderBottom
          ? {
              width: '100%',
              borderBottom: 1,
              borderColor: 'divider',
            }
          : null
      }
      variant={cssValue.variant}
      gap={cssValue.gap}
      {...props}
    >
      <MuiTabs
        className="mui-tabs"
        value={query.tab || value || tabsConfig[0].value}
        onChange={handleChange}
        aria-label="basic tabs example"
        variant={!isMobile ? 'scrollable' : variant}
        scrollButtons={!isMobile ? true : false}
        allowScrollButtonsMobile={!isMobile ? true : false}
        TabIndicatorProps={{ style: { display: !showIndicator && 'none' } }}
      >
        {tabsConfig.map(({ value, label, onClick }) => (
          <MuiTab
            key={value}
            className="mui-tabs-item"
            label={label}
            onClick={onClick}
            value={value}
            sx={{ ...fontSx, flexGrow: !isMobile ? '1' : '' }}
          />
        ))}
      </MuiTabs>
    </TabBox>
  );
}

const TabBox = styled(Box)<{ variant: string; gap?: number }>`
  .mui-tabs {
    display: flex;
  }

  .mui-tabs-item {
    margin: ${({ variant, gap }) =>
      variant === 'fullWidth' && gap ? `0 ${gap}rem` : '0'};
  }

  .MuiButtonBase-root {
    @media (max-width: 1024px) {
      font-size: 16px;
      padding: 0;
    }
  }
`;
