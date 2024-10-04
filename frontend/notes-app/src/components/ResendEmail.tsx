import { Loader, X } from "lucide-react";
import { useInput } from "../hook";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { reverifyEmail } from "../thunk/reverify-email.thunk";
import { toast } from "react-toastify";

const ResendEmail = () => {
  const [email, onChangeEmail] = useInput();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handelReverifyEmail = (e: FormEvent) => {
    e.preventDefault();
    setIsloading(true);
    dispatch(reverifyEmail(email))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        setIsloading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setIsloading(false);
      });
  };

  return (
    <div className="bg-white drop-shadow rounded-lg p-5 w-[400px] center-box">
      <form
        onSubmit={handelReverifyEmail}
        noValidate
        className="flex flex-col gap-3"
      >
        <article className="flex justify-between items-center">
          <h3 className="font-medium text-2xl">Xác thực email</h3>
          <X onClick={() => navigate("/")} className="icon-btn" />
        </article>
        <div className="mt-4">
          <input
            value={email}
            type="email"
            name="email"
            onChange={onChangeEmail}
            className="w-full border p-3 rounded-lg"
            placeholder="Email"
          />
        </div>
        <Link to={"/login"} className="text-primary underline">
          Đăng nhập
        </Link>
        <button
          disabled={isLoading}
          className="btn-primary flex justify-center"
        >
          {isLoading ? <Loader /> : "Xác thực tới email"}
        </button>
      </form>
    </div>
  );
};

export default ResendEmail;
