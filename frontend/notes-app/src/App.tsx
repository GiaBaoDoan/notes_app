import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Layout, Login, SignUp } from "./pages";
import ChangePassword from "./components/ChangePassword";
import InforProfile from "./components/InforProfile";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
