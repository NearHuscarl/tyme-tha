import { PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import { AppBar } from "./AppBar";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box height="100vh" width="100%">
      <AppBar />
      {children}
    </Box>
  );
};
