import { PropsWithChildren } from "react";
import grey from "@mui/material/colors/grey";
import amber from "@mui/material/colors/amber";
import purple from "@mui/material/colors/purple";
import {
  ThemeProvider as ThemeProvider2,
  createTheme,
} from "@mui/material/styles";

export type TMuiColor = Record<keyof typeof grey, string>;

declare module "@mui/material/styles/createTheme" {
  interface Theme {
    yourCustomProp: {
      nestedProp: {
        color?: string;
        fontSize?: number;
      };
    };
  }
  interface ThemeOptions {
    yourCustomProp?: {
      nestedProp: {
        color?: string;
        fontSize?: number;
      };
    };
  }
}
declare module "@mui/material/styles/createPalette" {
  interface SimplePaletteColorOptions {
    color?: TMuiColor;
  }
  interface PaletteColor {
    color: TMuiColor;
  }
}

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: purple,
    secondary: amber,
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: "small",
        sx: { fontWeight: "semibold" },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 40,
        },
      },
    },
  },
});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return <ThemeProvider2 theme={theme}>{children}</ThemeProvider2>;
};
