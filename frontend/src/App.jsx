import { useContext } from "react";
import UserProgressContextProvider, {
  UserProgressContext,
} from "./store/UserProgressContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/auth/Register";
import Meals from "./components/Meals";
import ErrorBoundary from "./components/ErrorBoundary";
import RootLayout from "./components/RootLayout";
import CartContextProvider from "./store/CartContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MealDesctiption from "./components/MealDesctiption";
import Profile from "./components/profile/Profile";

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
        {
          index: true,
          element: (
            <ProtectedRoute user={currentUser}>
              <Meals />
            </ProtectedRoute>
          ),
        },
        {
          path: "/desc/:id",
          element: (
            <ProtectedRoute user={currentUser}>
              <MealDesctiption />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute user={currentUser}>
              <Profile />
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
