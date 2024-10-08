import { useInput, useLocalStorage } from "../hook";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import { Loader, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { editProfile } from "../thunk/edit-profile.thunk";
import { validateEmail } from "../untils/helpers";
import { PATH_URL } from "../untils/constants";

const InforProfile = () => {
  const { setItem: setToken } = useLocalStorage("accessToken");
  const { currentUser } = useSelector((state: RootState) => state.userReducer);
  const [email, setEmail] = useInput(currentUser?.email);
  const [name, setName] = useInput(currentUser?.name);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handelSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!email || !name) {
      return toast.error("Please add all inputs");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email adress!!");
    }

    // api call
    setIsloading(true);
    dispatch(editProfile({ email, name }))
      .unwrap()
      .then((res) => {
        setIsloading(false);
        setToken(res.token);
        toast.success(res.message);
        navigate(PATH_URL.HOME);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setIsloading(false);
      });
  };

  return (
    <div className="bg-white drop-shadow rounded-lg p-5 w-[400px] center-box">
      <form onSubmit={handelSubmit} className="flex flex-col gap-5">
        <article className="flex items-center justify-between">
          <h3 className="font-medium text-2xl uppercase">Profile</h3>
          <X onClick={() => navigate(PATH_URL.HOME)} className="icon-btn" />
        </article>
        <div>
          <label className="font-medium" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            placeholder="email"
            value={email}
            disabled={true}
            onChange={setEmail}
            className="border bg-slate-100 mt-1 block px-5 w-full py-3 rounded-lg"
          />
        </div>
        <div>
          <label className="font-medium" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            placeholder="username"
            value={name}
            onChange={setName}
            className="border mt-1 px-5 block w-full py-3 rounded-lg"
          />
        </div>
        <Link
          to={PATH_URL.CHANGE_PASSWORD}
          className="underline self-start text-sm text-primary"
        >
          Edit password ?
        </Link>
        <button
          disabled={isLoading}
          className="btn-primary flex justify-center"
        >
          {isLoading ? <Loader /> : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default InforProfile;
