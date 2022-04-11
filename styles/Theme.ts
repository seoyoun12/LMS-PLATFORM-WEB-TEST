import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      light: '#ff9a67',
      main: '#ff5600',
      dark: '#E92A00',
    },
    secondary: {
      light: '#93CCFF',
      main: '#2897FB',
      dark: '#0369E0',
    },
    neutral: {
      light: '#616161',
      main: '#424242',
      dark: '#212121',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
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
