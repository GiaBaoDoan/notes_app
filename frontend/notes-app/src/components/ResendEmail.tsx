import { Loader, X } from "lucide-react";
import { useInput } from "../hook";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { reverifyEmail } from "../thunk/reverify-email.thunk";
import { toast } from "react-toastify";
import { PATH_URL } from "../untils/constants";

const ResendEmail = () => {
  const [email, onChangeEmail] = useInput();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(10);

  const handelReverifyEmail = (e: FormEvent) => {
    e.preventDefault();
    setIsloading(true);
    dispatch(reverifyEmail(email))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        setIsloading(false);
        setDisabled(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setIsloading(false);
      });
  };

  useEffect(() => {
    let timeoutId: number;
    if (disabled) {
      if (seconds > 0) {
        setTimeout(() => {
          setSeconds(seconds - 1);
        }, 1000);
      } else {
        setSeconds(10);
        setDisabled(false);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [seconds, disabled]);

  return (
    <div className="bg-white drop-shadow rounded-lg p-5 w-[400px] center-box">
      <form
        onSubmit={handelReverifyEmail}
        noValidate
        className="flex flex-col gap-3"
      >
        <article className="flex justify-between items-center">
          <h3 className="text-xl">Xác thực email</h3>
          <X onClick={() => navigate(PATH_URL.HOME)} className="icon-btn" />
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
        <Link to={PATH_URL.LOGIN} className="text-primary text-sm underline">
          Đăng nhập
        </Link>
        {disabled ? (
          <button
            disabled={disabled}
            className="btn-primary bg-gray-200 text-gray-500  flex justify-center"
          >
            {seconds}s
          </button>
        ) : (
          <button
            disabled={isLoading}
            className="btn-primary flex justify-center"
          >
            {isLoading ? <Loader /> : "Xác thực tới email"}
          </button>
        )}
      </form>
    </div>
  );
};

export default ResendEmail;
