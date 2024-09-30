import { Link, useNavigate } from "react-router-dom";
import { PasswordInput } from "../../components";
import { FormEvent, useEffect, useState } from "react";
import { validateEmail } from "../../untils/helpers";
import { useDispatch } from "react-redux";
import { login } from "../../thunk/login.thunk";
import { AppDispatch } from "../../store/store";
import useInput from "../../hook/useInput";
import { Loader } from "lucide-react";
import { useLocalStorage } from "../../hook";
import { toast } from "react-toastify";

const Login = () => {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setItem, getItem } = useLocalStorage("accessToken");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handelSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password || !email) {
      return setError("Please field all inputs !!");
    }
    if (!validateEmail(email)) {
      return setError("Please enter a valid email adress!!");
    }
    // api call
    setIsLoading(true);
    dispatch(login({ email, password }))
      .unwrap()
      .then((res) => {
        setIsLoading(false);
        setItem(res.token);
        navigate("/dashboard");
        toast.success("Login successfully !");
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
      });
  };
  useEffect(() => {
    getItem() ? navigate("/dashboard") : "";
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-28 w-96 border rounded bg-white shadow px-7 py-10">
        <form noValidate onSubmit={handelSubmit} className="flex flex-col">
          <h4 className="text-xl mb-5">Login</h4>
          <input
            name="email"
            onChange={setEmail}
            value={email}
            type="email"
            placeholder="Email"
            className="input-box"
          />
          <PasswordInput
            onChange={setPassword}
            value={password}
            placeholder="Enter your password"
          />
          {error && <span className="text-red-500 text-sm pb-1">{error}</span>}
          <button
            disabled={isLoading}
            type="submit"
            className="btn-primary mt-2 flex justify-center cursor-pointer"
          >
            {isLoading ? <Loader /> : "login"}
          </button>
          <p className="text-sm text-center mt-4 font-medium">
            Not resgistered yet?
            <Link to="/signup" className="underline text-primary">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
