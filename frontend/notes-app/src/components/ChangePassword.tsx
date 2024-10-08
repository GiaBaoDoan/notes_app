import { Loader, X } from "lucide-react";
import PasswordInput from "./PasswordInput";
import { useInput } from "../hook";
import { toast } from "react-toastify";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { changePassword } from "../thunk/change-password.thunk";
import { Link, useNavigate } from "react-router-dom";
import { PATH_URL } from "../untils/constants";

const ChangePassword = () => {
  const [currentPassword, onChangeCurPassword] = useInput();
  const [newPassword, onChangeNewPassword] = useInput();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handelSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      return toast.error("Please field all inputs");
    }
    // api call thunk
    setIsLoading(true);
    dispatch(changePassword({ currentPassword, newPassword }))
      .unwrap()
      .then((res) => {
        setIsLoading(false);
        toast.success(res.message);
        navigate(PATH_URL.HOME);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="bg-white drop-shadow rounded-lg p-5 w-[400px] center-box">
      <form onSubmit={handelSubmit} className="flex flex-col gap-3">
        <article className="flex justify-end items-center">
          <X onClick={() => navigate(PATH_URL.HOME)} className="icon-btn" />
        </article>
        <div>
          <label
            className="font-medium inline-block mb-1"
            htmlFor="current password"
          >
            Current password
          </label>
          <PasswordInput
            placeholder="current password"
            onChange={onChangeCurPassword}
            value={currentPassword}
          />
        </div>
        <div>
          <label
            className="font-medium inline-block mb-1"
            htmlFor="New password"
          >
            New password
          </label>
          <PasswordInput
            placeholder="new password"
            onChange={onChangeNewPassword}
            value={newPassword}
          />
        </div>
        <Link
          to={PATH_URL.PROFILE}
          className="underline self-start text-sm text-primary"
        >
          Edit profile ?
        </Link>

        <button
          disabled={isLoading}
          className="btn-primary flex justify-center"
        >
          {isLoading ? <Loader /> : "Update password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
