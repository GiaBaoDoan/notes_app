import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Layout, Login, SignUp } from "./pages";
import { PATH_URL } from "./untils/constants";
import ChangePassword from "./components/ChangePassword";
import InforProfile from "./components/InforProfile";
import VerifyEmail from "./components/VerifyEmail";
import ResendEmail from "./components/ResendEmail";
import ResetNewPassword from "./components/ResetNewPassword";
import UnAuth from "./pages/unauth/UnAuth";
import Auth from "./pages/auth/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout chứa Outlet
    children: [
      {
        element: <Auth />,
        children: [
          {
            path: PATH_URL.HOME,
            element: <Home />,
          },
          {
            path: PATH_URL.PROFILE,
            element: <InforProfile />,
          },
          {
            path: PATH_URL.CHANGE_PASSWORD,
            element: <ChangePassword />,
          },
        ],
      },
      {
        element: <UnAuth />,
        children: [
          {
            path: PATH_URL.LOGIN,
            element: <Login />,
          },
          {
            path: PATH_URL.REGISTER,
            element: <SignUp />,
          },

          {
            path: PATH_URL.VERIFY_EMAIL,
            element: <VerifyEmail />,
          },
          {
            path: PATH_URL.RESEND_OTP,
            element: <ResendEmail />,
          },
          {
            path: PATH_URL.RESET_PASSWORD,
            element: <ResetNewPassword />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
