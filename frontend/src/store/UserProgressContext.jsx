import { createContext, useEffect, useState } from "react";
import { API_URL } from "../config/api.js";

export const UserProgressContext = createContext({
  progress: "",
  currentUser: null,
  isAuthReady: false,
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
  showEditProfile: () => {},
  hideEditProfile: () => {},
  setCurrentUser: () => {},
  setIsAuthReady: () => {},
  showOrderManagement: () => {},
  hideOrderManagement: () => {},
});

export default function UserProgressContextProvider({ children }) {
  const [progress, setProgress] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const res = await fetch(`${API_URL}/api/auth/user/me`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.user) setCurrentUser(data.user);
        setIsAuthReady(true);
      } catch (err) {
        setCurrentUser(null);
      }
    }

    fetchCurrentUser();
  }, []);

  const showCart = () => setProgress("cart");
  const hideCart = () => setProgress("");
  const showCheckout = () => setProgress("checkout");
  const hideCheckout = () => setProgress("");
  const showEditProfile = () => setProgress("profile");
  const hideEditProfile = () => setProgress("");
  const showOrderManagement = () => setProgress("management");
  const hideOrderManagement = () => setProgress("");

  const UserProgressCtx = {
    progress,
    currentUser,
    isAuthReady,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
    showEditProfile,
    hideEditProfile,
    setCurrentUser,
    setIsAuthReady,
    showOrderManagement,
    hideOrderManagement,
  };

  return (
    <UserProgressContext.Provider value={UserProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}
