import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import noImage from "../../../assets/images/no-image.webp";
import CartCounts from "../../Cart/CartCounts";

export default function ProductCard({ product }) {
  const [isValidImage, setIsValidImage] = useState(null);

  useEffect(() => {
    const image = new Image();
    image.src = product.bookImage;
    image.onload = () => setIsValidImage(true);
    image.onerror = () => setIsValidImage(false);
  }, [product?.bookImage]);

  const navigate = useNavigate();
  return (
    <Grid key={product?.bookIsbn} item xs={12} md={6} lg={4} xl={4}>
      <Card
        sx={{
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          sx={{
            display: isValidImage !== null ? "block" : "none",
            height: 240,
            position: "relative",
            backgroundSize: "contain !important;",
            overflow: "hidden",
            ...(isValidImage
              ? {
                  "&:after": {
                    content: "''",
                    position: "absolute",
                    backgroundImage: `url(${product?.bookImage})`,
                    width: "90%",
                    height: "200px",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    marginLeft: "5%",
                    marginTop: "20px",
                  },
                  "&:before": {
                    content: "''",
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
                }
              : {
                  "&:after": {
                    content: "''",
                    position: "absolute",
                    backgroundImage: `url(${noImage})`,
                    width: "100%",
                    height: "100%",
                    backgroundSize: "contain",
                    backgroundPositionX: "center",
                    backgroundPositionY: "top",
                  },
                }),
          }}
          title="img"
        />
        {isValidImage === null ? (
          <Skeleton
            sx={{
              height: 240,
              transform: "scale(1)",
              position: "relative",
              overflow: "hidden",
            }}
          ></Skeleton>
        ) : null}
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product?.bookTitle}
          </Typography>
          <Typography
            sx={{
              display: "-webkit-box" /* or inline-block */,
              textOverflow: "ellipsis",
              wordWrap: "break-word",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              maxHeight: "3.6em",
              lineHeight: "1.8em",
            }}
            gutterBottom
            variant="body1"
            component="div"
          >
            {product?.bookDescription}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            <strong>Author:</strong> {product?.bookAuthor}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            <strong>Publisher:</strong> {product?.bookPublisher}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                marginTop: "1rem",
              }}
              variant="body2"
              color="text.secondary"
            >
              <strong>Rank: </strong>
              {product?.bookRank}
            </Typography>
            <Typography
              color={"primary"}
              variant="h6"
              sx={{ marginTop: "1rem" }}
            >
              $ {product?.price}
            </Typography>
          </Box>
        </CardContent>
        <CardActions
          sx={{ padding: "0", marginTop: "auto" }}
          onClick={() =>
            navigate(`/products/${product?.bookIsbn}/details`, {
              state: {
                product: product,
              },
            })
          }
        >
          <Typography
            sx={{
              cursor: "pointer",
              margin: "auto",
              borderTop: "1px solid #efefef",
              borderBottom: "1px solid #efefef",
              width: "100%",
              padding: ".25rem .5rem",
              margin: ".25rem 3rem",
              textAlign: "center",
            }}
            color="primary"
            variant="body1"
          >
            See details
          </Typography>
        </CardActions>
        <CardActions
          sx={{
            // marginTop: "auto",
            justifyContent: "center",
            padding: "1rem 0 1.5rem 0",
          }}
        >
          <CartCounts item={product} itemId={product?.bookIsbn} />
        </CardActions>
      </Card>
    </Grid>
  );
}
