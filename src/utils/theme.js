const defaultTheme = {
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    background: {
      paper: "rgba(98, 207, 161, 1)",
      default: "rgba(255, 255, 255, 1)",
    },
    primary: {
      light: "rgba(255, 176, 76, 1)",
      main: "rgba(245, 127, 23, 1)",
      dark: "rgba(188, 81, 0, 1)",
      contrastText: "rgba(0, 0, 0, 1)",
    },
    secondary: {
      light: "rgba(255, 125, 71, 1)",
      main: "rgba(230, 74, 25, 1)",
      dark: "rgba(172, 8, 0, 1)",
      contrastText: "rgba(0, 0, 0, 1)",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
  typography: {
    fontSize: 12,
  },
  overrides: {
    MuiDivider: {
      root: {
        backgroundColor: "rgba(245, 127, 23, 1)",
      },
    },
  },
};

const darkTheme = {
  palette: {
    common: {
      black: "rgba(0, 0, 0, 1)",
      white: "rgba(255, 255, 255, 1)",
    },
    background: {
      paper: "rgba(74, 74, 74, 1)",
      default: "rgba(0, 0, 0, 1)",
    },
    primary: {
      light: "rgba(224, 22, 22, 1)",
      main: "rgba(155, 155, 155, 1)",
      dark: "rgba(126, 211, 33, 1)",
      contrastText: "rgba(255, 255, 255, 1)",
    },
    secondary: {
      light: "rgba(255, 125, 71, 1)",
      main: "rgba(230, 74, 25, 1)",
      dark: "rgba(172, 8, 0, 1)",
      contrastText: "#fff",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(245, 166, 35, 1)",
      secondary: "rgba(255, 255, 255, 1)",
      disabled: "rgba(255, 255, 255, 1)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
  typography: {
    fontSize: 12,
  },
};

export { defaultTheme, darkTheme };
