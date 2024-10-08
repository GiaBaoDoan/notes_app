import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hook";
import { verifyToken } from "../../thunk";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { AppDispatch } from "../../store/store";
import { PATH_URL } from "../../untils/constants";

const UnAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { removeItem, getItem: getToken } = useLocalStorage("accessToken");
  const accessToken = getToken();

  const handleVerifyToken = () => {
    dispatch(verifyToken())
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        removeItem();
        toast.error(err.response.data.error);
        navigate(`${PATH_URL.LOGIN}`);
      });
  };
  useEffect(() => {
    accessToken ? handleVerifyToken() : "";
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
};

export default UnAuth;
