import { Loader, X } from "lucide-react";
import { useInput } from "../hook";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import PasswordInput from "./PasswordInput";
import { resetPassword } from "../thunk/reset-password.thunk";
import { PATH_URL } from "../untils/constants";

const ResetNewPassword = () => {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useInput();
  const dispatch = useDispatch<AppDispatch>();

  const handleSendEmail = () => {
    setIsloading(true);
    if (token) {
      dispatch(resetPassword({ token, newPassword }))
        .unwrap()
        .then((res) => {
          toast.success(res.message);
          setIsloading(false);
          navigate(PATH_URL.LOGIN);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setIsloading(false);
        });
    }
  };

  const handelSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newPassword) return toast.error("Không để trống");
    handleSendEmail();
  };

  return (
    <div className="bg-white drop-shadow rounded-lg p-5 w-[400px] center-box">
      <form onSubmit={handelSubmit} noValidate className="flex flex-col gap-3">
        <article className="flex justify-between items-center">
          <h3 className="font-medium text-2xl">Reset Password</h3>
          <X className="icon-btn" />
        </article>
        <div className="mt-4">
          <PasswordInput
            value={newPassword}
            onChange={setNewPassword}
            placeholder="Reset new password"
          />
        </div>
        <Link to={PATH_URL.LOGIN} className="text-primary underline">
          Đăng nhập
        </Link>
        <button
          disabled={isLoading}
          className="btn-primary flex justify-center"
        >
          {isLoading ? <Loader /> : "Confirm"}
        </button>
      </form>
    </div>
  );
};

export default ResetNewPassword;
