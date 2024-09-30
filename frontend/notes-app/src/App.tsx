import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Layout, Login, SignUp } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout chứa Outlet
    children: [
      {
        path: "/dashboard", // URL sẽ là "/dashboard"
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
