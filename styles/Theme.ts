import { createStyles, createTheme, makeStyles, Theme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      light: '#ff9a67',
      // main: '#ff5600',
      main: '#3498db',
      // dark: '#E92A00',
      dark: '#2774a7',
    },
    secondary: {
      light: '#93CCFF',
      main: '#2897FB',
      dark: '#0369E0',
    },
    neutral: {
      light: '#f5f5f5',
      main: '#eeeeee',
      dark: '#e0e0e0',
    },
  },
  typography: {
    fontFamily: [
      // '-apple-system',
      // 'BlinkMacSystemFont',
      // '"Segoe UI"',
      // 'Roboto',
      // '"Helvetica Neue"',
      // 'Arial',
      // '"Apple Color Emoji"',
      // '"Segoe UI Emoji"',
      // '"Segoe UI Symbol"',
      'Black-Han-Sans',
      'Noto-Sans-Kr',
      'sans-serif'
    ].join(','),
  },
  components: {
    MuiContainer: {
      defaultProps: {
        disableGutters: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

// Update the Button's color prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsColorOverrides {
    neutral: true;
  }
}

declare module '@mui/material/Link' {
  interface LinkPropsColorOverrides {
    neutral: true;
  }
}

export default theme;
