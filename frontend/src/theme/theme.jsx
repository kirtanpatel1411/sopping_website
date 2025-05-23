import { createTheme } from "@mui/material/styles";
// import { Button } from "./themecomponent.jsx";

const theme = createTheme({
  palette: {
    // mode: 'light',
    primary: {
      main: "#183D3D",
      // light: "#1e4f8c",
      // dark: "#0b2033",
    },
    secondary: {
      main: "#93B1A6",
      // contrastText: "#000000",
      // light: "#e2d9d1",
      // dark: "#a69b92",
    },
    alert: {
      main: "#FF0F0F",
    },
    text: {
      primary: "#000000",
      secondary: "#ffffff",
    },
    success: {
      main: "#28a745",
    },
    // divider: "rgba(0, 0, 0, 0.12)",
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
  // components: {
  //   Button,
  //   Card: {
  //     styleOverrides: {
  //       root: {
  //         backgroundColor: "#ffffff",
  //       },
  //     },
  //   },
  //   MuiCssBaseline: {
  //     styleOverrides: {
  //       "*::-webkit-scrollbar": {
  //         width: "7px",
  //         height: "7px",
  //       },
  //       "*::-webkit-scrollbar-thumb": {
  //         backgroundColor: "#123458",
  //       },
  //       "*::-webkit-scrollbar-track": {
  //         backgroundColor: "#D4C9BE",
  //       },
  //       "@supports (-moz-appearance: none)": {
  //         "*": {
  //           scrollbarColor: "#123458 #D4C9BE",
  //         },
  //       },
  //     },
  //   },
  // },
  breakpoints: {
    xs: 375,
    ssm: 541, 
    sm: 769,
    md: 931,
    lg: 1240,
    xl: 1440,
    xxl: 1536,
  },
});

export default theme;
// import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#123458",
//       contrastText: "#D4C9BE",
//     },
//     secondary: {
//       main: "#D4C9BE",
//       contrastText: "#000000",
//     },
//   },
//   });

//export default theme;
