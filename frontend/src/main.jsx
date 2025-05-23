import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.scss";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { CartProvider } from "./context/cartcontext.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme.jsx";
import { CssBaseline } from '@mui/material';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CartProvider>
            <CssBaseline />
            <App />
          </CartProvider>
        </Provider>
    </ThemeProvider>
  </StrictMode>
);
