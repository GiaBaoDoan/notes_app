import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../../components";
import { useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard");
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
