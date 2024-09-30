import { Outlet } from "react-router-dom";
import { Navbar } from "../../components";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* Nơi các trang con sẽ được render */}
      </main>
    </>
  );
};

export default Layout;
