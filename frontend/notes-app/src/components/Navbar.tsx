import { useInput, useLocalStorage } from "../hook";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SearchNavBar from "./SearchNavBar";
import Profile from "./Profile";

const Navbar = () => {
  const { removeItem } = useLocalStorage("accessToken");
  const [user, setUser] = useState<any>();
  const { currentUser } = useSelector((state: RootState) => state.userReducer);
  const [query, searchQuery, clearInput] = useInput();

  const handleLogout = async () => {
    removeItem();
    setUser(null);
    toast.success("Logout successfully!");
  };

  useEffect(() => {
    currentUser ? setUser(currentUser) : setUser(null);
  }, [currentUser]);
  return (
    <nav className="flex justify-between items-center py-2 px-6 bg-white drop-shadow">
      <h2 className="font-medium text-xl">Notes</h2>
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
