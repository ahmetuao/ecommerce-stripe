import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  createTheme,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFilter } from "../../redux/actions/filterActions";

export default function SearchArea() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const searchedTerm = useSelector((state) => state.filters.filters.search);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSearchTerm(value);
  };

  const handleSearch = () => {
    dispatch(setFilter("search", searchTerm));
    navigate("/products");
  };

  const theme = createTheme({
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "#ffffff",
            left: "-16px",
            "&.Mui-focused": {
              color: "#ffffff",
              // top: '10px'
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            paddingRight: "1.75rem",
            paddingLeft: "0",
            color: "#ffffff",
          },
          notchedOutline: {
            border: "none",
            borderRight: "1px solid white",
            borderRadius: "0",
            paddingTop: "1rem",
          },
        },
      },
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#004c9829",
        padding: ".75rem",
        margin: "1rem",
        borderRadius: ".5rem",
        position: "relative",
        boxShadow: "0px 1px 3px #ffffff",
      }}
    >
      <ThemeProvider theme={theme}>
        <>
          <Box sx={{ position: "relative" }}>
            <TextField
              sx={{
                width: "100%",
              }}
              value={searchTerm || ""}
              onChange={handleChange}
              name="search-product"
              id="outlined-basic"
              label="Search with title or author"
              variant="outlined"
              type="text"
            />
            {searchedTerm || searchTerm !== "" ? (
              <CloseIcon
                onClick={() => {
                  if (searchedTerm !== "") {
                    dispatch(setFilter("search", ""));
                    setSearchTerm("");
                  } else {
                    setSearchTerm("");
                  }
                }}
                sx={{
                  cursor: "pointer",
                  color: "#ffffff",
                  position: "absolute",
                  top: "calc(50% - 12px)",
                  right: ".25rem",
                }}
              />
            ) : null}
          </Box>
          <Button
            variant="contained"
            sx={{
              "&:hover": {
                ".search-icon": {
                  color: "white",
                },
              },
              borderRadius: "100%",
              width: "40px",
              height: "40px",
              minWidth: "unset",
              marginLeft: ".5rem",
              marginTop: "auto",
              marginBottom: "auto",
              background: "#ffffff",
            }}
            onClick={handleSearch}
          >
            <SearchIcon
              className="search-icon"
              sx={{ fontSize: "24px", color: "#1976d2" }}
              onClick={handleSearch}
            />
          </Button>
        </>
      </ThemeProvider>
    </Box>
  );
}
