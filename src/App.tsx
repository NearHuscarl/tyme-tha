import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { AppRoutes } from "app/routes";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryProvider } from "app/providers/QueryProvider";
import { ThemeProvider } from "app/providers/ThemeProvider";

function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
