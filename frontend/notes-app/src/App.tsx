import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Layout, Login, SignUp } from "./pages";
import ChangePassword from "./components/ChangePassword";
import InforProfile from "./components/InforProfile";
import VerifyEmail from "./components/VerifyEmail";
import ResendEmail from "./components/ResendEmail";
import ResetNewPassword from "./components/ResetNewPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout chứa Outlet
    children: [
      {
        path: "/", // URL sẽ là "/dashboard"
        element: <Home />,
      },
      {
        path: "/login", // URL sẽ là "/login"
        element: <Login />,
      },
      {
        path: "/signup", // URL sẽ là "/signup"
        element: <SignUp />,
      },
      {
        path: "/change-password", // URL sẽ là "/signup"
        element: <ChangePassword />,
      },
      {
        path: "/edit-profile", // URL sẽ là "/signup"
        element: <InforProfile />,
      },
      {
        path: "/verify-email/:token", // URL sẽ là "/signup"
        element: <VerifyEmail />,
      },
      {
        path: "/resend-email", // URL sẽ là "/signup"
        element: <ResendEmail />,
      },
      {
        path: "/reset-password/:token", // URL sẽ là "/signup"
        element: <ResetNewPassword />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
