import {
  Box,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
  styled,
  useMediaQuery,
} from "@mui/material";
import Authors from "./Authors";
import Publisher from "./Publisher";
import Sort from "./Sort";
import { useTheme } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";

export default function Filters({ openFilters, setOpenFilters }) {
  let stying = {
    position: "sticky",
    top: "30px",
    left: "0",
    maxWidth: "100%",
    overflow: "auto",
    height: "calc(100vh - 120px)",
    boxSizing: "border-box",
  };
 
  return (
      <Box sx={stying}>
        <Sort />
        <Authors />
        <Publisher />
      </Box>
  );
}
