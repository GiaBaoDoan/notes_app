import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { verifyToken } from "../../thunk";
import { useLocalStorage } from "../../hook";
import { toast } from "react-toastify";

const Auth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { removeItem, getItem } = useLocalStorage("accessToken");
  const accessToken = getItem();
  const navigate = useNavigate();

  const handleVerifyToken = () => {
    dispatch(verifyToken())
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        removeItem();
        toast.error(err.response.data.error);
        navigate("/login");
      });
  };
  useEffect(() => {
    accessToken ? handleVerifyToken() : navigate("/login");
  }, [accessToken]);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Auth;
