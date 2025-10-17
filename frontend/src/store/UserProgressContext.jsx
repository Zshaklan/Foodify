import { createContext, useEffect, useState } from "react";

export const UserProgressContext = createContext({
  progress: "",
  currentUser: null,
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
  setCurrentUser: () => {},
});

export default function UserProgressContextProvider({ children }) {
  const [progress, setProgress] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const res = await fetch("http://localhost:5000/api/auth/user/me", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.user) setCurrentUser(data.user.email);
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

  const UserProgressCtx = {
    progress,
    currentUser,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
    setCurrentUser,
  };

  return (
    <UserProgressContext.Provider value={UserProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}
