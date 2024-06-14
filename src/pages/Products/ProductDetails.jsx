import {
  Box,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CartCounts from "../../components/Cart/CartCounts";

export default function ProductDetails() {
  const location = useLocation();
  const [loader, setLoader] = useState(true);
  const [productDetails, setProductDetails] = useState();
  const { product } = location.state || {};
  const { productId } = useParams();

  const getProductDetails = async () => {
    setLoader(true);
    try {
      const url = `https://all-books-api.p.rapidapi.com/isbn/${product?.bookIsbn}`;
      const response = await axios.get(url, {
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_XRapidApiKey,
          "x-rapidapi-host": process.env.REACT_APP_XRapidApiHost,
        },
      });

      setProductDetails(response.data);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getProductDetails();
  }, []);
  return (
    <Container maxWidth="lg" sx={{ marginTop: "3rem", marginBottom: "3rem" }}>
      {loader ? (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "calc(50% - 20px)",
            left: "calc(50% - 20px)",
          }}
        />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "600px",
                display: "flex",
                margin: "auto",
              }}
            >
              <CardMedia
                sx={{
                  width: "100%",
                  height: { xs: "600px" },
                  position: "relative",
                  backgroundSize: "contain !important;",
                  borderRadius: ".5rem",
                  overflow: "hidden",
                  "&:after": {
                    content: "''",
                    position: "absolute",
                    backgroundImage: `url(${product?.bookImage})`,
                    width: "500px",
                    height: "500px",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    left: "calc(50% - 250px)",
                    top: "calc(50% - 250px)",
                    borderRadius: "1rem",
                  },
                  "&:before": {
                    content: "''",
                    borderRadius: "1rem",
                    position: "absolute",
                    backgroundImage: `url(${product?.bookImage})`,
                    width: "100%",
                    height: "100%",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPositionX: "center",
                    backgroundPositionY: "top",
                    opacity: ".8",
                    filter: "blur(5px)",
                  },
                }}
                title="img"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  borderBottom: "1px solid #afafaf",
                  paddingBottom: ".25rem",
                }}
              >
                <strong>{productDetails?.name}</strong>
              </Typography>
              <Box sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
                <Typography variant="h6">
                  <strong>Title:</strong>
                  {productDetails?.bookTitle}
                </Typography>
                <Typography variant="h6">
                  <strong>Author:</strong> {productDetails?.bookAuthor}
                </Typography>
                <Typography variant="h6">
                  <strong>Publisher:</strong> {productDetails?.bookPublisher}
                </Typography>
                <Typography variant="h6">
                  <strong>Price:</strong> ${product?.price}
                </Typography>
                <Typography variant="h6">
                  <strong>Rank:</strong> {product?.bookRank}
                </Typography>
                <Typography variant="h6">
                  <strong>ISBN:</strong> {product?.bookIsbn}
                </Typography>
              </Box>

              <Typography variant="body1">
                <strong>Description:</strong>
                {productDetails?.bookDescription}
              </Typography>

              <Box sx={{ marginTop: "1rem" }}>
                <CartCounts item={product} itemId={product?.bookIsbn} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
