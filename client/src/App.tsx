import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import MainLayout from "./MainLayout";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // children:[
    //   {
    //     path: "/login"
    //   }
    // ]
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
]);

const App = () => {
  return <RouterProvider router={appRouter}></RouterProvider>;
};
export default App;
