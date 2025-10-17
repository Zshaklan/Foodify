import { useContext } from "react";
import UserProgressContextProvider, {
  UserProgressContext,
} from "./store/UserProgressContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/auth/Register";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Meals from "./components/Meals";
import ErrorBoundary from "./components/ErrorBoundary";
import RootLayout from "./components/RootLayout";
import CartContextProvider from "./store/CartContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MealDesctiption from "./components/MealDesctiption";

function AppRoutes() {
  const { currentUser } = useContext(UserProgressContext);

  const routes = createBrowserRouter([
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Register /> },
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        { index: true, element: <Meals /> },
        { path: "/desc/:id", element: <MealDesctiption /> },
        { path: "/cart", element: <Cart /> },
        {
          path: "/checkout",
          element: (
            <ProtectedRoute user={currentUser}>
              <Checkout />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <AppRoutes />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
