import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Cart from "./cart/Cart.jsx";
import Checkout from "./Checkout.jsx";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Cart />
      <Checkout />
    </>
  );
};

export default RootLayout;
