import { useContext, useState } from "react";
import Button from "../UI/Button";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import { UserProgressContext } from "../../store/UserProgressContext";
import Header from "../Header";
import { API_URL } from "../../config/api";

const Register = () => {
  const [mode, setMode] = useState("Login");
  const { setCurrentUser } = useContext(UserProgressContext);
  const { sendRequest, isLoading, error, data } = useHttp(
    `${API_URL}/api/auth/user/${mode.toLowerCase()}`,
    { method: "POST" }
  );
  const navigate = useNavigate();

  function handleMode() {
    setMode((prevMode) => {
      return prevMode === "Login" ? "Register" : "Login";
    });
  }

  async function handleLogin(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const body = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const resData = await sendRequest(body);
    setCurrentUser(resData.user);
    navigate("/");
  }

  async function handleRegister(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const body = {
      fullName: formData.get("fullname"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
    };

    const resData = await sendRequest(body);
    console.log(resData);
    setCurrentUser(resData.user);
    navigate("/");
  }

  return (
    <>
      <Header />
      <div className="register">
        <div className="mode">
          <h1>{mode}</h1>
          <Link to={mode === "Login" ? "/register" : "/login"}>
            <Button onClick={handleMode}>
              {mode === "Login" ? "Register" : "Login"}
            </Button>
          </Link>
        </div>

        <form onSubmit={mode === "Login" ? handleLogin : handleRegister}>
          {mode === "Register" && (
            <>
              <div className="control">
                <label htmlFor="fullname">Fullname</label>
                <input type="text" id="fullname" name="fullname" />
              </div>
              <div className="control">
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" name="phone" />
              </div>
            </>
          )}
          <div className="control">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="control">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <Button disabled={isLoading}>
            {isLoading
              ? mode === "Login"
                ? "Logging in..."
                : "Registering..."
              : mode === "Login"
              ? "Login"
              : "Register User"}
          </Button>

          {error && <p>{error}</p>}
        </form>
      </div>
    </>
  );
};

export default Register;
