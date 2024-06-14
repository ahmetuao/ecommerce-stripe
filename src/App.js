import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import CheckOut from "./pages/CheckOut/CheckOut";
import ProductDetails from "./pages/Products/ProductDetails";
import Products from "./pages/Products/Products";

const stripePromise = loadStripe(process.env.REACT_APP_StripePKTest);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route
            path="/products/:productId/details"
            element={<ProductDetails />}
          />
        </Route>
      </Routes>
    </Elements>
  );
}

export default App;
