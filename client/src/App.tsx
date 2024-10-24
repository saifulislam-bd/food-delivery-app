import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import Hero from "./components/Hero";
import MainLayout from "./layout/MainLayout";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import RestaurantDetails from "./components/RestaurantDetails";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search/:text",
        element: <SearchPage />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);

const App = () => {
  return <RouterProvider router={appRouter}></RouterProvider>;
};
export default App;
