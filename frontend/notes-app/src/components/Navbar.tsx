import { useInput, useLocalStorage } from "../hook";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toast } from "react-toastify";
import SearchNavBar from "./SearchNavBar";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import { PATH_URL } from "../untils/constants";
import { useEffect, useState } from "react";
import { UserType } from "..";

const Navbar = () => {
  const { removeItem } = useLocalStorage("accessToken");
  const { currentUser } = useSelector((state: RootState) => state.userReducer);
  const navigate = useNavigate();

  const [query, searchQuery, clearInput] = useInput();

  const [user, setUser] = useState<UserType | null>(currentUser);

  const handleLogout = async () => {
    removeItem();
    toast.success("Logout successfully!");
    setUser(null);
  };

  useEffect(() => {
    currentUser ? setUser(currentUser) : setUser(null);
  }, [currentUser]);
  return (
    <nav className="flex justify-between items-center py-2 px-6 bg-white drop-shadow">
      <h2
        onClick={() => navigate(PATH_URL.HOME)}
        className="font-medium cursor-pointer text-xl"
      >
        Notes
      </h2>
      <SearchNavBar
        value={query}
        onChange={searchQuery}
        clearInput={clearInput}
      />
      <Profile user={user} onLogout={handleLogout} />
    </nav>
  );
};

export default Navbar;
