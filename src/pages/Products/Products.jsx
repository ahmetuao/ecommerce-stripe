import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import Filters from "../../components/Products/Filters/Filters";
import ProductCards from "../../components/Products/ProductCards/ProductCards";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchListItems } from "../../redux/actions/actions";
import SearchArea from "../../components/Header/SearchArea";
import { useTheme } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import { Height } from "@mui/icons-material";
import FilterListIcon from "@mui/icons-material/FilterList";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Products() {
  const [loading, setLoading] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [filtersCount, setFiltersCount] = useState(null);
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters.filters);

  useEffect(() => {
    dispatch(fetchListItems());
  }, []);

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });

  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const targetRef = useRef();

  useEffect(() => {
    if (filters) {
      let publisherFiltersCount = filters?.publishers.length;
      let authorFiltersCount = filters?.authors.length;
      setFiltersCount(publisherFiltersCount + authorFiltersCount);
    }
  }, [filters]);
  return (
    <Container maxWidth="xl" sx={{ marginTop: "3rem", marginBottom: "3rem" }}>
      <Grid container spacing={3}>
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <SearchArea />
          {mobile ? (
            <Box
              sx={{
                position: "relative",
                right: "16px",
                height: "fit-content",
              }}
              onClick={handleOpen}
            >
              <FilterListIcon sx={{ color: "#1976d2" }} />
              {filtersCount ? (
                <Typography
                  sx={{
                    position: "absolute",
                    top: "-12px",
                    right: "-12px",
                    width: "18px",
                    height: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#1976d2",
                    color: "#ffffff",
                    borderRadius: "100%",
                  }}
                >
                  {filtersCount}
                </Typography>
              ) : null}
            </Box>
          ) : null}
        </Box>
        <ThemeProvider theme={theme}>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={
                mobile
                  ? {
                      ...style,
                      maxWidth: "100%",
                      display: "flex",
                      flexDirection: "column",
                      boxSizing: "border-box",
                    }
                  : style
              }
            >
              <Filters
                openFilters={openFilters}
                setOpenFilters={setOpenFilters}
              />
              <Button
                sx={{ marginTop: "auto" }}
                fullWidth
                onClick={() => (
                  handleClose(),
                  targetRef.current.scrollIntoView({ behavior: "smooth" })
                )}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
              <CloseIcon
                sx={{ position: "absolute", top: ".5rem", right: ".5rem" }}
                onClick={handleClose}
              />
            </Box>
          </Modal>
          {!mobile ? (
            <Grid item xs={12} sm={4} md={3}>
              <Filters
                openFilters={openFilters}
                setOpenFilters={setOpenFilters}
              />
            </Grid>
          ) : null}
        </ThemeProvider>

        <ProductCards targetRef={targetRef} />
      </Grid>
    </Container>
  );
}
