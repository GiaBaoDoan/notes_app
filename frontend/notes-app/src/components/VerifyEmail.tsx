import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../store/store";
import { verifyEmail } from "../thunk/verify-email.thunk";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { PATH_URL } from "../untils/constants";

const VerifyEmail = () => {
  const { token } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handelVerifyEmail = (token: string) => {
    setIsLoading(true);
    dispatch(verifyEmail(token))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        setIsLoading(false);
        navigate(PATH_URL.LOGIN);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    token && handelVerifyEmail(token);
  }, [token]);
  return <div>{isLoading ? <Modal /> : ""}</div>;
};

export default VerifyEmail;
