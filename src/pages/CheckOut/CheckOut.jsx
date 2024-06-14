// src/pages/CheckOut/CheckOut.js
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { setClearCart } from "../../redux/actions/cartActions";
import "./style.css";
const CheckOut = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let serviceType = "cartProducts";
  const cart = useSelector((state) =>
    serviceType === "cartProducts"
      ? state.cart.cartProducts?.cart
      : state.cart.cartServices?.cart
  );

  const calculateTotalPrice = () => {
    const cartProductPriceInCents = cart.reduce(
      (acc, item) => acc + (item.quantity * item.price * 100 || 0),
      0
    );

    if (cart?.length) {
      setTotalPrice(cartProductPriceInCents / 100);
    } else {
      setTotalPrice(0);
    }
  };

  // const calculateTotalPrice = () => {
  //   let cartProductPrice = 0;

  //   cart.forEach((cart) => {
  //     cartProductPrice += cart?.quantity * cart?.price || 0;
  //   });

  //   if (cart?.length) {
  //     setTotalPrice(Number(cartProductPrice.toFixed(2)));
  //   } else {
  //     setTotalPrice(0);
  //   }
  //   return null;
  // };

  useEffect(() => {
    if (cart?.length) {
      calculateTotalPrice();
    } else {
      setTotalPrice(0);
    }
  }, [cart]);

  useEffect(() => {
    if (elements) {
      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        cardElement.update({
          value: { number: "4242424242424242" },
        });
      }
    }
  }, [elements]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // 1. Create Payment Intent
    try {
      const paymentIntentResponse = await axios.post(
        "https://api.stripe.com/v1/payment_intents",
        {
          amount: Math.round(totalPrice * 100),
          currency: "usd",
          payment_method_types: ["card"],
          description: "Test Payment",
        },
        {
          headers: {
            Authorization: process.env.REACT_APP_StripeSKTest,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { client_secret } = paymentIntentResponse.data;

      // 2. Confirm Card Payment
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: cardElement,
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      // 3. Payment succeeded
      if (paymentIntent.status === "succeeded") {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
      setError("Failed to process payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      let serviceType = "cartProducts";
      dispatch(setClearCart(serviceType));
      navigate("/");
      Swal.fire({
        title: "Payment Success!",
        icon: "success",
      });
    } else if (error) {
      Swal.fire({
        title: "Payment Failed!",
        icon: "error",
      });
    }
  }, [success, error]);

  return (
    <Container maxWidth={"lg"} sx={{ marginTop: "3rem", marginBottom: "3rem" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              margin: " 0 auto",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f9f9f9",
              // height: '100%',
            }}
          >
            <Box
              sx={{
                padding: "1rem",
              }}
            >
              <Typography variant={"h6"}>Checkout</Typography>

              <Box
                sx={{
                  marginTop: "1rem",
                }}
              >
                <form onSubmit={handleSubmit}>
                  <CardElement />
                  <Button
                    sx={{ marginTop: "1rem" }}
                    variant="contained"
                    type="submit"
                    disabled={!stripe || loading || !cart.length}
                  >
                    {loading ? "Processing..." : `Pay $${totalPrice}`}
                  </Button>
                </form>
                {error && <Box style={{ color: "red" }}>{error}</Box>}
                {success && (
                  <Box style={{ color: "green" }}>Payment Successful!</Box>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              padding: "1rem",
              marginTop: "1rem",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ff000029",
            }}
          >
            <Typography
              sx={{
                lineHeight: "16px",
                fontSize: "12px",
                marginBottom: "1rem",
              }}
            >
              <strong>This is a test payment.</strong> You can use the payment
              information below to successfully make the test payment.
              <br />
              <strong>
                This payment information is legally shared by "Stripe" for
                testing purposes.
              </strong>
            </Typography>
            <Typography variant="body2">
              <strong>Card Number:</strong> 4242 4242 4242 4242
            </Typography>
            <Typography variant="body2">
              <strong>MM/YY:</strong> 12/34
            </Typography>
            <Typography variant="body2">
              <strong>CVC:</strong> 567
            </Typography>
            <Typography variant="body2">
              <strong>ZIP:</strong> 12345
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              borderRadius: "10px",
              height: "100%",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Box sx={{ padding: "1rem" }}>
              <Typography
                sx={{ borderBottom: "1px solid #efefef", marginBottom: "1rem" }}
                variant={"h6"}
              >
                Your Cart
              </Typography>
              {cart?.length ? (
                cart?.map((cartItem, idx) => {
                  return (
                    <Box sx={{ display: "flex", marginTop: "1rem" }}>
                      <img
                        src={cartItem?.bookImage}
                        alt="image"
                        width="75"
                        height="75"
                        style={{
                          minWidth: "75px",
                          minHeight: "75px",
                          borderRadius: "100%",
                          boxShadow: "0 0 3px #000000",
                          marginRight: "1rem",
                        }}
                      />
                      <Box sx={{ width: "100%" }}>
                        <Typography
                          variant="caption"
                          sx={{
                            width: "fit-content",
                            marginRight: "1rem",
                            lineHeight: "12px",
                          }}
                        >
                          {cartItem?.bookTitle}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            borderTop: "1px solid #cecece",
                            marginTop: ".5rem",
                            paddingTop: ".5rem",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ width: "fit-content", marginRight: ".5rem" }}
                          >
                            ${cartItem?.price}{" "}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ minWidth: "max-content" }}
                          >
                            {" "}
                            x {cartItem?.quantity}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ minWidth: "max-content", marginLeft: "auto" }}
                          >
                            {" "}
                            ${cartItem?.quantity * cartItem?.price}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <Typography variant="h5">Your Cart Is Empty!</Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckOut;
