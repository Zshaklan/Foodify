import Button from "./UI/Button";
import appLogoImg from "../assets/logo.jpg";
import userLogo from "../assets/user.svg";
import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import { Link, useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../utils/formatting.js";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const { setCurrentUser, currentUser } = useContext(UserProgressContext);
  const userProgressCtx = useContext(UserProgressContext);
  const { sendRequest } = useHttp(`${BASE_API_URL}/api/auth/user/logout`, {
    method: "POST",
  });

  const navigate = useNavigate();

  const totalCartItems = cartCtx.cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  function handleCartClick() {
    userProgressCtx.showCart();
  }

  async function handleLogout() {
    try {
      await sendRequest();
      setCurrentUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <header id="main-header">
      <Link to={"/"}>
        <div id="title">
          <img src={appLogoImg} alt="app-logo" />
          <h1>Foodify</h1>
        </div>
      </Link>

      {currentUser && (
        <nav>
          <Button onClick={handleCartClick} textOnly>
            Cart ({totalCartItems})
          </Button>
          <Button onClick={handleLogout}>Logout</Button>

          <Link to={"/profile"}>
            <Button className="user">
              <img src={userLogo} alt="userImg" />
            </Button>
          </Link>
        </nav>
      )}
    </header>
  );
}
