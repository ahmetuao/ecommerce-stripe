import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartCounts from "../../Cart/CartCounts";

export default function CartHeader() {
  const [openCartMenu, setOpenCartMenu] = useState(false);
  let serviceType = "cartProducts";
  const cart = useSelector((state) =>
    serviceType === "cartProducts"
      ? state.cart.cartProducts?.cart
      : state.cart.cartServices?.cart
  );

  const calculateTotalQuantity = () => {
    let cartProductQuantity = 0;

    cart.forEach((cart) => {
      cartProductQuantity += cart?.quantity || 0;
    });

    return cart.length ? Number(cartProductQuantity) : null;
  };

  const calculateTotalPrice = () => {
    let cartProductPrice = 0;

    cart.forEach((cart) => {
      cartProductPrice += cart?.quantity * cart?.price || 0;
    });

    return cart.length ? Number(cartProductPrice.toFixed(2)) : null;
  };

  const cartRef = useRef();
  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setOpenCartMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Box
        ref={cartRef}
        sx={{
          position: "relative",
          marginRight: { xs: "0", md: "2rem" },
          cursor: "pointer",
          minWidth: { xs: "fit-content", md: "300px" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{ position: "relative" }}
          onClick={() => setOpenCartMenu(!openCartMenu)}
        >
          <ShoppingCartIcon sx={{ fontSize: "32px" }} />
          {calculateTotalQuantity() > 0 ? (
            <Box
              sx={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                zIndex: 99,
                backgroundColor: "#bf0000",
                color: "#ffffff",
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "100%",
              }}
            >
              <Typography variant="body1">
                {calculateTotalQuantity()}
              </Typography>
            </Box>
          ) : null}
        </Box>
        {openCartMenu ? (
          <Box
            sx={{
              position: "absolute",
              top: "50px",
              right: { xs: "calc(50% - 48vw)", md: "0" },
              boxSizing: { xs: "border-box", md: "content-box" },
              width: { xs: "96vw", md: "100%" },
              zIndex: 99,
              background: "#ffffff",
              color: "#000000",
              padding: calculateTotalQuantity() > 0 ? ".5rem" : "2rem",
              paddingBottom: calculateTotalQuantity() > 0 ? "0" : "2rem",
              borderRadius: ".25rem",
              minWidth: { xs: "unset", md: "max-content" },
              boxShadow: "0px 0px 3px #909090",
            }}
          >
            {calculateTotalQuantity() > 0 ? (
              <Box>
                <Box
                  sx={{
                    maxHeight: "480px",
                    height: "100%",
                    overflow: "auto",
                  }}
                >
                  {cart?.map((item, idx) => {
                    return (
                      <Box
                        onClick={() =>
                          navigate(`/products/${item?.bookIsbn}/details`, {
                            state: {
                              product: item,
                            },
                          })
                        }
                        sx={{
                          "&:hover": {
                            background: "#f1f1f1",
                          },
                          display: "flex",
                          borderRadius: ".25rem",
                          padding: "1rem",
                          borderBottom:
                            cart?.length !== idx + 1
                              ? "1px solid #eaeaea"
                              : "unset",
                        }}
                      >
                        <img
                          style={{
                            borderRadius: "100%",
                            minWidth: "110px",
                            marginRight: "1rem",
                            boxShadow: "0 0 3px #000000",
                          }}
                          src={item.bookImage}
                          width={110}
                          height={110}
                        />
                        <Box>
                          <Box sx={{ marginBottom: ".5rem" }}>
                            <Typography
                              sx={{
                                borderBottom: "1px solid #efefef",
                                marginBottom: ".5rem",
                              }}
                            >
                              {item.bookTitle}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "top" }}>
                              <Typography sx={{ marginRight: ".25rem" }}>
                                <strong>$ {item.price}</strong>
                              </Typography>
                              <Typography variant="caption">
                                x {item.quantity}
                              </Typography>
                            </Box>
                          </Box>

                          <CartCounts item={item} itemId={item.bookIsbn} />
                        </Box>
                      </Box>
                    );
                  })}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "1rem",
                    padding: "1rem",
                    borderTop: "1px solid #cecece",
                  }}
                >
                  <Typography
                    sx={{ display: "flex" }}
                    color="error"
                    variant="h6"
                  >
                    Total Price:
                    <Typography
                      sx={{ color: "#000000", marginLeft: ".25rem" }}
                      variant="h6"
                    >
                      ${calculateTotalPrice()}
                    </Typography>
                  </Typography>
                  <Button
                    onClick={() => (
                      navigate("/checkout"), setOpenCartMenu(false)
                    )}
                    variant="contained"
                  >
                    <strong>Pay Now</strong>
                  </Button>
                </Box>
              </Box>
            ) : (
              <Typography sx={{ textAlign: "center" }} variant="h6">
                Basket Empty!
              </Typography>
            )}
          </Box>
        ) : null}
      </Box>
    </>
  );
}
