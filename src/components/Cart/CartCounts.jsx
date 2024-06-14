import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setAddToCart,
  setDecrementQuantity,
  setIncrementQuantity,
  setRemoveFromCart,
} from "../../redux/actions/cartActions";

export default function CartCounts({ item, itemId }) {
  let serviceType = "cartProducts";
  const cart = useSelector((state) =>
    serviceType === "cartProducts"
      ? state.cart.cartProducts?.cart
      : state.cart.cartServices?.cart
  );

  const itemInCart = cart?.find((cartItem) => cartItem.bookIsbn === itemId);
  const itemCount = itemInCart ? itemInCart?.quantity : 0;


  const dispatch = useDispatch();

  const handleIncreaseCount = () => {
    dispatch(setIncrementQuantity(itemId, serviceType));
  };

  const handleDecreaseCount = () => {
    dispatch(setDecrementQuantity(itemId, serviceType));
  };

  const handleRemoveItem = () => {
    dispatch(setRemoveFromCart(itemId, serviceType));
  };

  const navigate = useNavigate();

  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        width: "fit-content",
        justifyContent: { xs: "flex-start", md: "center" },
        display: "flex",
        alignItems: "center",
        boxShadow:
          "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
      }}
    >
      {itemCount === 0 ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(setAddToCart(item, serviceType))}
        >
          Add
        </Button>
      ) : (
        <Box
          sx={{
            display: "flex",
            borderRadius: "4px",
            overflow: "hidden",
            alignItems: "center",
            boxShadow:
              "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
          }}
        >
          <Box
            onClick={handleDecreaseCount}
            sx={{
              padding: "1rem",
              boxSizing: "border-box",
              backgroundColor: "#bf0000",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {itemCount == 1 ? (
              <DeleteIcon
                sx={{ color: "#ffffff" }}
                onClick={handleRemoveItem}
              />
            ) : (
              `-`
            )}
          </Box>
          <Box
            sx={{
              marginLeft: ".5rem",
              marginRight: ".5rem",
              paddingLeft: ".5rem",
              paddingRight: ".5rem",
            }}
          >
            {itemCount}
          </Box>
          <Box
            onClick={handleIncreaseCount}
            sx={{
              padding: "1rem",
              boxSizing: "border-box",
              backgroundColor: "#bf0000",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            +
          </Box>
        </Box>
      )}
    </Box>
  );
}
