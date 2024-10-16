import { FormEvent, useState } from "react";
import { validateEmail } from "../../untils/helpers";
import useInput from "../../hook/useInput";
import { PasswordInput } from "../../components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { register } from "../../thunk/register.thunk";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useInput();
  const [name, setName] = useInput();
  const [password, setPassword] = useInput();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handelSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return setError("Please enter all inputs!");
    }
    if (!validateEmail(email)) {
      return setError("Please enter a valid email address!");
    }
    setIsLoading(true);
    dispatch(register({ name, email, password }))
      .unwrap()
      .then(() => {
        setIsLoading(false);
        toast.success("Hãy xác thực email của bạn !");
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
      });
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-28 w-96 border rounded-lg bg-white shadow px-7 py-10">
        <form noValidate onSubmit={handelSubmit} className="flex flex-col">
          <h4 className="text-xl mb-5">Sign up</h4>
          <input
            onChange={setName}
            value={name}
            type="text"
            name="name"
            placeholder="User name"
            className="input-box"
          />
          <input
            onChange={setEmail}
            value={email}
            type="email"
            name="email"
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
            {isLoading ? <Loader /> : "Sign up"}
          </button>
          <p className="text-sm text-center mt-4 font-medium">
            Already have account?
            <Link to="/login" className="underline text-primary">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
